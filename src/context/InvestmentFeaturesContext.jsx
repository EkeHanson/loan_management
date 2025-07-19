import React, { createContext, useState } from 'react';

export const InvestmentFeaturesContext = createContext();

export const InvestmentFeaturesProvider = ({ children }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const removeFeature = (feature) => {
    setSelectedFeatures((prev) => prev.filter((f) => f !== feature));
  };

  return (
    <InvestmentFeaturesContext.Provider value={{ selectedFeatures, toggleFeature, removeFeature }}>
      {children}
    </InvestmentFeaturesContext.Provider>
  );
};