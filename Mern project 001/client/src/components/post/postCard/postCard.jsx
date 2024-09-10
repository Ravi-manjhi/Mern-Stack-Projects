import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import {
  Delete,
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { usePostContext } from "../../../context/postContext.js";
import {
  deleteReducer,
  fetchPost,
  likeReducer,
} from "../../../reducer/postReducer";
import { useDispatch } from "react-redux";
import "./postCard.css";

function PostCard({ post }) {
  const { setCurrentId, user } = usePostContext();
  const dispatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" /> &nbsp;{" "}
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1}ohter`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length}
          {post.likes.length === 1 ? "like" : "likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like
      </>
    );
  };

  return (
    <Card className="post__cards">
      <CardMedia className="media" image={post.selectedFile} title={post.title}>
        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="overlay2">
          {user?.result?._id === post?.creator && (
            <Button
              style={{ color: "white" }}
              size="small"
              title="Edit Post"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHoriz />
            </Button>
          )}
        </div>
      </CardMedia>
      <Typography className="title" variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <div className="tags">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((el, index) => `#${el} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <Button
          color="primary"
          size="small"
          title="Like"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likeReducer({ id: post._id }));
            setTimeout(() => {
              dispatch(fetchPost());
            }, 500);
          }}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            color="primary"
            size="small"
            title="Delete Post"
            onClick={() => {
              dispatch(deleteReducer({ id: post._id }));
              setTimeout(() => {
                dispatch(fetchPost());
              }, 500);
            }}
          >
            <Delete />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default PostCard;
