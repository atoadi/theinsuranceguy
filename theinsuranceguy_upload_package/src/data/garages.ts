// src/data/garages.ts

export interface Garage {
  n: string; // Name
  b: string; // Brand
  c: string; // City
  a: string; // Address
  p: string | number; // Phone/Mobile
}

// This helps your page know exactly what kind of data it's dealing with
export type GarageList = Garage[];