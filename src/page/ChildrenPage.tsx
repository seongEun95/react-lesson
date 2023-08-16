import { useParams } from 'react-router-dom';

export default function ChildrenPage() {
  const { id } = useParams();
  return <div>NestingPage-children/{id}</div>;
}
