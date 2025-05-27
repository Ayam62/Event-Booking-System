import Booking from "../models/booking.model.js";
import Event from "../models/event.model.js";

export const createBooking = async (req, res) => {
    const { eventId } = req.params;
    const { seats } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });


         if (event.seat.total - event.seat.booked < seats) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        if (seats && (seats < 1 || seats > event.seat)) {
            return res.status(400).json({ message: "Invalid number of seats requested" });
        }

        const booking = new Booking({
            event: eventId,
            user: req.user._id,
            seats: seats || 1
        });
        await booking.save();
        res.status(201).json({ message: "Booking successful", booking });
        await sendEmail(
                req.user.email,
                 "Booking Confirmation",
                `Your booking for event "${event.title}" is confirmed!`
            );
    } catch (error) {
        res.status(500).json({ message: "Error creating booking" });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate("event");
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
};


export const modifyBooking = async (req,res)=>{
    try{
        const {bookingId}= req.params;
        const{seats}=req.body;
        const booking = await Booking.findOne({_id:bookingId,user:req.user._id}).populate("event");

        if(!booking){
            return res.status(404).json({message:"Booking not found"});
        }
        
        const seatDiff = seats - booking.seats;
        if (seatDiff > 0 && event.seat.total - event.seat.booked < seatDiff) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        if(seats && (seats < 1 || seats > booking.event.seat)){
            return res.status(400).json({message:"Invalid number of seats requested"});
        }

         const event = await Event.findById(booking.event._id);

        booking.seats = seats || booking.seats;
        await booking.save();
         event.seat.booked += seatDiff;
        await event.save();
        res.status(200).json({message:"Booking modified successfully",booking});
    }catch(error){
        res.status(500).json({message:"Error modifying booking"});
    }

}

export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findOneAndDelete({ _id: bookingId, user: req.user._id });
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.status(200).json({ message: "Booking cancelled" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling booking" });
    }
};

export const getEventAttendees = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Only organizer or admin can view attendees
        if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const bookings = await Booking.find({ event: eventId }).populate("user", "name email");
        res.status(200).json({ attendees: bookings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendees" });
    }
};