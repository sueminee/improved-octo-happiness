import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import Comment from './Comment';
import { getPostsAPI, getCommentsAPI } from "../constants";
import './PostDetail.scss';

const PostDetail = ({match}) => {

  const [content, setContent] = useState([{}]);
  const [comments, setComments] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true); 

  
  const getContent = () =>
    axios.get(`${getPostsAPI}/${match.params.id}`)
      .then(res => {
        setContentLoading(false);
        setContent(res.data);
      })
      .catch(err => {
        setContentLoading(false);
        alert('콘텐츠를 불러오지 못했습니다.');
        console.log(err);
      })

  const getComments = () =>
    axios
      .get(`${getCommentsAPI}${match.params.id}`)
      .then(res => {
        // id 내림차순으로 (최신순정렬)
        setCommentsLoading(false);
        const sortedComments = res.data.sort((a, b) => b.id - a.id);
        setComments(sortedComments);
      })
      .catch(err => {
        setCommentsLoading(false);
        alert("댓글을 불러오지 못했습니다.");
        console.log(err);
      });

  useEffect(() => {
    getContent()
    getComments()
  }, [])

  return (
    <div className="PostDetail">
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.body} />
      </Helmet>
      <div className="Content">
        {contentLoading
          ?
            <div className="NoComments">"로딩중입니다..."</div>
          :
            <Fragment>
              <h2>
                <strong>{content.title}</strong><span className="Writer"><i> ___ By {content.userId}</i> <sup>[{content.id}]</sup></span>
              </h2>
              <p>
                {content.body}
              </p>
            </Fragment> 
          }
      </div>
      <div className="CommentWrapper">
        <h3>Comments</h3>
        {commentsLoading
          ?
            <div className="NoComments">"로딩중입니다..."</div>
          :
            comments.length > 0
            ? comments.map(comment => <Comment comment={comment} />)
            : <div className="NoComments">"댓글이 없습니다."</div>
        }
      </div>
    </div>
   
  )
}

export default PostDetail;
