import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Styles
import "./styles/reset.scss";
import "./styles/styles.scss";

// Add brands icons
library.add(fab);

App.render(<App />, ["contextmenu", "mousedown"]);
