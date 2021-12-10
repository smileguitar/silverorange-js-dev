import useMostRecentCommit from 'hooks/useMostRecentCommit';
import useReadme from 'hooks/useReadme';
import { Repo } from 'types/Repo';
import './ReportDetail.css';

interface ReportDetailType {
  repo: Repo;
  onGoBack: () => void;
}

export default function ReportDetail({ repo, onGoBack }: ReportDetailType) {
  const { commit, isFetching } = useMostRecentCommit({
    fullname: repo.full_name,
  });

  const { readme, isFetching: isFetchingReadme } = useReadme({
    fullname: repo.full_name,
  });
  console.log(readme);

  return (
    <div className="commit_container">
      <p onClick={onGoBack}>
        <u>{'<< Go back'}</u>
      </p>
      {(isFetching || isFetchingReadme) && <p>Fetching data...</p>}
      {!isFetching && !isFetchingReadme && (
        <div className="commit_detail_container">
          <p>
            <b>Most recent commit date:</b>
            {commit?.commit?.author?.date ?? '-'}
          </p>
          <p>
            <b>Author:</b>
            {commit?.commit?.author?.name ?? '-'}
          </p>
          <p>
            <b>Message:</b>
            {commit?.commit?.message ?? '-'}
          </p>
        </div>
      )}
      {!isFetching && !isFetchingReadme && readme && (
        <>
          <p className="readme_title">README.md</p>
          <div
            className="readme_text"
            // eslint-disable-next-line @typescript-eslint/naming-convention
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        </>
      )}
    </div>
  );
}
