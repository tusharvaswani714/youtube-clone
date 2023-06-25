import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { SearchBoxDisplayModes } from "../../../../config/enums";
import classNames from "classnames";
import IconButton from "../../../Global/IconButton/IconButton";

interface SearchBoxProps {
    searchBoxDisplayMode: SearchBoxDisplayModes;
    isSearchBoxOpen: boolean;
    setIsSearchBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBox = ({
    searchBoxDisplayMode,
    isSearchBoxOpen,
    setIsSearchBoxOpen,
}: SearchBoxProps) => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    return (
        <div
            className={classNames("flex", {
                "flex-1 max-w-4xl":
                    searchBoxDisplayMode === SearchBoxDisplayModes.DEFAULT,
                "w-full":
                    searchBoxDisplayMode ===
                        SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK &&
                    isSearchBoxOpen,
            })}
        >
            {isSearchBoxOpen &&
                searchBoxDisplayMode ===
                    SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK && (
                    <IconButton className="text-4xl mr-4">
                        <HiArrowLeft
                            onClick={() => setIsSearchBoxOpen(false)}
                        />
                    </IconButton>
                )}
            {((isSearchBoxOpen &&
                searchBoxDisplayMode ===
                    SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK) ||
                searchBoxDisplayMode === SearchBoxDisplayModes.DEFAULT) && (
                <>
                    <input
                        placeholder="Search"
                        className="flex-1 px-6 py-3 bg-primary-dark-800 rounded-l-[4rem] border-[0.1rem] border-primary-dark-600 leading-10 placeholder:leading-10 text-[1.6rem] placeholder:text-[1.6rem] font-normal placeholder:font-normal text-[rgba(255,255,255,0.88)] placeholder:text-primary-light-700"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            searchInput && navigate(`/search?q=${searchInput}`)
                        }
                        className="w-24 flex items-center justify-center bg-primary-dark-700 border-[0.1rem] border-primary-dark-600 rounded-r-[4rem] text-primary-light-900 text-3xl"
                    >
                        <BsSearch />
                    </button>
                </>
            )}
            {!isSearchBoxOpen &&
                searchBoxDisplayMode ===
                    SearchBoxDisplayModes.SHOW_ON_BUTTON_CLICK && (
                    <IconButton className="text-3xl">
                        <BsSearch onClick={() => setIsSearchBoxOpen(true)} />
                    </IconButton>
                )}
        </div>
    );
};

export default SearchBox;
