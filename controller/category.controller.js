import mongoose from "mongoose";
import Category from "../models/category.model.js";

const getAllCategory = async (req, res) => {
  const categories = await Category.find().lean().populate("parentCategory");

  res.status(200).json({ message: "All Categories", data: categories });
}

const getCategoriesWithManySubcategories = async (req, res) => {
  try {
      // Aggregation pipeline untuk menghitung jumlah subkategori
      const result = await Category.aggregate([
          {
            $lookup: {
              from: 'categories', // Nama koleksi yang sama (self-referencing)
              localField: '_id',
              foreignField: 'parentCategory',
              as: 'subcategories',
            },
          },
          {
            $project: {
              name: 1, // Tampilkan nama kategori
              subcategoryCount: { $size: '$subcategories' }, // Hitung jumlah subkategori
            },
          },
          {
            $match: {
              subcategoryCount: { $gt: 0 }, // Hanya tampilkan kategori yang memiliki subkategori
            },
          },
          {
            $sort: { subcategoryCount: -1 }, // Urutkan berdasarkan jumlah subkategori (terbanyak ke terkecil)
          },
      ]);

      // console.log(result)
      res.status(200).json({ message: "Success get Categories with many subcategories:", data: result });
  } catch (error) {
      res.status(500).json({ message: "Error retrieving category", error: error.message });
  }
};

const getCategoriesWithSubcategories = async (req, res) => {
  try {
      // Aggregation pipeline untuk mengambil kategori dan subkategorinya
      const result = await Category.aggregate([
          {
              $lookup: {
                  from: 'categories', // Nama koleksi yang sama (self-referencing)
                  localField: '_id',
                  foreignField: 'parentCategory',
                  as: 'subcategories',
              },
          },
          {
              $match: {
                  subcategories: { $exists: true, $not: { $size: 0 } }, // Hanya kategori yang memiliki subkategori
              },
          },
          {
              $project: {
                  name: 1, // Tampilkan nama kategori
                  subcategories: {
                      $map: {
                          input: '$subcategories',
                          as: 'sub',
                          in: '$$sub.name', // Ambil hanya nama subkategori
                      },
                  },
              },
          },
      ]);

      res.status(200).json({ message: "Categories with subcategories:", data: result });
  } catch (error) {
      res.status(500).json({ message: "Error categories with subcategories", error: error.message });
  }
};


const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentCategory").lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Success get Category", data: category });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving category", error: error.message });
  }
}

const createCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const newCategory = await Category.create({ name, parentCategory: parentCategory || null });
    res.status(200).json({ message: "Success Add Category", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error: error.message });
  }
}


const deleteCategory = async (req, res) => {
  // Delete the category by ID
  const category = await Category.findByIdAndDelete(req.params.id);

  // If the category is a parent category, update its children to have null as their parent
  if (category.parentCategory === null) {
    await Category.updateMany(
      { parentCategory: category._id },
      { $set: { parentCategory: null } }
    );
  }

  // Send response to the client
  res.status(200).json({
    message: "Success Delete Category",
    data: category
  });
}


export { getAllCategory, getCategory, createCategory, deleteCategory, getCategoriesWithManySubcategories, getCategoriesWithSubcategories }