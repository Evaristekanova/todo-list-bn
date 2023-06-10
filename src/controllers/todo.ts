import { Request, Response } from "express";
import todoModel from "../models/todo";
import { Todo } from "../types/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos: Todo[] = await todoModel.find();
    res.status(200).json({
      status: "success",
      message: "data retrieved successfully",
      data: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("adding to do");
    const body = req.body as Pick<Todo, "name" | "description">;
    const todo: Todo = new todoModel({
      name: body.name,
      description: body.description,
    });
    const newTodo: Todo = await todo.save();
    const allTodos: Todo[] = await todoModel.find();
    res.status(201).json({
      status: "success",
      message: "added seccussefully",
      todo: newTodo,
      todos: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const { checked } = body;

    const updateTodo: Todo | null = await todoModel.findByIdAndUpdate(id, {
      checked: true,
    });

    const allTodos: Todo[] = await todoModel.find();
    res.status(200).json({
      message: "A Todo is updated successefully",
      data: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    const allTodos: Todo[] = await todoModel.find();
    res.status(200).json({
      status: "status",
      message: "deleted successfully",
      data: allTodos,
    });
  } catch (err) {
    throw err;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
