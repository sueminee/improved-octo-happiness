import React from 'react';

const Comment = ({ comment: { id, name, email, body}}) => {
  return (
    <div className="Comment">
      {body}
      <span className="Writer">
          ___ By
        <strong> {name} </strong>
        <i>( {email} )</i>
        <sup> {id} </sup>
      </span>
    </div>
  )
}

export default Comment;
