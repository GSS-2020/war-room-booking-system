'use client';

import { useState, useEffect } from 'react';
import { IBooking } from '@/models/Booking';

interface BookingFormProps {
  onBookingCreated: () => void;
}

export default function BookingForm({ onBookingCreated }: BookingFormProps) {
  const [formData, setFormData] = useState({
    nama: '',
    tarikh: '',
    masaMula: '',
    masaTamat: '',
    namaMeeting: '',
    bilik: 'War Room 1' as 'War Room 1' | 'War Room 2',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          nama: '',
          tarikh: '',
          masaMula: '',
          masaTamat: '',
          namaMeeting: '',
          bilik: 'War Room 1',
        });
        onBookingCreated();
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Buat Tempahan Baru</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="tarikh" className="block text-sm font-medium text-gray-700 mb-1">
            Tarikh
          </label>
          <input
            type="date"
            id="tarikh"
            name="tarikh"
            value={formData.tarikh}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="masaMula" className="block text-sm font-medium text-gray-700 mb-1">
              Masa Mula
            </label>
            <input
              type="time"
              id="masaMula"
              name="masaMula"
              value={formData.masaMula}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="masaTamat" className="block text-sm font-medium text-gray-700 mb-1">
              Masa Tamat
            </label>
            <input
              type="time"
              id="masaTamat"
              name="masaTamat"
              value={formData.masaTamat}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="namaMeeting" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Meeting
          </label>
          <input
            type="text"
            id="namaMeeting"
            name="namaMeeting"
            value={formData.namaMeeting}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bilik" className="block text-sm font-medium text-gray-700 mb-1">
            Bilik
          </label>
          <select
            id="bilik"
            name="bilik"
            value={formData.bilik}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="War Room 1">War Room 1</option>
            <option value="War Room 2">War Room 2</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : 'Buat Tempahan'}
        </button>
      </form>
    </div>
  );
}
