import { Button, Card } from "react-bootstrap";
import { Post as PostModel } from "../models/post";
import { dateFormat } from "../utils/dateFormat";
import styles from "../styles/Post.module.css";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
import { Type } from "../models/user";
interface PostProps {
  post: PostModel;
  type: Type;
  onPostClicked:((post: PostModel) => void)|null;
  onDletePostClicked: ((post: PostModel) => void)|null;
  approve :  ((post: PostModel) => void)|null;
  reject :  ((post: PostModel) => void)|null;
  className?: string;
}


const Post = ({

  type,
  post,
  className,
  onDletePostClicked,
  onPostClicked,
  approve,
  reject,

}: PostProps) => {
  const { title, text, createdAt, updatedAt, approved ,feedback ,comments} = post;

  let updatedCreatedAt: string;
  if (updatedAt > createdAt) {
    updatedCreatedAt = "Updated : " + dateFormat(updatedAt);
  } else {
    updatedCreatedAt = "Created : " + dateFormat(createdAt);
  }
  const handleClick = () => {
    if (type === Type.MYPOSTS) {
      onPostClicked && onPostClicked(post);
    }
  };
  const handleApprove = () => {
    if (approve) {
      approve({...post , approved : true} );
      
    }
  };
  const handleReject = () => {
    
    reject && reject({...post , approved : false} )
  };
  return (
    <Card
      className={`${styles.postCard} ${className}`}
      onClick={() => handleClick()}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}

          {type === Type.MYPOSTS && (
            <MdDelete
              className="text-muted ms-auto"
              onClick={(e) => {
                onDletePostClicked && onDletePostClicked(post);
                e.stopPropagation();
              }}
            />
          )}
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Card.Text className={styles.cardText}>
         
          {type === Type.MYPOSTS && approved === null ? <>status : to Be approved</> : null}
          {type === Type.MYPOSTS && approved === true ? <>status : approved</> : null}
          {type === Type.MYPOSTS && approved === false ? <>status : rejected</> : null}
          {/* {type === Type.ALLPOSTS && comments.map((comment)=><p>{comment}</p>)} */}
        </Card.Text>
        <Card.Text className={styles.cardText}>
          {type === Type.MYPOSTS && approved === false ? <>feedback : {feedback} </>: null}
        </Card.Text>
        {type === Type.TOBEAPPROVED ?  <><Button variant="success" onClick={handleApprove}>Approve</Button> <Button variant="danger" onClick={handleReject}>Reject</Button> </>: null}
        {type === Type.ALLPOSTS &&  <><Button variant="outline-info" >Add Comment</Button> </>}
      </Card.Body>
      <Card.Footer className="text-muted">{updatedCreatedAt}</Card.Footer>
    </Card>
  );
};

export default Post;
