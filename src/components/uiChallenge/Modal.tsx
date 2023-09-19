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
        <React.Fragment>
          <div css={dimCss} onClick={onClose} />
          <div css={containerCss}>
            <div css={headerCss}>
              <span css={modalTitleCss}>{title}</span>
              <button css={closeButtonCss} onClick={onClose}>
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div css={bodyCss}>{children}</div>
            <div css={footerCss}>
              {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
              <Button type="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const dimCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const containerCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 350px;
  height: 200px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
  z-index: 9001;
`;

const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  border-bottom: 1px solid lightgrey;
`;

const modalTitleCss = css`
  font-size: 20px;
`;

const closeButtonCss = css`
  padding: 0;
  background-color: transparent;
  border: none;
`;

const bodyCss = css`
  flex: 1;
  width: 100%;
  padding: 10px 16px;
`;

const footerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  border-top: 1px solid lightgrey;
`;
