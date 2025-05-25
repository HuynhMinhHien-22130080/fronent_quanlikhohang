import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductManagement from "./components/ProductManagement";

function App() {
  return (
    <Router>
      <div className="app">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ProductManagement />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Quản Lý Kho Hàng. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
