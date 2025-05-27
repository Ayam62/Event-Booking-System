import express from "express"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import eventRouter from "./routes/event.route.js"
import adminRouter from "./routes/admin.route.js"
import bookingRouter from "./routes/booking.route.js"
import userRouter  from "./routes/user.route.js"
import paymentRouter from "./routes/payment.route.js"

import "dotenv/config"

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/auth",authRouter)
app.use("/api/events",eventRouter)
app.use("/api/admin",adminRouter)
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/payments", paymentRouter);

connectDB();
app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(PORT,(req,res)=>{
     console.log(`Server is running on port ${PORT}`)
})