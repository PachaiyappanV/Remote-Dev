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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedValue);

  const totalNumberOfResults = jobItems.length;

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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
