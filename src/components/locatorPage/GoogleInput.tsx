import {
  Direction,
  FilterCombinator,
  Matcher,
  SelectableStaticFilter,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";
import {
  AnswerExperienceConfig,
  CalulateDistance,
  center_latitude,
  center_longitude,
  compareArrays,
  convertMilesToMeters,
  defaultRadius,
  getCompomentCodes,
  getNewUrl,
  getSearchMessage,
  googleMapsApiKey,
  staticFilterItem,
} from "../../config/globalConfig";
import * as React from "react";
import { useRef, useEffect } from "react";
import { svgIcons } from "../../assets/svgIcon/svgIcon";
import Geocode from "react-geocode";
import { GoogleMapRef } from "../commons/GoogleMapContextProvider";
import rocketIMG from "../../assets/images/rocket.png";
import filterIMG from "../../assets/images/filter.png";
import { getUserLocation } from "@yext/search-ui-react";
import { AddressComponent } from "../../types/AddressComponentType";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";

export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  filterSearchContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}

/**
 *  Get input value and set suggestions | Show result based on selected query from suggestions
 *
 */
export default function GoogleInput(): JSX.Element | null {
  /** page states to render , handle cases  */
  const [allowLocation] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchActions = useSearchActions();
  const googleLib = typeof google !== "undefined" ? google : null;
  let inputUseMyLocationMessage: string | null;
  /**
   * Handles changing which section should become focused when focus leaves the currently-focused section.
   * @param pastSectionEnd Whether the section focus left from the end or the beginning of the section.
   */
  const {
    setAutocompleteInputValue,
    selectedRadius,
    setSelectedRadius,
    setShowMessageType,
    customFacetsObjects,
    selectedVerticalKey,
    alreadySelectedFilters,
    setApplyButtonStatus,    
  } = React.useContext(GoogleMapRef);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q")?.split(",");
    const address = searchParams.get("qp");
    const country = searchParams.get("country");
    const region = searchParams.get("region");
    const lat = q && q.length ? Number(q[0]) : 0;
    const lng = q && q.length ? Number(q[1]) : 0;
    inputUseMyLocationMessage = searchParams.get("sm")
      ? searchParams.get("sm")
      : "";
    const radius = searchParams.get("r")
      ? convertMilesToMeters(Number(searchParams.get("r")))
      : defaultRadius;
    const services = searchParams.get("services")?.split("|");
    if (address) {
      apiCall(
        lat,
        lng,
        address,
        false,
        {
          radius,
          services,
        },
        0,
        undefined,
        country,
        region
      );
    }
    setTimeout(() => {
      if (inputRef.current) {
        const parentElement = inputRef.current.parentElement;
        const pacContainer = document.querySelector(".pac-container");
        if (pacContainer) {
          parentElement?.appendChild(pacContainer);
          if (pacContainer.parentElement === document.body) {
            document.body.removeChild(pacContainer);
          }
        }
      }
    }, 1000);
  }, []);

  const apiCall = (
    lat?: number,
    lng?: number,
    address?: string,
    isSetUrl?: boolean,
    options?: {
      radius: number;
      services?: string[];
    },
    dynamicRadius?: number,
    addressComponent?: AddressComponent[],
    country?: string,
    region?: string
  ) => {
    const newUrlItems = [
      {
        key: "country",
        value: country ? country : "",
      },
      {
        key: "region",
        value: region ? region : "",
      },
    ];

    /** Set Radius for US */

    const filter = [];
    if (country) {
      filter.push({
        fieldId: "address.countryCode",
        matcher: Matcher.Equals,
        value: country,
        kind: "fieldValue",
      });
    }

    if (region) {
      filter.push({
        fieldId: "address.region",
        matcher: Matcher.Equals,
        value: region,
        kind: "fieldValue",
      });
    }

    if (filter && filter.length) {
      const filters: SelectableStaticFilter[] = [
        {
          selected: true,
          filter: {
            combinator: FilterCombinator.AND,
            kind: "conjunction",
            filters: filter,
          },
        },
      ];
      searchActions.setStaticFilters(filters);
    } else {
      searchActions.setStaticFilters([]);
    }

    if (dynamicRadius) {
      searchActions.setLocationRadius(dynamicRadius);
    } else if (!isSetUrl && options?.radius) {
      searchActions.setLocationRadius(options?.radius);
      setTimeout(() => {
        setSelectedRadius(options?.radius);
      }, 1000);
    } else {
      searchActions.setLocationRadius(selectedRadius);
    }

    if (selectedVerticalKey) {
      searchActions.setVertical(selectedVerticalKey);
      if(dynamicRadius){
        searchActions.setLocationRadius(dynamicRadius);
      }
      else{
        searchActions.setLocationRadius(selectedRadius);
      }
    }

    if (!isSetUrl && options?.services) {
      const changedFilters = staticFilterItem.map((facetOptions) => {
        return {
          ...facetOptions,
          options: facetOptions.options.map((facetOption) => {
            return {
              ...facetOption,
              selected: options?.services?.includes(facetOption.value)
                ? true
                : facetOption.selected,
            };
          }),
        };
      });
      searchActions.setFacets(changedFilters);
    } else {
      searchActions.setFacets(customFacetsObjects);
    }

    if (address) {
      setAutocompleteInputValue(address);
      setShowMessageType("result_based");
    }

    if (!isSetUrl) {
      if (inputRef.current && address) {
        inputRef.current.value = inputUseMyLocationMessage
          ? inputUseMyLocationMessage
          : address;
      }
    }

    if (lat && lng) {
      searchActions.setUserLocation({
        latitude: lat,
        longitude: lng,
      });
    }

    searchActions.setOffset(0);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.setSortBys([
      {
        field: "builtin.location",
        type: SortType.EntityDistance,
        direction: Direction.Ascending,
      },
    ]);
    searchActions.executeVerticalQuery();

    /** CODE EXPLAIN: - set query params to the current url  */
    if (lat && lng && address && isSetUrl) {
      newUrlItems.push(
        {
          key: "q",
          value: `${lat},${lng}`,
        },
        {
          key: "qp",
          value: address,
        }
      );
      const url = getNewUrl(newUrlItems);
      window.history.replaceState({}, "", url);
    }
  };

  const getLatLngByAddress = (address: string) => {
    Geocode.setApiKey(googleMapsApiKey);
    Geocode.fromAddress(address)
      .then(async (response: Geocode.Response) => {
        if (response.status == "OK") {
          const searchMessage = getSearchMessage(
            response?.results[0].address_components
          );
          const location = response?.results[0]?.geometry?.location;

          let dynamicRadius = 0;
          let country = "";
          let region = "";
          if (response?.results[0].address_components.length <= 2) {
            const addressComponents = response?.results[0]?.address_components;
            for (const addressItem of addressComponents) {
              if (addressItem.types.includes("country")) {
                if (addressItem.short_name === "US") {
                  /** Calculate the radius */
                  const lat =
                    response?.results[0]?.geometry.bounds.northeast.lat;
                  const lng =
                    response?.results[0]?.geometry.bounds.northeast.lng;
                  const lat2 =
                    response?.results[0]?.geometry.bounds.southwest.lat;
                  const lng2 =
                    response?.results[0]?.geometry.bounds.southwest.lng;
                  dynamicRadius = CalulateDistance(lat, lng, lat2, lng2);
                  const returnItem = getCompomentCodes(
                    response?.results[0].address_components
                  );
                  country = returnItem?.country ? returnItem?.country : "";
                  region = returnItem?.region ? returnItem?.region : "";
                }
              }
            }
          }
          apiCall(
            location.lat,
            location.lng,
            searchMessage,
            true,
            undefined,
            dynamicRadius,
            response?.results[0].address_components,
            country,
            region
          );
        }
      })
      .catch(() => {
        apiCall(
          center_latitude,
          center_longitude,
          inputRef.current?.value,
          true
        );
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      inputRef.current?.blur();
      getLatLngByAddress(inputRef.current?.value);
    }
  };

  /** Function to show result & select first suggestion on enter */
  useEffect(() => {
    if (googleLib && typeof google.maps === "object") {
      const pacInput: HTMLInputElement = document?.getElementById(
        "autocomplete-input"
      ) as HTMLInputElement;
      const options = {
        fields: ["address_component", "geometry", "formatted_address"],
      };
      const autocomplete = new google.maps.places.Autocomplete(
        pacInput,
        options
      );
      
      if (autocomplete) {
        google.maps.event.addListener(
          autocomplete,
          "place_changed",
          function () {             
            const searchKey: string = pacInput.value;
            const place = autocomplete.getPlace();
            if (searchKey && place.address_components != undefined) {
              place.formatted_address &&
                getLatLngByAddress(place.formatted_address);
               
            }
          }
        );
      }
      
        
    }
  }, [googleLib]);
  

  const useMyLocation = () => {
    getUserLocation()
      .then((response) => {
        Geocode.setApiKey(googleMapsApiKey);
        Geocode.fromLatLng(
          response.coords.latitude,
          response.coords.longitude
        ).then((addressInfo: Geocode.response) => {
          const message = getSearchMessage(
            addressInfo.results[0].address_components
          );
          if (inputRef.current) {
            inputRef.current.value = "My Location";
          }
          apiCall(
            response.coords.latitude,
            response.coords.longitude,
            message,
            true
          );
        });
      })
      .catch(() => {
        alert("Sorry, we are unable to determine your location at this time.");
      });
  };

  const addClass = () => {
    document.body.classList.add("filter");
    const selectedFilters = alreadySelectedFilters;
    const compareArrayResult = compareArrays(
      selectedFilters,
      alreadySelectedFilters
    );
    if (compareArrayResult) {
      setApplyButtonStatus(true);
    }
  };

  /** Render Input element HTMl */

  return (
    <>
      <div className="search-bar">
        <div className="locator-find-block">
          {allowLocation.length > 0 ? (
            <div className="for-allow">{allowLocation}</div>
          ) : (
            ""
          )}
          <form
            id="SearchBarLabel"
            className="search-form"
            onSubmit={handleSubmit}
          >
            <input
              id="autocomplete-input"
              type="text"
              aria-label="search-form"
              placeholder={StaticData.SearchPlaceholder}
              className="FilterSearchInput w-full"
              ref={inputRef}
              onFocus={(event) => event.target.select()}
              required
            />
            <button
              className="search-btn"
              type="submit"
              id="search-location-button"
              aria-label="search-button"
              data-ya-track={`Locator Search Button Click`}
            >
              {svgIcons.searchIcon}
            </button>
          </form>
        </div>
      </div>
      <div className="locator-buttons">
        <Link
        href="javascript:void(0)"  
          className="loc-btn rocket-btn"
          aria-label="location-button"
          onClick={useMyLocation}
          data-ya-track={`Locator Use My Location Click`}
          eventName={`Locator Use My Location Click`}
        >
          <img src={rocketIMG} alt="useMyLocation" height="24px" width="26px" />
        </Link>

        <button
          className="loc-btn filter-btn"
          aria-label="filter-button"
          onClick={addClass}
          data-ya-track={`Locator Filter Click`}
        >
          <img src={filterIMG} alt="searchFilter" height="23px" width="22px" />
        </button>
      </div>
    </>
  );
}
