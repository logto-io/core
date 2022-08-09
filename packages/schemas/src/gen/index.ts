// LOG-88: Refactor '@logto/schemas' type gen
// Consider add the better assert into `essentials` package
// eslint-disable-next-line no-restricted-imports
import assert from 'assert';
import fs from 'fs/promises';
import path from 'path';

import { conditional, conditionalString } from '@silverhand/essentials';
import camelcase from 'camelcase';
import uniq from 'lodash.uniq';
import pluralize from 'pluralize';

import { generateSchema } from './schema';
import { FileData, Table, Field, Type, GeneratedType, TableWithType } from './types';
import {
  findFirstParentheses,
  normalizeWhitespaces,
  parseType,
  removeUnrecognizedComments,
  splitTableFieldDefinitions,
} from './utils';

const directory = 'tables';
const constrainKeyWords = [
  'primary',
  'foreign',
  'unique',
  'exclude',
  'check',
  'constraint',
  'references',
];

const getOutputFileName = (file: string) => pluralize(file.slice(0, -4).replace(/_/g, '-'), 1);

const generate = async () => {
  const files = await fs.readdir(directory);

  const generated = await Promise.all(
    files
      .filter((file) => file.endsWith('.sql'))
      .map<Promise<[string, FileData]>>(async (file) => {
        const paragraph = await fs.readFile(path.join(directory, file), { encoding: 'utf8' });

        // Get statements
        const statements = paragraph
          .split(';')
          .map((value) => normalizeWhitespaces(value))
          .map((value) => removeUnrecognizedComments(value));

        // Parse Table statements
        const tables = statements
          .filter((value) => value.toLowerCase().startsWith('create table'))
          .map((value) => findFirstParentheses(value))
          // eslint-disable-next-line unicorn/prefer-native-coercion-functions
          .filter((value): value is NonNullable<typeof value> => Boolean(value))
          .map<Table>(({ prefix, body }) => {
            const name = normalizeWhitespaces(prefix).split(' ')[2];
            assert(name, 'Missing table name: ' + prefix);

            const fields = splitTableFieldDefinitions(body)
              .map((value) => normalizeWhitespaces(value))
              .filter((value) =>
                constrainKeyWords.every(
                  (constraint) => !value.toLowerCase().startsWith(constraint + ' ')
                )
              )
              .map<Field>((value) => parseType(value));

            return { name, fields };
          });

        // Parse enum statements
        const types = statements
          .filter((value) => value.toLowerCase().startsWith('create type'))
          .map<Type>((value) => {
            const breakdowns = value.split(' ');
            const name = breakdowns[2];
            const data = findFirstParentheses(value);
            assert(
              name &&
                data &&
                breakdowns[3]?.toLowerCase() === 'as' &&
                breakdowns[4]?.toLowerCase() === 'enum',
              'Only support enum custom type'
            );
            const values = data.body.split(',').map((value) => value.trim().slice(1, -1));

            return { name, type: 'enum', values };
          });

        return [file, { tables, types }];
      })
  );

  const generatedDirectory = 'src/db-entries';
  const generatedTypesFilename = 'custom-types';
  const tsTypesFilename = '../foundations';
  const header = '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n\n';

  await fs.rm(generatedDirectory, { recursive: true, force: true });
  await fs.mkdir(generatedDirectory, { recursive: true });

  // Postgres custom types
  const allTypes = generated
    .flatMap((data) => data[1].types)
    .map<GeneratedType>((type) => ({
      ...type,
      tsName: camelcase(type.name, { pascalCase: true }),
    }));

  if (allTypes.length > 0) {
    // Generate custom types
    await fs.writeFile(
      path.join(generatedDirectory, `${generatedTypesFilename}.ts`),
      header +
        allTypes
          .map(({ tsName, values }) =>
            [
              `export enum ${tsName} {`,
              ...values.map((value) => `  ${value} = '${value}',`),
              '}',
            ].join('\n')
          )
          .join('\n') +
        '\n'
    );
  }

  // Generate DB entry types
  await Promise.all(
    generated.map(async ([file, { tables }]) => {
      /* eslint-disable @silverhand/fp/no-mutating-methods */
      const tsTypes: string[] = [];
      const customTypes: string[] = [];
      const tableWithTypes = tables.map<TableWithType>(({ fields, ...rest }) => ({
        ...rest,
        // eslint-disable-next-line complexity
        fields: fields.map(({ type, customType, tsType, ...rest }) => {
          const finalType =
            tsType ?? type ?? allTypes.find(({ name }) => name === customType)?.tsName;
          assert(finalType, `Type ${customType ?? 'N/A'} not found`);

          if (tsType) {
            tsTypes.push(tsType, `${camelcase(tsType)}Guard`);
          } else if (!type) {
            customTypes.push(finalType);
          }

          return { ...rest, tsType, type: finalType, isEnum: !tsType && !type };
        }),
      }));

      if (tableWithTypes.length > 0) {
        tsTypes.push('GeneratedSchema', 'Guard', 'CreateGuard');
      }
      /* eslint-enable @silverhand/fp/no-mutating-methods */

      const importZod = conditionalString(
        tableWithTypes.length > 0 && "import { z } from 'zod';\n\n"
      );

      const importTsTypes = conditionalString(
        tsTypes.length > 0 &&
          [
            'import {',
            uniq(tsTypes)
              .map((value) => `  ${value}`)
              .join(',\n'),
            `} from './${tsTypesFilename}';`,
          ].join('\n') + '\n\n'
      );

      const importTypes = conditionalString(
        customTypes.length > 0 &&
          [
            'import {',
            uniq(customTypes)
              .map((value) => `  ${value}`)
              .join(',\n'),
            `} from './${generatedTypesFilename}';`,
          ].join('\n') + '\n\n'
      );

      const content =
        header +
        importZod +
        importTsTypes +
        importTypes +
        tableWithTypes.map((table) => generateSchema(table)).join('\n') +
        '\n';
      await fs.writeFile(path.join(generatedDirectory, getOutputFileName(file) + '.ts'), content);
    })
  );

  await fs.writeFile(
    path.join(generatedDirectory, 'index.ts'),
    header +
      conditionalString(allTypes.length > 0 && `export * from './${generatedTypesFilename}';\n`) +
      generated.map(([file]) => `export * from './${getOutputFileName(file)}';`).join('\n') +
      '\n'
  );
};

void generate();
