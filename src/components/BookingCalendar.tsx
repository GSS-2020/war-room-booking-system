'use client';

import { useState, useEffect } from 'react';
import { IBooking } from '@/models/Booking';
import BookingModal from './BookingModal';
import MobileCalendar from './MobileCalendar';

interface BookingCalendarProps {
  bookings: IBooking[];
  onRefresh: () => void;
}

export default function BookingCalendar({ bookings, onRefresh }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If mobile, return mobile-optimized component
  if (isMobile) {
    return <MobileCalendar bookings={bookings} onRefresh={onRefresh} />;
  }

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
    <div className="bg-white shadow rounded-lg p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Kalendar Tempahan</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
            className="px-2 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            {viewMode === 'month' ? 'Minggu' : 'Bulan'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          ← <span className="hidden sm:inline">Bulan Sebelumnya</span><span className="sm:hidden">Prev</span>
        </button>
        <h3 className="text-sm sm:text-lg font-medium text-center">{monthName}</h3>
        <button
          onClick={() => navigateMonth('next')}
          className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <span className="hidden sm:inline">Bulan Seterusnya</span><span className="sm:hidden">Next</span> →
        </button>
      </div>

      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-px mb-2">
        {['Ahad', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'].map((day, index) => (
          <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-700 bg-gray-50">
            <span className="block sm:hidden">{day}</span>
            <span className="hidden sm:block">{
              ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'][index]
            }</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid - Mobile Optimized */}
      <div className="grid grid-cols-7 gap-px border border-gray-200 rounded overflow-hidden">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[60px] sm:min-h-[100px] p-1 border-r border-b border-gray-100 ${
              day ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {day && (
              <>
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                  {day.getDate()}
                </div>
                <div className="space-y-1 overflow-hidden">
                  {getBookingsForDate(day).slice(0, 2).map((booking, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleBookingClick(booking)}
                      className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity ${
                        booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      title="Klik untuk lihat butiran"
                    >
                      <div className="font-medium text-xs truncate">
                        {booking.bilik.replace('War Room ', 'WR')}
                      </div>
                      <div className="text-xs truncate">
                        {formatTime(booking.masaMula)}
                      </div>
                      <div className="text-xs truncate hidden sm:block">
                        {booking.namaMeeting}
                      </div>
                    </div>
                  ))}
                  {getBookingsForDate(day).length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{getBookingsForDate(day).length - 2} lagi
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile-Friendly Booking List */}
      <div className="mt-4 sm:mt-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Senarai Tempahan</h3>
          <div className="text-xs sm:text-sm text-gray-500">
            {bookings.length} tempahan
          </div>
        </div>
        
        {/* Mobile optimized scrollable list */}
        <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm sm:text-base">Tiada tempahan pada masa ini</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Klik "Buat Tempahan" untuk menambah tempahan baru</p>
            </div>
          ) : (
            bookings
              .sort((a, b) => new Date(a.tarikh).getTime() - new Date(b.tarikh).getTime())
              .map((booking, index) => (
                <div
                  key={index}
                  onClick={() => handleBookingClick(booking)}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 hover:shadow-sm transition-all duration-200 space-y-2 sm:space-y-0"
                >
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="font-medium text-sm sm:text-base text-gray-900 truncate">
                      {booking.namaMeeting}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                      <span className="font-medium">{booking.nama}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-3">
                      <span>📅 {formatMalaysianDate(new Date(booking.tarikh))}</span>
                      <span>🕒 {formatTime(booking.masaMula)} - {formatTime(booking.masaTamat)}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-start sm:self-center">
                    <span className={`inline-flex px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium text-white ${
                      booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      <span className="sm:hidden">{booking.bilik.replace('War Room ', 'WR')}</span>
                      <span className="hidden sm:inline">{booking.bilik}</span>
                    </span>
                  </div>
                </div>
              ))
          )}
        </div>
        
        {/* Mobile Scroll Indicator */}
        {bookings.length > 3 && (
          <div className="text-center mt-2 sm:hidden">
            <p className="text-xs text-gray-400">↕ Scroll untuk lihat lebih banyak tempahan</p>
          </div>
        )}
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
