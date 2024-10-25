import $axios from "../utils/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchPeoplePage = () => {
  const fetchPeoplePage = ({ pageParam }) => {
    return $axios.get(`people/?page=${pageParam}`);
  };
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["people"],
      queryFn: fetchPeoplePage,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
      select: (data) => {
        const isNextPage = data.pages[data.pages.length - 1].data.next;
        return {
          next: isNextPage,
          pages: [
            ...data.pages.reduce(
              (acc, next) => [...acc, ...next.data.results],
              []
            ),
          ],
          pageParams: [...data.pageParams],
        };
      },
    });

  return { data, hasNextPage, status, isFetching, fetchNextPage };
};

export default useFetchPeoplePage;
