import { Modal, Form, Button } from "react-bootstrap";
import { Post } from "../models/post";
import { useForm } from "react-hook-form";
import { PostInput } from "../network/posts_api";
import * as PostsApi from "../network/posts_api";
import TextInput from "./form/TextInput";
import { Role, Type } from "../models/user";

interface AddPostProps {
  postToEdit?: Post;
  onDismiss: () => void;
  onPostSaved: (post: Post) => void;
  type?: Type;
}

const AddEditPost = ({
  onDismiss,
  onPostSaved,
  postToEdit,
  type,
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
        postResponse = await PostsApi.updatePost(postToEdit._id, input);
      } else {
        console.log(type)
        if (type === Type.TOBEAPPROVED) {
          postResponse = await PostsApi.createPost({
            ...input,
            approved : true,
          });
        } else {
          postResponse = await PostsApi.createPost(input);
        }
      }

      onPostSaved(postResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{postToEdit ? "Edit Post" : "Add Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addPostForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInput
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" form="addPostForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditPost;
