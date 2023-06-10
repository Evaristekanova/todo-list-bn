import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo'

const router: Router = Router();

router.get("/todos", getTodos);

router.post("/add", addTodo);

router.put("/edit/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
