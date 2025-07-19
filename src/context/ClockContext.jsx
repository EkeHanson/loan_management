import React, { createContext, useState, useEffect } from 'react';

export const ClockContext = createContext();

export const ClockProvider = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ClockContext.Provider value={{ currentDateTime }}>
      {children}
    </ClockContext.Provider>
  );
};