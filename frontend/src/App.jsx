import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ControleUsuarios from "./pages/ControleUsuarios";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<ControleUsuarios />} />
            </Routes>
        </Router>
    );
};

export default App;
