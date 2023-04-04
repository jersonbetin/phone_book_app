"use client";

import { Inter } from "next/font/google";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import PhoneForm from "./components/PhoneForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { IPhone } from "./interfaces/phone";
import CustomTable from "./components/CustomTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const keyList = "list";
  const [list, setList] = useLocalStorage<Array<IPhone>>(keyList, []);
  const [data, setData] = useState<Array<any>>([]);

  const onSubmit = (item: IPhone) => {
    setList([...list, item]);
  };

  useEffect(() => {
    const rows = list.map((item: IPhone) => {
      return {
        key: "phone",
        value: <span>{item?.phone}</span>,
      };
    });
    setData(rows);
  }, [list]);

  return (
    <main>
      <Container fluid>
        <Row className="mt-5">
          <Col lg={4} className="px-xl-5">
            <PhoneForm onSubmit={onSubmit} />
          </Col>
          <Col lg={8} className="border-danger">
            <div>
              <CustomTable
                data={data}
                titles={["Key", "First Name", "Last Name", "Phone"]}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
