import * as React from "react";
import { Disclosure } from "@headlessui/react";
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import { Link } from "@yext/pages/components";
import "../../assets/css/locator.css";
import { NavigationData } from "../../types/PropTypes";
import useDimensions from "../../hooks/useDimensions";
import { StaticData } from "../../../sites-global/staticData";

interface HeaderData {
  _site: {
    c_headerLogo: ComplexImageType | ImageType;
    c_topNavigationLinks: [];
    c_mainMenuNavigation: [];
  };
}
const Header = (props: HeaderData) => {
  const { _site } = props;
  const addClass = () => {
    document.body.classList.toggle("openClass");
  };
  const { width } = useDimensions();

  return (
    <Disclosure as="nav" className="bg-white">
      {() => (
        <>
          <div className="HeaderWrap">
            <div className="container">
              <div className="header-content">
                {width < 767 ? (
                  <div className="header-mobile-logo">
                    <Link
                      href={StaticData.MainSiteIndexUrl}
                      data-ya-track="Header Mobile Logo"
                      eventName={`Header Mobile Logo`}
                    >
                      <Image image={_site.c_headerLogo} />
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <div className="header-main-nav">
                  {width < 767 ? (
                    <div className="header-toggle block md:hidden">
                      <button className="Header-toggle-icon" onClick={addClass}>
                        <span className="menuBarToggle">
                          <span className="Header-menuBar"></span>
                          <span className="Header-menuBar"></span>
                          <span className="Header-menuBar"></span>
                          <span className="Header-menuBar"></span>
                        </span>
                        <span className="toggle-open-text">MENU</span>
                        <span className="toggle-close-text">CLOSE</span>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="HeaderInner">
                    <div className="topWrap">
                      <div className="logo">
                        {_site.c_headerLogo && (
                          <Link
                            href={StaticData.MainSiteIndexUrl}
                            data-ya-track="Header Logo"
                            eventName={`Header Logo`}
                          >
                            <Image image={_site.c_headerLogo} />
                          </Link>
                        )}
                      </div>
                      {_site.c_topNavigationLinks && (
                        <div className="topNav">
                          <ul>
                            {_site.c_topNavigationLinks.map(
                              (item: NavigationData, i: number) => {
                                return (
                                  <React.Fragment key={i}>
                                    <li>
                                      <Link
                                        href={item.link}
                                        data-ya-track={`Top Navigation ${i+1}`}
                                        eventName={`Top Navigation ${i+1}`}
                                        rel="noopener noreferrer"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    {_site.c_mainMenuNavigation && (
                      <div className="mainNav">
                        <ul>
                          {_site.c_mainMenuNavigation.map(
                            (item: NavigationData, i: number) => {
                              return (
                                <React.Fragment key={i}>
                                  <li>
                                    <Link
                                      href={item.link}
                                      data-ya-track={`Main Navigation ${i+1}`}
                                      eventName={`Main Navigation ${i+1}`}
                                      rel="noopener noreferrer"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                </React.Fragment>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* white Overlay for Mobile view */}
              <div className="mobile-overlay"></div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
