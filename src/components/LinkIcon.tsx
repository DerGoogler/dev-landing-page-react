import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

interface Props {
  link: `https://${string}`;
  icon: IconName;
}

class LinkIcon extends Component<Props> {
  public render() {
    const { link, icon } = this.props;
    return (
      <>
        <a target="_blank" className="iconColor" href={link}>
          <i>
            <FontAwesomeIcon className="iconColor" icon={["fab", icon]} />
          </i>
        </a>
      </>
    );
  }
}

export default LinkIcon;
