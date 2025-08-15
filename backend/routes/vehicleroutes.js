import { Router } from "express";
import Vehicle from "../models/vehicle.js";
import { makeCrud } from "../controllers/crud.js";
const r = Router(); const c = makeCrud(Vehicle);
r.post("/", c.create); r.get("/", c.list); r.get("/:id", c.getOne); r.put("/:id", c.update); r.delete("/:id", c.remove);
export default r;
