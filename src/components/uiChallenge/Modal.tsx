/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

interface ModalProps {
  isShow: boolean;
  title: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
}

export default function Modal({
  isShow,
  title,
  children,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <React.Fragment>
      {isShow && (
        <div css={ModalCss}>
          <div css={dimCss} onClick={onClose}>
            <div css={containerCss}>
              <div css={headerCss}>
                <span css={modalTitleCss}>{title}</span>
                <button onClick={onClose}>
                  <AiOutlineClose size={20} />
                </button>
              </div>
              <div css={bodyCss}>{children}</div>
              <div css={footerCss}>
                <Button onClick={onConfirm}>Confirm</Button>
                <Button type="secondary" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const ModalCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

const dimCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerCss = css`
  background-color: white;
  width: 300px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgrey;
`;

const headerCss = css`
  width: 100%;
  border-bottom: 1px solid lightgrey;
`;

const modalTitleCss = css``;

const bodyCss = css`
  width: 100%;
  flex: 1;
`;

const footerCss = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid lightgrey;
`;
