import "./App.css";
import { Nav } from "./components/nav/Nav";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Nav />
      <Header />
      <EmployeeList />
      <Footer />
    </>
  );
}

export default App;
