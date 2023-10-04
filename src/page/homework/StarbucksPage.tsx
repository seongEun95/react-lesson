/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Drink from '../../components/starbucks/Drink';
import mq from '../../style/mediaQuery';

export default function StarbucksPage() {
  const [drinkList, setDrinkList] = useState([]); // 데이터 빈 배열 상태
  const [loading, setLoading] = useState(true); // 데이터 불러올 때 로딩 중 상태

  useEffect(() => {
    // 두번째 파라미터 빈 배열, 처음 렌더링 될 때 실행
    fetch('../../../menuData.json') // 데이터 경로
      .then(res => res.json())
      .then(data => {
        setDrinkList(data.coldBrew);
        setLoading(false); // 데이터 통신이 종료되면 로딩창 상태 false
      })
      .catch(err => {
        console.dir(err);
      });
  }, []);

  return (
    <div>
      {loading ? ( // 데이터 통신이 종료되면 로딩 중 종료
        <div css={loadingCss}>
          <span>로딩중</span>
        </div>
      ) : null}

      {/* 상단 타이틀 영역 */}
      <div css={titleWrapCss}>
        <h1 css={titleCss}>콜드 브루 커피</h1>
        <p css={txtCss}>
          <img css={coffeeIconCss} src="/decaf.png" alt="디카페인 아이콘" />
          디카페인 에스프레소 샷추가 가능(일부 음료 제외)
        </p>
      </div>

      {/* 음료 리스트 영역 */}
      <ul css={drinkListWrapCss}>
        {drinkList.map(({ id, productNameKO, url, isNew }) => {
          return (
            <Drink
              key={id}
              id={id}
              productNameKO={productNameKO}
              url={url}
              isNew={isNew}
            />
          );
        })}
      </ul>
    </div>
  );
}

const titleWrapCss = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  background-color: #f1f1f1;

  ${mq.tablet} {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
`;

const titleCss = css`
  font-size: 18px;
  font-weight: 600;
`;

const txtCss = css`
  font-size: 14px;
  padding: 0px 0 0px 2px;
`;

const coffeeIconCss = css`
  display: inline-block;
  width: 46px;
  margin-right: 6px;
  vertical-align: -12px;
`;

const drinkListWrapCss = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  margin: 40px 0;

  ${mq.notebook} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${mq.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const loadingCss = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000079;
  color: #fff;
  z-index: 10;
`;
