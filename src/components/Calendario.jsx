import React, { useState } from 'react';


// si recibe dateTime retorna fecha y hora si no solo Calendario
export default function Calendario({ setHora, setFecha }) {
  return (
    setHora ? (
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label
            htmlFor="eventDate"
            className="block text-xs font-medium text-gray-600 mb-1"
          >
            Fecha
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="eventTime"
            className="block text-xs font-medium text-gray-600 mb-1"
          >
            Hora
          </label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
      </div>
    )
      :
      (
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label
              htmlFor="eventDate"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Fecha
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              required
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>


        </div>
      )


  )
}
