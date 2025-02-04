import React, { useState, useContext, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
} from "reactstrap";

import { UsersContext } from "../../util/UsersProvider";

function UserProfile() {
  const history = useHistory();
  const { id } = useParams();
  const { users } = useContext(UsersContext);

  const toggle = () => {
    history.push("/users");
  };

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

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

  return (
    <>
      <Modal isOpen={true} centered>
        <ModalHeader toggle={toggle}>User Profile</ModalHeader>
        <ModalBody>
          <Form>
            {/* Email */}
            <img
              src={formData.avatar}
              alt={`${formData.firstName} ${formData.lastName}`}
              className="avatar-icon rounded-circle mx-auto d-block"
            />
            <FormGroup>
              <Label for="email" className="fw-bold">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="youremail@address.com"
                value={formData.email}
                readOnly
                disabled
              />
              <FormFeedback invalid>
                Please enter a valid email address.
              </FormFeedback>
            </FormGroup>

            <Row>
              <Col>
                {/* First Name */}
                <FormGroup>
                  <Label for="firstName" className="fw-bold">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Juan"
                    value={formData.firstName}
                    readOnly
                    disabled
                  />
                  <FormFeedback invalid>
                    Only letters are allowed in this field.
                  </FormFeedback>
                </FormGroup>
              </Col>

              <Col>
                {/* Last Name */}
                <FormGroup>
                  <Label for="lastName" className="fw-bold">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Dela Cruz"
                    value={formData.lastName}
                    readOnly
                    disabled
                  />
                  <FormFeedback invalid>
                    Only letters are allowed in this field.
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default UserProfile;
