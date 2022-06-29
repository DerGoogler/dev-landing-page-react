import jss, { Styles } from "jss";
import preset from "jss-preset-default";
import { GreenWhite } from "../styles/themes/green-white";
import { IndigoWhite } from "../styles/themes/indigo-white";
import { RedBlack } from "../styles/themes/red-black";
import { RedWhite } from "../styles/themes/red-white";
import { WhiteBlue } from "../styles/themes/white-blue";
import { WhiteGrey } from "../styles/themes/white-grey";
import { WhiteIndigo } from "../styles/themes/white-indigo";
import { WhiteRed } from "../styles/themes/white-red";
import { YellowBlack } from "../styles/themes/yellow-black";

export type ThemeType<Name extends string = string> = {
  [P in keyof Styles<Name, any, undefined>]?:
    | Styles<Name, any, undefined>[P]
    | undefined;
};

export interface Themes_ {
  GreenWhite: string;
  GrayWhite: string;
  IndigoWhite: string;
  RedBlack: string;
  RedWhite: string;
  WhiteBlue: string;
  WhiteGrey: string;
  WhiteIndigo: string;
  WhiteRed: string;
  YellowBlack: string;
}

export const Themes: Themes_ = {
  GreenWhite: "green-white",
  GrayWhite: "grey-white",
  IndigoWhite: "indigo-white",
  RedBlack: "red-black",
  RedWhite: "red-white",
  WhiteBlue: "white-blue",
  WhiteGrey: "white-grey",
  WhiteIndigo: "white-indigo",
  WhiteRed: "white-red",
  YellowBlack: "yellow-black",
};

class ThemeSelector {
  public constructor(theme: string | undefined) {
    switch (theme) {
      case Themes.GreenWhite:
        this.useTheme(GreenWhite);
        break;
      case Themes.GreenWhite:
        this.useTheme(GreenWhite);
        break;
      case Themes.IndigoWhite:
        this.useTheme(IndigoWhite);
        break;
      case Themes.RedBlack:
        this.useTheme(RedBlack);
        break;
      case Themes.RedWhite:
        this.useTheme(RedWhite);
        break;
      case Themes.WhiteBlue:
        this.useTheme(WhiteBlue);
        break;
      case Themes.WhiteGrey:
        this.useTheme(WhiteGrey);
        break;
      case Themes.WhiteIndigo:
        this.useTheme(WhiteIndigo);
        break;
      case Themes.WhiteRed:
        this.useTheme(WhiteRed);
        break;
      case Themes.YellowBlack:
        this.useTheme(YellowBlack);
        break;
      default:
        console.log("Unknown theme: " + theme);
        this.useTheme(RedBlack);
        break;
    }
  }

  private useTheme(style: ThemeType) {
    jss.setup(preset());
    jss.createStyleSheet(style).attach();
  }
}

export default ThemeSelector;
