import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

// Custom hook to use portfolio data with live updates
export function usePortfolioData() {
  const [data, setData] = useState(portfolioData);

  // Function to refresh data (useful for dashboard updates)
  const refreshData = () => {
    setData({ ...portfolioData });
  };

  // Get specific section data
  const getSection = (sectionName) => {
    return data[sectionName] || [];
  };

  return {
    data,
    refreshData,
    getSection,
    // Quick access to common sections
    technologies: data.technologies || [],
    tools: data.tools || [],
    certifications: data.certifications || [],
    learningJourney: data.learningJourney || [],
    projects: data.projects || [],
    personal: data.personal || {},
    about: data.about || {},
    contact: data.contact || {}
  };
}