import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

import "./style.update.css";
import { db } from "../../firebase";
import { NotificationContext } from "../../context/Notification/NotificationContext";

const Update = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const { docId } = useParams();
  const {dispatchNotification} = useContext(NotificationContext);

  useEffect(() => {
    const getData = async () => {
        const docRef = doc(db, "posts", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const post = docSnap.data();
          setTitle(post.title);
          setBody(post.body);
        } else {
          console.log("No such document!");
        }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      return dispatchNotification({type: "SHOW_ERROR", payload: "All fields are required!!"});
    }

    try {
      await setDoc(doc(db, "posts", docId), {
        title: title,
        body: body,
      });
      dispatchNotification({type: "SHOW_SUCCESS", payload: "Post Updated successfully!!"});
      setTitle("");
      setBody("");
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatchNotification({type: "SHOW_ERROR", payload: "Error updating post!!"});
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
          <label htmlFor="body">Body:</label>
          <textarea
            type="text"
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter the Body"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
