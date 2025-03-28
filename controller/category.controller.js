import Category from "../models/category.model.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().lean().populate("parentCategory");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.message || "Error retrieving category");
  }


}

export const getCategoriesWithManySubcategories = async (req, res) => {
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
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json(error.message || "Error retrieving category");
  }
};

export const getCategoriesWithSubcategories = async (req, res) => {
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
            $project: {
              name: 1, // Tampilkan nama kategori
              subcategories: {
                $ifNull: [
                  {
                    $map: {
                      input: '$subcategories',
                      as: 'sub',
                      in: '$$sub.name', // Ambil hanya nama subkategori
                    },
                  },
                  [],
                ],
              },
            },
          },
          {
            $sort: { subcategories: -1 }, // Urutkan berdasarkan jumlah subkategori (terbanyak ke terkecil)
          }
      ]);
      // console.log(result)
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json(error.message || "Error retrieving category");
  }
};


export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentCategory").lean();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error.message || "Error retrieving category");
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    const newCategory = await Category.create({ name, parentCategory: parentCategory || null });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export const editCategory = async (req, res) => {
  try {
    const { _id, name, parentCategory } = req.body;
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    category.parentCategory = parentCategory || null;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
}


export const deleteCategory = async (req, res) => {
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
  res.status(200).json(category);
}
