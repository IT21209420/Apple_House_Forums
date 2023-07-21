import { Card } from "react-bootstrap";
import { Post as PostModel } from "../models/post";
import { dateFormat } from "../utils/dateFormat";
import styles from "../styles/Post.module.css";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
interface PostProps {
  post: PostModel;
  onPostClicked : (post :PostModel) =>void 
  onDletePostClicked: (post: PostModel) => void;
  className?: string;
}

const Post = ({ post, className, onDletePostClicked,onPostClicked }: PostProps) => {
  const { title, text, createdAt, updatedAt } = post;

  let updatedCreatedAt: string;
  if (updatedAt > createdAt) {
    updatedCreatedAt = "Updated : " + dateFormat(updatedAt);
  } else {
    updatedCreatedAt = "Created : " + dateFormat(createdAt);
  }
  return (
    <Card className={`${styles.postCard} ${className}`} onClick={()=>onPostClicked(post)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDletePostClicked(post);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{updatedCreatedAt}</Card.Footer>
    </Card>
  );
};

export default Post;
