import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TodoPage from "./pages/TodoPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<MainPage />} />
        <Route path="tasks" element={<TodoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="quiz" element={<QuizPage />} />
      </Route>
    </Routes>
  );
};

export default App;
