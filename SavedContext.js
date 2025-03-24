// SavedContext.js
import React, { createContext, useState } from 'react';

// Создаём контекст
export const SavedContext = createContext();

// Провайдер, который будет оборачивать всё приложение
export function SavedProvider({ children }) {
  // savedSpots — массив с «избранными» точками
  const [savedSpots, setSavedSpots] = useState([]);

  // Функция «добавить/убрать» из избранного
  const toggleSavedSpot = (spot) => {
    const isAlreadySaved = savedSpots.some((s) => s.name === spot.name);
    if (isAlreadySaved) {
      // Удаляем из массива
      setSavedSpots((prev) => prev.filter((s) => s.name !== spot.name));
    } else {
      // Добавляем в массив
      setSavedSpots((prev) => [...prev, spot]);
    }
  };

  return (
    <SavedContext.Provider value={{ savedSpots, toggleSavedSpot }}>
      {children}
    </SavedContext.Provider>
  );
}