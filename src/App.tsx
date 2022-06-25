import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Component, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import path from "path";
import LinkIcon from "./components/LinkIcon";
import LinkWrapper from "./components/LinkWrapper";
import themeSelector from "./util/themeSelector";

interface State {
  links?: any[];
  config: {
    intro: string;
    tagline: string;
    theme: string;
  };
}

interface Links {
  link: `https://${string}`;
  icon: IconName;
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

  public render = () => {
    const { links } = this.state;
    const { intro, tagline } = this.state.config;

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
            return <LinkIcon key={item.icon} link={item.link} icon={item.icon} />;
          })}
        </LinkWrapper>
      </main>
    );
  };

  public componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    const container = document.querySelector("app");
    const root = createRoot(container!);
    root.render(
      <>
        <div className="intro">{error}</div>
        <div className="tagline">{errorInfo}</div>
      </>
    );
  };
}

export default App;
