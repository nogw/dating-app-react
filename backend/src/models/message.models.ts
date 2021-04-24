  
import mongoose from "mongoose"
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    to: {
      type: String,
      require: true
    },
    by: {
      type: String,
      require: true
    },
    number: {
      type: String,
      require: false
    },
    message: {
      type: String,
      require: true
    },
    date: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model("Message", messageSchema)