// import { ServicePackage } from './types';

// export const AVAILABLE_PACKAGES: readonly ServicePackage[] = [
//   { id: "1", name: "Basic Service", description: "Oil change, filter replacement, basic inspection", price: 299 },
//   { id: "2", name: "Premium Service", description: "Complete service with brake check and tire rotation", price: 599 },
//   { id: "3", name: "Deluxe Service", description: "Full service with detailed inspection and cleaning", price: 899 },
//   { id: "4", name: "Express Service", description: "Quick oil change and basic check", price: 199 },
// ] as const;

// constants.ts
import { ServicePackage } from '@/types';

// Service locations
// src/components/constants.ts
// src/components/constants.ts

export const AVAILABLE_PACKAGES = [
  { id: '1', name: 'Basic Service', description: 'Oil change, filter replacement', price: 299 },
  { id: '2', name: 'Premium Service', description: 'Full service with brake check', price: 599 },
  { id: '3', name: 'Deluxe Service', description: 'Complete inspection and cleaning', price: 899 },
  { id: '4', name: 'Express Service', description: 'Quick oil change', price: 199 },
];

export const SERVICE_LOCATIONS = [
  { id: '1', name: 'Al-Futtaim Toyota - Dubai Festival City' },
  { id: '2', name: 'Al-Futtaim Toyota - Sheikh Zayed Road' },
  { id: '3', name: 'Al-Futtaim Toyota - Abu Dhabi' },
];

export function generateBookingReference() {
  return 'SB' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

export function getAvailableTimeSlotsForDate(date?: Date) {
  const dt = date || new Date();
  const day = dt.getDay();
  const slots: string[] = [];
  if (day === 0) return slots; // Sunday closed
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
}

