import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    parentCategory: { // Relasi ke kategori induk
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',
      default: null
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


categorySchema.index({name: 1})
categorySchema.index({parentCategory: 1})


const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

export default Category

