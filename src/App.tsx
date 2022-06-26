import { addListener, launch } from "devtools-detector";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Component, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import path from "path>web";
import LinkIcon from "./components/LinkIcon";
import LinkWrapper from "./components/LinkWrapper";
import themeSelector from "./util/themeSelector";

interface State {
  links: any[];
  config: {
    intro: string;
    tagline: string;
    theme: string;
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
      links: [],
      config: {
        intro: "",
        tagline: "",
        theme: "red-black",
      },
      devToolsOpen: false,
    };
  }

  public componentDidMount = () => {
    axios
      .get(path.getSubPath("/config.json"))
      .then((response) => {
        const data = response.data;
        this.setState({
          links: data.links,
          config: data.config,
        });
      })
      .catch((error) => {
        window.alert(`There was an error!\n\nERROR: ${error}`);
      });

    themeSelector(this.state.config.theme);
  };

  public componentDidUpdate = () => {
    if (process.env.NODE_ENV === "production") {
      addListener((isOpen) => this.setState({ devToolsOpen: isOpen }));
      launch();
    }
  };

  public render = () => {
    const { links, devToolsOpen } = this.state;
    const { intro, tagline } = this.state.config;

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
                <LinkIcon key={item.icon} link={item.link} icon={item.icon} title={item?.title} />
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
