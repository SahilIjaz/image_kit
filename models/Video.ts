import mongoose, { mongo } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1920,
  height: 1080,
} as const;

export interface IVideo {
  _id?: mongoose.Schema.Types.ObjectId;
  title: String;
  description: String;
  videoUrl: String;
  humbnailUrl: String;
  contols: Boolean;
  transformation?: {
    width: Number;
    height: Number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    humbnailUrl: { type: String, required: true },
    contols: { type: Boolean, default: true },
    transformation: {
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
    },
  },
  {
    timestamps: true,
  }
);


const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);
export default Video;

