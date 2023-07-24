import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { Post as PostModel } from "../models/post";
import * as PostsApi from "../network/posts_api";
import styles from "../styles/postPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditPost from "./AddEditPost";
import Post from "./Post";
import { Type } from "../models/user";
import AddFeedback from "./AddFeedback";

const AllToBeApproved = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postToReject, setPostToReject] = useState<PostModel | null>(null);

  const [postLoading, setPostLoading] = useState(true);
  const [showPostsLoadingError, setShowPostsLoadingError] = useState(false);

  const gridPosts = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.postsGrid}`}>
      {posts.map((post) => (
        <Col key={post._id}>
          <Post
            type={Type.TOBEAPPROVED}
            post={post}
            className={styles.post}
            onPostClicked={null}
            onDletePostClicked={null}
            approve={approvePost}
            reject={setPostToReject}
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
        const posts = await PostsApi.fetchToBeApprovedPosts();
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
  async function approvePost(post: PostModel) {
    try {
      const postResponse = await PostsApi.updatePost(post._id, post);

      setPosts(
        posts.filter((existingPost) => existingPost._id !== postResponse._id)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  //   async function rejectPost(post: PostModel) {

  //     try {
  //         const postResponse = await PostsApi.updatePost(post._id ,post);

  //       setPosts(posts.filter((existingPost) => existingPost._id !== postResponse._id));

  //     } catch (error) {
  //       console.error(error);
  //       alert(error);
  //     }
  //   }

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
      {postToReject && (
        <AddFeedback
          postToEdit={postToReject}
          onDismiss={() => {
            setPostToReject(null);
          }}
          onPostSaved={(updatedPost) => {
           
            setPosts(posts.filter((existingPost) => existingPost._id !== updatedPost._id));
            setPostToReject(null);
           
          }}
         
        />
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
    </>
  );
};

export default AllToBeApproved;
