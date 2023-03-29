import cloudinary from "cloudinary";

const uploadImage = async (img) => {
  let url = [];

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (Array.isArray(img)) {
    url = img.map(async (im) => {
      let res = await cloudinary.uploader.upload(im?.tempFilePath, {
        public_id: "123",
      });
      return cloudinary.url(res?.secure_url, {
        width: 100,
        height: 150,
        Crop: "fill",
      });
    });

    url = Promise.all(url);
  } else {
    let res = await cloudinary.uploader.upload(img?.tempFilePath, {
      public_id: "123",
    });

    url.push(
      cloudinary.url(res?.secure_url, {
        width: 100,
        height: 150,
        Crop: "fill",
      })
    );
  }

  return url;
};

export default uploadImage;
