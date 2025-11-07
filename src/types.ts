// Service Booking Types
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

export interface Step {
  number: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export interface StepProps {
  formData: ServiceBookingForm;
  onUpdateFormData: (data: Partial<ServiceBookingForm>) => void;
  validateField: (field: string) => void;
}

export interface StepPropsCommon extends StepProps {
  customer: CustomerData;
  vehicle: VehicleData;
  formErrors: Record<string, string>;
  isLoading?: boolean;
}

export interface ServiceBookingForm {
  id?: string;
  referenceNumber?: string;
  vehicle: string;
  vin: string;
  serviceLocation: string;
  packageLevel: string;
  appointmentDate: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
  searchVIN: string;
  serviceType: string;
  orderReason: string;
  lastKMReading: string;
  selectedPackages: ServicePackage[];
}

export interface ServiceBooking extends ServiceBookingForm {
  id: string;
  referenceNumber: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ServiceBookingProps {
  customer: CustomerData;
  vehicle: VehicleData;
}