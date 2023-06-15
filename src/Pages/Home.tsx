import { useEffect } from "react";
import { Categories } from "../Components/Home/Categories/Categories";
import Feed from "../Components/Home/Feed/Feed";
import useFeedStore from "../Zustand/feed";

const Home = () => {
    const resetStore = useFeedStore((state) => state.resetStore);
    useEffect(() => {
        return resetStore;
    }, [resetStore]);
    return (
        <div>
            <Categories />
            <Feed />
        </div>
    );
};

export default Home;
