import { Col, Form, Row } from "react-bootstrap";
import CustomTable from "./CustomTable";
import { IPhone } from "../interfaces/phone";
import { useEffect, useState } from "react";
import { ColumnDefinitionType } from "../types/commons";

interface IPhoneListProps {
  data: Array<IPhone>;
  onEdit: (item: IPhone) => void;
  onDelete: (item: IPhone) => void;
}

const PhoneList = ({ data, onEdit, onDelete }: IPhoneListProps) => {
  const [list, setList] = useState(data);

  const onHandleSearch = (e: any) => {
    const { value } = e.target;

    const newList = data.filter((item) => {
      return (
        item?.phone?.indexOf(value)! > -1 ||
        item?.firstName?.indexOf(value)! > -1 ||
        item?.lastName?.indexOf(value)! > -1
      );
    });

    setList(newList);
  };

  const columns: ColumnDefinitionType<IPhone, keyof IPhone>[] = [
    {
      key: "firstName",
      header: "First Name",
    },
    {
      key: "lastName",
      header: "Last Name",
    },
    {
      key: "phone",
      header: "Phone",
    },
  ];

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <Row className="border-danger">
      <Col lg={3} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={onHandleSearch}
        />
      </Col>
      <CustomTable
        data={list}
        columns={columns}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </Row>
  );
};

export default PhoneList;
