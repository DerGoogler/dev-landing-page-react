import { addListener, launch } from "devtools-detector";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { ThemeType } from "./util/themeSelector";
import { _decode, _encode } from "bota64/lib/cjs/core";
import ThemeSelector from "./util/themeSelector";
import yaml from "js-yaml";
import { JR, link } from "googlers-tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

class App extends JR.Component<{}, States> {
  public displayName: string = this.constructor.name;

  public constructor(props: any) {
    super(props);
    this.state = {
      devToolsOpen: false,
      devToolsOpenText: "Turn off DevTools",
    };
  }

  public componentDidMount() {
    link.request(link.getSubPath("dlp.config.yaml"), (status, response) => {
      if (status === 200) {
        this.setState(yaml.load(response));
      }
    });
  }

  public componentDidUpdate() {
    // Select pre-created theme or make yourself one
    const { theme } = this.state;
    new ThemeSelector(theme);

    if (process.env.NODE_ENV === "production") {
      addListener((isOpen) => this.setState({ devToolsOpen: isOpen }));
      launch();
    }
  }

  public jrender(): JR.JRNode[] {
    const { links, intro, tagline, theme, devToolsOpen, devToolsOpenText } = this.state;
    if (devToolsOpen) {
      return [
        {
          main: {
            children: JR.r([
              {
                div: {
                  key: "intro",
                  className: "intro",
                  children: devToolsOpenText ? devToolsOpenText : "Turn off DevTools",
                },
              },
            ]),
          },
        },
      ];
    } else {
      return [
        {
          main: {
            children: JR.r([
              {
                div: {
                  key: "intro",
                  className: "intro",
                  children: intro,
                },
              },

              {
                div: {
                  key: "tagline",
                  className: "tagline",
                  children: tagline,
                },
              },
              {
                div: {
                  key: "icons-social",
                  className: "icons-social",
                  children: JR.rn((r, mc) => {
                    return links?.map((item: Links) => {
                      return r([
                        {
                          a: {
                            target: "_blank",
                            className: "iconColor",
                            href: item.link,
                            children: r([
                              {
                                i: {
                                  className: "iconColor",
                                  children: mc(FontAwesomeIcon, {
                                    icon: ["fab", item.icon],
                                  }),
                                },
                              },
                            ]),
                          },
                        },
                      ]);
                    }) as any;
                  }),
                },
              },
            ]),
          },
        },
      ];
    }
  }
}

export default App;
