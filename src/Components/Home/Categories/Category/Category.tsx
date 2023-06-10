import classNames from "classnames";
import useFeedStore from "../../../../Zustand/feed";
import { Category as CategoryProps } from "../../../../config/interfaces";

export const Category = ({ id, name }: CategoryProps) => {
    const setSelectedCategory = useFeedStore(
        (state) => state.setSelectedCategory
    );
    const isCategorySelected = useFeedStore(
        (state) => state.selectedCategory === id
    );
    return (
        <button
            onClick={() => setSelectedCategory(id)}
            className={classNames(
                "px-[1.2rem] py-2 text-[1.4rem] font-normal text-primary-light-900 bg-[rgba(255,255,255,0.1)] rounded-[0.8rem] transition-colors duration-500 ease-[cubic-bezier(0.05,0,0,1)] hover:bg-[rgba(255,255,255,0.2)] whitespace-nowrap",
                {
                    "bg-primary-light-900 !text-primary-dark-900 hover:bg-primary-light-900":
                        isCategorySelected,
                }
            )}
        >
            {name}
        </button>
    );
};
