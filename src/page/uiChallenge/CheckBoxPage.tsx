/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import Checkbox from '../../components/uiChallenge/CheckBox';

export default function ButtonPage() {
  const handleConsole = (e: React.MouseEvent<HTMLInputElement>) => {
    const eventTarget = e.target as HTMLInputElement;
    console.log(eventTarget.checked);
  };

  return (
    <div css={checkBoxWrapCss}>
      <Checkbox kind="unselected" onClick={handleConsole}>
        Focus unselected
      </Checkbox>
      <Checkbox kind="selected" onClick={handleConsole}>
        Focus selected
      </Checkbox>
      <Checkbox kind="unselected" disabled={true} onClick={handleConsole}>
        Disabled unselected
      </Checkbox>
      <Checkbox kind="selected" disabled={true} onClick={handleConsole}>
        Disabled selected
      </Checkbox>
    </div>
  );
}

const checkBoxWrapCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  margin: 0 auto;
`;
