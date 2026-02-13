import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import CustomCursor from "./components/CustomCursor"; // Add this line

function App() {
  return (
    <>
      <CustomCursor /> {/* Also fixed the spelling - it's CustomCursor */}
      <Navbar />
      <Hero />
      <Cards/>
    </>
  );
}

export default App;