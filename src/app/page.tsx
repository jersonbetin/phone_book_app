"use client";

import { Inter } from "next/font/google";
import { Col, Container, Form, Row } from "react-bootstrap";

import PhoneForm from "./components/PhoneForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { IPhone } from "./interfaces/phone";
import CustomTable from "./components/CustomTable";
import { useState } from "react";
import ToastDefault from "./components/ToastDefault";
import PhoneList from "./components/PhoneList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const keyList = "list";
  const localData = localStorage.getItem(keyList)
    ? JSON.parse(localStorage.getItem(keyList) || "")
    : [];
  const [list, setList] = useLocalStorage<Array<IPhone>>(keyList, localData);
  const [current, setCurrent] = useState<IPhone | undefined>(undefined);
  const [toast, setToast] = useState({ message: "", show: false });

  const onSubmit = (item: IPhone) => {
    setList([...list, item]);
    setToast({ show: true, message: "Info was added successfully!" });
  };
  const onHandleEdit = (item: IPhone) => {
    setCurrent(item);
  };

  const onHandleUpdate = (row: IPhone) => {
    const index = list.findIndex((item) => item.key === row.key);
    const copyList = [...list];
    copyList[index] = row;

    setList(copyList);
    setCurrent(undefined);
    setToast({ show: true, message: "Info was updated successfully!" });
  };

  const onHandleDelete = (row: IPhone) => {
    const newList = list.filter((item) => item.key !== row.key);
    setList(newList);
    setToast({ show: true, message: "Info was removed successfully!" });
  };

  return (
    <main>
      <Container fluid>
        <Row className="mt-5">
          <Col md={4} lg={3} className="px-xl-5">
            <PhoneForm
              onSubmit={onSubmit}
              current={current}
              onUpdate={onHandleUpdate}
            />
          </Col>
          <Col
            md={8}
            lg={9}
            className="style-list  divider-left padding-list-md"
          >
            <PhoneList
              data={list}
              onDelete={onHandleDelete}
              onEdit={onHandleEdit}
            />
          </Col>
        </Row>
      </Container>
      <ToastDefault
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
      />
    </main>
  );
}
