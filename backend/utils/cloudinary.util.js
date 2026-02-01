import v2 from "../config/cloudinary.config.js";

export const uploadImage = async (dataURL) => {
  if (!dataURL) return null;
  let result = await v2.uploader.upload(dataURL, {
    folder: "BlogApp",
    resource_type: "image",
  });

  // if (result) {
  //   fs.unlinkSync(filePath);
  // }

  return result;
};

export const deleteImage = async (id) => {
  console.log("delete");
  let result = await v2.uploader.destroy(id);
  console.log("result: ", result);
  return result;
};
