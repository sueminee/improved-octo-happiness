import React from 'react';
import { withRouter } from 'react-router-dom';
import './PostItem.scss'

const PostItem = ({ post, viewType, history, image}) => {
  

  return (
    <div className={viewType === 'list' ? 'PostItem' : 'PostItem Grid'}>
      <img src={image} alt="thumbnail" />
      <p className="ItemWriter"> by {post.userId}<sub> {post.id}</sub></p>
      <p className="ItemTitle">{post.title}</p>
      <p className="Description">{post.body}</p>
      <button
        type="button"
        onClick={() => history.push(`/detail/${post.id}`)}
      >
        포스트 전체 보기
      </button>
    </div>
  )
}
export default withRouter(PostItem);
