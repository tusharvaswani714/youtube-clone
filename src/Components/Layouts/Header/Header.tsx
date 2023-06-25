import Logo from "./Logo/Logo";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox/SearchBox";
import { useEffect, useState } from "react";
import { SearchBoxDisplayModes } from "../../../config/enums";

const Header = () => {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [searchBoxDisplayMode, setSearchBoxDisplayMode] =
        useState<SearchBoxDisplayModes>(SearchBoxDisplayModes.DEFAULT);
    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 480)
                setSearchBoxDisplayMode(
                    SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK
                );
            else setSearchBoxDisplayMode(SearchBoxDisplayModes.DEFAULT);
        };
        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);
    return (
        <div className="py-8 px-10 flex items-center gap-8 justify-between">
            {((!isSearchBoxOpen &&
                searchBoxDisplayMode ===
                    SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK) ||
                searchBoxDisplayMode === SearchBoxDisplayModes.DEFAULT) && (
                <Link
                    to="/"
                    className="shrink-0 inline-block w-36 cursor-pointer"
                >
                    <Logo />
                </Link>
            )}
            <SearchBox
                searchBoxDisplayMode={searchBoxDisplayMode}
                isSearchBoxOpen={isSearchBoxOpen}
                setIsSearchBoxOpen={setIsSearchBoxOpen}
            />
        </div>
    );
};

export default Header;
