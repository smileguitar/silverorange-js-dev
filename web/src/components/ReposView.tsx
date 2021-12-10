import RepoList from 'components/RepoList';
import ReportDetail from 'components/ReportDetail';
import useRepos from 'hooks/useRepos';
import { useEffect, useState } from 'react';
import { Repo } from 'types/Repo';
import './ReposView.css';

export default function ReposView() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

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
      {selectedRepo && (
        <ReportDetail
          repo={selectedRepo}
          onGoBack={() => setSelectedRepo(null)}
        />
      )}
      {!selectedRepo && (
        <RepoList
          loading={isFetching}
          isError={isError}
          onFetchData={reFetch}
          languageList={languageList}
          selectedLanguage={selectedLanguage}
          onSelectedLanguageChange={setSelectedLanguage}
          onSelectedRepoChange={setSelectedRepo}
          reposData={reposData}
        />
      )}
    </div>
  );
}
