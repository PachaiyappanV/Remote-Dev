import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, [searchText]);

  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container />
      <Footer />
    </>
  );
}

export default App;
