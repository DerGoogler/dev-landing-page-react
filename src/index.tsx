import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Styles
import "./styles/reset.scss";
import "./styles/styles.scss";
import { _decode, _encode } from "bota64/lib/cjs/core";

// Add brands icons
library.add(fab);

console.log(_decode("𐓋𑫗𑁈𑫆𑫅𑁈𑫋𑫄𑫅𑫓𑁈𑫌𑫄𑁈𑀭]"));
App.render(<App />, ["contextmenu", "mousedown"]);
