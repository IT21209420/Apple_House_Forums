import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Post as PostModel } from "../models/post";
import * as PostsApi from "../network/posts_api";
import styleUtils from "../styles/utils.module.css";
import AddEditPost from "./AddEditPost";
import Post from "./Post";
import styles from "../styles/postPage.module.css";

const PostsPageLoggedInView = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostModel | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [showPostsLoadingError, setShowPostsLoadingError] = useState(false);

  const gridPosts = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.postsGrid}`}>
      {posts.map((post) => (
        <Col key={post._id}>
          <Post
            post={post}
            className={styles.post}
            onPostClicked={setPostToEdit}
            onDletePostClicked={deletPost}
          />
        </Col>
      ))}
    </Row>
  );

  useEffect(() => {
    async function loadData() {
      try {
        setShowPostsLoadingError(false);
        setPostLoading(true);
        const posts = await PostsApi.fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error(error);
        setShowPostsLoadingError(true);
      } finally {
        setPostLoading(false);
      }
    }
    loadData();
  }, []);

  async function deletPost(post: PostModel) {
    try {
      await PostsApi.deletePost(post._id);
      setPosts(posts.filter((existingPost) => existingPost._id !== post._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowAddPost(true);
        }}
        className={`mb-4 ${styleUtils.blockCenter}`}
      >
        Add Post
      </Button>
      {postLoading && <Spinner animation="border" variant="primary" />}
      {showPostsLoadingError && <p>Something went wrong!.</p>}
      {!postLoading && !showPostsLoadingError && (
        <>{posts.length > 0 ? gridPosts : <p>Not any posts</p>}</>
      )}
      {showAddPost && (
        <AddEditPost
          onDismiss={() => {
            setShowAddPost(false);
          }}
          onPostSaved={(newPost) => {
            setPosts([...posts, newPost]);
            setShowAddPost(false);
          }}
        />
      )}
      {postToEdit && (
        <AddEditPost
          postToEdit={postToEdit}
          onDismiss={() => {
            setPostToEdit(null);
          }}
          onPostSaved={(updatedPost) => {
            setPosts(
              posts.map((existingPost) =>
                existingPost._id === updatedPost._id
                  ? updatedPost
                  : existingPost
              )
            );
            setPostToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default PostsPageLoggedInView;
