//funciton to handle event creattion

import Event from "../models/event.model.js";
 import eventPrices from "../constants/eventList.js"



export const createEvent = async (req,res)=>{
    const {title,description,date,seat,organizer,status}=req.body;
   // console.log(req.body);
    try{
         const price = eventPrices[title];
          if (!price) {
            return res.status(400).json({ error: 'Invalid event title' });
        }
       // console.log(title,price,description,date,seat,organizer,status);

        const event = new Event ({
            title,price,description,date,seat,organizer,status,createdBy:req.user._id
        })
      // console.log(title,price,description,date,seat,organizer,status);
       console.log(event);
       
        if(!event.title || !event.description || !event.date || !event.organizer){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        await event.save();
    
        res.status(201).json({
            message:"Event created successfully",
            event
        })
    }catch(error){
        res.status (500).json({message:"Error creating event"});
    }
}

export const getAllEvents = async (req,res)=>{
    try{
        const events = await Event.find({status:"active"}).populate("organizer","name email").sort({createAt:-1});
    res.status(200).json({message:"Events fetched successfully",events});
    }catch(error){
        res.status(500).json({error:"Error fetching events"});
    }
}

export const getEventById =async (req,res)=>{
    const {id}=req.params;
    try{
        const event =await Event.findById(id).populate("organizer","name email");
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        if (
            event.createdBy.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "You are not authorized to view this event" });
        }

        res.status (200).json({message:"Event fetched successfully",event});
    }catch(error){
        res.status(500).json({error:"Error fetching event"});
    }
}
export const updateEvent =async (req,res)=>{
    const {id}=req.params;
    const {title,description,date,sent,organizer,status}=req.body;
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        if(event.organizer.toString() !==req.user._id.toString()&& req.user.role !=="admin"){
            return res.status(403).json({message:"You are not authorized to update this event"});
        }
        event.title= title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.seat = sear || event.seat;
        event.organizer = organizer || event.organizer;
        event.status = status || event .status;
        await event.save();
        res.status(200).json({message:"Event updated successfully",event});
    }catch(error){
        return res.status(500).json({error:"Erro  updatting the event"});
    }
}

export const deleteEvent = async (req,res)=>{
    const {id}= req.params;
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        //check user is organizer or admin
        if(event.organizer.toString()!==req.user._id.toString() && req.user.role !=="admin"){
            return res.status(403).json({message:"You ar enot authorized to delete this event"});
        }
        await event.remove();
        res.status(200).json({message:"Event deleted successfully"});
    }catch(error){
        res.status(500).json({error:"Error deleting the event"});
    }
}

export const getEventsByFilter = async (req, res) => {
    try {
        const { title, date, organizer } = req.query;
        let filter = { status: "active" };

        if (title) filter.title = { $regex: title, $options: "i" };
        if (date) filter.date = { $gte: new Date(date) };
        if (organizer) filter.organizer = organizer;

        const events = await Event.find(filter).populate("organizer", "name email");
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
};