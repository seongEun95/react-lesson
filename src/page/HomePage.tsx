/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Title from '../components/common/Title';
import SubTitle from '../components/common/SubTitle';

export default function HomePage() {
  // const navigate = useNavigate();
  // const [userinput, setUserInput] = useState('');

  return (
    <div css={homepageCss}>
      <Title>React Lesson</Title>
      {/* <input
        name="input"
        value={userinput}
        onChange={e => setUserInput(e.target.value)}
      />
      <button onClick={() => navigate(`/nesting/children/${userinput}`)}>
        move to children 10
      </button> */}
      <SubTitle>Service</SubTitle>
      <Link to="/service/todoList">
        <div>TodoList</div>
      </Link>
      <SubTitle>UI Challenge</SubTitle>
      <Link to="/uiChallenge/button">
        <div>Button</div>
      </Link>
      <SubTitle>Practice</SubTitle>
      <Link to="/draft">
        <div>Draft</div>
      </Link>
    </div>
  );
}

const homepageCss = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
