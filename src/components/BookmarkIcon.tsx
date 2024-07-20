import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { useBookmarksContext } from "../lib/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  console.log(bookmarkedIds);
  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
