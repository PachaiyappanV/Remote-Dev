export default function ResultsCount({
  totalNumberOfResults,
}: {
  totalNumberOfResults: number | undefined;
}) {
  return <p className="count">{totalNumberOfResults} results</p>;
}
