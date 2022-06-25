import jss from "jss";
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

function set(style: any) {
  jss.setup(preset());
  jss.createStyleSheet(style).attach();
}

function themeSelector(themes: string) {
  switch (themes) {
    case "green-white":
      set(GreenWhite);
      break;
    case "grey-white":
      set(GreenWhite);
      break;
    case "indigo-white":
      set(IndigoWhite);
      break;
    case "red-black":
      set(RedBlack);
      break;
    case "red-white":
      set(RedWhite);
      break;
    case "white-blue":
      set(WhiteBlue);
      break;
    case "white-grey":
      set(WhiteGrey);
      break;
    case "white-indigo":
      set(WhiteIndigo);
      break;
    case "white-red":
      set(WhiteRed);
      break;
    case "yellow-black":
      set(YellowBlack);
      break;
    default:
      set(RedBlack);
      break;
  }
}

export default themeSelector;
