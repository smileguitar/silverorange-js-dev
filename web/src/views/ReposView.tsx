import useRepos from 'hooks/useRepos';
import { useEffect, useState } from 'react';
import './ReposView.css';

export default function ReposView() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const {
    data: reposData,
    originalData,
    isError,
    isFetching,
    reFetch,
  } = useRepos({
    languageFilter: selectedLanguage,
  });

  const [languageList, setLanguageList] = useState<string[]>([]);

  useEffect(() => {
    if (originalData && originalData.length > 0) {
      const list = originalData
        .map((repo) => repo.language)
        .sort()
        .filter((item, pos, ary) => {
          return !pos || item !== ary[pos - 1];
        });
      list.unshift('All');
      setLanguageList(list);
    } else {
      setLanguageList([]);
    }
  }, [originalData]);

  return (
    <div className="container">
      {isFetching && <p>Loading Repos...</p>}
      {!isFetching && isError && (
        <>
          <p className="error_msg">Network error occured.</p>
          <button className="btn" onClick={reFetch}>
            Retry
          </button>
        </>
      )}
      {!isFetching && !isError && (
        <>
          <div className="language_filter_container">
            <p>Filter by language: </p>
            {languageList.map((language) => (
              <button
                className="btn"
                onClick={() => setSelectedLanguage(language)}
                key={language}
              >
                {language}
              </button>
            ))}
          </div>
          {selectedLanguage !== 'All' && (
            <p>Active filter: {selectedLanguage}</p>
          )}
        </>
      )}
      {!isFetching &&
        !isError &&
        reposData.map((repo) => (
          <div className="repo_card" key={repo.id}>
            <p>name: {repo.name}</p>
            <p>description: {repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>created_at: {repo.created_at}</p>
          </div>
        ))}
    </div>
  );
}
