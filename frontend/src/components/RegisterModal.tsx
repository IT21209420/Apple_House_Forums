import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { RegisterCredentials } from "../network/posts_api";
import * as PostApi from "../network/posts_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInput from "./form/TextInput";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";
interface RegisterModalProps {
  onDismiss: () => void;
  onRegisterSuccessful: (user: User) => void;
}



const RegisterModal = ({
  onDismiss,
  onRegisterSuccessful,
}: RegisterModalProps) => {

  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>();
  
  async function onSubmit(credentials: RegisterCredentials) {
    try {
      const newUser = await PostApi.register(credentials);
      onRegisterSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
        console.error(error);
      }
     
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
