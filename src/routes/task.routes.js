import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
  createTask, 
  getTasks, 
  getTask, 
  updateTask, 
  deleteTask 
} from "../controllers/task.controller.js";

const router = Router();

router.use(verifyJWT); // protect all routes

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
