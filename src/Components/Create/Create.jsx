import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import "./style.create.css";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/Notification/NotificationContext";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatchNotification } = useContext(NotificationContext);

  console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      return dispatchNotification({
        type: "SHOW_ERROR",
        payload: "All fields are mandatory!!",
      });
    }

    try {
      const resp = await addDoc(collection(db, "posts"), {
        // when I click on the submit button it is gonna create a new collection named  and inside this collectionn we are gonna create new document which has
        title: title,
        body: body,
        userId: currentUser?.uid || currentUser?.user?.uid, // second option is for google SignedIn users
        timeStamp: serverTimestamp(),
      });
      console.log(resp);
      setTitle("");
      setBody("");
      navigate("/");
      dispatchNotification({ type: "SHOW_SUCCESS", payload: "Post Created Successfully!" });
    } catch (err) {
      console.log(err);
      dispatchNotification({ type: "SHOW_ERROR", payload: "Error Creating Post!!" });
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
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
