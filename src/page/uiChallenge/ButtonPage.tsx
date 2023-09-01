/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from '../../components/uiChallComp/buttonChallenge';

export default function ButtonPage() {
  const handleConsole = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    console.log(eventTarget.innerText);
  };

  return (
    <div css={buttonWrapCss}>
      {/* primary button */}
      <ButtonChallenge backgroundColor="#3567d3" onClick={handleConsole}>
        Primary button
      </ButtonChallenge>

      {/* Secondary button */}
      <ButtonChallenge backgroundColor="#484848" onClick={handleConsole}>
        Secondary button
      </ButtonChallenge>

      {/* Tertiary button */}
      <ButtonChallenge
        backgroundColor="#ffffff"
        color="#3567d3"
        border="1px solid #3567d3"
        onClick={handleConsole}
      >
        Tertiary button
      </ButtonChallenge>

      {/* Danger button */}
      <ButtonChallenge backgroundColor="#d32c2c" onClick={handleConsole}>
        Danger button
      </ButtonChallenge>

      {/* Ghost button */}
      <ButtonChallenge
        backgroundColor="#ffffff"
        color="#3567d3"
        onClick={handleConsole}
      >
        Ghost button
      </ButtonChallenge>
    </div>
  );
}

const buttonWrapCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  margin: 0 auto;
`;
