import { useEffect, useState } from 'react';
import { CommitDetail } from 'types/CommitDetail';

interface UseMostRecentCommitType {
  fullname: string;
}

export default function useMostRecentCommit({
  fullname,
}: UseMostRecentCommitType) {
  const [commit, setCommit] = useState<CommitDetail | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setCommit(null);
    setIsFetching(true);
    fetchLatestCommit(fullname);
  }, [fullname]);

  const fetchLatestCommit = async (name: string) => {
    try {
      const returnData = await fetch(
        `https://api.github.com/repos/${name}/commits`
      );
      if (returnData.status === 200) {
        const commitsList = await returnData.json();
        if (commitsList.length > 0) {
          setCommit(commitsList[0]);
        } else {
          setCommit(null);
        }
      } else {
        setCommit(null);
      }
    } catch (e) {
      setCommit(null);
    }
    setIsFetching(false);
  };

  return { commit, isFetching };
}
