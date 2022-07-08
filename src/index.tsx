import { Dom as dom } from "googlers-tools";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import App from "./App";

// Styles
import "./styles/reset.scss";
import "./styles/styles.scss";

// Add brands icons
library.add(fab);

dom.preventer(["contextmenu", "mousedown"]);
dom.renderAuto(App);
