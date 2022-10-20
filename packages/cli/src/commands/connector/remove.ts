import chalk from 'chalk';
import fsExtra from 'fs-extra';
import { CommandModule } from 'yargs';

import { log } from '../../utilities';
import { getConnectorPackagesFrom } from './utils';

const remove: CommandModule<{ path?: string }, { path?: string; packages?: string[] }> = {
  command: ['remove [packages...]', 'rm', 'delete'],
  describe: 'Remove existing Logto connectors',
  builder: (yargs) =>
    yargs.positional('packages', {
      describe: 'The connector package names to remove',
      type: 'string',
      array: true,
      default: undefined,
    }),
  handler: async ({ path: inputPath, packages: packageNames }) => {
    if (!packageNames?.length) {
      log.error('No connector name provided');
    }

    const existingPackages = await getConnectorPackagesFrom(inputPath);
    const notFoundPackageNames = packageNames.filter(
      (current) => !existingPackages.some(({ name }) => current === name)
    );

    if (notFoundPackageNames.length > 0) {
      log.error(
        `Cannot remove ${notFoundPackageNames
          .map((name) => chalk.green(name))
          .join(', ')}: not found in your Logto instance directory`
      );
    }

    const okSymbol = Symbol('Connector removed');
    const result = await Promise.all(
      packageNames.map(async (current) => {
        const packageInfo = existingPackages.find(({ name }) => name === current);

        try {
          await fsExtra.remove(packageInfo?.path ?? '');

          return okSymbol;
        } catch (error: unknown) {
          log.warn(`Error while removing ${chalk.green(packageInfo?.name)}`);
          log.warn(error);

          return error;
        }
      })
    );
    const errorCount = result.filter((value) => value !== okSymbol).length;

    log.info(`Removed ${result.length - errorCount} connectors`);
  },
};

export default remove;
