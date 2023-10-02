/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface DrinkDetailProps {
  id: number;
  productNameKO: string;
  url: string;
  content: string;
  kcal: string;
  satFat: string;
  protein: string;
  sodium: string;
  caffeine: string;
  fat: string;
}

export default function StarbucksDetailpage() {
  const [drinkList, setDrinkList] = useState([]);
  const { drinkId } = useParams(); // 주소 파라미터 drinkId 가져오기

  const getDrinkData = () => {
    fetch('../../../menuData.json')
      .then(res => res.json())
      .then(data => {
        // 필터함수를 이용하여 주소 파라미터의 id(drinkId)와 데이터의 id가 동일한 객체요소를 반환
        const filteredData = data.coldBrew.filter(
          ({ id }: DrinkDetailProps) => {
            return id === Number(drinkId);
          },
        );
        setDrinkList(filteredData);
      });
  };

  useEffect(() => {
    getDrinkData(); // 렌더 시 1회 실행
  }, []);

  return (
    <div>
      <div>
        {drinkList.map(
          ({
            id,
            productNameKO,
            content,
            url,
            caffeine,
            fat,
            kcal,
            protein,
            satFat, // 포화지방
            sodium, // 나트륨
          }: DrinkDetailProps) => {
            return (
              <div key={id} css={drinkDetailWrapCss}>
                {/* 음료 이미지 영역 */}
                <img css={drinkImgCss} src={url} alt={productNameKO} />

                <div>
                  {/* 상단 제목 영역 */}
                  <div>
                    <h1 css={drinkTitleCss}>{productNameKO}</h1>
                    <p css={drinkContentCss}>{content}</p>
                  </div>

                  {/* 제품 영양 영역 */}
                  <div>
                    <h2 css={drinkInfoTitleCss}>제품영양정보</h2>
                    <ul css={drinkInfoDetailCss}>
                      <li>
                        <span>1회 제공량 &#40;kcal&#41;</span>
                        <span>{kcal}</span>
                      </li>
                      <li>
                        <span>나트륨 &#40;mg&#41;</span>
                        <span>{sodium}</span>
                      </li>
                      <li>
                        <span>포화지방 &#40;g&#41;</span>
                        <span>{satFat}</span>
                      </li>
                      <li>
                        <span>지방 &#40;g&#41;</span>
                        <span>{fat}</span>
                      </li>
                      <li>
                        <span>단백질 &#40;g&#41;</span>
                        <span>{protein}</span>
                      </li>
                      <li>
                        <span>카페인 &#40;mg&#41;</span>
                        <span>{caffeine}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

const breakpoints = [576, 768, 991, 1200];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

const drinkImgCss = css`
  width: 100%;
  max-width: 500px;
`;

const drinkDetailWrapCss = css`
  display: flex;
  gap: 40px;

  ${mq[2]} {
    flex-direction: column;
  }
`;

const drinkTitleCss = css`
  font-size: 32px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #ddd;
`;

const drinkInfoTitleCss = css`
  font-size: 20px;
  margin: 40px 0 30px;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const drinkContentCss = css`
  font-size: 16px;
  line-height: 1.5;
`;

const drinkInfoDetailCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  li {
    display: flex;
    justify-content: space-between;
  }
`;
