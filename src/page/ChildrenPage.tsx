import { useParams } from 'react-router-dom';

export default function ChildrenPage() {
  const { id } = useParams();

  return (
    <>
      <h2>childeren page 입니다</h2>
      <div>nesting id : {id}</div>
    </>
  );
}
