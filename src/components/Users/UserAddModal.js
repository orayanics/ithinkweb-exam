import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

import { UsersContext } from "../../util/UsersProvider";

function UserAddModal() {
  const { addUser } = useContext(UsersContext);
  const history = useHistory();

  const toggle = () => {
    history.push("/users");
  };

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isFirstNameValid, setIsFirstNameValid] = useState(null);
  const [isLastNameValid, setIsLastNameValid] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }
    }

    if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[a-zA-Z]+$/;
      if (!value || !nameRegex.test(value)) {
        if (name === "firstName") {
          setIsFirstNameValid(false);
        }
        if (name === "lastName") {
          setIsLastNameValid(false);
        }
      } else {
        if (name === "firstName") {
          setIsFirstNameValid(true);
        }
        if (name === "lastName") {
          setIsLastNameValid(true);
        }
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // if invalid fields
    if (
      isEmailValid === false ||
      isFirstNameValid === false ||
      isLastNameValid === false
    ) {
      setIsAlertOpen(true);
      return;
    }

    // if empty fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setIsEmailValid(false);
      setIsFirstNameValid(false);
      setIsLastNameValid(false);
      setIsAlertOpen(true);
      return;
    }

    setIsAlertOpen(false);
    // send data to server
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.firstName + " " + formData.lastName,
      }),
    });

    const result = await response.json();

    const newUser = {
      id: parseInt(result.id),
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}`,
    };

    addUser(newUser);
    toggle();
  };

  return (
    <>
      <Modal isOpen={true}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          {isAlertOpen && (
            <Alert color="danger">
              Please check your inputs for any errors.
            </Alert>
          )}
          <Form>
            {/* Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="youremail@address.com"
                value={formData.email}
                onChange={handleChange}
                valid={isSubmitted && isEmailValid}
                invalid={isSubmitted && isEmailValid === false}
              />
              <FormFeedback invalid>
                Please enter a valid email address.
              </FormFeedback>
            </FormGroup>

            {/* First Name */}
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="Juan"
                value={formData.first_name}
                onChange={handleChange}
                valid={isSubmitted && isFirstNameValid}
                invalid={isSubmitted && isFirstNameValid === false}
              />
              <FormFeedback invalid>
                Only letters are allowed in this field.
              </FormFeedback>
            </FormGroup>

            {/* Last Name */}
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Dela Cruz"
                value={formData.lastName}
                onChange={handleChange}
                valid={isSubmitted && isLastNameValid}
                invalid={isSubmitted && isLastNameValid === false}
              />
              <FormFeedback invalid>
                Only letters are allowed in this field.
              </FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            type="submit"
            onClick={(e) => handleOnSubmit(e)}
          >
            Submit
          </Button>{" "}
          <Button
            color="danger"
            onClick={() => {
              toggle();
              // clear form data
              formData.email = null;
              formData.firstName = null;
              formData.lastName = null;

              // clear form validation
              setIsEmailValid(null);
              setIsFirstNameValid(null);
              setIsLastNameValid(null);
              setIsSubmitted(false);
              setIsAlertOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserAddModal;
