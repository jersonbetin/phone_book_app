import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 } from "uuid";

import { IErrorPhone, IPhone } from "../interfaces/phone";

const initialData = {
  firstName: "",
  lastName: "",
  phone: "",
};
const initialError = {
  firstName: false,
  lastName: false,
  phone: false,
};

interface IPhoneProps {
  onSubmit: (value: IPhone) => void;
  onUpdate: (value: IPhone) => void;
  current?: IPhone;
}

const PhoneForm = ({ onSubmit, current, onUpdate }: IPhoneProps) => {
  const [data, setData] = useState<IPhone>(initialData);
  const [error, setError] = useState<IErrorPhone>(initialError);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e?.target;

    setData({ ...data, [name]: value });
  };

  const validatePhoneNumber = (input: string) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input);
  };

  const validate = (): boolean => {
    let newError = { ...error };
    let result = true;
    for (let clave in data) {
      if (clave !== "phone") {
        newError[clave as keyof IErrorPhone] =
          !data[clave as keyof IErrorPhone];
        if (!data[clave as keyof IErrorPhone]) {
          result = false;
        }
      } else {
        const phoneValidate = validatePhoneNumber(
          data[clave as keyof IErrorPhone] || ""
        );

        newError[clave as keyof IErrorPhone] = !phoneValidate;
        if (!phoneValidate) {
          result = false;
        }
      }
    }

    setError(newError);

    return result;
  };

  useEffect(() => {
    setData(current || initialData);
  }, [current]);

  const onHandleSubmit = () => {
    if (validate()) {
      onSubmit({ ...data, key: v4() });
      setData(initialData);
    }
  };

  const onHandleUpdate = () => {
    if (validate()) {
      onUpdate(data);
      setData(initialData);
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-center">Add Phone Data</h2>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>FirstName</Form.Label>
        <Form.Control
          type="text"
          placeholder="FirstName"
          name="firstName"
          isInvalid={!!error.firstName}
          value={data.firstName}
          onChange={onHandleChange}
        />
        {error.firstName && (
          <Form.Text className="text-danger">First name is required</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>LastName</Form.Label>
        <Form.Control
          type="text"
          placeholder="LastName"
          name="lastName"
          value={data.lastName}
          isInvalid={!!error.lastName}
          onChange={onHandleChange}
        />
        {error.lastName && (
          <Form.Text className="text-danger">Last name is required</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="(123) 456-7890"
          name="phone"
          value={data.phone}
          isInvalid={!!error.phone}
          onChange={onHandleChange}
        />
        {error.phone && (
          <Form.Text className="text-danger">
            Phone doesn`t have format
          </Form.Text>
        )}
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={current ? onHandleUpdate : onHandleSubmit}
      >
        {current ? "Update" : "Add"}
      </Button>
    </Form>
  );
};

export default PhoneForm;
