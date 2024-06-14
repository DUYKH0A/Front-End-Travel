import axios from "axios"
import { REACT_APP_CLOUD_NAME } from "../utils/config";

export const apiUploadImages = (images) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method: "post",
          url: `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,      
          data: images
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  };