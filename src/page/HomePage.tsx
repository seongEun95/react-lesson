import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');

  return (
    <div>
      <h1>HomePage</h1>
      <input
        type="text"
        name="input"
        value={userInput}
        onChange={e => {
          setUserInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          navigate(`/nesting/children/${userInput}`);
        }}
      >
        자식 페이지로 이동
      </button>
      <div>this is homepage</div>
    </div>
  );
}
