// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  image: String,
  childName: { type: String, default: '' },
  age: { type: Number, default: 4 },
  preferences: {
    favoriteAnimals: [String],
    favoriteColors: [String],
    language: { type: String, default: 'English' }
  },
  onboarded: { type: Boolean, default: false },
}, { timestamps: true });

export default models.User || model('User', UserSchema);