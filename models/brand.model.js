const brandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

brandSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})  

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema)

export default Brand