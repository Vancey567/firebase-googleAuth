import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { NotificationContext } from "../../context/Notification/NotificationContext";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./style.post.css";

const Post = ({ post, posts, setPosts }) => {
  const { dispatchNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, "posts", id));
      const remainingPosts = posts.filter(post => post.docId !== id);
      setPosts(remainingPosts);
      dispatchNotification({type: "SHOW_SUCCESS", payload: "Post Deleted Successfully!!"})
      navigate('/');
      console.log(`Post with ID ${id} deleted successfully!`);
    } catch (err) {
      console.error(`Error deleting post with ID ${id}:`, err);
    }
  };

  return (
    <div className="post-container" key={post.id}>
      <div className="post">
        <div className="post-details">
          <h4>Title: {post.title}</h4>
          <span>Body: {post.body}</span>
        </div>
        <div className="post-options">
          <Link to={`/post/update/${post.docId}`}>
            <span>{<EditIcon />}</span>
          </Link>
            <span onClick={() => handleDelete(post.docId)}>{<DeleteIcon />}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
