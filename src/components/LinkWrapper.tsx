import { Component } from "react";

interface Props {
  children: React.ReactNode;
}

class LinkWrapper extends Component<Props> {
  public render() {
    const { children } = this.props;
    return (
      <>
        <div className="icons-social">{children}</div>
      </>
    );
  }
}

export default LinkWrapper;
