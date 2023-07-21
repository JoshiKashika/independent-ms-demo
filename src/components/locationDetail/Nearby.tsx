import * as React from "react";
import Cta from "../commons/Cta";
import TeaserLocationCard from "../commons/TeaserLocationCard";
import { NearbyProps, TreaserDetailProps} from "../../types/PropTypes";

 const Nearby=(props: NearbyProps) =>{
  return (
    <>
      {props.externalApiData.response.entities.length !== 0 ?
        <div className="Nearby Nearby--ace">
          <div className="container">
            <div className="Nearby-row">
              <h2 className="Nearby-title">Nearby Locations</h2>
            </div>
            <ul className="Nearby-locs Nearby-row Nearby-row--widen">
              {props.externalApiData.response.entities.map((nearbyitems: TreaserDetailProps,i:number) => {
                return (
                  <React.Fragment key={i}>
                    <li className="Nearby-loc">
                      <TeaserLocationCard 
                      teaserDetails={nearbyitems}
                      basePath={props.relativepath}
                      />
                    </li>
                  </React.Fragment>
                )
              })
              }
            </ul>
            <div className="Nearby-row">
              <div className="Nearby-linkWrapper">
                <Cta
                  buttonText="Find a Location"
                  url={`${props.relativepath}search`}
                  dataTrackText="Nearby Find Location CTA"
                  eventName="Nearby Find Location CTA"
                  className="Nearby-link"
                  target="_self"
                />
              </div>
            </div>
          </div>
        </div>
         : <></>} 
    </>
  )
}
export default Nearby;
