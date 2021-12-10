import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface UseReadmeType {
  fullname: string;
}

export default function useReadme({ fullname }: UseReadmeType) {
  const [readme, setReadme] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setReadme(null);
    setIsFetching(true);
    fetchLatestCommit(fullname);
  }, [fullname]);

  const fetchLatestCommit = async (name: string) => {
    try {
      const returnData = await fetch(
        `https://raw.githubusercontent.com/${name}/master/README.md`
      );
      if (returnData.status === 200) {
        const readmeDocument = await returnData.text();
        setReadme(marked(readmeDocument));
      } else {
        setReadme(null);
      }
    } catch (e) {
      setReadme(null);
    }
    setIsFetching(false);
  };

  return { readme, isFetching };
}
