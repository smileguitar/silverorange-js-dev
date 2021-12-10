import { useCallback, useEffect, useState } from 'react';
import { SERVER_ENDPOINT } from 'consts';
import { Repo } from 'types/Repo';
import dayjs from 'dayjs';

export default function useRepos() {
  // original data recieved from server
  const [, setOriginalData] = useState<Repo[]>([]);
  // sorted/filterd data that is displayed to user
  const [data, setData] = useState<Repo[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const returnData = await fetch(`${SERVER_ENDPOINT}/repos`);
      const reposData = await returnData.json();
      if (returnData.status === 200) {
        setOriginalData(reposData);
        setData(
          reposData.sort((a: Repo, b: Repo) => {
            if (dayjs(a.created_at).isSame(b.created_at)) {
              return 0;
            }
            if (dayjs(a.created_at).isBefore(b.created_at)) {
              return -1;
            }
            return 1;
          })
        );
        setIsError(false);
      } else {
        setOriginalData([]);
        setData([]);
        setIsError(true);
      }
    } catch (e) {
      setOriginalData([]);
      setData([]);
      setIsError(true);
    }
    setIsFetching(false);
  };

  const reFetch = useCallback(() => {
    setIsFetching(true);
    fetchData();
  }, []);

  return { data, isFetching, isError, reFetch };
}
