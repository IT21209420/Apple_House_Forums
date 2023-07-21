import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import * as PostsApi from "./network/posts_api";
import { Post as PostModel } from "./models/post";
import Post from "./components/Post";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/postPage.module.css";
import styleUtils from "./styles/utils.module.css";
import AddEditPost from "./components/AddEditPost";

function App() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostModel | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const posts = await PostsApi.fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error(error);
        alert(error);
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
    <Container>
      <Button
        onClick={() => {
          setShowAddPost(true);
        }}
        className={`mb-4 ${styleUtils.blockCenter}`}
      >
        Add Post
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
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
    </Container>
  );
}

export default App;
