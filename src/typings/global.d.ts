export {};

declare global {
  interface IConfig {
    config: {
      intro: string;
      tagline: string;
      theme: string;
    };
    links: any[];
  }

  var config: IConfig;
}
