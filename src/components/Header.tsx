import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";

export default function Header({ searchText, setSearchText }) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </header>
  );
}
