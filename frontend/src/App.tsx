import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import VideoList from "./components/videos/VideoList";
import Header from "./components/layout/Header";
import { AuthProvider } from "./contexts/AuthProvider";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<VideoList />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
