import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    }
}, {timestamps: true});

const TodoModel = mongoose.models.TodoModel || mongoose.model("TodoModel", todoSchema);

export default TodoModel;