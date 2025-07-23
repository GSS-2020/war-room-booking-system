import mongoose from 'mongoose';

export interface IBooking {
  _id?: string;
  nama: string;
  tarikh: Date;
  masaMula: string;
  masaTamat: string;
  namaMeeting: string;
  bilik: 'War Room 1' | 'War Room 2';
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema = new mongoose.Schema<IBooking>({
  nama: {
    type: String,
    required: [true, 'Nama adalah wajib'],
  },
  tarikh: {
    type: Date,
    required: [true, 'Tarikh adalah wajib'],
  },
  masaMula: {
    type: String,
    required: [true, 'Masa mula adalah wajib'],
  },
  masaTamat: {
    type: String,
    required: [true, 'Masa tamat adalah wajib'],
  },
  namaMeeting: {
    type: String,
    required: [true, 'Nama meeting adalah wajib'],
  },
  bilik: {
    type: String,
    enum: ['War Room 1', 'War Room 2'],
    required: [true, 'Bilik adalah wajib'],
  },
}, {
  timestamps: true,
});

// Prevent recompilation during development
const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
