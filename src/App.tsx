import "./App.css";
import { Routes, Route } from "react-router";
import { Nav } from "./components/nav/Nav";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/Header";
import { EmployeesPage } from "./pages/participants/EmployeePage";
import { OrganizationPage } from "./pages/events/OrganizationPage";

export default function App() {
  return (
    <>
      <Nav />
      <Header />
      <EmployeeList />
      <Routes>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="*" element={<EmployeesPage />} />
         </Routes>
      <Footer />
    </>
  );
}
