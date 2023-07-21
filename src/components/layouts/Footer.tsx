import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import { svgIcons } from "../../assets/svgIcon/svgIcon";
import { site } from "../../types/Globalsite";
import { Logo } from "../../types/locations";
import { CtaData, FooterLinkItem } from "../../types/PropTypes";
import { StaticData } from "../../../sites-global/staticData";

export interface FooterProps {
  _site?: site;
}

interface partnerItemsData extends Logo {
  icon: Logo;
  link: string;
}

const Footer = (props: FooterProps) => {
  const { _site } = props;

  // code for line break on each /n in description
  const NewlineText = (footerDescription: string | undefined) => {
    const newText = footerDescription
      ?.split("\n")
      .map((str: string, i: number) => <p key={i}>{str}</p>);
    return newText;
  };

  // code for get table items in next row after 3 items
  const gettableitems = (tableitems: string[]) => {
    let col = 1;
    let tabledata = "";
    for (let i = 0; i < tableitems.length / 3; i++) {
      tabledata += `<tr class="Footer-tableRow">`;
      for (let j = col; j <= tableitems.length; j++) {
        tabledata += `<td class="Footer-tableCell">${tableitems[j - 1]}</td>`;
        col++;
        if (j % 3 == 0) {
          break;
        }
      }
      tabledata += `</tr>`;
    }
    return tabledata;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="footerTop">
            <div className="footerLogo">
              {_site?.c_footerLogo && (
                <Link
                  href={StaticData.MainSiteIndexUrl}
                  data-ya-track="Footer Logo"
                  eventName={`Footer Logo`}
                >
                  <Image image={_site?.c_footerLogo} />
                </Link>
              )}
            </div>
            
            {_site?.c_footerLinks && (
              <div className="footerNav">
                {_site?.c_footerLinks.map(
                  (
                    footerlinkitems: FooterLinkItem, i:number
                  ) => {
                    
                    return (
                      <React.Fragment key={i}> 
                        {footerlinkitems.title && (
                          <div className="block">
                            <h3>{footerlinkitems.title} </h3>
                            <ul>
                              {footerlinkitems.links &&
                                footerlinkitems.links.map((items:CtaData, i:number) => {
                                  return (
                                    <li key={i}>
                                      <Link
                                        href={items.link}
                                        data-ya-track={`Footer Link Click`}
                                        eventName={`Footer ${footerlinkitems.title} Link Click ${i+1}`}
                                        rel="noopener noreferrer"
                                      >
                                        {items.label}
                                      </Link>
                                    </li>
                                  );
                                })}

                            </ul>
                            {i === _site?.c_footerLinks.length - 1 ? (
                              <div className="socialIcons">
                                <Link
                                  href={StaticData.FacebookUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="independent financial facebook link"
                                  data-ya-track={`Facebook Click`}
                                  eventName={`Facebook Click`}
                                >
                                  {svgIcons.fbIcon}
                                </Link>
                                <Link
                                  href={StaticData.LinkedinUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="independent financial linkedin link"
                                  data-ya-track={`Linkedin Click`}
                                  eventName={`Linkedin Click`}
                                >
                                  {svgIcons.linkedin}
                                </Link>
                                <Link
                                  href={StaticData.TwitterUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="independent financial twitter link"
                                  data-ya-track={`Twitter Click`}
                                  eventName={`Twitter Click`}
                                >
                                  {svgIcons.twitter}
                                </Link>
                                <Link
                                  href={StaticData.InstagramUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="independent financial instagram link"
                                  data-ya-track={`Instagram Click`}
                                  eventName={`Instagram Click`}
                                >
                                  {svgIcons.instagram}
                                </Link>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }
                )}
              </div>
            )}
          </div>
          <div className="FooterBottom">
            <div className="copyrightBlock">
              <div className="Footer-copyright">
                {NewlineText(_site?.c_footerDescription)}
              </div>
              {_site?.c_partnerLinks && (
                <div className="partnerWrap">
                  {_site?.c_partnerLinks.map(
                    (partnerItems: partnerItemsData, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          {partnerItems ? (
                            <div className="parterLogo">
                              {partnerItems.icon && partnerItems.link ? (
                                <Link
                                  href={partnerItems.link}
                                  data-ya-track={`Footer Partner Logo ${index+1}`}
                                  eventName={`Footer Partner Logo ${index+1}`}
                                >
                                  <Image image={partnerItems.icon} />
                                </Link>
                              ) : partnerItems.icon ? (
                                <Image image={partnerItems.icon} />
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div className="FooterTablePart">
              <div className="Footer-tableText">
                {_site?.c_pCMInvestmentProductsTitle}
              </div>
              {_site?.c_pCMInvestmentProductsList && (
                <table className="Footer-table">
                <tbody
                  dangerouslySetInnerHTML={{
                    __html: gettableitems(_site.c_pCMInvestmentProductsList),
                  }}
                />
              </table>
              )}
              
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
