import React from 'react'
import { Container } from 'react-bootstrap'
import styles from "../styles/postPage.module.css";
import PostsPageLoggedInView from '../components/PostsPageLoggedInView';
import PostsPageLoggedOutView from '../components/PostsPageLoggedOutView';
import { Role, User } from '../models/user';
interface PostsPageProps{
    loggedInUser : User | null
}



const PostsPage = ({loggedInUser}:PostsPageProps) => {
  return (
    <Container className={styles.postsPage}>
    <>
      {loggedInUser?.roles === Role.USER &&loggedInUser ? (
        <PostsPageLoggedInView   />
      ) : (
        <PostsPageLoggedOutView />
      )}
    </>
    
  </Container>
  )
}

export default PostsPage