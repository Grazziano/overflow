import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    profilePicUrl: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Check if the model is already compiled
if (mongoose.models['users']) {
  delete mongoose.models['users'];
}

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
