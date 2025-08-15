import { Router } from "express";
import Camera from "../models/camera.js";
import { makeCrud } from "../controllers/crud.js";
const r = Router(); const c = makeCrud(Camera);
r.post("/", c.create); r.get("/", c.list); r.get("/:id", c.getOne); r.put("/:id", c.update); r.delete("/:id", c.remove);
export default r;
