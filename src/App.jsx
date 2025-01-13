import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import bgimg from "./Assets/Ellipse8.png";

function App() {
  return (
    <>
      {/* nav */}

      <Navbar />
      <div className="min-h-[calc(100vh-288px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default App;
