/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from '../../components/uiChallComp/Button';
import Input from '../../components/uiChallComp/Input';
import { useState, ChangeEvent, useEffect } from 'react';

export default function LoginPage() {
  // id값과 비밀번호값의 상태
  // const [idValue, setIdValue] = useState<string>('');
  // const [pwValue, setPwValue] = useState<string>('');

  // 조건에 따라 변경되는 메시지 상태
  // const [idMessage, setIdMessage] = useState<string>('');
  // const [pwMessage, setPwMessage] = useState<string>('');

  // id와 비밀번호 조건에 따라 인풋 스타일 상태
  // const [idError, setIdError] = useState(false);
  // const [pwError, setPwError] = useState(false);

  const [userInput, setUserInput] = useState({
    id: { value: '', message: '', isError: false },
    pw: { value: '', message: '', isError: false },
  });

  useEffect(() => {
    if (userInput.id.value.length < 5 && userInput.id.value.length >= 1) {
      setUserInput(prev => ({
        ...prev,
        id: {
          value: userInput.id.value,
          message: '아이디를 5글자 이상 작성해주세요',
          isError: true,
        },
      }));
    } else {
      setUserInput(prev => ({
        ...prev,
        id: {
          value: userInput.id.value,
          message: '',
          isError: false,
        },
      }));
    }
  }, [userInput.id.value]);

  useEffect(() => {
    if (userInput.pw.value.length < 5 && userInput.pw.value.length >= 1) {
      setUserInput(prev => ({
        ...prev,
        pw: {
          value: userInput.pw.value,
          message: '비밀번호를 5글자 이상 작성해주세요',
          isError: true,
        },
      }));
    } else {
      setUserInput(prev => ({
        ...prev,
        pw: {
          value: userInput.pw.value,
          message: '',
          isError: false,
        },
      }));
    }
  }, [userInput.pw.value]);

  // id값 체크
  const handleIdValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(prev => ({
      ...prev,
      id: {
        isError: userInput.id.isError, // 알수없음
        message: userInput.id.message,
        value: e.target.value,
      },
    }));
  };
  console.log(userInput);

  // 비밀번호 체크
  const handlePwValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(prev => ({
      ...prev,
      pw: {
        isError: prev.pw.isError,
        message: prev.pw.message,
        value: e.target.value,
      },
    }));
  };

  // 엔터키 누르면 실행, Form 태그로 실행이 되지만 별도의 키다운 이벤트 함수 제작, isComposing === false로 해야 한글(조합문자 체크)오류를 방지할 수 있다.
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSubmit();
      console.log('Enter 키');
    } // 엔터키를 눌렀을 때 투두 추가 함수 실행
  };

  const handleSubmit = () => {
    if (userInput.id.value.length >= 5 && userInput.pw.value.length >= 5) {
      console.log({
        id: userInput.id.value,
        pw: userInput.pw.value,
      });
    } else {
      console.log('조건 부적합');
    }
  };

  return (
    <div>
      <div css={loginWrapCss}>
        <h1 css={loginTitleCss}>login</h1>
        <div>
          <Input
            id="login_id"
            label="아이디"
            type="text"
            placeHolder="아이디를 입력하세요"
            message={userInput.id.message}
            inputError={userInput.id.isError}
            handleKeyDown={handleKeyDownEnter}
            handleGetValue={handleIdValue}
          />
          <Input
            id="password_id"
            label="비밀번호"
            type="password"
            placeHolder="비밀번호를 입력하세요"
            message={userInput.pw.message}
            inputError={userInput.pw.isError}
            handleKeyDown={handleKeyDownEnter}
            handleGetValue={handlePwValue}
          />
          <div>
            <ButtonChallenge onClick={handleSubmit} size="small">
              로그인
            </ButtonChallenge>
          </div>
        </div>
      </div>
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
