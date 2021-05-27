import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    image: {
      type: String,
      default: '/uploads/images/sample.jpeg',
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
