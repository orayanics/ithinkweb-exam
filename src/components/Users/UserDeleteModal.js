import React, { useState, useContext, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
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

function UserDeleteModal() {
  const history = useHistory();
  const { id } = useParams();
  const { users, deleteUser } = useContext(UsersContext);

  const toggle = () => {
    history.push("/users");
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    getUserById(id).then((data) => {
      setFormData({
        avatar: data.avatar,
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
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    deleteUser(parseInt(id));
    toggle();
  };

  return (
    <>
      <Modal isOpen={true}>
        <ModalHeader toggle={toggle}>Delete User</ModalHeader>
        <ModalBody>
          {isAlertOpen && (
            <Alert color="danger">
              Please check your inputs for any errors.
            </Alert>
          )}
          <Form>
            {/* Email */}
            <img
              src={formData.avatar}
              alt={`${formData.firstName} ${formData.lastName}`}
            />
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="youremail@address.com"
                value={formData.email}
                readOnly
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
                readOnly
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
                readOnly
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

export default UserDeleteModal;
