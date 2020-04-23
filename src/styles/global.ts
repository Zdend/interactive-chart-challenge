import { css } from '@emotion/core';
import { COLORS } from '../shared/theme';

export const globalStyles = css`
  body {
    font-size: 16px;
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
  }

  ${Object.entries(COLORS).map(([name, variants]) => {
    return `
      .${name.toLocaleLowerCase()}--text {
        color: ${variants[5]};
      }
    `;
  })}

`;
