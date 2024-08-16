import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import BookmarksPopover from "./BookmarksPopover";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !e.target.closest(".bookmarks-btn") &&
        !e.target.closest(".bookmarks-popover")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
  }, []);
  return (
    <section>
      <button className="bookmarks-btn" onClick={() => setIsOpen(!isOpen)}>
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover />}
    </section>
  );
}
