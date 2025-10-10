import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
import { EmployeeList } from "./components/employee-list/EmployeeList"; // if you really want this always visible
import { Footer } from "./components/footer/footer";
import Header from "./components/header/Header";
import EmployeePage from "./pages/participants/EmployeePage";
import { MyOrganization as OrganizationPage } from "./pages/events/OrganizationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Header />
      <EmployeeList />

      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="*" element={<EmployeePage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
