/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from '../../components/uiChallComp/Button';
import Input from '../../components/uiChallComp/Input';
import { useState, ChangeEvent, useEffect } from 'react';

export default function LoginPage() {
  // id값과 비밀번호값의 상태
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');

  // 조건에 따라 변경되는 메시지 상태
  const [idMessage, setIdMessage] = useState<string>('');
  const [pwMessage, setPwMessage] = useState<string>('');

  // id와 비밀번호 조건에 따라 인풋 스타일 상태
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  useEffect(() => {
    if (idValue.length < 5 && idValue.length >= 1) {
      setIdMessage('아이디 5자 이상 작성해주세요');
      setIdError(true);
    } else {
      setIdMessage('');
      setIdError(false);
    }
  }, [idValue]);

  useEffect(() => {
    if (pwValue.length < 5 && pwValue.length >= 1) {
      setPwMessage('비밀번호 5자 이상 작성해주세요');
      setPwError(true);
    } else {
      setPwMessage('');
      setPwError(false);
    }
  }, [pwValue]);

  // id값 체크
  const handleIdValue = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };

  // 비밀번호 체크
  const handlePwValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };

  // 엔터키 누르면 실행, Form 태그로 실행이 되지만 별도의 키다운 이벤트 함수 제작, isComposing === false로 해야 한글(조합문자 체크)오류를 방지할 수 있다.
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSubmit();
      console.log('Enter 키');
    } // 엔터키를 눌렀을 때 투두 추가 함수 실행
  };

  const handleSubmit = () => {
    if (idValue.length >= 5 && pwValue.length >= 5) {
      console.log({
        Id: idValue,
        Password: pwValue,
      });
    } else {
      console.log('조건 부적합');
    }
  };

  return (
    <div>
      <form
        css={loginWrapCss}
        onSubmit={event => {
          // 폼태그 동작 막기
          event?.preventDefault();
        }}
      >
        <h1 css={loginTitleCss}>login</h1>
        <div>
          <Input
            id="login_id"
            label="아이디"
            type="text"
            placeHolder="아이디를 입력하세요"
            message={idMessage}
            inputError={idError}
            handleKeyDown={handleKeyDownEnter}
            handleInputValueEvent={handleIdValue}
          />
          <Input
            id="password_id"
            label="비밀번호"
            type="password"
            placeHolder="비밀번호를 입력하세요"
            message={pwMessage}
            inputError={pwError}
            handleKeyDown={handleKeyDownEnter}
            handleInputValueEvent={handlePwValue}
          />
          <div>
            <ButtonChallenge onClick={handleSubmit} size="small">
              로그인
            </ButtonChallenge>
          </div>
        </div>
      </form>
    </div>
  );
}

const loginWrapCss = css`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 7px;
  text-align: center;
`;

const loginTitleCss = css`
  margin: 0 0 40px 0;
  font-size: 24px;
  text-align: center;
`;
