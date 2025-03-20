import Brand from "../models/brand.model.js"


const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find().lean();
    res.status(200).json({ message: "All Brand", data: brands });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving brands", error: error.message });
  }
}

const createBrand = async (req, res) => {
  
  try {
    const newBrand = new Brand({name: req.body.name})
    const brand = await newBrand.save()
    res.status(200).json({message: "Sucsess Add Brand", data: brand})
  } catch (error) {
    res.status(500).json({ message: "Error adding brand", error: error.message });
  }
}

const deleteBrand = async (req, res) => {
  const deletedBrand = await Brand.findByIdAndRemove(req.params.id)

  if (!deletedBrand) {
    return res.status(404).json({ message: "Brand not found" })
  }

  res.status(200).json({ message: "Brand has been deleted", data: deletedBrand })
}

export { getAllBrand, createBrand, deleteBrand }