import { useActiveId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobItem[];
  isLoading: boolean;
}) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems?.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === Number(activeId)}
          />
        ))}
    </ul>
  );
}

export default JobList;
