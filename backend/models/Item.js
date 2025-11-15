import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
