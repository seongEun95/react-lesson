/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from '../../components/uiChallenge/Button';
import Input from '../../components/uiChallenge/TextInput';
import { useState, useEffect } from 'react';
import { rEmail } from '../../util/regexp';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  confirmModal,
  contentChangeModal,
  showModal,
  titleChangeModal,
} from '../../redux/slice/modalSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupUserInput, setSignupUserInput] = useState({
    id: { value: '', message: '' },
    pw: { value: '', message: '' },
  });

  const [loginUserInput, setLoginUserInput] = useState({
    id: { value: '', message: '' },
    pw: { value: '', message: '' },
  });

  // 회원가입 길이 0이상일 경우 message 빈값 처리
  useEffect(() => {
    if (signupUserInput.id.value.length > 0) {
      setSignupUserInput(prev => ({
        ...prev,
        id: { ...prev.id, message: '' },
      }));
    }
  }, [signupUserInput.id.value]);

  useEffect(() => {
    if (signupUserInput.pw.value.length > 0) {
      setSignupUserInput(prev => ({
        ...prev,
        pw: { ...prev.pw, message: '' },
      }));
    }
  }, [signupUserInput.pw.value]);

  // 로그인 길이가 0이상일 경우 message 빈값 처리
  useEffect(() => {
    if (loginUserInput.id.value.length > 0) {
      setLoginUserInput(prev => ({
        ...prev,
        id: { ...prev.id, message: '' },
      }));
    }
  }, [loginUserInput.id.value]);

  useEffect(() => {
    if (loginUserInput.pw.value.length > 0) {
      setLoginUserInput(prev => ({
        ...prev,
        pw: { ...prev.pw, message: '' },
      }));
    }
  }, [loginUserInput.pw.value]);

  // 회원가입 함수
  const handleClickSignup = () => {
    if (!rEmail.test(signupUserInput.id.value)) {
      return setSignupUserInput(prev => ({
        ...prev,
        id: { ...prev.id, message: '올바른 이메일 형식이 아닙니다.' },
      }));
    }

    axios
      .post('/signup', {
        email: signupUserInput.id.value,
        password: SHA256(signupUserInput.pw.value).toString(),
      })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          console.log('회원가입 완료');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 로그인 함수
  const handleClickLogin = () => {
    if (!rEmail.test(loginUserInput.id.value)) {
      return setLoginUserInput(prev => ({
        ...prev,
        id: { ...prev.id, message: '올바른 이메일 형식이 아닙니다.' },
      }));
    }

    axios
      .post('/signin', {
        email: loginUserInput.id.value,
        password: SHA256(loginUserInput.pw.value).toString(),
      })
      .then(res => {
        if (res.data.result.message === 'SUCCESS') {
          localStorage.setItem('ac', res.data.result.accessToken);
          console.log('로그인 완료');

          dispatch(
            confirmModal(() => {
              navigate('/todoList');
              dispatch(showModal(true));
            }),
          );

          dispatch(titleChangeModal('로그인 완료'));
          dispatch(contentChangeModal('로그인이 완료되었습니다.'));
          dispatch(showModal(true));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginUserInput(prev => ({ ...prev, [name]: { ...prev, value } }));
  };

  const handleChangeSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupUserInput(prev => ({ ...prev, [name]: { ...prev, value } }));
  };

  // 엔터키 누르면 실행, Form 태그로 실행이 되지만 별도의 키다운 이벤트 함수 제작, isComposing === false로 해야 한글(조합문자 체크)오류를 방지할 수 있다.
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleClickLogin();
    } // 엔터키를 눌렀을 때 투두 추가 함수 실행
  };

  return (
    <div>
      <div css={loginWrapCss}>
        <h1 css={loginTitleCss}>회원가입</h1>
        <div>
          <Input
            id="regis_id"
            name="id"
            value={signupUserInput.id.value}
            label="이메일"
            type="text"
            placeHolder="아이디를 입력하세요"
            message={signupUserInput.id.message}
            onChange={handleChangeSignupInput}
          />
          <Input
            id="regis_pw"
            name="pw"
            value={signupUserInput.pw.value}
            label="비밀번호"
            type="password"
            placeHolder="비밀번호를 입력하세요"
            message={signupUserInput.pw.message}
            onChange={handleChangeSignupInput}
          />
          <div>
            <ButtonChallenge onClick={handleClickSignup} size="small">
              회원가입
            </ButtonChallenge>
          </div>
        </div>
      </div>
      {/* 로그인 */}
      <div css={loginWrapCss}>
        <h1 css={loginTitleCss}>로그인</h1>
        <div>
          <Input
            id="login_id"
            name="id"
            value={loginUserInput.id.value}
            label="이메일"
            type="text"
            placeHolder="아이디를 입력하세요"
            message={loginUserInput.id.message}
            onKeyDown={handleKeyDownEnter}
            onChange={handleChangeInput}
          />
          <Input
            id="login_pw"
            name="pw"
            value={loginUserInput.pw.value}
            label="비밀번호"
            type="password"
            placeHolder="비밀번호를 입력하세요"
            message={loginUserInput.pw.message}
            onKeyDown={handleKeyDownEnter}
            onChange={handleChangeInput}
          />
          <div>
            <ButtonChallenge onClick={handleClickLogin} size="small">
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
