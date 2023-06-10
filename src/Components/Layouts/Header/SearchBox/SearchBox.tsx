import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex max-w-4xl">
            <input
                placeholder="Search"
                className="flex-1 px-6 py-3 bg-primary-dark-800 rounded-l-[4rem] border-[0.1rem] border-primary-dark-600 leading-10 placeholder:leading-10 text-[1.6rem] placeholder:text-[1.6rem] font-normal placeholder:font-normal text-[rgba(255,255,255,0.88)] placeholder:text-primary-light-700"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
                onClick={() => navigate(`/search?q=${searchInput}`)}
                className="w-24 flex items-center justify-center bg-primary-dark-700 border-[0.1rem] border-primary-dark-600 rounded-r-[4rem] text-primary-light-900 text-3xl"
            >
                <BsSearch />
            </button>
        </div>
    );
};

export default SearchBox;
