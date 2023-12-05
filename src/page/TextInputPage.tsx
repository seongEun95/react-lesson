/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';

import Title from '../components/common/Title';
import Column from '../components/common/Column';
import TextInput from '../components/uiChallenge/TextInput';
import Button from '../components/uiChallenge/Button';
import { rEmail } from '../util/reg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SHA256 } from 'crypto-js';

export default function TextInputPage() {
  console.log(SHA256('test').toString());

  const [signupUserInput, setSignupUserInput] = useState({
    id: { value: '', description: '' },
    pw: { value: '', description: '' },
  });

  const [{ id, pw }, setUserInput] = useState({
    id: { value: '', description: '' },
    pw: { value: '', description: '' },
  });

  useEffect(() => {
    // if (id.value.length > 0)
    // setUserInput(prev => ({ ...prev, id: { ...prev.id, description: '' } }));
  }, [id.value]);

  useEffect(() => {
    // if (pw.value.length > 0)
    // setUserInput(prev => ({ ...prev, pw: { ...prev.pw, description: '' } }));
  }, [pw.value]);

  const dispatch = useDispatch();

  const handleClickSignup = () => {
    // email 유효성검사

    axios
      .post('http://localhost:8000/signup', {
        email: signupUserInput.id,
        password: SHA256(signupUserInput.pw.value),
      })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          console.log('회원가입 완료!');
        }
      })
      .catch(err => console.error(err));
  };

  const hnadleClickLogin = () => {
    // if (rEmail.test(id.value) === false)
    //   return setUserInput(prev => ({
    //     ...prev,
    //     id: { ...prev.id, description: '이메일 형식이 아닙니다' },
    //   }));

    // if (pw.value.length < 4)
    //   return setUserInput(prev => ({
    //     ...prev,
    //     pw: { ...prev.pw, description: '비밀번호가 잘못되었습니다.' },
    //   }));

    if (!rEmail.test(id.value)) {
      console.log('이메일 양식이 잘못되었습니다.');
    }

    axios
      .post('http://localhost:8000/signin', { email: id, password: pw })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          localStorage.setItem('ac', res.data.result.accessToken);
          console.log('로그인 완료!');
        }
      })
      .catch(err => console.error(err));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (id.value && pw.value && e.key === 'Enter') {
    //   hnadleClickLogin();
    // }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupUserInput(prev => ({ ...prev, [name]: value }));
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
              // disabled={!signupUserInput.id.value || !signupUserInput.pw.value}
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
                value={id.value}
                // disabled
                placeholder="Email"
                description={id.description}
                onChange={handleChangeInput}
              />
              <TextInput
                name="pw"
                label="비밀번호"
                type="password"
                value={pw.value}
                placeholder="Password"
                // disabled
                description={pw.description}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
              />
            </Column>

            <Button
              // disabled={!id.value || !pw.value}
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
