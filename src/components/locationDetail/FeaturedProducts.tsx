import * as React from "react";
import Cta from "../commons/Cta";
import { FeaturedProductProps, ProductListProps } from "../../types/PropTypes";

const FeaturedProducts = (props: FeaturedProductProps) => {
  const { heading, productList } = props;
  return (
    <div className="Products">
      <div className="container">
        <div className="Products-container">
          <div className="Products-title">{heading}</div>
          {productList && (
            <div className="Products-list">
              {productList.map((productitems: ProductListProps, i: number) => {
                return (
                  <React.Fragment key={i}>
                    {productitems.title && productitems.description ? (
                      <div className="Products-listItem">
                        <div className="Product-title">
                          {productitems.title}
                        </div>
                        <div className="Product-description">
                          {productitems.description}
                        </div>
                        {productitems.cTA &&
                        productitems.cTA.label &&
                        productitems.cTA.link ? (
                          <Cta
                            buttonText={productitems.cTA.label}
                            url={productitems.cTA.link}
                            target="_blank"
                            dataTrackText={`Location Product ${productitems.title} CTA`}
                            eventName={`Location Product ${productitems.title} CTA`}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FeaturedProducts;
