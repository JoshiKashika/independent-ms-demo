import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import Phone from "../commons/phone";
import Cta from "../commons/Cta";
import {
  FinancialProfessionalCardProps,
  PeopleList,
} from "../../types/PropTypes";

const FinancialProfessionalCard = (props: FinancialProfessionalCardProps) => {
  const { peopleList } = props;
  return (
    <div className="Advisors">
      <div className="container">
        <div className="Advisors-list">
          {peopleList.map((list: PeopleList, i: number) => {
            const advisorSpecialty = list.c_pagesSpecialty.replaceAll("_", " ");
            return (
              <article className="Teaser Teaser--advisor" key={list.name + i}>
                <div className="Teaser-specialty">{advisorSpecialty}</div>
                <div className="Teaser-container">
                  {list.headshot ? (
                    <div className="Teaser-image ObjectFit-container">
                      <Image
                        image={list.headshot}
                        className="ObjectFit-image"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="Teaser-infoWrapper">
                    <div className="Teaser-title">{list.name}</div>
                    <div className="Teaser-subtitle">{list.c_title}</div>
                    <div className="Teaser-linksContainer">
                      {list.mainPhone ? (
                        <Phone
                          mainPhone={list.mainPhone}
                          wrapperClassName="Phone Teaser-phone"
                        />
                      ) : (
                        <></>
                      )}
                      {list.emails ? (
                        <div className="Teaser-emailWrapper">
                          <Link
                            className="Teaser-email"
                            href={`mailto:${list.emails}`}
                            dataTrackText={`Financial Professional Mail`}
                            eventName={`Financial Professional Mail`}
                          >
                            {list.emails}
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {list.c_mortgageOfficerCTA &&
                    list.c_mortgageOfficerCTA.label &&
                    list.c_mortgageOfficerCTA.link ? (
                      <div className="Teaser-ctaWrapper">
                        <Cta
                          buttonText={list.c_mortgageOfficerCTA.label}
                          url={list.c_mortgageOfficerCTA.link}
                          dataTrackText={`Financial Professional Apply CTA`}
                          eventName={`Financial Professional Apply CTA`}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FinancialProfessionalCard;
