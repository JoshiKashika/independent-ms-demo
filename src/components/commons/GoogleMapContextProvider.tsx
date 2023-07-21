import * as React from "react"
import { createContext, useState } from "react";
import { defaultRadius, staticFilterItem } from "../../config/globalConfig";
import { DisplayableFacet } from "@yext/search-headless-react";


interface ContextType {
    autocompleteInputValue: string,
    setAutocompleteInputValue: (value: string) => void;    
    mapRef: string;
    setMapRef: (value: string) => void;
    showMessageType: string,
    setShowMessageType: (value:string) => void;
    userLatLng: { lat: number, lng: number };
    setUserLatLng: (value:{ lat: number, lng: number }) => void;
    selectedRadius :  number
    setSelectedRadius  : (value:number) => void;
    customFacetsObjects: DisplayableFacet[],
    setCustomFacetsObjects: (value:DisplayableFacet[]) => void;
    selectedVerticalKey: string;
    setSelectedVerticalKey: (value:string) => void;
    alreadySelectedFilters: string[];
    setAlreadySelectedFilters:(value:string[]) => void;
    applyButtonStatus: boolean;
    setApplyButtonStatus:(value:boolean)=> void;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: ContextType = {
  mapRef: "",
  autocompleteInputValue: "",
  showMessageType: "",
  // searchKeyword: "",
  userLatLng: { lat: 0, lng: 0 },
  setAutocompleteInputValue:()=>{/** code */},
  setMapRef: ()=>{/** code */},
  setShowMessageType: ()=>{/** code */},
  // setSearchKeyword:()=>{/** code */},
  setUserLatLng: ()=>{/** code */},
  selectedRadius: 0,
  setSelectedRadius: ()=>{/** code */},
  customFacetsObjects: staticFilterItem,
  setCustomFacetsObjects: ()=>{/** code */},
  selectedVerticalKey : "",
  setSelectedVerticalKey : ()=>{/** code */},
  alreadySelectedFilters:[],
  setAlreadySelectedFilters:()=>{/** code */},
  applyButtonStatus:true,
  setApplyButtonStatus:()=>{/** code */},


};

const GoogleMapRef = createContext<ContextType>(defaultContextValue);



const GoogleMapContextProvider = ({ children }: SearchProviderProps) => {

  const [mapRef, setMapRef] = useState("");
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");
  const [showMessageType, setShowMessageType] = useState("default");
  const [selectedRadius, setSelectedRadius] = useState(defaultRadius);
  const [customFacetsObjects, setCustomFacetsObjects] = useState(staticFilterItem);
  const [selectedVerticalKey, setSelectedVerticalKey] = useState("");
  const [alreadySelectedFilters, setAlreadySelectedFilters]=useState<string[]>([]);  
  const [userLatLng, setUserLatLng] = useState({ lat: 0, lng: 0 });
  const [applyButtonStatus, setApplyButtonStatus] = React.useState(false);

    const value = { 
        mapRef, 
        setMapRef, 
        autocompleteInputValue, 
        setAutocompleteInputValue,
        showMessageType,
        setShowMessageType,        
        userLatLng,
        setUserLatLng,
        alreadySelectedFilters,
        setAlreadySelectedFilters,
        selectedRadius,
        setSelectedRadius,
        customFacetsObjects,
        setCustomFacetsObjects,
        selectedVerticalKey,
        setSelectedVerticalKey,
        applyButtonStatus,
        setApplyButtonStatus,
        
    };
  return (
    <GoogleMapRef.Provider value={value}>
      {children}
    </GoogleMapRef.Provider>
  );
};

export { GoogleMapRef, GoogleMapContextProvider };
