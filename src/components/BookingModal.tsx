'use client';

import { useState } from 'react';
import { IBooking } from '@/models/Booking';

interface BookingModalProps {
  booking: IBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (bookingId: string) => void;
  onRefresh: () => void;
}

export default function BookingModal({ 
  booking, 
  isOpen, 
  onClose, 
  onDelete,
  onRefresh 
}: BookingModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !booking) return null;

  const formatMalaysianDate = (date: Date) => {
    return date.toLocaleDateString('ms-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleDelete = async () => {
    if (!booking?._id) {
      alert('ID booking tidak dijumpai');
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/bookings?id=${booking._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        onDelete(booking._id);
        onRefresh();
        onClose();
        alert('Booking berjaya dipadamkan!');
      } else {
        alert(result.error || 'Gagal memadamkan booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Ralat semasa memadamkan booking');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Butiran Tempahan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Penempah</label>
              <p className="mt-1 text-sm text-gray-900">{booking.nama}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Meeting</label>
              <p className="mt-1 text-sm text-gray-900">{booking.namaMeeting}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bilik</label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium text-white ${
                booking.bilik === 'War Room 1' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {booking.bilik}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tarikh</label>
              <p className="mt-1 text-sm text-gray-900">
                {formatMalaysianDate(new Date(booking.tarikh))}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Masa Mula</label>
                <p className="mt-1 text-sm text-gray-900">{formatTime(booking.masaMula)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Masa Tamat</label>
                <p className="mt-1 text-sm text-gray-900">{formatTime(booking.masaTamat)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Tutup
          </button>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
          >
            Padamkan Booking
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Confirm Padamkan Booking
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Adakah anda pasti mahu memadamkan booking ini? Tindakan ini tidak boleh dibatalkan.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Memadamkan...' : 'Ya, Padamkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
