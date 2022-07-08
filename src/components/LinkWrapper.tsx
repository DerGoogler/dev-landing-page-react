import { Component, Fragment } from "react";

interface Props {
  children: React.ReactNode;
}

class LinkWrapper extends Component<Props> {
  public render() {
    const { children } = this.props;
    return (
      <Fragment>
        <div className="icons-social">{children}</div>
      </Fragment>
    );
  }
}

export default LinkWrapper;
