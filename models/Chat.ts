import mongoose, { Schema, model, models } from 'mongoose';

const ChatSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default models.Chat || model('Chat', ChatSchema);