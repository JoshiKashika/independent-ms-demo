import { useSearchState} from "@yext/search-headless-react";

const useFetchResults = () => {
  const locationResults = useSearchState(s => s.vertical.results) || [];
  return locationResults;
};

export default useFetchResults;
