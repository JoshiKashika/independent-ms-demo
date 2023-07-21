import * as React from "react";
import Cta from "../commons/Cta";
import { Image } from "@yext/pages/components";

type imageProps = {
  url: string;
  height: number;
  width: number;
}

export interface AboutProps {
  description?: string;
  subheading?: string;
  image?: imageProps;
  CTA?: {label:string,link:string};
  title: string
}

const About = ({ title, description, subheading, image, CTA }: AboutProps) => {
  return (
    <div className="Promo">
      <div className="container">
        <div className="PromoWrapper">
          <div className="Promo-info">
            <div className="Promo-title">{title}</div>
            <div className="Promo-subtitle">{subheading}</div>
            {description && (
              <div className="Promo-description">
                <p>{description}</p>
              </div>)}
            {CTA && typeof (CTA.label) !== 'undefined' && typeof (CTA.link) !== 'undefined' ? (
              <Cta 
              buttonText={CTA.label} 
              url={CTA.link} 
              target="_blank"
              dataTrackText="Location About CTA"
              eventName={`Location About CTA`}/>
            ) : (
              <></>
            )}
          </div>
          {image && (
            <div className="Promo-image">
              <Image
                image={image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
