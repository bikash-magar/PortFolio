import { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData as defaultData } from '../data/portfolioData';
import toast from 'react-hot-toast';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null); // Start with null to indicate loading
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load data from portfolio.json first, then localStorage on mount
  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (data && lastUpdated > 0) {
      saveToLocalStorage();
    }
  }, [data, lastUpdated]);

  // Save data before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (data) {
        try {
          localStorage.setItem('portfolio_static_data', JSON.stringify(data));
          localStorage.setItem('portfolio_last_updated', lastUpdated.toString());
        } catch (error) {
          console.error('Failed to save before unload:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [data, lastUpdated]);

  // Sync data across tabs when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'portfolio_static_data' && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          setData(newData);
          setLastUpdated(Date.now());
          console.log('Data synced from another tab');
        } catch (error) {
          console.error('Failed to sync data from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio_theme', 'light');
    }
  };

  // Load portfolio data - priority: localStorage > portfolio.json > default
  const loadPortfolioData = async () => {
    setIsLoading(true);
    let dataLoaded = false;
    
    // First try to load from localStorage
    try {
      const storedData = localStorage.getItem('portfolio_static_data');
      const storedTimestamp = localStorage.getItem('portfolio_last_updated');
      console.log('Loading from localStorage', storedData);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
        
        if (storedTimestamp) {
          setLastUpdated(parseInt(storedTimestamp));
        } else {
          setLastUpdated(Date.now());
        }
        
        console.log('Portfolio data loaded from localStorage (primary source)');
        dataLoaded = true;
      }
    } catch (error) {
      console.log('Failed to load from localStorage:', error);
    }

    // If localStorage failed, try portfolio.json
    if (!dataLoaded) {
      try {
        const basePath = import.meta.env.DEV ? '' : '/PortFolio';
        const response = await fetch(`${basePath}/portfolio.json`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          setLastUpdated(Date.now());
          console.log('Portfolio data loaded from portfolio.json (fallback)');
          dataLoaded = true;
        }
      } catch (error) {
        console.log('portfolio.json not found:', error.message);
      }
    }

    // Final fallback - use default data
    if (!dataLoaded) {
      setData(defaultData);
      setLastUpdated(Date.now());
      console.log('Using default portfolio data (final fallback)');
    }

    setIsLoading(false);
  };

  // Save data to localStorage
  const saveToLocalStorage = () => {
    console.log('Saving to localStorage', data);
    try {
      localStorage.setItem('portfolio_static_data', JSON.stringify(data));
      localStorage.setItem('portfolio_last_updated', lastUpdated.toString());
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      toast.error('Failed to save data. Please check if localStorage is enabled in your browser.');
    }
  };

  // Auto-save to portfolio.json file (development only) - backend removed
  const autoSaveToFile = async () => {
    // Backend removed - only localStorage saving
  };

  // Update data function - saves immediately to localStorage AND auto-saves to file
  const updateData = (section, newData) => {
    if (!data) {
      console.log('Data not loaded yet, cannot update');
      toast.error('Data not loaded yet, please wait');
      return;
    }
    console.log('Updating data', section, newData);
    try {
      const updatedData = {
        ...data,
        [section]: newData
      };
      
      setData(updatedData);
      setLastUpdated(Date.now());
      
      // Auto-save to portfolio.json file in development
      autoSaveToFile();
      
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to save changes');
    }
  };

  // Add item to array section
  const addItem = (section, newItem) => {
    try {
      const localId = Date.now();
      const itemWithId = { ...newItem, id: localId };
      
      const updatedData = {
        ...data,
        [section]: [...(data[section] || []), itemWithId]
      };
      
      setData(updatedData);
      setLastUpdated(Date.now());
      
      // Auto-save to portfolio.json file in development
      autoSaveToFile();
      
      toast.success('Item added successfully');
      return itemWithId;
    } catch (error) {
      console.error('Add item error:', error);
      toast.error('Failed to add item');
    }
  };

  // Update item in array section
  const updateItem = (section, itemId, updatedItem) => {
    try {
      const updatedData = {
        ...data,
        [section]: data[section].map(item => 
          item.id === itemId ? { ...updatedItem, id: itemId } : item
        )
      };
      
      setData(updatedData);
      setLastUpdated(Date.now());
      
      // Auto-save to portfolio.json file in development
      autoSaveToFile();
      
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Update item error:', error);
      toast.error('Failed to update item');
    }
  };

  // Delete item from array section
  const deleteItem = (section, itemId) => {
    try {
      setData(prevData => ({
        ...prevData,
        [section]: prevData[section].filter(item => item.id !== itemId)
      }));
      
      setLastUpdated(Date.now());
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Delete item error:', error);
      toast.error('Failed to delete item');
    }
  };

  // Remove item from array section (alias for deleteItem)
  const removeItem = (section, itemId) => {
    return deleteItem(section, itemId);
  };

  // Export data as JSON file
  const exportData = () => {
    try {
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'portfolio-data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    }
  };

  // Import data from JSON file
  const importData = async (file) => {
    try {
      const fileContent = await file.text();
      const importedData = JSON.parse(fileContent);
      
      // Validate basic structure
      if (typeof importedData !== 'object' || importedData === null) {
        throw new Error('Invalid data format');
      }
      
      setData(importedData);
      setLastUpdated(Date.now());
      
      toast.success('Data imported successfully');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import data: ' + error.message);
    }
  };

  // Reset to default data
  const resetToDefaults = () => {
    try {
      setData(defaultData);
      setLastUpdated(Date.now());
      
      // Clear localStorage
      localStorage.removeItem('portfolio_static_data');
      localStorage.removeItem('portfolio_last_updated');
      
      toast.success('Data reset to defaults');
    } catch (error) {
      console.error('Reset error:', error);
      toast.error('Failed to reset data');
    }
  };

  // Update profile picture
  const updateProfilePicture = (newPicture) => {
    try {
      const updatedData = {
        ...data,
        profilePicture: newPicture
      };
      
      setData(updatedData);
      setLastUpdated(Date.now());
      
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Profile picture update error:', error);
      toast.error('Failed to update profile picture');
    }
  };

  // Update floating cards
  const updateFloatingCards = (newCards) => {
    try {
      const updatedData = {
        ...data,
        floatingCards: newCards
      };
      
      setData(updatedData);
      setLastUpdated(Date.now());
      
      toast.success('Floating cards updated successfully');
    } catch (error) {
      console.error('Floating cards update error:', error);
      toast.error('Failed to update floating cards');
    }
  };

  const value = {
    // Data
    data: data || defaultData, // Fallback to defaultData if data is null
    isLoading,
    lastUpdated,
    isDarkMode,
    
    // Quick access to sections (with safe defaults)
    technologies: (data?.technologies) || [],
    tools: (data?.tools) || [],
    certifications: (data?.certifications) || [],
    learningJourney: (data?.learningJourney) || [],
    projects: (data?.projects) || [],
    blogs: (data?.blogs) || [],
    resume: (data?.resume) || {},
    personal: (data?.personal) || {},
    about: (data?.about) || {},
    aboutContent: (data?.aboutContent) || {},
    contact: (data?.contact) || {},
    profilePicture: data?.profilePicture || null,
    floatingCards: (data?.floatingCards) || [],
    
    // Functions
    updateData,
    addItem,
    updateItem,
    deleteItem,
    removeItem,
    exportData,
    importData,
    resetToDefaults,
    updateProfilePicture,
    updateFloatingCards,
    toggleDarkMode
  };

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <PortfolioContext.Provider value={value}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Loading portfolio data...
        </div>
      </PortfolioContext.Provider>
    );
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}