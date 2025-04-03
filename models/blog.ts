import mongoose, { Schema, Document, Model } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: any; // JSONB equivalent
  description: string;
  slug_url?: string;
  cover_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true }, // Equivalent to JSONB
    description: { type: String, required: true },
    slug_url: { type: String},
    cover_url: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;