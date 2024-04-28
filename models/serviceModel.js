import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail:{type:String, required:true},
  description: { type: String,},
  price: { type: Number, required: true, },
  discountPercentage: { type: Number,required: true },
  rating: { type: Number },
  serviceCapacity: { type: Number,},
  supportedModel: { type: Array},
  images:{type :Array},
  category: { type: String, required: true},
  categoryId: { type: String, required: true },
  subCategory:{ type: String, required: true},
  subCategoryId:{ type: String, required: true},
  serviceDetails :{ type: String, required: true},
});

export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
