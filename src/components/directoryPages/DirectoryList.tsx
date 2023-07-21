import * as React from "react";
import { DirectoryParent } from "../../types/DirectoryParent";
import { DirectoryChild } from "../../types/DirectoryChild";
import { slugify } from "../../config/globalConfig";
import { MetaData } from "../../types/PropTypes";
import { Address } from "../../types/Address";
import { Link } from "@yext/pages/components";

type DirectoryListProps = {
  name : string;
  key : string;
  dm_directoryParents : DirectoryParent[];
  dm_directoryChildren : DirectoryChild[];
  baseUrl : string;
  meta : MetaData;
}
interface DirectoryChildren{
  address : Address
}

const sortByName = (
  previousDirectoryListValue: DirectoryParent | DirectoryChild,
  currentDirectoryListValue: DirectoryParent | DirectoryChild
) => {
  return previousDirectoryListValue.name < currentDirectoryListValue.name ? -1 : previousDirectoryListValue.name > currentDirectoryListValue.name ? 1 : 0;
};

const DirectoryList = (props: DirectoryListProps) => {

  let sortedChildren;
  const { dm_directoryChildren, baseUrl, meta } = props;
  if (dm_directoryChildren) {
    sortedChildren = dm_directoryChildren?.sort(sortByName) || [];
  }
const pageName=meta.entityType.id.replace(/^ce_/, '');

  return (
    <>
      {sortedChildren?.map((child: DirectoryChild, i:number) => {
        let slug_value;
        if(meta.entityType.id == "ce_region"){
          if(child.dm_baseEntityCount === '1'){
            {child.dm_directoryChildren && child.dm_directoryChildren.map((res: DirectoryChildren)=>{
              slug_value = `${slugify(res.address.region)}/${slugify(res.address.city)}/${slugify(res.address.line1)}`;
            })}
          }else {
            slug_value = child.slug;
          }
        }else {
          slug_value = child.slug;
        }
        return (
          <li key={i} className="Directory-listItem">
            <Link 
            href={baseUrl + slug_value}
            data-ya-track={`${pageName} list click`}
            eventName={`list click`}
            >
              {child.c_addressRegionDisplayName ? child.c_addressRegionDisplayName : child.name} 
              <span>({child.dm_baseEntityCount})</span>
            </Link>
          </li>
        )
      })}
    </>
  )

}

export default DirectoryList;
