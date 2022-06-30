import pkg from "./../package.json";
import pkg_react from "./../node_modules/react/package.json";
import pkg_react_dom from "./../node_modules/react-dom/package.json";

/**
 * Provides information about the app and frameworks
 * @extends HTMLElement
 */
class AppRoot extends HTMLElement {
  public constructor() {
    super();
    this.initConfigStats([
      { key: "version", value: pkg.version },
      { key: `react-version`, value: pkg_react.version },
      { key: `react-dom-version`, value: pkg_react_dom.version },
    ]);
  }

  private initConfigStats(data: { key: string; value: string }[]) {
    return data.map((element: { key: string; value: string }) => {
      return this.setAttribute(element.key, element.value);
    });
  }

  public connectedCallback() {
    // Element wurde ins DOM eingehängt
  }

  public disconnectedCallback() {
    // Element wurde entfernt
  }

  public adoptedCallback() {
    // Element ist in ein anderes Dokument umgezogen
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    // Elementparameter wurden geändert
    // Achtung attributeChangedCallback wird vor connectedCallback aufgerufen
  }
}

export default AppRoot;
