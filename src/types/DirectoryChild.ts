import { Address } from "./Address";

export interface DirectoryChild {
  dm_directoryChildren: [];
  name: string;
  address: Address;
  mainPhone: string;
  slug: string;
  c_addressRegionDisplayName?: string;
  dm_childEntityIds?: string[];
  dm_baseEntityCount: string;
}
