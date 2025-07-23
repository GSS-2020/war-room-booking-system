'use client';

import { useState, useEffect } from 'react';
import { IBooking } from '@/models/Booking';
import BookingModal from './BookingModal';

interface BookingCalendarProps {
  bookings: IBooking[];
  onRefresh: () => void;
}

export default function BookingCalendar({ bookings, onRefresh }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get days in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.tarikh);
      return bookingDate.toDateString() === date.toDateString();
    });
  };

  const formatMalaysianDate = (date: Date) => {
    return date.toLocaleDateString('ms-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleBookingClick = (booking: IBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId: string) => {
    // This will be handled by the modal and parent component refresh
  };

  const monthName = currentDate.toLocaleDateString('ms-MY', {
    year: 'numeric',
    month: 'long'
  });

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Kalendar Tempahan</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            {viewMode === 'month' ? 'Paparan Minggu' : 'Paparan Bulan'}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          ← Bulan Sebelumnya
        </button>
        <h3 className="text-lg font-medium">{monthName}</h3>
        <button
          onClick={() => navigateMonth('next')}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Bulan Seterusnya →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 bg-gray-50">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-gray-200 ${
              day ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {getBookingsForDate(day).map((booking, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleBookingClick(booking)}
                      className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity ${
                        booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      title="Klik untuk lihat butiran"
                    >
                      <div className="font-medium">{booking.bilik}</div>
                      <div>{formatTime(booking.masaMula)} - {formatTime(booking.masaTamat)}</div>
                      <div className="truncate">{booking.namaMeeting}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Senarai Tempahan</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Tiada tempahan</p>
          ) : (
            bookings
              .sort((a, b) => new Date(a.tarikh).getTime() - new Date(b.tarikh).getTime())
              .map((booking, index) => (
                <div
                  key={index}
                  onClick={() => handleBookingClick(booking)}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-medium">{booking.namaMeeting}</div>
                    <div className="text-sm text-gray-600">
                      {booking.nama} • {formatMalaysianDate(new Date(booking.tarikh))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(booking.masaMula)} - {formatTime(booking.masaTamat)}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-medium text-white ${
                    booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {booking.bilik}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <BookingModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteBooking}
        onRefresh={onRefresh}
      />
    </div>
  );
}
