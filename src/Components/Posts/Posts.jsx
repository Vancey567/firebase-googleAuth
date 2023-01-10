import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs, setDoc, addDoc } from "firebase/firestore";

import Post from "../Post/Post";
import "./style.posts.css";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          list.push({ docId: doc.id, ...doc.data() });
        });
        setPosts(list);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  return (
    <div className="container">
      <Link to="/create">
        <div className="new-post">
          Create Post
        </div>
      </Link>
      <div className="posts">
        {posts.map((post) => {
          return (<>
            <Post post={post} posts={posts} setPosts={setPosts} />;
          </>)
        })}
      </div>
    </div>
  );
};

export default Posts;
