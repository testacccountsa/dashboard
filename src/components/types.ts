export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CustomerData {
  id: string;
  name: string;
  customerId: string;
  type: string;
  vehicleIndicator: string;
  brand: string;
}

export interface VehicleData {
  brand: string;
  plateNo: string;
  model: string;
  modelGroup: string;
  modelDescription: string;
  kmReading: string;
  engineNo: string;
  engineSize: string;
  exteriorColor: string;
  katashiki: string;
  vin: string;
  nextServiceDate: string;
  purchasedFrom: string;
}

export interface ServiceBookingForm {
  id?: string;
  referenceNumber?: string;
  vehicle: string;
  vin: string;
  serviceLocation: string;
  packageLevel: string;
  appointmentDate: string;
  serviceAdvisor: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
  searchVIN: string;
  serviceType: string;
  orderReason: string;
  lastKMReading: string;
  selectedPackages: ServicePackage[];
}