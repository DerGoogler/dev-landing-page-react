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

  interface IPlatform {
    isInstagram?: boolean;
    isFacebook?: boolean;
    isBrowser?: boolean;
    isDesktop?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    isSmartTV?: boolean;
    isConsole?: boolean;
    isWearable?: boolean;
    isEmbedded?: boolean;
    isMobileSafari?: boolean;
    isChromium?: boolean;
    isMobileOnly?: boolean;
    isAndroid?: boolean;
    isWinPhone?: boolean;
    isIOS?: boolean;
    isChrome?: boolean;
    isFirefox?: boolean;
    isSafari?: boolean;
    isOpera?: boolean;
    isIE?: boolean;
    isEdge?: boolean;
    isYandex?: boolean;
    osVersion: string;
    osName: string;
    fullBrowserVersion: string;
    browserVersion: string;
    browserName: string;
    mobileVendor: string;
    mobileModel: string;
    engineName: string;
    engineVersion: string;
    getUA: string;
    deviceType: string;
    isIOS13?: boolean;
    isIPad13?: boolean;
    isIPhone13?: boolean;
    isIPod13?: boolean;
    isElectron?: boolean;
    isEdgeChromium?: boolean;
    isLegacyEdge?: boolean;
    isWindows?: boolean;
    isMacOs?: boolean;
    isMIUI?: boolean;
    isSamsungBrowser?: boolean;
  }

  function config(platform: IPlatform): IConfig;
}
