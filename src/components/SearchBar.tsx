import * as React from "react";
import {
  getCompomentCodes,
  getSearchMessage,
  getSearchRedirectionUrl,
  googleMapsApiKey,
} from "../config/globalConfig";
import { svgIcons } from "../assets/svgIcon/svgIcon";
import { getUserLocation } from "@yext/search-ui-react";
import Geocode from "react-geocode";
import { centerLatitude, centerLongitude } from "./locatorPage/SearchLayout";
import { StaticData } from "../../sites-global/staticData";
import { Link } from "@yext/pages/components";


const SearchBar = () => {
  const pageAutocompleteRef = React.useRef<HTMLInputElement>(null);
  const googleLib = typeof google !== "undefined" ? google : null;
  React.useEffect(() => {
    /** CODE EXPLAIN:- Code for google autocomplete */
    if (typeof google === "object" && typeof google.maps === "object") {
      const pageAutocomplete = pageAutocompleteRef.current as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(
        pageAutocomplete,
        {
          types: ["geocode"],
        }
      );
      if (autocomplete) {
        google.maps.event.addListener(
          autocomplete,
          "place_changed",
          function () {
            const searchKey: string = pageAutocomplete.value;
            const place = autocomplete.getPlace();
            if (searchKey && place.address_components != undefined) {
              Geocode.setApiKey(googleMapsApiKey);
              Geocode.fromAddress(pageAutocompleteRef.current?.value).then(
                async (response: Geocode.Response) => {
                  let country = "";
                  let region = "";
                  if (response.status == "OK") {
                    const searchMessage = getSearchMessage(
                      response?.results[0].address_components
                    );
                    const location = response?.results[0]?.geometry?.location;
                    const returnItem = getCompomentCodes(
                      response?.results[0].address_components
                    );
                    country = returnItem?.country ? returnItem?.country : "";
                    region = returnItem?.region ? returnItem?.region : "";
                    const url = getSearchRedirectionUrl(
                      location.lat,
                      location.lng,
                      searchMessage,
                      "",
                      country,
                      region
                    );
                    window.location.href = url;
                  }
                }
              );
            }
          }
        );
      }

      setTimeout(() => {
        if (pageAutocompleteRef.current) {
          const parentElement = pageAutocompleteRef.current.parentElement;
          const pacContainer = document.querySelector(".pac-container");
          if (pacContainer) {
            parentElement?.appendChild(pacContainer);
            if (pacContainer.parentElement === document.body) {
              document.body.removeChild(pacContainer);
            }
          }
        }
      }, 1000);

    }
  }, [googleLib]);

  const getMyCurrentLocation = () => {
    getUserLocation()
      .then((response) => {
        Geocode.setApiKey(googleMapsApiKey);
        Geocode.fromLatLng(
          response.coords.latitude,
          response.coords.longitude
        ).then((addressInfo:Geocode.Response) => {
          const message = getSearchMessage(
            addressInfo.results[0].address_components
          );
          const useMyLocationInputValue = "My Location";
          const url = getSearchRedirectionUrl(
            response.coords.latitude,
            response.coords.longitude,
            message,
            useMyLocationInputValue
          );
          window.location.href = url;
        });
      })
      .catch(() => {
        alert("Sorry, we are unable to determine your location at this time.");
      });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pageAutocompleteRef.current?.value) {
      pageAutocompleteRef.current?.blur();
      
    }
    Geocode.setApiKey(googleMapsApiKey);
    Geocode.fromAddress(pageAutocompleteRef.current?.value)
      .then(async (response: Geocode.Response) => {
        let country = "";
        let region = "";

        if (response.status == "OK") {
          const searchMessage = getSearchMessage(
            response?.results[0].address_components
          );
          const location = response?.results[0]?.geometry?.location;
          const returnItem = getCompomentCodes(
            response?.results[0].address_components
          );
          country = returnItem?.country ? returnItem?.country : "";
          region = returnItem?.region ? returnItem?.region : "";
          const url = getSearchRedirectionUrl(
            location.lat,
            location.lng,
            searchMessage,
            "",
            country,
            region
          );
          window.location.href = url;
        }
      })
      .catch(() => {
        const url = getSearchRedirectionUrl(
          centerLatitude,
          centerLongitude,
          pageAutocompleteRef.current?.value
        );
        window.location.href = url;
      });
  };

  return (
    <>
      <div className="Hero-search">
        <div className="Hero-searchDescription">
          Search by city and state or ZIP code
        </div>
        <form
          className="search Hero-form"
          action="search"
          onSubmit={onFormSubmit}
        >
          <div className="Locator-searchBar">
            <input
              ref={pageAutocompleteRef}
              name="google_autocomplete_country"
              id="google_autocomplete_country"
              placeholder={StaticData.SearchPlaceholder}
              className="search-input pac-target-input"
              type="text"
              onFocus={(e) => e.target.select()}
              required
            />
            <button type="submit" 
            aria-label="dm-search-button"
            data-ya-track={`Search Button Click`}>
              {svgIcons.searchIcon}{" "}
            </button>
          </div>
          <Link
           href="javascript:void(0)"           
            onClick={getMyCurrentLocation}
            className="primaryBtn"
            aria-label="dm-usemylocation-button"
            data-ya-track={`Use My Location Click`}
            eventName={`Use My Location Click`}
          >
            Use my location
          </Link>
          
        </form>
      </div>
    </>
  );
};

export default SearchBar;
