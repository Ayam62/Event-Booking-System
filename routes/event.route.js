import express from "express";
import { createEvent, getEventById, updateEvent } from "../controller/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { getAllEvents } from "../controller/event.controller.js";
import { deleteUserById } from "../controller/admin.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { getEventsByFilter } from "../controller/event.controller.js";
import { getEventAttendees } from "../controller/booking.controller.js"

const eventRouter = express.Router();



eventRouter.get("/",getAllEvents)
eventRouter.post("/atteddees/:eventId",protect,getEventAttendees)
eventRouter.get("/filter",getEventsByFilter)
eventRouter.post("/create",isAdmin,protect,createEvent)
eventRouter.get("/:id",isAdmin,protect,getEventById)
eventRouter.put("/:id",isAdmin,protect,updateEvent)
eventRouter.delete("/:id",isAdmin,deleteUserById)

export default eventRouter;