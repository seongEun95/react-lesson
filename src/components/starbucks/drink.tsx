/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface DrinkProps {
  id: number;
  productNameKO: string;
  url: string;
  isNew: string;
}

export default function Drink({ id, productNameKO, url, isNew }: DrinkProps) {
  const [like, setLike] = useState(false); // 좋아요 버튼 상태

  const handleLikeClickToggle = () => {
    setLike(!like); // 기존 false를 true
  };

  return (
    <li css={drinkListCss}>
      <div css={likeBtnWrapCss} onClick={() => handleLikeClickToggle()}>
        {like ? ( // 좋아요(하트) 버튼
          <AiFillHeart css={filledHeartCss} size={30} />
        ) : (
          <AiOutlineHeart size={30} />
        )}
      </div>

      {/* 상세페이지 이동 */}
      <Link to={`/homework/starbucksDetail/${id}`}>
        <div css={drinkImgWrapCss}>
          <img css={drinkImgCss} src={url} alt={productNameKO} />

          {isNew === 'Y' && ( // 새로운 음료라면 new 이미지 생성
            <img css={newMarkCss} src="../../../new_mark.png" alt="new" />
          )}
        </div>
        <p css={productNameCss}>{productNameKO}</p>
      </Link>
    </li>
  );
}

const drinkListCss = css`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const drinkImgWrapCss = css`
  position: relative;
  overflow: hidden;
`;

const drinkImgCss = css`
  width: 100%;
  max-width: 300px;
  transition: 0.3s;

  &:hover {
    transform: scale(1.08);
  }
`;

const productNameCss = css`
  font-size: 16px;
  margin-top: 14px;
  text-align: center;
`;

const newMarkCss = css`
  position: absolute;
  bottom: 14px;
  left: 14px;
`;

const likeBtnWrapCss = css`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
`;

const filledHeartCss = css`
  color: #c90000;
`;
