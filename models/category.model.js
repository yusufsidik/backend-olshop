import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    parentCategory: { // Relasi ke kategori induk
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category' 
    }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
)

categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

export default Category

