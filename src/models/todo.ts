import { Todo } from "../types/todo";
import { Schema, model } from "mongoose";

const TodoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default model<Todo>("Todo", TodoSchema);
