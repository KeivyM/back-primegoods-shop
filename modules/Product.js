import Product from "../models/Product.js";
import uploadImage from "../utils/uploadImg.js";

export async function CreateProduct(req, res) {
  try {
    const { title, price, category, description } = req.body;

    if (!req.files) throw "Image is required";
    if (!title || (!price && price < 0) || !category || !description) {
      throw "Please fill all the fields";
    }

    const images = await uploadImage(req?.files?.images);

    const unixTime = Math.floor(new Date().getTime() / 1000);

    const product = new Product({
      title,
      price,
      category,
      description,
      images,
      createdAt: unixTime,
    });

    await product.save();

    res.status(201).json({
      status: 201,
      data: product,
      msg: "Product created successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({
      status: 404,
      msg: error,
    });
  }
}

export async function GetProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      msg: error,
    });
  }
}

export async function GetOneProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json({
      status: 200,
      data: product,
      msg: "Successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      msg: error,
    });
  }
}

export async function DeleteProduct(req, res) {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    console.log(product);

    res.status(200).json({
      status: 200,
      msg: "deleting",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      msg: error,
    });
  }
}
