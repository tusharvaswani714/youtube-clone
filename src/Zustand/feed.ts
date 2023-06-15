import { create } from "zustand";
import { Category } from "../config/interfaces";

interface FeedState {
    categories?: Category[];
    setCategories: (categories?: Category[]) => void;
    selectedCategory?: number;
    setSelectedCategory: (selectedCategory?: number) => void;
    resetStore: () => void;
}

const initialState = {
    categories: undefined,
    selectedCategory: undefined,
};

const useFeedStore = create<FeedState>()((set) => ({
    ...initialState,
    setCategories: (categories) => set({ categories }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    resetStore: () => set(initialState),
}));

export default useFeedStore;
