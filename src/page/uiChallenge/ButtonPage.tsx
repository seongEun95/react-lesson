/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import ButtonChallenge from '../../components/uiChallComp/Button';

export default function ButtonPage() {
  const handleConsole = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    console.log(eventTarget.innerText);
  };

  return (
    <div css={buttonWrapCss}>
      {/* primary button */}
      <ButtonChallenge kind="primary" size="small" onClick={handleConsole}>
        Primary button
      </ButtonChallenge>

      {/* Secondary button */}
      <ButtonChallenge kind="secondary" size="medium" onClick={handleConsole}>
        Secondary button
      </ButtonChallenge>

      {/* Tertiary button */}
      <ButtonChallenge kind="teriary" size="large" onClick={handleConsole}>
        Tertiary button
      </ButtonChallenge>

      {/* Danger button */}
      <ButtonChallenge kind="danger" size="xlarge" onClick={handleConsole}>
        Danger button
      </ButtonChallenge>

      {/* Ghost button */}
      <ButtonChallenge kind="ghost" size="medium" onClick={handleConsole}>
        Ghost button
      </ButtonChallenge>

      {/* disabled button */}
      <ButtonChallenge disabled={true} onClick={handleConsole}>
        disabled
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
