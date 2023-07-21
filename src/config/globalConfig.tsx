import { Matcher } from "@yext/search-headless-react";
import { Address } from "../types/locations";
import { AddressComponent } from "../types/AddressComponentType";


/** 
 * Anwser Search Configuration
 */
export const AnswerExperienceConfig = {
  limit:50,
  locale: "en",
  verticalKey : "locations",
  apiKey : "ee4600854cf5501c53831bf944472e57",
  experienceKey : "independent-financial-search",
  experienceVersion: "STAGING",
  locationRadius: 48240,
  sessionTrackingEnabled: true,
  endpoints: {
    universalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi.yext.com/v2/accounts/me/answers/filtersearch",
    entitiesSearch: "https://liveapi.yext.com/v2/accounts/me/entities/geosearch"
  }
}

export const AnalyticsEnableDebugging  = true;
export const AnalyticsEnableTrackingCookie  = true;


export const Week: { [key: number]:string }= {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday"
};

export function compareArrays(array1:string[], array2:string[]) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Sort the arrays
  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();

  // Compare the elements
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  // If all elements are equal, the arrays are equal
  return true;
}
export const favicon = "https://locations.ifinancial.com/permanent-b0b701/assets/images/favicon.a42a526e.ico"
export const defaultRadius = (30 * 1609.34);

interface staticFilterItemOptionsProp {
  displayName: string
  count: number
  selected : boolean
  matcher : string
  value : string
}
export interface staticFilterItemProps {
  fieldId: string,
  displayName: string
  options: staticFilterItemOptionsProp[]
}

/* 
  google map custom style
*/
export const staticFilterItem  = [
  {
    "fieldId": "services",
    "displayName": "Location Page Services",
    "options": [
      {
        "displayName": "Drive-Thru",
        "count": 0,
        "selected": false,
        "matcher": Matcher.Equals,
        "value": "Drive Thru"
      },
      {
        "displayName": "Night Drop",
        "count": 0,
        "selected": false,
        "matcher": Matcher.Equals,
        "value": "Night Drop"
      },
      {
        "displayName": "Notary",
        "count": 0,
        "selected": false,
        "matcher": Matcher.Equals,
        "value": "Notary"
      },
      {
        "displayName": "Safe Deposit",
        "count": 0,
        "selected": false,
        "matcher": Matcher.Equals,
        "value": "Safe Deposit"
      }
    ]
  }
];

export const radiusFilterDefaultOptions = [
  {
    text: "30 miles",
    value: "30"
  },
  {
    text: "50 miles",
    value: "50"
  }
];

export const slugify = (str:string) => {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  str = str.replace(/[^\w\s-]/g, '');
  str = str.replace(/[\s_-]+/g, '-');
  return str;
}

/** 
 * Google Map API
 */
export const googleMapsApiKey = YEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


/** 
 * Code for convert miles to meters
 */
export const convertMilesToMeters = (value:number) => {  
  return (value * 1609.344); // 1 mile = 1609.344 meters
};

/** 
 * Code for convert meters to miles
 */
export const convertMetersToMiles = (value:number) => {  
  const valueMeter= (value * 0.000621371); // 1 meter = 0.000621371 meters
  return valueMeter.toFixed(2)
};

export const center_latitude=37.0902;
export const center_longitude=-95.7129;

export const locationUrl=(metaEntityType:string,address:Address)=>{
  if(address.region && address.city && address.line1 ){
    const url= `${slugify(address.region)}/${slugify(address.city)}/${slugify(address.line1)}`;
    return metaEntityType=='atm' ? `${url}/atm` : url;
  } 
}


export const TEMP_SETTINGS = {
  LOCATOR_PAGE_URL: "search"
};

export const baseurl= YEXT_PUBLIC_BASE_URL;
export const robotTagStatus = YEXT_PUBLIC_ROBOT_TAGS_STATUS;

// window.location.href =
export const getSearchRedirectionUrl = (lat:number, lng:number, address?: string, sm?:string, country?:string, region?:string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("q", `${lat},${lng}`);
  address && searchParams.set("qp", address);
  sm && searchParams.set("sm", sm);
  country && searchParams.set("country", country);
  region && searchParams.set("region", region);  
  return baseurl +`${TEMP_SETTINGS.LOCATOR_PAGE_URL}?${searchParams.toString()}`;
}

// window.location.href =
export const getNewUrl = (items:{key:string, value:string}[]) => {
  const searchParams = new URLSearchParams(window.location.search);
  for (const item of items) {
    searchParams.set(item.key, item.value);
  }
  return baseurl +`${TEMP_SETTINGS.LOCATOR_PAGE_URL}?${searchParams.toString()}`;
}


export const getSearchMessage = (address_component:AddressComponent[]) => {
  const message = [];
  for (const addres of address_component) {
    if(addres.types.includes('locality')){
      message.push(addres.long_name);
    }
    if(addres.types.includes('administrative_area_level_1')){
      const shortMessageA: string = message.length == 1 ? addres.short_name : addres.long_name;
      message.push(shortMessageA);
    }
    if(addres.types.includes('country')){ 
      if(message.length !== 2){
        const shortMessage = addres.short_name == "US" ? "USA" : addres.long_name;
        message.push(shortMessage);
      }
    }
  }
  return message.join(', ');
};


export const getCompomentCodes = (address_component:AddressComponent[]) => {
  const toReturn:{ region: string, country: string } = {region:"", country:""};

  if(address_component.length <= 2){
    for (const addressItem of address_component) {
        if(addressItem.types.includes('administrative_area_level_1')){
          toReturn['region'] = addressItem.short_name;
        }
        if(addressItem.types.includes('country')){
          toReturn['country'] = addressItem.short_name;
        }
    }
    return toReturn;
  }else{
    return null;
  }
}



export const CalulateDistance = (lat1:number, lon1:number, lat2:number, lon2:number) => {
  
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
    dist = convertMilesToMeters(dist); 
		return dist;
	}
}