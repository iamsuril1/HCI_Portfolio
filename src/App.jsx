import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChooseTopic from "./pages/ChooseTopic";
import ChooseMode from "./pages/ChooseMode";
import QuizPlay from "./pages/QuizPlay";  
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard"; 
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        {/* Protected Routes */}
        <Route
          path="/choose-topic"
          element={
            <PrivateRoute>
              <ChooseTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/mode/:topic"
          element={
            <PrivateRoute>
              <ChooseMode />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:topic/:mode"
          element={
            <PrivateRoute>
              <QuizPlay />
            </PrivateRoute>
          }
        />
        <Route
          path="/result/:topic/:mode"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
