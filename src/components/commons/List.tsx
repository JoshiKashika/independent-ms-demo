import * as React from "react";
import { CtaData, ListProps } from "../../types/PropTypes";
import { Link } from "@yext/pages/components";

const List = (props: ListProps) => {
  const { list, listItemClassName, linkClassName } = props;
  return (
    <>
      {list.map((item: CtaData | string, i: number) => (
        <li key={i} className={listItemClassName || ""}>
          {typeof item === "string" ? (
            item
          ) : (
            <Link
              href={item.link}
              className={linkClassName || ""}
              data-ya-track={item.label}
              eventName={item.label}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
};

export default List;
