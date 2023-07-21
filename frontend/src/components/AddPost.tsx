import { Modal, Form, Button } from "react-bootstrap";
import { Post } from "../models/post";
import { useForm } from "react-hook-form";
import { PostInput } from "../network/posts_api";
import * as PostsApi from "../network/posts_api";

interface AddPostProps {
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
}

const AddPost = ({ onDismiss, onPostSaved }: AddPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>();

  async function onSubmit(input: PostInput) {

    try {
      const postResponse = await PostsApi.createPost(input);
      onPostSaved(postResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addPostForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" isInvalid={!!errors.text}{...register("text", { required: "Required" })} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addPostForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPost;
