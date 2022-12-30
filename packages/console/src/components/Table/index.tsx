import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import TableEmpty from './TableEmpty';
import TableError from './TableError';
import TableLoading from './TableLoading';
import * as styles from './index.module.scss';
import type { Column, RowGroup } from './types';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  rowGroups: Array<RowGroup<TFieldValues>>;
  columns: Array<Column<TFieldValues>>;
  rowIndexKey: TName;
  onClickRow?: (row: TFieldValues) => void;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  isLoading?: boolean;
  placeholder?: ReactNode;
  errorMessage?: string;
  onRetry?: () => void;
};

const Table = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  rowGroups,
  columns,
  rowIndexKey,
  onClickRow,
  className,
  headerClassName,
  bodyClassName,
  isLoading,
  placeholder,
  errorMessage,
  onRetry,
}: Props<TFieldValues, TName>) => {
  const totalColspan = columns.reduce((result, { colSpan }) => {
    return result + (colSpan ?? 1);
  }, 0);

  const hasData = rowGroups.some(({ data }) => data?.length);

  return (
    <div className={classNames(styles.container, className)}>
      <table className={classNames(styles.headerTable, headerClassName)}>
        <thead>
          <tr>
            {columns.map(({ title, colSpan, dataIndex }) => (
              <th key={dataIndex} colSpan={colSpan}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className={classNames(styles.bodyTable, bodyClassName)}>
        <table>
          <tbody>
            {isLoading && <TableLoading columns={columns.length} />}
            {!hasData && errorMessage && (
              <TableError columns={columns.length} content={errorMessage} onRetry={onRetry} />
            )}
            {!isLoading && !hasData && placeholder && (
              <TableEmpty columns={columns.length}>{placeholder}</TableEmpty>
            )}
            {rowGroups.map(({ key, label, labelClassName, data }) => (
              <Fragment key={key}>
                {label && (
                  <tr>
                    <td colSpan={totalColspan} className={labelClassName}>
                      {label}
                    </td>
                  </tr>
                )}
                {data?.map((row) => (
                  <tr
                    key={row[rowIndexKey]}
                    className={classNames(onClickRow && styles.clickable)}
                    onClick={() => {
                      onClickRow?.(row);
                    }}
                  >
                    {columns.map(({ dataIndex, colSpan, className, render }) => (
                      <td key={dataIndex} colSpan={colSpan} className={className}>
                        {render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
