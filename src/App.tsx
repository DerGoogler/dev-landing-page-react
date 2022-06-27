import { addListener, launch } from "devtools-detector";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Component, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import path from "path>web";
import LinkIcon from "./components/LinkIcon";
import LinkWrapper from "./components/LinkWrapper";
import themeSelector from "./util/themeSelector";
import scriptjs from "scriptjs";
import { browsers } from "./util/browsers";
import {
  fullBrowserVersion,
  getUA,
  osName,
  osVersion,
} from "react-device-detect";

interface State {
  all: {
    links: any[];
    config: {
      intro: string;
      tagline: string;
      theme: string;
    };
  };

  devToolsOpen: boolean;
}

interface Links {
  link: `https://${string}`;
  icon: IconName;
  title: string;
}

class App extends Component<{}, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      all: {
        links: [],
        config: {
          intro: "",
          tagline: "",
          theme: "red-black",
        },
      },
      devToolsOpen: false,
    };
  }

  public componentDidMount = () => {
    scriptjs(path.getSubPath("dlp.config.js"), () => {
      this.setState({
        all: config({
          isInstagram: /Instagram/i.test(window.navigator.userAgent),
          isFacebook: /Facebook/i.test(window.navigator.userAgent),
          ...browsers,
          osVersion: osVersion,
          osName: osName,
          fullBrowserVersion: fullBrowserVersion,
          getUA: getUA,
        }),
      });
    });

    themeSelector(this.state.all.config.theme);
  };

  public componentDidUpdate = () => {
    if (process.env.NODE_ENV === "production") {
      addListener((isOpen) => this.setState({ devToolsOpen: isOpen }));
      launch();
    }
  };

  public render = () => {
    const { devToolsOpen } = this.state;
    const { links } = this.state.all;
    const { intro, tagline } = this.state.all.config;

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
              return (
                <LinkIcon
                  key={item.icon}
                  link={item.link}
                  icon={item.icon}
                  title={item?.title}
                />
              );
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
}

export default App;
