import * as React from "react";
import Cta from "../commons/Cta";
import { StaticData } from "../../../sites-global/staticData";
import Contact from "./Contact";
import Hours from "../commons/hours";
import GetDirection from "../commons/GetDirection";
import RtfConverter from "@yext/rtf-converter";
import { Week } from "../../config/globalConfig";
import OpenCloseBlock from "../commons/OpenCloseBlock";
import useDimensions from "../../hooks/useDimensions";
import { BannerProps } from "../../types/PropTypes";

const Banner = (props: BannerProps) => {
  const {
    address,
    heroImage,
    geomodifier,
    heroCTA1,
    heroCTA2,
    fax,
    routingNumber,
    mainPhone,
    primaryHoursPagesHeading,
    secondaryHoursPagesHeading,
    primaryHours,
    secondaryHours,
    timezone,
    googlePlaceId,
    additionalHoursText,
    mobilePrimaryHoursTitle,
    mobileSecondaryHoursTitle,
    moneyPassText,
  } = props;
  const bannerbackground = heroImage
    ? `url(${heroImage.url})`
    : StaticData.primaryBlueColor;
  const day = new Date();
  const { width } = useDimensions();

  return (
    <>
      <div className="HeroBannerBG" id="first-anchor">
        <div className="hero-background">
          <div
            className="hero-bg-image"
            style={{
              background: bannerbackground,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div className="hero-overlay"></div>
        <div className="container hero-outer-container">
          <div className="HeroWrap">
            <h1 className="HeroName">
              <span className="LocationName-brand">{StaticData.Brandname}</span>
              <span className="LocationName-geo">{geomodifier}</span>
            </h1>
            {width < 768 ? (
              <>                
                  <div className="hero-hours-mobile lobby-hours block md:hidden">
                    <h2 className="Hero-hoursTitle">
                      {mobilePrimaryHoursTitle
                        ? mobilePrimaryHoursTitle
                        : "Lobby"}
                    </h2>
                    {primaryHours ? (
                    <div className="Hours-status">
                      <OpenCloseBlock
                        hoursData={primaryHours}
                        timeZone={timezone}
                      />
                    </div>)
                    :""}                    
                  </div>                
                
                  <div className="hero-hours-mobile drive-thru-hours block md:hidden">
                    <h2 className="Hero-hoursTitle">
                      {mobileSecondaryHoursTitle
                        ? mobileSecondaryHoursTitle
                        : "Drive-thru"}
                    </h2>
                    {secondaryHours ? (
                    <div className="Hours-status">
                      <OpenCloseBlock
                        hoursData={secondaryHours}
                        timeZone={timezone}
                      />
                    </div>)
                    :""}                    
                  </div>
                
              </>
            ) : (
              ""
            )}
          </div>
          <div className="HeroWrap hero-buttons">
            <div className="Hero-cta">
              {heroCTA1 &&
              typeof heroCTA1.label !== "undefined" &&
              typeof heroCTA1.link !== "undefined" ? (
                <Cta
                  buttonText={heroCTA1.label}
                  url={heroCTA1.link}
                  target="_self"
                  dataTrackText="Banner CTA 1"
                  eventName="Banner CTA 1"
                />
              ) : (
                <></>
              )}

              <GetDirection
                buttonText={
                  heroCTA2 && typeof heroCTA2.label !== "undefined"
                    ? heroCTA2.label
                    : StaticData.getDirectionText
                }
                className="primaryBtn"
                placeId={googlePlaceId}
                address={address}
                dataTrackText="Banner CTA 2"
                eventName="Banner CTA 2"
              />
            </div>
          </div>

          {/* banner contact info */}
          <div className="Hero-info">
            <div className="Hero-infoCard">
              {address ? (
                <Contact
                  address={address}
                  mainPhone={mainPhone}
                  fax={fax}
                  routingNumber={routingNumber}
                />
              ) : (
                <></>
              )}
            </div>

            {/* primary hours section */}
            {primaryHoursPagesHeading &&
            primaryHours &&
            Object.prototype.hasOwnProperty.call(primaryHours, "monday") ? (
              <div className="Hero-hours">
                <h2 className="Hero-hoursTitle">{primaryHoursPagesHeading}</h2>
                {width > 767 ? (
                  <div className="Hours-status">
                    <OpenCloseBlock
                      hoursData={primaryHours}
                      timeZone={timezone}
                    />
                  </div>
                ) : (
                  ""
                )}

                <table className="c-hours-details">
                  <Hours
                    hours={primaryHours}
                    startOfWeek={Week[day.getDay()]}
                  />
                </table>
                <div className="c-hours-additional-text">
                  {additionalHoursText}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* secondary hours section */}
            {secondaryHoursPagesHeading &&
            secondaryHours &&
            Object.prototype.hasOwnProperty.call(secondaryHours, "monday") ? (
              <div className="Hero-hours">
                <h2 className="Hero-hoursTitle">
                  {secondaryHoursPagesHeading}
                </h2>
                {width > 767 ? (
                  <div className="Hours-status">
                    <OpenCloseBlock
                      hoursData={secondaryHours}
                      timeZone={timezone}
                    />
                  </div>
                ) : (
                  ""
                )}
                <table className="c-hours-details">
                  <Hours
                    hours={secondaryHours}
                    startOfWeek={Week[day.getDay()]}
                  />
                </table>
              </div>
            ) : (
              <></>
            )}
          </div>
          {moneyPassText ? (
            <div className="findATM">
              <div
                dangerouslySetInnerHTML={{
                  __html: RtfConverter.toHTML(moneyPassText),
                }}
              ></div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
