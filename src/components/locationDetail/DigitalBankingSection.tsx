import * as React from "react";
import { Image } from "@yext/pages/components";
import { DigitalBankingCardProps, ServiceListItemProps } from "../../types/PropTypes";

const DigitalBankingCard = ({ heading, serviceDetails }: DigitalBankingCardProps) => {
    return (
        <div className="Services">
            <div className="container">
                <div className="Services-title">{heading}</div>
                {serviceDetails && (
                    <div className="Services-list l-row">
                        {serviceDetails.map((serviceListItems: ServiceListItemProps,i:number) => {
                            return (
                                <React.Fragment key={i}>
                                    {serviceListItems.title && (
                                        <div className="Services-listItem">
                                            <div className="Service">
                                                <div className="Service-image ObjectFit-container">
                                                    {serviceListItems.image && (<Image
                                                        image={serviceListItems.image}
                                                        className="ObjectFit-image"
                                                    />
                                                    )}
                                                </div>
                                                <div className="Service-infoWrapper Service-infoWrapper--padding">
                                                    <div className="Service-title">{serviceListItems.title}</div>
                                                    <div className="Service-description">{serviceListItems.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
export default DigitalBankingCard;