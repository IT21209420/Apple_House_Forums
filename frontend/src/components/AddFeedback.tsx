import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Post } from "../models/post";
import * as PostsApi from "../network/posts_api";
import { PostInput } from "../network/posts_api";
import TextInput from "./form/TextInput";

interface AddPostProps {
  postToEdit?: Post;
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
 
}

const AddFeedback = ({
  onDismiss,
  onPostSaved,
  postToEdit,
 
}: AddPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    defaultValues: {
      title: postToEdit?.title || "",
      text: postToEdit?.text || "",
    },
  });

  async function onSubmit(input: PostInput) {
    try {
      let postResponse: Post;

      if (postToEdit) {
        input = {...input , approved :false }
        postResponse = await PostsApi.updatePostAdmin(postToEdit._id, input);
        onPostSaved(postResponse);
      } 

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
       
      </Modal.Header>
      <Modal.Body>
        <Form id="addFeedback" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="feedback"
            label="Feedback"
            type="text"
            placeholder="Add your feed back"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.feedback}
          />

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" form="addFeedback" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFeedback;
