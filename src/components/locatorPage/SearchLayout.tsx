import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import Footer from "../../components/layouts/Footer";
import useFetchResults from "../../hooks/useFetchResults";
import { googleMapsApiKey } from "../../config/globalConfig";
import { SearchHeadless } from "@yext/search-headless";
import { VerticalResults } from "@yext/search-ui-react";
import Location, { SiteDataProps } from "../../types/locations";
import LocationCard from "./LocationCard";
import { useState } from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../assets/svgIcon/svgIcon";
export type SearchActions = SearchHeadless;
import { GoogleMaps } from "./GoogleMaps";
import { Wrapper } from "@googlemaps/react-wrapper";
import { center_latitude, center_longitude } from "../../config/globalConfig";
import Facets from "./Facets";
import { SearchContextProvider } from "../commons/SearchContextProvider";
import { StaticData } from "../../../sites-global/staticData";
import LoadingSpinner from "../commons/LoadingSpinner";
import { GoogleMapRef } from "../commons/GoogleMapContextProvider";
import GoogleInput from "./GoogleInput";
import useDimensions from "../../hooks/useDimensions";

/** set map initial lat long and zoomlevet */
export const mapZoom = 4;
export const centerLatitude = center_latitude;
export const centerLongitude = center_longitude;

const SearchLayout = (props: SiteDataProps): JSX.Element => {
  const { _site } = props;
  const locationResults = useFetchResults() || [];
  const [tabButtonSelected, setTabButtonSelected] = useState(1);
  const isloading = useSearchState((s) => s.searchStatus.isLoading);
  const loader = isloading ? <LoadingSpinner /> : "";
  const { width } = useDimensions();

  const { autocompleteInputValue, showMessageType, setSelectedVerticalKey } =
    React.useContext(GoogleMapRef);

  const removeClass = () => {
    document.body.classList.remove("filter");
  };

  const searchTab = (verticalKey: string, tabNumber: number) => {
    setTabButtonSelected(tabNumber);
    setSelectedVerticalKey(verticalKey);
  };

  return (
    <SearchContextProvider>
      {loader}
      <Wrapper apiKey={googleMapsApiKey} libraries={["places", "geometry"]}>
        <div className="locator-main-content">
          <div className="locator-wrapper">
            {width > 992 ? (
              <div className="locator-map-wrapper">
                <div className="map-box">
                  <GoogleMaps />
                </div>
              </div>
            ) : (
              ""
            )}
            <div
              className="locator-content scrollbar-container"
              id="js-locator"
            >
              <h1 className="locator-search-title">
                {StaticData.LocatorPageSearchHeading}
              </h1>
              <div className="locator-searchtitle">
                {StaticData.LocatorPageSearchSubHeading}
              </div>
              <div className="search-wrapper">
                <div className="search-buttons">
                  <Link
                    href="javascript:void(0)"
                    className={`primaryBtn ${
                      tabButtonSelected === 1 ? "tab-selected" : ""
                    }`}
                    data-ya-track={`Locator Search By Branch`}
                    eventName={`Locator Search By Branch`}
                    onClick={() => searchTab("locations", 1)}
                  >
                    {StaticData.SearchBranchTabText}
                  </Link>
                  <Link
                    href="javascript:void(0)"
                    className={`primaryBtn ${
                      tabButtonSelected === 2 ? "tab-selected" : ""
                    }`}
                    data-ya-track={`Locator Search By ATM`}
                    eventName={`Locator Search By ATM`}
                    onClick={() => searchTab("atms", 2)}
                  >
                    {StaticData.SearchATMTabText}
                  </Link>
                </div>
                <div className="locator-form">
                  <GoogleInput />
                </div>
              </div>

              <div className="locator-result-wrapper">
                <Link href="#js-locator" className="focusable" id="skip-map">
                  Skip to Map Pins
                </Link>
                <div className="locator-result-container" id="js-locator">
                  <div className="locator-results">
                    {showMessageType == "default" ? (
                      <div className="locator-initial">
                        <div>
                          Use our locator to find a location near you or&nbsp;
                          <Link
                            href="/index.html"
                            data-ya-track={`Locator Browse Directory Click`}
                            eventName={`Locator Browse Directory Click`}
                          >
                            browse our directory.
                          </Link>
                        </div>
                      </div>
                    ) : locationResults.length > 0 ? (
                      <>
                        <div className="locator-resultsummary">
                          <div className="result-summary">
                            {`${locationResults.length} locations near "${autocompleteInputValue}"`}
                          </div>
                        </div>
                        <div className="listings">
                          <ol className="result-list">
                            <VerticalResults<Location>
                              displayAllOnNoResults={false}
                              CardComponent={LocationCard}
                            />
                          </ol>
                        </div>
                      </>
                    ) : (
                      <div className="noResults">
                        <p>
                          Sorry, there are no locations near{' "'}
                          {autocompleteInputValue}
                          {'" '}
                          satisfying the selected filters. Please modify your
                          search and try again or{" "}
                          <Link
                            href="/index.html"
                            data-ya-track={`Locator Browse Directory Click`}
                            eventName={`Locator Browse Directory Click`}
                          >
                            browse our directory.
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="locator-footer">
                  <Footer _site={_site} />
                </div>
              </div>
            </div>
            <div className="LocatorFilteOuter">
              <div className="LocatorFiltersWrap">
                <div className="titleRow">
                  {StaticData.FiltersHeadingText}
                  <button
                    className="closeIcon"
                    aria-label="close-button"
                    onClick={removeClass}
                  >
                    {svgIcons.CloseIcons}
                  </button>
                </div>
                <Facets />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </SearchContextProvider>
  );
};
export default SearchLayout;
