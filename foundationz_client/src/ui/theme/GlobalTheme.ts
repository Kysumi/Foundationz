import { ThemeType } from "grommet";
import { css } from "styled-components";

export const GlobalTheme: ThemeType = {
  global: {
    colors: {},
  },
  anchor: {
    extend: () => css`
      box-shadow: unset;
    `,
  },
};
