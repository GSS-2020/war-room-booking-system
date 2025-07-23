'use client';

import { useState, useEffect } from 'react';
import BookingForm from '@/components/BookingForm';
import BookingCalendar from '@/components/BookingCalendar';
import { IBooking } from '@/models/Booking';

export default function HomePage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'form'>('calendar');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings', {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout for Vercel
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setBookings(data.data || []);
      } else {
        console.error('API returned error:', data.error);
        setBookings([]);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setBookings([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingCreated = () => {
    fetchBookings();
    setActiveTab('calendar');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Memuatkan...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:max-w-md">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
            activeTab === 'calendar'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="hidden sm:inline">📅 Dashboard Kalendar</span>
          <span className="sm:hidden">📅 Kalendar</span>
        </button>
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
            activeTab === 'form'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="hidden sm:inline">➕ Buat Tempahan</span>
          <span className="sm:hidden">➕ Tempahan</span>
        </button>
      </div>

      {/* Room Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">W1</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <h3 className="text-sm sm:text-lg font-medium text-gray-900 truncate">War Room 1</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {bookings.filter(b => b.bilik === 'War Room 1').length} tempahan aktif
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">W2</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <h3 className="text-sm sm:text-lg font-medium text-gray-900 truncate">War Room 2</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {bookings.filter(b => b.bilik === 'War Room 2').length} tempahan aktif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'calendar' ? (
        <BookingCalendar bookings={bookings} onRefresh={fetchBookings} />
      ) : (
        <BookingForm onBookingCreated={handleBookingCreated} />
      )}
    </div>
  );
}
