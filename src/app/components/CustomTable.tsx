import { Table } from "react-bootstrap";
import { ColumnDefinitionType } from "../types/commons";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { IPhone } from "../interfaces/phone";

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

const CustomTable = <T, K extends keyof T>({
  data,
  columns,
  onDelete,
  onEdit,
}: TableProps<T, K>): JSX.Element => {
  return (
    <Table striped responsive>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        columns={columns}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </Table>
  );
};

export default CustomTable;
