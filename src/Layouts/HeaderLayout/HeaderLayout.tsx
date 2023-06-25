import Header from "../../Components/Layouts/Header/Header";
import { Outlet } from "react-router-dom";

export const HeaderLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
