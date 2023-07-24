import { Container } from "react-bootstrap";
import AllToBeApproved from "../components/AllToBeApproved";
import PostsPageLoggedOutView from "../components/PostsPageLoggedOutView";
import { Role, User } from "../models/user";
import styles from "../styles/postPage.module.css";

interface PostsPageProps {
  loggedInUser: User | null;
}

const ToBeApprovedPosts = ({ loggedInUser }: PostsPageProps) => {
  return (
    <Container className={styles.postsPage}>
      <>{loggedInUser?.roles === Role.ADMIN && loggedInUser ? <AllToBeApproved /> : <PostsPageLoggedOutView />}</>
    </Container>
  );
};

export default ToBeApprovedPosts;
