import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, addComment } from "../reducers/bloglistReducer";
import { notificationContent } from "../reducers/notiReducer";
import Typography from "../Typography";
import styled from "styled-components";

const BlogCover = styled.div`
  border: thin solid #ced097;
  border-radius: 20px;
  width: 300px;
  margin: 5px 0;
  background-color: #ced097;
`;

const LikeCover = styled.div`
  display: flex;
  align-items: center;
`;

const ContentCover = styled.div`
  padding-left: 10px;
`;

const CommentCover = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: thin solid black;
  outline: none;
`;

const SingleBlog = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const getBlogs = useSelector((state) => state.blogs);

  const getBlogIndex = getBlogs.findIndex((item) => item.id === id);
  if (!getBlogs[getBlogIndex]) {
    return null;
  }

  const updateLikes = () => {
    dispatch(likeBlog(getBlogs[getBlogIndex].id, getBlogs[getBlogIndex]));
    dispatch(
      notificationContent(
        `Blog "${getBlogs[getBlogIndex].title}" has been updated successfully!`,
        5
      )
    );
  };

  const handleAddComment = async () => {
    dispatch(addComment(getBlogs[getBlogIndex].id, comment));
    dispatch(notificationContent(`You commented successfully!`, 5));

    setComment("");
  };

  const { title, url, likes, author, comments } = getBlogs[getBlogIndex];
  return (
    <div>
      <BlogCover>
        <h2 style={{ textAlign: "center", margin: "5px 0" }}>{title}</h2>
        <ContentCover>
          <a href={url}>{url}</a>
          <LikeCover>
            {likes} likes
            <Typography buttonType="like" onClick={updateLikes}>
              Like
            </Typography>
          </LikeCover>
          <p>Added by {author}</p>
        </ContentCover>
      </BlogCover>

      <p>
        <strong>Comments</strong>
      </p>
      <CommentCover>
        <CommentInput
          id="comment"
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
          placeholder="Comment..."
        />
        <Typography buttonType="add-comment" onClick={handleAddComment}>
          add comment
        </Typography>
      </CommentCover>
      {comments &&
        comments.map((item, index) => (
          <li key={item + index} style={{ paddingLeft: 20 }}>
            {item}
          </li>
        ))}
    </div>
  );
};

export default SingleBlog;
