import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderLayout } from "./Layouts/HeaderLayout/HeaderLayout";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Watch from "./Pages/Watch";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="watch" element={<Watch />} />
            </Route>
        </Routes>
    );
};

export default App;
