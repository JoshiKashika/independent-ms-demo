import {
  useSearchActions,
  DisplayableFacetOption,
} from "@yext/search-headless-react";

import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import Facet, { FacetCssClasses } from "./Facet";
import * as React from "react";
import { useEffect } from "react";
import {
  AnswerExperienceConfig,
  radiusFilterDefaultOptions,
  staticFilterItem,
  convertMilesToMeters,
  defaultRadius,
  TEMP_SETTINGS,
  baseurl,
  compareArrays
} from "../../config/globalConfig";
import { GoogleMapRef } from "../commons/GoogleMapContextProvider";

interface FacetsCssClasses extends FacetCssClasses {
  container?: string;
  divider?: string;
  buttonsContainer?: string;
  button?: string;
}

const builtInCssClasses: FacetsCssClasses = {
  searchableInputElement: "filter-popup",
  container: "md:w-full",
  buttonsContainer: "",
  button: " Link btn",
  divider: "w-full h-px bg-gray-200 my-4",
};

export default function Facets(): JSX.Element {
  const milesDropdownRef = React.useRef<HTMLSelectElement | null>(null);
  // const [customFacetsObjects, setCustomFacetsObjects] = React.useState(staticFilterItem);
  const cssClasses = useComposedCssClasses(builtInCssClasses);
  const searchAction = useSearchActions();
  const {
    setSelectedRadius,
    autocompleteInputValue,
    customFacetsObjects,
    setCustomFacetsObjects,
    setAlreadySelectedFilters,
    setApplyButtonStatus,
    alreadySelectedFilters,
    applyButtonStatus,
  } = React.useContext(GoogleMapRef);
  // const [selectedOption, setSelectedOption] = React.useState("");

  const executeSearch = () => {
    searchAction.setOffset(0);
    searchAction.setVerticalLimit(AnswerExperienceConfig.limit);

    /** Set location radius for search */
    const radiusMileToMeter = milesDropdownRef.current?.value
      ? convertMilesToMeters(parseInt(milesDropdownRef.current?.value))
      : defaultRadius;
    searchAction.setLocationRadius(radiusMileToMeter);
    setSelectedRadius(radiusMileToMeter);

    searchAction.setFacets(customFacetsObjects);

    /** Update Query Params */
    const updateQueryParam = new URLSearchParams(window.location.search);
    if (milesDropdownRef.current && milesDropdownRef.current?.value) {
      updateQueryParam.set("r", milesDropdownRef.current?.value);
    }
    const selectedOptions = customFacetsObjects[0].options.filter(
      (option) => option.selected
    );
    const displayValue = selectedOptions.map((option) => option.value);
    if (displayValue.length) {
      updateQueryParam.set("services", displayValue.join("|"));
    } else {
      updateQueryParam.delete("services");
    }
    const newUrl =
      baseurl +
      `${TEMP_SETTINGS.LOCATOR_PAGE_URL}?${updateQueryParam.toString()}`;
    window.history.replaceState({}, "", newUrl);
    if (autocompleteInputValue != undefined) {
      searchAction.executeVerticalQuery();
    }
    document.body.classList.remove("filter");
    const valuesSelected = selectedOptions.map((option) => option.displayName);
    if (valuesSelected.length > 0 || milesDropdownRef.current?.value != "30") {
      const combinedArray = [...valuesSelected, milesDropdownRef.current?.value];
      setAlreadySelectedFilters(combinedArray);
    }
  };

  const handleResetFacets = () => {
    if (milesDropdownRef.current?.value) {
      milesDropdownRef.current.value = "30";
    }
    setCustomFacetsObjects(staticFilterItem);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("features");
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.replaceState({}, "", newUrl);
    setApplyButtonStatus(false);
  };

  const handleFacetOptionChange = (
    fieldId: string,
    option: DisplayableFacetOption
  ) => {
    const changedFilters = customFacetsObjects.map((facetOptions) => {
      return {
        ...facetOptions,
        options: facetOptions.options.map((facetOption) => {
          return {
            ...facetOption,
            count:
              facetOption.value == option.value
                ? option.count
                : facetOption.count,
            selected:
              facetOption.value == option.value
                ? !option.selected
                : facetOption.selected,
          };
        }),
      };
    });

 

    // const facetOptionSelected = changedFilters.some((facetOptions) =>
    //   facetOptions.options.some((facetOption) => facetOption.selected)
    // );
    setCustomFacetsObjects(changedFilters);
    setApplyButtonStatus(false);
    const selectedOptions = changedFilters[0].options
      .filter((option) => option.selected)
      .map((option) => option.displayName);
      if(milesDropdownRef.current?.value==='30' && selectedOptions.length==0){
        setApplyButtonStatus(true);
      }
      if (selectedOptions.length > 0 || milesDropdownRef.current?.value ) {
        const combinedNewArray = [...selectedOptions, milesDropdownRef.current?.value];      
        const compareArrayResult = compareArrays(combinedNewArray, alreadySelectedFilters);
        if(compareArrayResult){
          setApplyButtonStatus(true);
        }
        // else{ setApplyButtonStatus(false);}
      }
      
  };

  let facetComponents: React.ReactElement[];
  const facets = customFacetsObjects;
  
  if (facets.length > 0) {
    facetComponents = facets
      .filter((facet) => facet.options?.length > 0)
      .map((facet) => {
        return (
          <div key={facet.fieldId}>
            <Facet
              facet={facet}
              customCssclasses={cssClasses}
              onToggle={handleFacetOptionChange}
            />
          </div>
        );
      });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const radius = searchParams.get("r");

    if (radius && milesDropdownRef.current) {
      milesDropdownRef.current.value = radius;
    }

    const services = searchParams.get("services")?.split("|");
    if (services && services.length) {
      const changedFilters = staticFilterItem.map((facetOptions) => {
        return {
          ...facetOptions,
          options: facetOptions.options.map((facetOption) => {
            return {
              ...facetOption,
              selected: services.includes(facetOption.value)
                ? true
                : facetOption.selected,
            };
          }),
        };
      });
      setCustomFacetsObjects(changedFilters);
    }
    if((services && services.length) && radius ){
      for (let i = 0; i < services.length; i++) {
        if (services[i] === 'Drive Thru') {
          services[i] = 'Drive-Thru';
          break;
        }
      }
      const combinedArrayOnLoad=[...services, radius];
      setAlreadySelectedFilters(combinedArrayOnLoad);
      const compareArrayResultOnLoad = compareArrays(combinedArrayOnLoad, alreadySelectedFilters);
      if(compareArrayResultOnLoad){
        setApplyButtonStatus(true);
      }
    }
    
    
  }, []);

  const onRadiusSelected = () => {
    // const selectedValue = e.target.value;
    // setSelectedOption(selectedValue);
    setApplyButtonStatus(false);
    const selectedOptions = customFacetsObjects[0].options
      .filter((option) => option.selected)
      .map((option) => option.displayName);
      if(milesDropdownRef.current?.value==='30' && selectedOptions.length==0){
        setApplyButtonStatus(true);
      }
      if (selectedOptions.length > 0 || milesDropdownRef.current?.value ) {
        const combinedNewArray = [...selectedOptions, milesDropdownRef.current?.value];        
        const compareArrayResult = compareArrays(combinedNewArray, alreadySelectedFilters);
        if(compareArrayResult){
          setApplyButtonStatus(true);
        }
      }
    
  }

  return (
    <div className={cssClasses.container + " filter-items"}>
      <div className="midMain">
        <div className="LocatorFilters">
          <div className="LocatorFiltersHeading">Radius</div>
          <select
            ref={milesDropdownRef}
            className="Filter-select"
            onChange={onRadiusSelected}
          >
            {radiusFilterDefaultOptions.map((element, i: number) => {
              return (
                <option key={i} value={element.value}>
                  {element.text}
                </option>
              );
            })}
          </select>
        </div>
        <div className="LocatorFilters-filterWrapper">
          <div className="LocatorFiltersHeading">Services</div>
          <div>{facetComponents}</div>
        </div>
        <div
          className={
            cssClasses.buttonsContainer +
            " filterButtons button-bx LocatorFilters-buttons"
          }
        >
          <button
            onClick={handleResetFacets}
            className={cssClasses.button + " LocatorFilters-button"}
          >
            Reset
          </button>
          <button
            onClick={executeSearch}
            className={cssClasses.button + " LocatorFilters-button-apply"}
            disabled={applyButtonStatus}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
