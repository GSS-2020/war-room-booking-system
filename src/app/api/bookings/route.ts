import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({}).sort({ tarikh: 1, masaMula: 1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      bilik: body.bilik,
      tarikh: new Date(body.tarikh),
      $or: [
        {
          $and: [
            { masaMula: { $lte: body.masaMula } },
            { masaTamat: { $gt: body.masaMula } }
          ]
        },
        {
          $and: [
            { masaMula: { $lt: body.masaTamat } },
            { masaTamat: { $gte: body.masaTamat } }
          ]
        },
        {
          $and: [
            { masaMula: { $gte: body.masaMula } },
            { masaTamat: { $lte: body.masaTamat } }
          ]
        }
      ]
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: 'Bilik sudah ditempah pada masa tersebut' },
        { status: 400 }
      );
    }

    const booking = await Booking.create(body);
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID diperlukan untuk delete booking' },
        { status: 400 }
      );
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json(
        { success: false, error: 'Booking tidak dijumpai' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking berjaya dipadamkan',
      data: deletedBooking 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
