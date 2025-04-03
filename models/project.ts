import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
  content: any; // JSONB equivalent
  description: string;
  slug_url?: string;
  cover_url?: string;
  tags: string[];
  github_link?: string;
  live_link?: string;
  start_date?: Date;
  end_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true }, // Equivalent to JSONB
    description: { type: String, required: true },
    slug_url: { type: String},
    cover_url: { type: String },
    tags: { type: [String], default: [] },
    github_link: { type: String },
    live_link: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;