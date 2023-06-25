import { Category } from "./Category/Category";
import { useQuery } from "@tanstack/react-query";
import getAllVideoCategories from "../../../DataFetchers/VideoCategories/getAll";
import { FetchedCategory } from "../../../config/interfaces";
import useFeedStore from "../../../Zustand/feed";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Categories = () => {
    const categories = useFeedStore((state) => state.categories);
    const setCategories = useFeedStore((state) => state.setCategories);
    useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await getAllVideoCategories();
            return response.data.items;
        },
        refetchOnWindowFocus: false,
        onSuccess: (categories: FetchedCategory[]) => {
            setCategories(
                categories.map((category) => ({
                    id: category.id,
                    name: category.snippet.title,
                }))
            );
        },
    });
    return (
        <div className="select-none mx-10 my-[1.2rem] leading-8">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={"12px"}
                loop={false}
                resistance
                resistanceRatio={0}
                className="mySwiper"
            >
                {categories &&
                    categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Category {...category} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};
