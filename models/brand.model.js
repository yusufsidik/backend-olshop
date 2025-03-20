import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

brandSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})  

brandSchema.index({name: 1})

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema)

export default Brand