import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true,
      default: 3
    },
    brand: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Brand' 
    }, // Relasi ke Brand
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category' 
    }, // Relasi ke Category
    isAvailable: {
      type: Boolean,
      default: true
    },
    description: { 
      type: String 
    },
    directWA: {
      type: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

productSchema.index({ name: 1 });
productSchema.index({ price: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });



const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product

