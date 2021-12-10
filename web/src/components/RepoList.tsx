import { Repo } from 'types/Repo';
import './RepoList.css';

interface RepoListType {
  loading: boolean;
  isError: boolean;
  onFetchData: () => void;
  languageList: string[];
  selectedLanguage: string;
  onSelectedLanguageChange: (a: string) => void;
  onSelectedRepoChange: (a: Repo) => void;
  reposData: Repo[];
}

export default function RepoList({
  loading,
  isError,
  onFetchData,
  languageList,
  selectedLanguage,
  onSelectedLanguageChange,
  onSelectedRepoChange,
  reposData,
}: RepoListType) {
  return (
    <>
      {loading && <p>Loading Repos...</p>}
      {!loading && isError && (
        <>
          <p className="error_msg">Network error occured.</p>
          <button className="btn" onClick={onFetchData}>
            Retry
          </button>
        </>
      )}
      {!loading && !isError && (
        <>
          <div className="language_filter_container">
            <p>Filter by language: </p>
            {languageList.map((language) => (
              <button
                className="btn"
                onClick={() => onSelectedLanguageChange(language)}
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
      {!loading &&
        !isError &&
        reposData.map((repo) => (
          <div
            onClick={() => onSelectedRepoChange(repo)}
            className="repo_card"
            key={`${repo.id}-${repo.name}`}
          >
            <p>Name: {repo.name}</p>
            <p>Description: {repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>Forks count: {repo.forks_count}</p>
          </div>
        ))}
    </>
  );
}
