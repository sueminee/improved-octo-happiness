import React, { useState, useEffect, useRef } from 'react';
import PostItem from './PostItem'
import axios from 'axios';
import './PostList.scss';
import { imageUrlList, random, getPostsAPI } from "../constants";

const PostList = () => {
  const [initLoad, setInitLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState('list');
  const [itemNum, setItemNum] = useState('8');
  const [isRequest, setRequest] = useState(true);
  const itemWrapperRef = useRef();
  const maxCall = Math.ceil(100 / Number(itemNum));

  const getPost = () => {
    setRequest(true);
    return axios
      .get(getPostsAPI)
      .then(res => {
        const showPosts =
          res.data.length > 0
            ? res.data.slice(posts.length, Number(itemNum) * page)
            : [];
        setRequest(false);
        setPosts(posts.concat(showPosts));
      })
      .catch(err => console.log(err));
  }

  const scrolling = () => {
    const threshold = 50;
    const { scrollTop, scrollHeight, clientHeight } = itemWrapperRef.current;
    if (scrollHeight - scrollTop - clientHeight <= threshold) {
      if (!isRequest && page <= maxCall) {
        onMore();
      }
    }
  }

  useEffect(() => {
    if (initLoad) {
      const _itemNum = localStorage.getItem('itemNum');
      const _viewType = localStorage.getItem('viewType');
      if (_itemNum) {
        if (_viewType === 'grid') {
          setItemNum('16')
        } else {
          setItemNum(_itemNum)
        }
      };
      if (_viewType) setViewType(_viewType);
      setInitLoad(false);
    }
    getPost()
    return () => {
    }
  }, [itemNum, page])

  const onToggleView = () => {
    if(viewType === 'list') {
      localStorage.setItem('viewType', 'grid')
      setViewType('grid')
      setItemNum('16');
    } else {
      localStorage.setItem('viewType', 'list')
      setViewType('list')
    }
  };

  const onItemNumChange = () => {
    if(itemNum === '8') {
      localStorage.setItem('itemNum', '16')
      setItemNum('16');
    } else {
      localStorage.setItem('itemNum', '8')
      setItemNum('8');
    }
  }

  const onMore = () => {
    setPage(page + 1)
  };

  return (
    <div className="PostList">
      <div className="OptionWrapper">
        <div className="Option ViewType">
          포스트 보기 형식:{" "}
          {viewType === "list" ? "리스트 형식" : "그리드 형식"}
          <button className="viewBtn" onClick={onToggleView}>
            {viewType === "list"
              ? "그리드 형식으로 보기"
              : "리스트 형식으로 보기"}
          </button>
        </div>
        <div className="Option ItemNum">
          한번에 {itemNum}개씩 포스트를 가져옵니다.
          <button className="numBtn" onClick={onItemNumChange}>
            {itemNum === "8" ? "16개씩 가져오기" : "8개씩 가져오기"}
          </button>
        </div>
      </div>

      <div className="ItemWrapper" ref={itemWrapperRef} onScroll={scrolling}>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostItem
              post={post}
              viewType={viewType}
              image={imageUrlList[random()]}
            />
          ))
        ) : (
          <div className="NoPost">포스트가 존재하지 않습니다.</div>
        )}
        {isRequest && <p className="NoPost">"로딩중입니다..."</p>}
        {page > maxCall && (
          <p className="NoPost">"더이상 포스트가 없습니다."</p>
        )}
      </div>
    </div>
  );
}

export default PostList;