import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Button from '@mui/material/Button';

// Types for the props
type CommentInputProps = {
  addComment: (e: MouseEvent<HTMLButtonElement>) => void;
  nameText: string;
  setNameText: (name: string) => void;
  commentText: string;
  setCommentText: (comment: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({ addComment, nameText, setNameText, commentText, setCommentText }) => {
  return (
    <div className="addCommentBlurb">
    
      <input
        className='Input'
        type="text"
        value={nameText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNameText(e.target.value)}
        placeholder="Your name"
      />
      <input
        className='Input'
        type="text"
        value={commentText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
        placeholder="Your comment"
      />
      <Button variant="contained" onClick={addComment}>Add Comment</Button>
    </div>
  );
};

type SingleCommentProps = {
  nameText: string;
  commentText: string;
  depth: number;
};

type ReplyShowHideButtonProps = {
  showReply: boolean;
  setShowReply: (showReply: boolean) => void;
};


const ReplyShowHideButton: React.FC<ReplyShowHideButtonProps> = ({showReply, setShowReply}) => {
  return (
    <div>
      <Button variant="contained" onClick={() => setShowReply(!showReply)}>
        {showReply ? 'Hide Replies' : 'Show Replies'}
      </Button>
    </div>
  );
};

const UpvoteDownvoteCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <Button variant="contained" className="upvote" onClick={() => setCount(count + 1)}>+</Button>
      <div>{count}</div>
      <Button variant="contained" className="downvote" onClick={() => setCount(count - 1)}>-</Button>
    </div>
  );
};

const SingleComment: React.FC<SingleCommentProps> = ({nameText, commentText , depth}) => {
  const [showReply, setShowReply] = useState(false);
  return (
    <>
      <div className="singleComment">
        <div className="commentWords">{nameText}</div>
        <span className="commentWords">{commentText}</span>
        <UpvoteDownvoteCounter />
      </div>
      <div>
        {(depth < 2) && <ReplyShowHideButton showReply={showReply} setShowReply={setShowReply} />}
      </div>
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <CommentParent showReply={showReply} depth={depth+1}/>
        </div>

    </>
  );
};

type CommentParentProps = {
  showReply: boolean;
  depth: number;
}

const CommentParent: React.FC<CommentParentProps> = ({showReply, depth}) => {
  const [commentDisplay, setCommentDisplay] = useState<string[][]>([]);
  const [nameText, setNameText] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = () => {
    if (commentText !== '' && nameText !== '') {
      setCommentDisplay([...commentDisplay, [nameText, commentText]]);
      setCommentText('');
      setNameText('');
    }
  };

  return (
    <>
      <div className="input">
        {showReply && < CommentInput
          addComment={() => addComment()}
          nameText={nameText}
          setNameText={setNameText}
          commentText={commentText}
          setCommentText={setCommentText}
        />}
      </div>
      <div className="commentBoard" id={(depth+1).toString()}>
        {commentDisplay.map((nameCommentTuple, index) => (
          <SingleComment key={index} nameText={nameCommentTuple[0]} commentText={nameCommentTuple[1]} depth={depth} />
        ))}
      </div>
    </>
  );
};

export default CommentParent;
