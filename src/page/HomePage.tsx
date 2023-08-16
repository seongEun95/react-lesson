import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [userinput, setUserInput] = useState('');

  return (
    <>
      <div>homepage</div>
      <input
        name="input"
        value={userinput}
        onChange={e => setUserInput(e.target.value)}
      />
      <button onClick={() => navigate(`/nesting/children/${userinput}`)}>
        move to children 10
      </button>
      <Link to="/todoList">
        <div>go to todoList page</div>
      </Link>
    </>
  );
}
