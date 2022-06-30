import { addListener, launch } from "devtools-detector";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Component, ErrorInfo, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { browsers } from "./util/browsers";
import { Themes, Themes_, ThemeType } from "./util/themeSelector";
import path from "path>web";
import pkg from "./../package.json";
import LinkIcon from "./components/LinkIcon";
import LinkWrapper from "./components/LinkWrapper";
import scriptjs from "scriptjs";
import {
  fullBrowserVersion,
  getUA,
  osName,
  osVersion,
} from "react-device-detect";
import ThemeSelector from "./util/themeSelector";
import AppRoot from "./AppRoot";

interface State {
  intro?: string;
  tagline?: string;
  theme?: string | ThemeType;
  links?: Links[];
  devToolsOpen: boolean;
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

declare function config(platform: IPlatform, Themes: Themes_): Config;

class App extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      devToolsOpen: false,
    };
  }

  public componentDidMount = () => {
    scriptjs(path.getSubPath("dlp.config.js"), () => {
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
      launch();
    }
  };

  public render = () => {
    const { intro, tagline, links, devToolsOpen } = this.state;

    if (devToolsOpen) {
      return (
        <main>
          <div key="intro" className="intro">
            Turn off DevTools
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
                return (
                  <LinkIcon
                    key={item?.icon}
                    link={item?.link}
                    icon={item?.icon}
                    title={item?.title}
                  />
                );
              } else {
                return null;
              }
            })}
          </LinkWrapper>
        </main>
      );
    }
  };

  public componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    const container = document.querySelector("app");
    const root = createRoot(container!);
    root.render(
      <>
        <div className="intro">{error.toString()}</div>
        <div className="tagline">{errorInfo.toString()}</div>
      </>
    );
  };

  public static render(component: ReactNode, prevents: Array<string>) {
    const { name } = pkg;
    // Setup root node where our React app will be attached to
    const app = document.createElement(name);
    document.body.prepend(app);

    // Render the app component
    const container = document.querySelector<Element>(name);
    const root = createRoot(container!);
    root.render(component);
    customElements.define(name, AppRoot);
    prevents.map((item) => {
      window.addEventListener(item, (e: Event) => {
        e.preventDefault();
        console.info(`${item} is prevented from using`);
      });
    });
  }
}

export default App;
