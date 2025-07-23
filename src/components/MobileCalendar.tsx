'use client';

import { useState, useEffect, useRef } from 'react';
import { IBooking } from '@/models/Booking';
import BookingModal from './BookingModal';

interface MobileCalendarProps {
  bookings: IBooking[];
  onRefresh: () => void;
}

export default function MobileCalendar({ bookings, onRefresh }: MobileCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const calendarRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateMonth('next');
    }
    if (isRightSwipe) {
      navigateMonth('prev');
    }
  };

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
      weekday: 'short',
      day: 'numeric',
      month: 'short'
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
  const today = new Date();

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Mobile Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Kalendar Tempahan</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}
              className={`px-3 py-1 text-xs rounded-full ${
                view === 'calendar' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {view === 'calendar' ? '📋 List' : '📅 Calendar'}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-full bg-white shadow-sm border"
          >
            ←
          </button>
          <h3 className="text-base font-medium">{monthName}</h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-full bg-white shadow-sm border"
          >
            →
          </button>
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-2">
          Swipe kiri/kanan untuk tukar bulan
        </div>
      </div>

      {view === 'calendar' ? (
        <div
          ref={calendarRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="select-none"
        >
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b">
            {['A', 'I', 'S', 'R', 'K', 'J', 'S'].map((day, index) => (
              <div key={index} className="p-2 text-center text-xs font-medium text-gray-600 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const isToday = day && day.toDateString() === today.toDateString();
              const dayBookings = day ? getBookingsForDate(day) : [];
              
              return (
                <div
                  key={index}
                  className={`min-h-[80px] border-r border-b border-gray-100 p-1 ${
                    day ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'bg-blue-50' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-xs font-medium mb-1 ${
                        isToday ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {day.getDate()}
                        {isToday && (
                          <span className="ml-1 w-1 h-1 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((booking, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleBookingClick(booking)}
                            className={`text-xs p-1 rounded text-white cursor-pointer active:scale-95 transition-transform ${
                              booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                          >
                            <div className="font-medium truncate">
                              {booking.bilik.replace('War Room ', 'WR')}
                            </div>
                            <div className="truncate opacity-90">
                              {formatTime(booking.masaMula)}
                            </div>
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <div className="text-xs text-gray-500 text-center bg-gray-100 rounded px-1">
                            +{dayBookings.length - 2}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="max-h-96 overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-2">📅</div>
              <p className="text-gray-500 text-sm">Tiada tempahan</p>
              <p className="text-gray-400 text-xs mt-1">Swipe ke tab "Tempahan" untuk buat booking</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings
                .sort((a, b) => new Date(a.tarikh).getTime() - new Date(b.tarikh).getTime())
                .map((booking, index) => (
                  <div
                    key={index}
                    onClick={() => handleBookingClick(booking)}
                    className="p-4 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {booking.namaMeeting}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          👤 {booking.nama}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>📅 {formatMalaysianDate(new Date(booking.tarikh))}</span>
                          <span>🕒 {formatTime(booking.masaMula)}-{formatTime(booking.masaTamat)}</span>
                        </div>
                      </div>
                      <span className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium text-white ml-3 ${
                        booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {booking.bilik.replace('War Room ', 'WR')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

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
