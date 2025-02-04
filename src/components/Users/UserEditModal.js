import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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

function UserEditModal() {
  const history = useHistory();
  const { id } = useParams();
  const { users, editUser } = useContext(UsersContext);

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isFirstNameValid, setIsFirstNameValid] = useState(null);
  const [isLastNameValid, setIsLastNameValid] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggle = () => {
    history.push("/users");
  };

  useEffect(() => {
    getUserById(id).then((data) => {
      setFormData({
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      });
    });
  }, [id]);

  const getUserById = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const data = await response.json();

    if (!data.data || response.status === 404) {
      return users.find((user) => user.id === parseInt(id));
    }

    return data.data;
  };

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
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.firstName + " " + formData.lastName,
      }),
    });

    const result = await response.json();

    // lift up edited user to parent
    const editedUser = {
      id: parseInt(id),
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
    };

    editUser(editedUser);
    toggle();
  };

  return (
    <>
      <Modal isOpen={true}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
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
                value={formData.firstName}
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

export default UserEditModal;
