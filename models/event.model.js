import mongoose from 'mongoose';
import slugify from 'slugify';
import { eventPrices } from '../constants/eventList.js';

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    
    },
    slug: String,
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: (v) => v > new Date(),
        message: 'Event date must be in the future'
      }
    },
    seat: {
      total: { type: Number, required: true, min: 1 },
      booked: { type: Number, default: 0 },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'sold-out'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Virtuals
eventSchema.virtual('availableSeats').get(function() {
  return this.seat.total - this.seat.booked;
});

// Pre-save middleware
eventSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Check seat availability
eventSchema.methods.canBook = function(qty) {
  return this.seat.total - this.seat.booked >= qty;
};

const Event = model('Event', eventSchema);
export default Event;