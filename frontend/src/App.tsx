import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddListing from "./components/AddListing";
import Dashboard from "./pages/Dashboard";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import EditListing from "./components/EditListing";
import Listing from "./components/Listing";
import GetMyReservations from "./pages/GetMyReservations";

function App() {
  const { verify, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      verify();
    }
  }, []);

  return (
    <div className="scroll-x-hidden bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard/add-listing"
          element={isAuthenticated ? <AddListing /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/edit/:id"
          element={isAuthenticated ? <EditListing /> : <Navigate to="/" />}
        />
        <Route
          path="/my-reservations"
          element={isAuthenticated ? <GetMyReservations /> : <Navigate to="/" />}
        />
        <Route
          path="/listing/:id"
          element={<Listing />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
