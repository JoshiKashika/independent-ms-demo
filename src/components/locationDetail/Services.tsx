import * as React from "react";
import List from "../commons/List";
import { Address } from "../../types/Address";
import { slugify } from "../../config/globalConfig";
import { Link } from "@yext/pages/components";
import { StaticData } from "../../../sites-global/staticData";

type linkedATMProps = {
  name: string;
  address: Address;
};
type servicesDetails = {
  titleBelowHero: string;
  services: [];
  bankOfferingList: [];
  customerCareHeading: string;
  customerCareNumber: string;
  monFriHeading: string;
  monFriTime: string;
  satHeading: string;
  satTime: string;
  telephoneBankingHeading: string;
  telephoneBankingNumber: string;
  lostOrStolenCardHeading: string;
  debitHeading: string;
  debitNumber: string;
  creditHeading: string;
  creditNumber: string;
  linkedATM: linkedATMProps[];
  address: Address;
  relativepath: string;
  entityType: string;
};
const ServiceList = (props: servicesDetails) => {
  const {
    titleBelowHero,
    services,
    bankOfferingList,
    customerCareHeading,
    customerCareNumber,
    monFriHeading,
    monFriTime,
    satHeading,
    satTime,
    telephoneBankingHeading,
    telephoneBankingNumber,
    lostOrStolenCardHeading,
    debitHeading,
    debitNumber,
    creditHeading,
    creditNumber,
    linkedATM,
    relativepath,
    entityType,
  } = props;

  return (
    <>
      <div className="AtThisLocation">
        <div className="container">
          <div className="AtThisLocation-title">{titleBelowHero}</div>
          <div className="AtThisLocation-row">
            {typeof services != "undefined" && entityType == "location" ? (
              <div className="AtThisLocation-services col">
                <div className="AtThisLocation-servicesTitle l-hidden-xs">
                  Services
                </div>
                <ul className="AtThisLocation-servicesList">
                  {linkedATM ? (
                    <li className="AtThisLocation-service">
                      <Link
                        href={
                          relativepath +
                          `${slugify(linkedATM[0].address.region)}/${slugify(
                            linkedATM[0].address.city
                          )}/${slugify(linkedATM[0].address.line1)}/atm`
                        }
                        className="AtThisLocation-serviceLink"
                        data-ya-track={`Services ATM link`}
                        eventName={`Services ATM link`}
                      >
                        {linkedATM[0].name}
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                  <li className="AtThisLocation-service">
                    <Link
                      href={StaticData.MoneyPassAtmLink}
                      className="AtThisLocation-serviceLink"
                      data-ya-track="Services MoneyPass ATMS"
                      eventName={`Services MoneyPass ATMS`}
                    >
                      MoneyPass ® ATMS (30,000+ surcharge free)
                      <span className="sr-only wcag-new-tab-hover">
                        &nbsp;Link Opens in New Tab
                      </span>
                    </Link>
                  </li>
                  <List
                    list={services}
                    listItemClassName="AtThisLocation-service"
                  />
                </ul>
              </div>
            ) : (
              <></>
            )}

            {bankOfferingList ? (
              <div className="AtThisLocation-offerings col">
                <div className="AtThisLocation-offeringsTitle">
                  Other Bank Offerings
                </div>
                <ul className="AtThisLocation-servicesList">
                  <List
                    list={bankOfferingList}
                    listItemClassName="AtThisLocation-service"
                    linkClassName="AtThisLocation-serviceLink"
                  />
                </ul>
              </div>
            ) : (
              <></>
            )}

            <div className="AtThisLocation-phonesCol col">
              <div className="AtThisLocation-phoneContainer">
                <div className="AtThisLocation-phoneTitle">
                  {customerCareHeading}
                </div>
                <div className="AtThisLocation-phoneWrapper">
                  <div className="Phone AtThisLocation-phone">
                    <div className="Phone-display l-hidden-xs Phone-display--withLink">
                      <span className="Text Phone-text Phone-display">
                        {customerCareNumber}
                      </span>
                    </div>
                    <div className="Phone-linkWrapper l-visible-only-xs">
                      <Link
                        href={`tel:${customerCareNumber.replace(
                          /[\s()-]/g,
                          ""
                        )}`}
                        className="Link Phone-link"
                        data-ya-track="Customer Care Phone"
                        eventName={`Customer Care Phone`}
                      >
                        {customerCareNumber}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="AtThisLocation-phoneHoursWrapper">
                  <span className="AtThisLocation-phoneHoursLabel">
                    {monFriHeading}
                  </span>
                  <span className="AtThisLocation-phoneHours">
                    {monFriTime}
                  </span>
                </div>
                <div className="AtThisLocation-phoneHoursWrapper">
                  <span className="AtThisLocation-phoneHoursLabel">
                    {satHeading}
                  </span>
                  <span className="AtThisLocation-phoneHours">{satTime}</span>
                </div>
              </div>
              <div className="AtThisLocation-phoneContainer">
                <div className="AtThisLocation-phoneTitle">
                  {telephoneBankingHeading}
                </div>
                <div className="AtThisLocation-phoneWrapper">
                  <div className="Phone AtThisLocation-phone">
                    <div className="Phone-display l-hidden-xs Phone-display--withLink">
                      <span className="Text Phone-text Phone-display">
                        {telephoneBankingNumber}
                      </span>
                    </div>
                    <div className="Phone-linkWrapper l-visible-only-xs">
                      <Link
                        href={`tel:${telephoneBankingNumber.replace(
                          /[\s()-]/g,
                          ""
                        )}`}
                        className="Link Phone-link"
                        data-ya-track="Telephone Banking Phone"
                        eventName={`Telephone Banking Phone`}
                      >
                        {telephoneBankingNumber}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="AtThisLocation-phonesCol col">
              <div className="AtThisLocation-phoneContainer">
                <div className="AtThisLocation-phoneTitle">
                  {lostOrStolenCardHeading}
                </div>
                <div className="AtThisLocation-phoneWrapper">
                  <span className="AtThisLocation-phoneLabel">
                    {debitHeading}
                  </span>
                  <div className="Phone AtThisLocation-phone">
                    <div className="Phone-display l-hidden-xs Phone-display--withLink">
                      <span className="Text Phone-text Phone-display">
                        {debitNumber}
                      </span>
                    </div>
                    <div className="Phone-linkWrapper l-visible-only-xs">
                      <Link
                        href={`tel:${debitNumber.replace(/[\s()-]/g, "")}`}
                        className="Link Phone-link"
                        data-ya-track="Debit Phone"
                        eventName={`Debit Phone`}
                      >
                        {debitNumber}{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="AtThisLocation-phoneWrapper">
                  <span className="AtThisLocation-phoneLabel">
                    {creditHeading}
                  </span>
                  <div className="Phone AtThisLocation-phone">
                    <div className="Phone-display l-hidden-xs Phone-display--withLink">
                      <span className="Text Phone-text Phone-display">
                        {creditNumber}
                      </span>
                    </div>
                    <div className="Phone-linkWrapper l-visible-only-xs">
                      <Link
                        href={`tel:${creditNumber.replace(/[\s()-]/g, "")}`}
                        className="Link Phone-link"
                        data-ya-track="Credit Phone"
                        eventName={`Credit Phone`}
                      >
                        {creditNumber}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServiceList;
