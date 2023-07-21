import { Modal, Form, Button } from "react-bootstrap";
import { Post } from "../models/post";
import { useForm } from "react-hook-form";
import { PostInput } from "../network/posts_api";
import * as PostsApi from "../network/posts_api";

interface AddPostProps {
  postToEdit?: Post;
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
}

const AddEditPost = ({ onDismiss, onPostSaved, postToEdit }: AddPostProps) => {
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
        postResponse = await PostsApi.updatePost(postToEdit._id, input);
      } else {
        postResponse = await PostsApi.createPost(input);
      }

      onPostSaved(postResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss} >
      <Modal.Header>
        <Modal.Title>{postToEdit? "Edit Post" : "Add Post"}</Modal.Title>
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
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              isInvalid={!!errors.text}
              {...register("text", { required: "Required" })}
            />
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

export default AddEditPost;
