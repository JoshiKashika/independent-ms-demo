export type AddressComponent = {
    long_name: string;
    short_name: string;
    types: string[];
  };
  
  type Northeast = {
    lat: number;
    lng: number;
  };
  
  type Southwest = {
    lat: number;
    lng: number;
  };
  
  type Bounds = {
    northeast: Northeast;
    southwest: Southwest;
  };
  
  type LocationData = {
    lat: number;
    lng: number;
  };
  
  type Viewport = {
    northeast: Northeast;
    southwest: Southwest;
  };
  
  type Geometry = {
    bounds: Bounds;
    location: LocationData;
    location_type: string;
    viewport: Viewport;
  };
  
 export  type AddressObjectResult = {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
  };
  
  export type AddressObject = AddressObjectResult[];
  export type userAddressObject = {
    results:AddressObjectResult[]
  }