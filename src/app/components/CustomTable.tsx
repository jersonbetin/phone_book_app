import { Table } from "react-bootstrap";
import { v4 } from "uuid";

interface ICustomTableProps {
  titles: any[];
  data: any[];
}

const CustomTable = ({ titles, data }: ICustomTableProps) => {
  console.log();
  return (
    <Table striped>
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th key={`${title}-${index}`}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={v4()}>
            {titles.map((title) => (
              <td key={v4()}>{item?.[title]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
