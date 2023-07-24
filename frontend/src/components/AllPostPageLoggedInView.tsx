import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Post as PostModel } from "../models/post";
import { Type } from "../models/user";
import * as PostsApi from "../network/posts_api";
import styles from "../styles/postPage.module.css";
import AddEditPost from "./AddEditPost";
import Post from "./Post";

const AllPostPageLoggedInView = () => {
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
            type={Type.ALLPOSTS}
            post={post}
            className={styles.post}
            onPostClicked={setPostToEdit}
            onDletePostClicked={null}
            approve={null}
            reject={null}
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
        const posts = await PostsApi.fetchApprovedPosts();
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

  

  return (
    <>
      
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
      
       
    </>
  );
};

export default AllPostPageLoggedInView;
