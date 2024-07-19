import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationControls({
  currentPage,
  onClick,
  totalNumberOfPages,
}: {
  currentPage: number;
  onClick: (direction: "prev" | "next") => void;
  totalNumberOfPages: number;
}) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <button
          className="pagination__button pagination__button--back"
          onClick={() => onClick("prev")}
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </button>
      )}

      {totalNumberOfPages > currentPage && (
        <button
          className="pagination__button pagination__button--next"
          onClick={() => onClick("next")}
        >
          <ArrowRightIcon />
          Page {currentPage + 1}
        </button>
      )}
    </section>
  );
}
