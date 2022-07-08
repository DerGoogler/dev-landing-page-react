import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Dom as dom } from "googlers-tools";

// Styles
import "./styles/reset.scss";
import "./styles/styles.scss";

// Add brands icons
library.add(fab);

dom.preventer(["contextmenu", "mousedown"]);
dom.render(<App />, "app");
