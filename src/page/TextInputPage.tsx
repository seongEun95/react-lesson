/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';

import Title from '../components/common/Title';
import Column from '../components/common/Column';
import TextInput from '../components/uiChallenge/TextInput';
import Button from '../components/uiChallenge/Button';
import { rEmail } from '../util/reg';

export default function TextInputPage() {
  const [{ id, pw }, serUserInput] = useState({
    id: { value: '', description: '' },
    pw: { value: '', description: '' },
  });

  useEffect(() => {
    if (id.value.length > 0)
      serUserInput(prev => ({ ...prev, id: { ...prev.id, description: '' } }));
  }, [id.value]);

  useEffect(() => {
    if (pw.value.length > 0)
      serUserInput(prev => ({ ...prev, pw: { ...prev.pw, description: '' } }));
  }, [pw.value]);

  const hnadleClickLogin = () => {
    console.log(id.value, pw.value);

    if (id.value === '')
      return serUserInput(prev => ({
        ...prev,
        id: { ...prev.id, description: '아이디를 입력해주세요' },
      }));

    if (pw.value === '')
      return serUserInput(prev => ({
        ...prev,
        pw: { ...prev.pw, description: '비밀번호를 입력해주세요' },
      }));

    if (rEmail.test(id.value) === false)
      return serUserInput(prev => ({
        ...prev,
        id: { ...prev.id, description: '이메일 형식이 아닙니다' },
      }));

    if (pw.value.length < 4)
      return serUserInput(prev => ({
        ...prev,
        pw: { ...prev.pw, description: '비밀번호가 잘못되었습니다.' },
      }));

    alert('로그인 성공');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      hnadleClickLogin();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    serUserInput(prev => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  return (
    <div css={textInputPageCss}>
      <Column align="center" gap={20}>
        <Title>TextInput</Title>

        <div css={containerCss}>
          <Column gap={28} align="center">
            <h2 css={titleCss}>Login</h2>

            <Column gap={12}>
              <TextInput
                name="id"
                label="아이디"
                value={id.value}
                // disabled
                placeholder="Email"
                description={id.description}
                onChange={handleInputChange}
              />
              <TextInput
                name="pw"
                label="비밀번호"
                type="password"
                value={pw.value}
                placeholder="Password"
                // disabled
                description={pw.description}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </Column>

            <Button onClick={hnadleClickLogin}>로그인</Button>
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
