namespace WebPath {
  /**
   * Checks if an string link is valid
   * @param input string
   * @returns {boolean} boolean
   */
  export function validURL(input: string): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(input);
  }

  /**
   * Retuns the current page link
   * @param url Current url
   * @returns {string} An sub path without current url
   */
  export function getSubPath(url: string): string {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
  }

  export function setURL(
    callback: (set: (data: any, unused: string, url?: string | URL | null | undefined) => void, currentPath: string) => void
  ): void {
    const loc = window.location.pathname;
    const set = (data: any, unused: string, url?: string | URL | null | undefined) => window.history.pushState(data, unused, url);
    const currentPath: string = loc === "/" ? "" : loc;
    if (typeof callback == "function") {
      callback(set, currentPath);
    }
  }
}

const path: typeof WebPath = WebPath;
export default path;
