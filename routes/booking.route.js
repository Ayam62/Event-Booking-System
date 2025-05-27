import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createBooking, getUserBookings, cancelBooking } from "../controller/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/:eventId", protect, createBooking); 
bookingRouter.get("/", protect, getUserBookings);        
bookingRouter.delete("/:bookingId", protect, cancelBooking); 

export default bookingRouter;