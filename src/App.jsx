import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
// import bgimg from "./Assets/Ellipse8.png";

function App() {
  return (
    <>
      {/* nav */}
      <div className="bg-gradient-to-b from-primary-800 to-primary-900">
        <Navbar />
      </div>
      {/* nav */}

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
