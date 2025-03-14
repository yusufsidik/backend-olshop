import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    price: { 
      type: Number, 
      required: true 
    },
    stock: { 
      type: Number, 
      required: true 
    },
    brand: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Brand' 
    }, // Relasi ke Brand
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category' 
    }, // Relasi ke Category
    images: [{ type: String }], // Array URL gambar
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)




const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product

