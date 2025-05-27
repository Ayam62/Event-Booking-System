import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controller/payment.controller.js";

const paymentRouter = express.Router();

 paymentRouter.post("/create-checkout-session", protect, createCheckoutSession);
// paymentRouter.post("/create-checkout-session", protect, (req,res)=>{
//     res.send("payment");
// });


export default paymentRouter;