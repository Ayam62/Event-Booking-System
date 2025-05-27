import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seats: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);