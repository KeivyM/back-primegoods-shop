import Product from "../models/Product.js";
import uploadImage from "../utils/uploadImg.js";

export async function CreateProduct(req, res) {
  // console.log(req.files);
  console.log(req);
  try {
    const { title, price, category, description } = req.body;
    //validar extension de las imagenes
    if (!req.files) throw "no hay imagen";
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
      message: "Product created successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({
      status: 404,
      error,
    });
  }
}

export async function GetProducts(req, res) {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error,
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
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error,
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
      data: "eliminando",
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error,
    });
  }
}
