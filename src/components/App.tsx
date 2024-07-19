import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import HeaderTop from "./HeaderTop";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";
import JobList from "./JobList";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import SidebarTop from "./SidebarTop";
import { useDebounce, useJobItems } from "../lib/hooks";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import PaginationControls from "./PaginationControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"relevant" | "recent">("relevant");

  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = totalNumberOfResults / 7;
  const jobItemsSorted = [...jobItems].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * 7 - 7,
    currentPage * 7
  );

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortByChange = (newSortBy: "relevant" | "recent") => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleSortByChange} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            onClick={handlePageChange}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
