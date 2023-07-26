import { Container } from 'react-bootstrap';
import AllPostPageLoggedInView from '../components/AllPostPageLoggedInView';
import PostsPageLoggedOutView from '../components/PostsPageLoggedOutView';
import { User } from '../models/user';
import styles from "../styles/postPage.module.css";

interface PostsPageProps{
  loggedInUser : User | null
}

const AllPostsPage = ({loggedInUser}:PostsPageProps) => {
  return (
    <Container className={styles.postsPage}>
    <>
      {loggedInUser ? (
        <AllPostPageLoggedInView   />
      ) : (
        <PostsPageLoggedOutView />
      )}
    </>
    
  </Container>
  )
}

export default AllPostsPage







