import { useInfiniteQuery } from "@tanstack/react-query";
import fetchService from "../services/fetch.service";
import dataService from "../services/data.service";

const useFetchPeoplePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["people"],
      queryFn: fetchService.fetchPeoplePage,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
      select: dataService.pageData,
    });

  return { data, hasNextPage, status, isFetching, fetchNextPage };
};

export default useFetchPeoplePage;
