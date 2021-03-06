// styled-components.ts
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface IThemeInterface {
  blueColor: string;
  greyColor: string;
  yellowColor: string;
  greenColor: string;
  orangeColor: string;
  smallFontSize: string;
  redColor: string;
  lightBlueColor: string;
  pinkColor: string;
  purpleColor: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
