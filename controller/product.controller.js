import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";


const getAllProduct = async (req, res) => {
  try {
    const brandId = await Brand.findOne({ name: "Lenovo" }, '_id').lean()
    const products = await Product.find({ brand: brandId }).populate("brand").populate("category").lean()
    res.status(200).json({ message: "All Product", data: products })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error: error.message })
  }
}


const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({ message: "Data product", data: product })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error: error.message })
  }
} 

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(200).json({ message: "Success Add Product", data: newProduct })
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message })
  }
}


export {getAllProduct, createProduct, getProduct}