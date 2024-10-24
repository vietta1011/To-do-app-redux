import TodoInput from "./components/Body/TodoInput";
import TodoList from "./components/Body/TodoList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "./styles/app/App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <TodoInput />
        <TodoList />
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
