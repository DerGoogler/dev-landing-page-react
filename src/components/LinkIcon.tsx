import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, Fragment } from "react";

interface Props {
  link: `https://${string}`;
  icon: IconName;
  title: string;
}

class LinkIcon extends Component<Props> {
  public render() {
    const { link, icon, title } = this.props;
    return (
      <Fragment>
        <a target="_blank" className="iconColor" href={link}>
          <i title={title}>
            <FontAwesomeIcon className="iconColor" icon={["fab", icon]} />
          </i>
        </a>
      </Fragment>
    );
  }
}

export default LinkIcon;
