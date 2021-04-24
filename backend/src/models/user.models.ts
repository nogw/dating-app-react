  
import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    passwordConfirm: {
      type: String
    },
    description: {
      type: String
    },
    avatarColor: {
      type: Number
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.model("User", userSchema)