import * as React from "react";
import { Link } from "@yext/pages/components";

interface CtaProps {
  buttonText: string;
  url?: string;
  dataTrackText?:string;
  className?:string;
  target?:string;
  eventName?:string;
}

const Cta = ({ buttonText, url, dataTrackText, className,target, eventName }: CtaProps) => {
  return (
    <>
      <Link
        href={url}
        className={`${className ? className :"primaryBtn"}`}
        target={`${target ? target :"self"}`}
        rel="noopener noreferrer"
        data-ya-track={dataTrackText?dataTrackText:"Learn More CTA"}
        eventName={eventName? eventName:"Learn More CTA"}
      >
        {buttonText}
      </Link>
    </>
  );
};

export default Cta;
