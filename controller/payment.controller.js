import Stripe from "stripe";
import Event from "../models/event.model.js";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {

    const { eventId, seats = 1 } = req.body;
    // console.log(process.env.STRIPE_SECRET_KEY);
    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });
                console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);
            console.log("EVENT:", event);
            console.log("EVENT PRICE:", event.price);
            console.log("SEATS:", seats);
      
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: event.title,
                            description: event.description,
                        },
                        unit_amount:Math.round( event.price * 100 * seats), 
                    },
                    quantity: seats,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            metadata: {
                eventId,
                userId: req.user._id.toString(),
                seats,
            },
        });
        console.log(session);

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Error creating Stripe session" });
    }
};