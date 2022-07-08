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
  hide: boolean;
}

interface Config {
  intro: string;
  tagline: string;
  theme: string | ThemeType;
  links: Links[];
}

/**
 * Gets the config file data
 * @param platform
 * @param Themes
 */
declare function config(platform: IPlatform, Themes: Themes_): Config;

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
    scriptjs(Link.getSubPath("dlp.config.js"), () => {
      const isInstagram = /Instagram/i.test(window.navigator.userAgent);
      const isFacebook = /Facebook/i.test(window.navigator.userAgent);
      this.setState(
        config(
          {
            isInstagram: isInstagram,
            isFacebook: isFacebook,
            ...browsers,
            osVersion: osVersion,
            osName: osName,
            fullBrowserVersion: fullBrowserVersion,
            getUA: getUA,
          },
          Themes
        )
      );
    });
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
              if (!item?.hide) {
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
