import './app.css';
import CommentParent from './commentParent.tsx';

function App() {

  return (
    <>
      <div className={"title"}>
        David Yang's Comment Board for CIS-1962
      </div>
      <CommentParent showReply={true} depth={0}/>
    </>
  );
}

export default App;