import { v4 } from "uuid";

import { ColumnDefinitionType } from "../types/commons";
import { Button } from "react-bootstrap";
import { IPhone } from "../interfaces/phone";

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  onDelete,
  onEdit,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row) => {
    return (
      <tr key={v4()}>
        {columns.map((column) => {
          return (
            <td key={v4()} className="align-middle">
              <span className="align-items-center">
                {row[column.key] as string}
              </span>
            </td>
          );
        })}
        <td className="text-end">
          {onEdit && (
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="danger"
              className="ml-2"
              onClick={() => onDelete?.(row)}
            >
              Remove
            </Button>
          )}
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableRows;
