/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SHA256 } from 'crypto-js';
import axios from 'axios';

import Title from '../components/common/Title';
import Column from '../components/common/Column';
import TextInput from '../components/uiChallenge/TextInput';
import Button from '../components/uiChallenge/Button';
import { rEmail } from '../util/reg';
import { setIsShowModal, setModal } from '../redux/slice/layoutSilce';
import { useNavigate } from 'react-router-dom';

export default function TextInputPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupUserInput, setSignupUserInput] = useState({
    id: { value: '', description: '' },
    pw: { value: '', description: '' },
  });

  const [userInput, setUserInput] = useState({
    id: { value: '', description: '' },
    pw: { value: '', description: '' },
  });

  // 인풋창 초기화
  useEffect(() => {
    if (userInput.id.value.length > 0)
      setUserInput(prev => ({ ...prev, id: { ...prev.id, description: '' } }));
  }, [userInput.id.value]);

  useEffect(() => {
    if (userInput.pw.value.length > 0)
      setUserInput(prev => ({ ...prev, pw: { ...prev.pw, description: '' } }));
  }, [userInput.pw.value]);

  useEffect(() => {
    if (signupUserInput.id.value.length > 0)
      setSignupUserInput(prev => ({
        ...prev,
        id: { ...prev.id, description: '' },
      }));
  }, [signupUserInput.id.value]);

  useEffect(() => {
    if (signupUserInput.pw.value.length > 0)
      setSignupUserInput(prev => ({
        ...prev,
        pw: { ...prev.pw, description: '' },
      }));
  }, [signupUserInput.pw.value]);

  // 이벤트 핸들러
  const handleClickSignup = () => {
    if (rEmail.test(signupUserInput.id.value) === false)
      return setSignupUserInput(prev => ({
        ...prev,
        id: { ...prev.id, description: '이메일 형식이 아닙니다' },
      }));

    axios
      .post('http://localhost:8000/signup', {
        email: signupUserInput.id.value,
        password: SHA256(signupUserInput.pw.value).toString(),
      })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          console.log('회원가입 완료!');
        }
      })
      .catch(err => console.error(err));
  };

  const hnadleClickLogin = () => {
    if (rEmail.test(userInput.id.value) === false)
      return setUserInput(prev => ({
        ...prev,
        id: { ...prev.id, description: '이메일 형식이 아닙니다' },
      }));

    axios
      .post('http://localhost:8000/signin', {
        email: userInput.id.value,
        password: SHA256(userInput.pw.value).toString(),
      })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          localStorage.setItem('ac', res.data.result.accessToken);
          console.log('로그인 완료!');

          return dispatch(
            setModal({
              title: '[로그인 성공]',
              content: '로그인에 성공하였습니다.',
              onConfirm: () => {
                dispatch(setIsShowModal(false));
                navigate('/service/todoList');
              },
            }),
          );
        }
      })
      .catch(err => console.error(err));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (userInput.id.value && userInput.pw.value && e.key === 'Enter') {
      hnadleClickLogin();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: { ...prev, value } }));
  };

  const handleChangeSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupUserInput(prev => ({ ...prev, [name]: { ...prev, value } }));
  };

  return (
    <div css={textInputPageCss}>
      <Column align="center" gap={20}>
        <Title>TextInput</Title>

        <div css={containerCss}>
          <Column gap={28} align="center">
            <h2 css={titleCss}>회원가입</h2>

            <Column gap={12}>
              <TextInput
                name="id"
                label="아이디"
                value={signupUserInput.id.value}
                // disabled
                placeholder="Email"
                description={signupUserInput.id.description}
                onChange={handleChangeSignupInput}
              />
              <TextInput
                name="pw"
                label="비밀번호"
                type="password"
                value={signupUserInput.pw.value}
                placeholder="Password"
                // disabled
                description={signupUserInput.pw.description}
                onChange={handleChangeSignupInput}
                onKeyDown={handleKeyDown}
              />
            </Column>

            <Button
              disabled={!signupUserInput.id.value || !signupUserInput.pw.value}
              onClick={handleClickSignup}
            >
              회원가입
            </Button>
          </Column>
        </div>
        <div css={containerCss}>
          <Column gap={28} align="center">
            <h2 css={titleCss}>로그인</h2>

            <Column gap={12}>
              <TextInput
                name="id"
                label="아이디"
                value={userInput.id.value}
                // disabled
                placeholder="Email"
                description={userInput.id.description}
                onChange={handleChangeInput}
              />
              <TextInput
                name="pw"
                label="비밀번호"
                type="password"
                value={userInput.pw.value}
                placeholder="Password"
                // disabled
                description={userInput.pw.description}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
              />
            </Column>

            <Button
              disabled={!userInput.id.value || !userInput.pw.value}
              onClick={hnadleClickLogin}
            >
              로그인
            </Button>
          </Column>
        </div>
      </Column>
    </div>
  );
}

const textInputPageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: yellowgreen;
`;

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 400px;
  height: 350px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const titleCss = css`
  font-size: 32px;
  font-weight: bold;
  color: #6b6969;
  margin: 0;
`;
