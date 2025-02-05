import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
// import bgimg from "./Assets/Ellipse8.png";

function App() {
  return (
    <>
      {/* nav */}

      <Navbar />
      <div className="min-h-[calc(100vh-288px)]">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default App;
