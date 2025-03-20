import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  },
  url: { 
    type: String, 
    required: true 
  },
  isPrimary: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image
