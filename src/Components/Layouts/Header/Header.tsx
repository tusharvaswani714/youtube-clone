import Logo from "./Logo/Logo";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox/SearchBox";

const Header = () => {
    return (
        <div className="py-8 px-10 flex items-center justify-between">
            <Link to="/" className="inline-block w-36 cursor-pointer">
                <Logo />
            </Link>
            <SearchBox />
            <div></div>
        </div>
    );
};

export default Header;
