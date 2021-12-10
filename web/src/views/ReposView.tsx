import useRepos from 'hooks/useRepos';
import './ReposView.css';

export default function ReposView() {
  const { data: reposData, isError, isFetching, reFetch } = useRepos();
  return (
    <div className="container">
      {isFetching && <p>Loading Repos...</p>}
      {!isFetching && isError && (
        <>
          <p className="error_msg">Network error occured.</p>
          <button onClick={reFetch}>Retry</button>
        </>
      )}
      {!isFetching &&
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
