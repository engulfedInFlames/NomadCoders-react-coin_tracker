import "styled-components";

declare module "styled-components" {
  export interface IThemeProps {
    bgColor: string;
    textColor: string;
    focusedColor: string;
    itemBgColor: string;
    btnColor: string;
    btnClickedColor: string;
  }
}
