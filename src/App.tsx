import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderLayout } from "./Layouts/HeaderLayout/HeaderLayout";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
            </Route>
        </Routes>
    );
};

export default App;
