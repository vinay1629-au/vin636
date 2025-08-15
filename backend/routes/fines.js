import { Router } from "express";
import EChallan from "../models/fineamt.js";
import { makeCrud } from "../controllers/crud.js";
const r = Router(); const c = makeCrud(EChallan);
r.post("/", c.create); r.get("/", c.list); r.get("/:id", c.getOne); r.put("/:id", c.update); r.delete("/:id", c.remove);
export default r;
