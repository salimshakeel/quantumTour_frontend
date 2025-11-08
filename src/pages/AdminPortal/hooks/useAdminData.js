/**
 * CUSTOM HOOK: useAdminData
 * 
 * Purpose:
 * - Centralizes pricing state management for both admin and public views
 * - Provides methods to update pricing data
 * - Formats data for different views (admin vs public)
 * 
 * Backend Integration Points:
 * 1. Currently uses in-memory state (session-only)
 * 2. Future implementation should:
 *    - Fetch initial data from GET /api/pricing
 *    - Persist changes via PUT /api/pricing
 *    - Handle loading/error states
 *    - Implement caching strategy
 * 
 * Data Structure:
 * - Maintains pricing plans with:
 *   - id: Unique identifier
 *   - name: Package name
 *   - photos: Photo count range
 *   - price: Numeric value
 *   - turnaround: Delivery time
 *   - popular: Boolean flag
 * 
 * Methods:
 * - updatePricingLocal: Updates both UI state and (future) backend
 * - getPublicPricing: Formats data for public consumption
 */



import { useState } from 'react';

// Create a context-like shared state
let sharedPricingState = [
    {
      id: 1,
      name: 'Express',
      photos: '1-10',
      price: 60,
      turnaround: '48 hours',
      popular: false
    },
    {
      id: 2,
      name: 'Quick',
      photos: '11-25',
      price: 100,
      turnaround: '36 hours',
      popular: true
    },
    {
      id: 3,
      name: 'Standard',
      photos: '26-50',
      price: 130,
      turnaround: '24 hours',
      popular: false
    },
    {
      id: 4,
      name: 'Pro',
      photos: '50+',
      price: 200,
      turnaround: 'Custom',
      popular: false
    },
    {
      id: 5,
      name: 'Ultra',
      photos: '50+',
      price: 280,
      turnaround: 'Custom',
      popular: false
    }
  ];

  const useAdminData = () => {
  const [pricing, setPricing] = useState(sharedPricingState);

  const updatePricingLocal = (id, newPrice) => {
    const updatedPricing = pricing.map(item => 
      item.id === id ? { ...item, price: newPrice } : item
    );
    
    // Update both local state and shared state
    setPricing(updatedPricing);
    sharedPricingState = updatedPricing;
  };

  const getPublicPricing = () => {
    return sharedPricingState.map(plan => ({
      package: plan.name,
      photocount: `${plan.photos} photos`,
      turnaround: plan.turnaround,
      price: `$${plan.price}`,
      popular: plan.popular
    }));
  };

  return {
    pricing,
    updatePricingLocal,
    getPublicPricing
  };
};

export default useAdminData;