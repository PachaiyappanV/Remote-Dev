export default function ResultsCount({
  totalNumberOfResults,
}: {
  totalNumberOfResults: number;
}) {
  return <p className="count">{totalNumberOfResults} results</p>;
}
