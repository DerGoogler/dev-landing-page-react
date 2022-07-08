import { addListener, launch } from "devtools-detector";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Component, ComponentClass } from "react";
import { browsers } from "./util/browsers";
import { Themes, Themes_, ThemeType } from "./util/themeSelector";
import { _decode, _encode } from "bota64/lib/cjs/core";
import { fullBrowserVersion, getUA, osName, osVersion } from "react-device-detect";
import { Dom, Link } from "googlers-tools";
import LinkIcon from "./components/LinkIcon";
import LinkWrapper from "./components/LinkWrapper";
import scriptjs from "scriptjs";
import ThemeSelector from "./util/themeSelector";
import InternalLogger from "googlers-tools/dist/internal/Logger";
import axios from "axios";
import yaml from "js-yaml";

interface States {
  intro?: string;
  tagline?: string;
  theme?: string | ThemeType;
  links?: Links[];
  devToolsOpen: boolean;
  devToolsOpenText: string;
}

interface Links {
  link: `https://${string}`;
  icon: IconName;
  title: string;
  hideIn: string | undefined;
}

interface Config {
  intro: string;
  tagline: string;
  theme: string | ThemeType;
  links: Links[];
}

class App extends Component<{}, States> {
  private log: InternalLogger;
  public displayName: string = "Application";

  public constructor(props: any) {
    super(props);
    this.state = {
      devToolsOpen: false,
      devToolsOpenText: "Turn off DevTools",
    };

    this.log = new Dom.Logger(this.constructor.name);
  }

  public componentDidMount = () => {
    // Make a request for a user with a given ID
    axios
      .get(Link.getSubPath("dlp.config.yaml"))
      .then((response) => {
        this.setState(yaml.load(response.data));
      })
      .catch((error) => {
        Dom.render(<h1>ERROR: {error}</h1>, "app");
      })
      .then(() => {});
  };

  public componentDidUpdate = () => {
    // Select pre-created theme or make yourself one
    const { theme } = this.state;
    new ThemeSelector(theme);

    if (process.env.NODE_ENV === "production") {
      addListener((isOpen) => this.setState({ devToolsOpen: isOpen }));
      this.log.info<JSX.Element>(<div style={{ color: "red", fontStyle: "bold" }}>Running in production mode!</div>);
      launch();
    } else {
      this.log.info<JSX.Element>(<div style={{ color: "red", fontStyle: "bold" }}>Running in development mode!</div>);
    }
  };

  public render = () => {
    const { intro, tagline, links, devToolsOpen, devToolsOpenText } = this.state;

    if (devToolsOpen) {
      return (
        <main>
          <div key="intro" className="intro">
            {devToolsOpenText ? devToolsOpenText : "Turn off DevTools"}
          </div>
        </main>
      );
    } else {
      return (
        <main>
          <div key="intro" className="intro">
            {intro}
          </div>
          <div key="tagline" className="tagline">
            {tagline}
          </div>
          <LinkWrapper key="icons-social">
            {links?.map((item: Links) => {
              const ua = navigator.userAgent || navigator.vendor;
              const is = ua.indexOf(item.hideIn!) > -1 ? true : false;
              if (!is) {
                return <LinkIcon key={item?.icon} link={item?.link} icon={item?.icon} title={item?.title} />;
              } else {
                return null;
              }
            })}
          </LinkWrapper>
        </main>
      );
    }
  };
}

export default App;
