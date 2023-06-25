import { Images } from "../config/types";

const getMaxResolutionImage = (images: Images) => {
    let maxResolutionImageURL = null,
        maxResolution = 0;
    for (const resolutionKey in images) {
        const image = images[resolutionKey];
        const resolution = image.width * image.height;
        if (resolution > maxResolution) {
            maxResolution = resolution;
            maxResolutionImageURL = image.url;
        }
    }
    return {
        maxResolutionImageURL,
        maxResolution,
    };
};

export default getMaxResolutionImage;
