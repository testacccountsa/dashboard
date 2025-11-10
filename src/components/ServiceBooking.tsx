// import React, { useState, useEffect, useMemo } from 'react';
// import { History, Edit2, Trash2, UserCircle, CheckCircle2, Bell, Printer } from "lucide-react";
// import { AppointmentDatePicker } from "./AppointmentDatePicker";
// import { cn } from "@/lib/utils";
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { ServiceBookingSidebar } from "./ServiceBookingSidebar";
// // Custom error boundary for lazy loaded components
// class ErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { hasError: boolean }
// > {
//   constructor(props: { children: React.ReactNode }) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Card className="p-6">
//           <div className="text-center">
//             <p className="text-red-500">Something went wrong loading the packages.</p>
//             <Button
//               onClick={() => this.setState({ hasError: false })}
//               className="mt-4"
//             >
//               Try again
//             </Button>
//           </div>
//         </Card>
//       );
//     }

//     return this.props.children;
//   }
// }

// const LazyPackagesStep = React.memo(React.lazy(() => import('./PackagesStep')));

// // Types and Interfaces
// interface ServicePackage {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// interface CustomerData {
//   id: string;
//   name: string;
//   customerId: string;
//   type: string;
//   vehicleIndicator: string;
//   brand: string;
// }

// interface VehicleData {
//   brand: string;
//   plateNo: string;
//   model: string;
//   modelGroup: string;
//   modelDescription: string;
//   kmReading: string;
//   engineNo: string;
//   engineSize: string;
//   exteriorColor: string;
//   katashiki: string;
//   vin: string;
//   nextServiceDate: string;
//   purchasedFrom: string;
// }

// interface Step {
//   number: number;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// import { ServiceBookingForm, StepPropsCommon } from '@/types';

// interface ServiceBooking extends ServiceBookingForm {
//   id: string;
//   referenceNumber: string;
//   status: 'scheduled' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// interface ServiceBookingProps {
//   customer: CustomerData;
//   vehicle: VehicleData;
// }

// import { StepProps } from '@/types';

// interface BookingStepProps extends StepPropsCommon {
//   isSearchingVIN: boolean;
//   onSearchVIN: () => void;
// }

// interface AppointmentStepProps extends StepPropsCommon {
//   onTimeSlotSelect?: (slot: string) => void;
// }

// interface ExistingBookingsProps {
//   bookings: ServiceBooking[];
//   onEdit: (booking: ServiceBooking) => void;
//   onDelete: (booking: ServiceBooking) => void;
// }

// // Constants
// export const AVAILABLE_PACKAGES: readonly ServicePackage[] = [
//   { id: "1", name: "Basic Service", description: "Oil change, filter replacement, basic inspection", price: 299 },
//   { id: "2", name: "Premium Service", description: "Complete service with brake check and tire rotation", price: 599 },
//   { id: "3", name: "Deluxe Service", description: "Full service with detailed inspection and cleaning", price: 899 },
//   { id: "4", name: "Express Service", description: "Quick oil change and basic check", price: 199 },
// ] as const;

// export const SERVICE_LOCATIONS = [
//   { id: "loc1", name: "Al-Futtaim Toyota - Dubai Festival City" },
//   { id: "loc2", name: "Al-Futtaim Toyota - Sheikh Zayed Road" },
//   { id: "loc3", name: "Al-Futtaim Toyota - Abu Dhabi" },
// ] as const;

// export const generateBookingReference = () => {
//   const prefix = "SB";
//   const timestamp = Date.now().toString().slice(-6);
//   const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//   return `${prefix}${timestamp}${random}`;
// };

// // Components
// export function StepIndicator({ steps, currentStep }: { steps: Step[]; currentStep: number; }) {
//   return (
//     <div className="flex items-center justify-center w-full mb-8">
//       <div className="flex items-center space-x-4 w-full max-w-3xl">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.number}>
//             <div
//               className={cn(
//                 "flex items-center justify-center w-8 h-8 rounded-full border-2",
//                 {
//                   "border-green-500 text-green-500": step.completed,
//                   "border-gray-300": !step.completed,
//                 }
//               )}
//             >
//               {step.completed ? '✓' : step.number}
//             </div>
//             {index < steps.length - 1 && (
//               <div
//                 className={cn("flex-1 h-0.5 mx-2", {
//                   "bg-green-500": step.completed,
//                   "bg-gray-200": !step.completed,
//                 })}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// const getAvailableTimeSlots = () => {
//   const date = new Date(Date.now());
//   const day = date.getDay();
//   const slots: string[] = [];

//   if (day === 0) return slots; // Sunday closed
  
//   const startHour = 9;
//   const endHour = 18; // Open until 6 PM
  
//   for (let hour = startHour; hour < endHour - 1; hour++) {
//     slots.push(`${hour}:00`);
//     slots.push(`${hour}:30`);
//   }
//   return slots;
// };

// export function BookingStep({
//   formData,
//   onUpdateFormData,
//   validateField,
//   customer,
//   vehicle,
//   formErrors,
//   isLoading,
//   isSearchingVIN,
//   onSearchVIN,
// }: StepPropsCommon & { isSearchingVIN: boolean; onSearchVIN: () => void; customer: CustomerData; vehicle: VehicleData }) {

//   return (
//     <Card className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Vehicle Brand & Model</label>
//           <Input
//             type="text"
//             value={formData.vehicle}
//             readOnly
//             className="bg-gray-50"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium">VIN Number</label>
//           <Input
//             type="text"
//             value={formData.vin}
//             readOnly
//             className="bg-gray-50"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium">Service Location</label>
//           <Select 
//             value={formData.serviceLocation} 
//             onValueChange={(value) => onUpdateFormData({ serviceLocation: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select Location" />
//             </SelectTrigger>
//             <SelectContent>
//               {SERVICE_LOCATIONS.map(location => (
//                 <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {formErrors.serviceLocation && (
//             <p className="text-red-500 text-sm mt-1">{formErrors.serviceLocation}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium">Appointment Date & Time</label>
//           <AppointmentDatePicker
//             value={formData.appointmentDate ? new Date(formData.appointmentDate) : undefined}
//             onChange={(date) => {
//               if (date) {
//                 onUpdateFormData({ appointmentDate: date.toISOString() });
//                 validateField('appointmentDate');
//               }
//             }}
//             availableTimeSlots={getAvailableTimeSlots()}
//             onTimeSelect={(dateStr) => {
//               onUpdateFormData({ appointmentDate: dateStr });
//               validateField('appointmentDate');
//             }}
//             error={formErrors.appointmentDate}
//             className="w-full"
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }

// export function AppointmentStep({
//   formData,
//   onUpdateFormData,
//   validateField,
//   customer,
//   vehicle,
//   formErrors
// }: StepPropsCommon) {
//   const [isLoadingSlots, setIsLoadingSlots] = useState(false);

//   const getAvailableTimeSlots = () => {
//     const date = formData.appointmentDate ? new Date(formData.appointmentDate) : new Date();
//     const day = date.getDay();
//     const slots: string[] = [];

//     if (day === 0) return slots; // Sunday closed
    
//     const startHour = 9;
//     const endHour = 18; // Open until 6 PM
    
//     // Generate slots up to endHour - 1 to ensure last appointment isn't at closing time
//     for (let hour = startHour; hour < endHour - 1; hour++) {
//       slots.push(`${hour}:00`);
//       slots.push(`${hour}:30`);
//     }
//     return slots;
//   };

//   const availableSlots = useMemo(() => getAvailableTimeSlots(), [formData.appointmentDate]);

//   return (
//     <Card className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Appointment Date/Time</label>
//           <Input
//             type="datetime-local"
//             value={formData.appointmentDate}
//             onChange={(e) => {
//               onUpdateFormData({ appointmentDate: e.target.value });
//               validateField('appointmentDate');
//             }}
//             min={new Date().toISOString().slice(0, 16)}
//             max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
//             className={formErrors.appointmentDate ? 'border-red-500' : ''}
//           />
//           {formErrors.appointmentDate && (
//             <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>
//           )}

//           {formData.appointmentDate && (
//             <div className="mt-4">
//               <p className="text-sm font-medium mb-2">Available Time Slots</p>
//               <div className="grid grid-cols-3 gap-2">
//                 {availableSlots.map((slot) => {
//                   const [hours, minutes] = slot.split(':').map(s => parseInt(s, 10));
//                   const selectedDate = new Date(formData.appointmentDate);
//                   const isSelected = selectedDate.getHours() === hours && selectedDate.getMinutes() === minutes;

//                   return (
//                     <Button
//                       key={slot}
//                       variant={isSelected ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => {
//                         const date = new Date(formData.appointmentDate);
//                         date.setHours(hours, minutes, 0, 0);
//                         onUpdateFormData({ appointmentDate: date.toISOString() });
//                       }}
//                       className={cn("text-sm", isSelected ? "bg-primary text-white" : "")}
//                     >
//                       {slot}
//                     </Button>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>


//       </div>

//       <Card className="bg-muted/50 p-4">
//         <div className="space-y-2">
//           <h3 className="text-sm font-medium">Service Center Hours</h3>
//           <div className="text-sm text-muted-foreground">
//             <p>Our service centers are open:</p>
//             <ul className="mt-2 space-y-1 list-disc list-inside">
//               <li>Monday - Saturday: 9:00 AM - 6:00 PM</li>
//               <li>Sunday: Closed</li>
//             </ul>
//             <p className="mt-2 text-sm text-amber-600">
//               * Appointments can be booked up to 30 days in advance
//             </p>
//           </div>
//         </div>
//       </Card>
//     </Card>
//   );
// }

// export function ExistingBookings({ bookings, onEdit, onDelete }: ExistingBookingsProps) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium">Existing Bookings</h3>
//       <div className="grid gap-4">
//         {bookings.map((booking) => (
//           <Card key={booking.id} className="p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium">{booking.referenceNumber}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     booking.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
//                     booking.status === 'completed' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {new Date(booking.appointmentDate).toLocaleString()}
//                 </p>
//                 <p className="text-sm mt-1">{booking.serviceType} - {booking.serviceLocation}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => onEdit(booking)}
//                   disabled={booking.status !== 'scheduled'}
//                 >
//                   <Edit2 className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => onDelete(booking)}
//                   disabled={booking.status !== 'scheduled'}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export const ServiceBooking = React.memo(({ customer, vehicle }: ServiceBookingProps) => {
//   // Ensure consistent rendering
//   const [renderKey] = React.useState(() => Math.random());
  
//   // Form Management
//   const [currentStep, setCurrentStep] = useState(1);

//   // Form State
//   const [formData, setFormData] = useState<ServiceBookingForm>(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(9, 0, 0, 0);

//     return {
//       vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
//       vin: vehicle.vin || "",
//       serviceLocation: SERVICE_LOCATIONS[0].id,
//       packageLevel: "",
//       serviceType: "general",  // Set a default service type
//       searchVIN: vehicle.vin || "",
//       orderReason: "Regular Service",  // Set a default reason
//       lastKMReading: vehicle.kmReading || "",
//       selectedPackages: [],
//       appointmentDate: tomorrow.toISOString().slice(0, 16),
//       confirmationDate: new Date().toISOString()
//     };
//   });

//   // UI State
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [isSearchingVIN, setIsSearchingVIN] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeMenuItem, setActiveMenuItem] = useState("booking");

//   // Booking Management
//   const [bookings, setBookings] = useState<ServiceBooking[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState<ServiceBooking | null>(null);
//   const [bookingToDelete, setBookingToDelete] = useState<ServiceBooking | null>(null);

//   const steps: Step[] = useMemo(() => [
//     { number: 1, title: "Booking", description: "Enter booking details", completed: currentStep > 1 },
//     { number: 2, title: "Packages", description: "Select service packages", completed: currentStep > 2 },
//     { number: 3, title: "Appointment", description: "Schedule appointment", completed: currentStep > 3 },
//   ], [currentStep]);

//   const validateField = React.useCallback((field: string) => {
//     const errors = { ...formErrors };

//     switch (field) {
//       case 'vehicle':
//         errors[field] = !formData.vehicle ? 'Vehicle is required' : '';
//         break;
//       case 'serviceType':
//         errors[field] = !formData.serviceType ? 'Service type is required' : '';
//         break;
//       case 'serviceLocation':
//         errors[field] = !formData.serviceLocation ? 'Service location is required' : '';
//         break;
//       case 'orderReason':
//         errors[field] = !formData.orderReason ? 'Order reason is required' : '';
//         break;
//       case 'lastKMReading': {
//         if (!formData.lastKMReading) {
//           errors[field] = 'KM reading is required';
//         } else {
//           const kmValue = parseInt(formData.lastKMReading);
//           const lastKnownKM = parseInt(vehicle.kmReading || "0");
//           if (isNaN(kmValue)) {
//             errors[field] = 'Please enter a valid number';
//           } else if (kmValue < lastKnownKM) {
//             errors[field] = `Value cannot be less than last known reading (${lastKnownKM} km)`;
//           } else if (kmValue > lastKnownKM + 50000) {
//             errors[field] = 'Value seems unusually high. Please verify.';
//           } else {
//             errors[field] = '';
//           }
//         }
//         break;
//       }
//       case 'selectedPackages':
//         errors[field] = formData.selectedPackages.length === 0 ? 'At least one package must be selected' : '';
//         break;
//       case 'appointmentDate': {
//         if (!formData.appointmentDate) {
//           errors[field] = 'Appointment date is required';
//         } else {
//           const selectedDate = new Date(formData.appointmentDate);
//           const now = new Date();
//           const maxDate = new Date();
//           maxDate.setDate(now.getDate() + 30); // Max 30 days in advance

//           if (selectedDate < now) {
//             errors[field] = 'Appointment date cannot be in the past';
//           } else if (selectedDate > maxDate) {
//             errors[field] = 'Appointments can only be booked up to 30 days in advance';
//           } else {
//             const day = selectedDate.getDay();
//             const hours = selectedDate.getHours();
//             const minutes = selectedDate.getMinutes();

//             if (day === 0) {
//               errors[field] = 'Service center is closed on Sundays';
//             } else {
//               // Validation for all days except Sunday
//               if (hours < 9 || (hours === 17 && minutes > 30) || hours > 17) {
//                 errors[field] = 'Service hours are between 9 AM and 6 PM (last appointment at 5:30 PM)';
//               }
//             }
//           }
//         }
//         break;
//       }
//       // Service advisor is no longer required
//       default:
//         break;
//     }

//     setFormErrors(prev => ({...prev, ...errors}));
//     return !errors[field];
//   }, []); // Add the dependency array

//   const validateStep = React.useCallback((step: number) => {
//     const errors: { [key: string]: string } = {};
    
//     switch (step) {
//       case 1:
//         // Vehicle details and service location
//         if (!formData.vehicle) {
//           errors.vehicle = 'Vehicle is required';
//         }
//         if (!formData.vin) {
//           errors.vin = 'VIN is required';
//         }
//         if (!formData.serviceLocation) {
//           errors.serviceLocation = 'Service location is required';
//         }
//         break;
      
//       case 2:
//         // Package selection
//         if (formData.selectedPackages.length === 0) {
//           errors.selectedPackages = 'At least one package must be selected';
//         }
//         break;
      
//       case 3:
//         // Appointment date validation
//         if (!formData.appointmentDate) {
//           errors.appointmentDate = 'Appointment date and time is required';
//         } else {
//           const selectedDate = new Date(formData.appointmentDate);
//           const now = new Date();
//           const maxDate = new Date();
//           maxDate.setDate(now.getDate() + 30);

//           if (selectedDate < now) {
//             errors.appointmentDate = 'Appointment cannot be in the past';
//           } else if (selectedDate > maxDate) {
//             errors.appointmentDate = 'Cannot book more than 30 days in advance';
//           } else {
//             const day = selectedDate.getDay();
//             const hours = selectedDate.getHours();
//             const minutes = selectedDate.getMinutes();

//             if (day === 0) {
//               errors.appointmentDate = 'Service center is closed on Sundays';
//             } else {
//               // Validation for all working days
//               if (hours < 9 || (hours === 17 && minutes > 30) || hours > 17) {
//                 errors.appointmentDate = 'Service hours are between 9 AM and 6 PM (last appointment at 5:30 PM)';
//               }
//             }
//           }
//         }
//         break;
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [formData]);

//   // Single update handler with function update support and validation
//   const handleUpdateFormData = React.useCallback((
//     data: Partial<ServiceBookingForm> | ((prev: ServiceBookingForm) => Partial<ServiceBookingForm>)
//   ) => {
//     setFormData(prev => {
//       const newData = typeof data === 'function' ? data(prev) : data;
//       const updatedForm = { ...prev, ...newData };
      
//       // If packages are being updated, ensure serviceType is set
//       if (newData.selectedPackages) {
//         if (newData.selectedPackages.length > 0 && !updatedForm.serviceType) {
//           updatedForm.serviceType = 'general';
//         }
//       }
      
//       // If appointment date is being set, ensure we have a service advisor
//       // Service advisor is no longer required
      
//       return updatedForm;
//     });
//   }, []);

//   const handleVINSearch = async () => {
//     setIsSearchingVIN(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       if (formData.searchVIN === vehicle.vin) {
//         handleUpdateFormData({
//           vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
//           vin: vehicle.vin,
//           lastKMReading: vehicle.kmReading
//         });
//         setFormErrors(prev => ({ ...prev, searchVIN: '' }));
//       } else {
//         setFormErrors(prev => ({ ...prev, searchVIN: 'Vehicle not found. Please verify VIN.' }));
//       }
//     } finally {
//       setIsSearchingVIN(false);
//     }
//   };

//   const navigate = useNavigate();

//   const handleNext = React.useCallback(async () => {
//     if (isLoading) return;

//     const step = currentStep; // Capture current step to prevent closure issues
//     const isValid = validateStep(step);

//     if (!isValid) return;

//     setIsLoading(true);
//     try {
//       if (step === 2) {
//         // Validate package selection specifically
//         if (!formData.selectedPackages || formData.selectedPackages.length === 0) {
//           setFormErrors(prev => ({
//             ...prev,
//             selectedPackages: 'Please select at least one package'
//           }));
//           return;
//         }
//       }

//       await new Promise(resolve => setTimeout(resolve, 300));

//       if (step < 3) {
//         setCurrentStep(prev => prev + 1);
//       } else {
//         const referenceNumber = generateReferenceNumber();
//         const newBooking: ServiceBooking = {
//           id: Date.now().toString(),
//           referenceNumber,
//           ...formData,
//           status: 'scheduled',
//           createdAt: new Date().toISOString()
//         };

//         setBookings(prev => [...prev, newBooking]);
//         setConfirmedBooking(newBooking);
//         setShowConfirmation(true);
//       }
//     } catch (error) {
//       console.error('Error in handleNext:', error);
//       setFormErrors(prev => ({
//         ...prev,
//         general: 'An error occurred. Please try again.'
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentStep, formData, isLoading, validateStep]);

//   const handlePrevious = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const generateReferenceNumber = () => generateBookingReference();

//   const handleConfirmBooking = async () => {
//     if (!validateStep(3)) return;

//     setIsProcessing(true);
//     try {
//       // Basic validation already handled by validateStep, but keep guards
//       const appointmentDate = new Date(formData.appointmentDate);
//       const now = new Date();
//       const maxDate = new Date();
//       maxDate.setDate(now.getDate() + 30);

//       if (appointmentDate < now || appointmentDate > maxDate) {
//         setFormErrors(prev => ({ ...prev, appointmentDate: 'Invalid appointment date' }));
//         setIsProcessing(false);
//         return;
//       }

//       const kmValue = parseInt(formData.lastKMReading || "0");
//       const lastKnownKM = parseInt(vehicle.kmReading || "0");
//       if (isNaN(kmValue) || kmValue < lastKnownKM) {
//         setFormErrors(prev => ({ ...prev, lastKMReading: `Invalid KM reading. Must be >= ${lastKnownKM}` }));
//         setIsProcessing(false);
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 800));

//       const referenceNumber = isEditing && formData.referenceNumber ? formData.referenceNumber : generateReferenceNumber();
//       const newBooking: ServiceBooking = {
//         id: isEditing && formData.id ? formData.id : Date.now().toString(),
//         referenceNumber,
//         ...formData,
//         status: 'scheduled',
//         createdAt: new Date().toISOString()
//       };

//       if (isEditing) {
//         setBookings(prev => prev.map(b => b.id === newBooking.id ? newBooking : b));
//       } else {
//         setBookings(prev => [...prev, newBooking]);
//         setConfirmedBooking(newBooking);
//         setShowConfirmation(true);
//       }

//       // Reset form
//       const resetFormData: ServiceBookingForm = {
//         vehicle: "",
//         vin: "",
//         serviceType: "",
//         serviceLocation: SERVICE_LOCATIONS[0].id,
//         packageLevel: "",
//         searchVIN: "",
//         orderReason: "",
//         lastKMReading: "",
//         selectedPackages: [],
//         appointmentDate: ""
//       };
//       setFormData(resetFormData);
//       setCurrentStep(1);
//       setIsEditing(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleEdit = (booking: ServiceBooking) => {
//     setFormData(booking);
//     setCurrentStep(1);
//     setIsEditing(true);
//   };

//   const handleDelete = (booking: ServiceBooking) => {
//     setBookingToDelete(booking);
//     setShowDeleteDialog(true);
//   };

//   const confirmDelete = () => {
//     if (bookingToDelete) {
//       setBookings(prev => prev.filter(b => b.id !== bookingToDelete.id));
//       setShowDeleteDialog(false);
//       setBookingToDelete(null);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <BookingStep
//             formData={formData}
//             onUpdateFormData={handleUpdateFormData}
//             validateField={validateField}
//             customer={customer}
//             vehicle={vehicle}
//             formErrors={formErrors}
//             isLoading={isLoading}
//             isSearchingVIN={isSearchingVIN}
//             onSearchVIN={handleVINSearch}
//           />
//         );
//       case 2: {
//         const memoizedUpdateFormData = React.useCallback(handleUpdateFormData, [handleUpdateFormData]);
//         const memoizedValidateField = React.useCallback(validateField, [validateField]);
        
//         return (
//           <ErrorBoundary>
//             <React.Suspense fallback={
//               <Card className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//                   <div>Loading packages...</div>
//                 </div>
//               </Card>
//             }>
//               <LazyPackagesStep
//                 key={`packages-step-${currentStep}`}
//                 formData={formData}
//                 onUpdateFormData={memoizedUpdateFormData}
//                 validateField={memoizedValidateField}
//                 customer={customer}
//                 vehicle={vehicle}
//               />
//             </React.Suspense>
//           </ErrorBoundary>
//         );
//       }
//       case 3:
//         return (
//           <AppointmentStep
//             formData={formData}
//             onUpdateFormData={handleUpdateFormData}
//             validateField={validateField}
//             customer={customer}
//             vehicle={vehicle}
//             formErrors={formErrors}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const renderMainContent = (): React.ReactNode => (
//     <div className="min-h-screen p-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="max-w-5xl mx-auto space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold">Service Booking</h2>
//               {isEditing && (
//                 <p className="text-sm text-muted-foreground mt-1">
//                   Editing booking {formData.referenceNumber}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <History className="h-5 w-5 text-muted-foreground" />
//               <span className="text-sm text-muted-foreground">Last Service: 2 months ago</span>
//             </div>
//           </div>

//           {bookings.length > 0 && !isEditing && (
//             <ExistingBookings
//               bookings={bookings}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           )}

//           <StepIndicator steps={steps} currentStep={currentStep} />
//           {renderStep()}

//           <div className="flex justify-between pt-6">
//             {isEditing && (
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setFormData({
//                     vehicle: "",
//                     vin: "",
//                     serviceType: "",
//                     serviceLocation: SERVICE_LOCATIONS[0].id,
//                     packageLevel: "",
//                     searchVIN: "",
//                     orderReason: "",
//                     lastKMReading: "",
//                     selectedPackages: [],
//                     appointmentDate: ""
//                   });
//                   setCurrentStep(1);
//                 }}
//               >
//                 Cancel Edit
//               </Button>
//             )}
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={handlePrevious}
//                 disabled={currentStep === 1}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={currentStep === 3 ? handleConfirmBooking : handleNext}
//                 disabled={isLoading || (currentStep === 3 && !validateStep(3))}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
//                     {currentStep === 3 ? "Confirming..." : "Loading..."}
//                   </div>
//                 ) : (
//                   currentStep === 3 ? (isEditing ? "Save Changes" : "Confirm Booking") : "Next"
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {renderMainContent()}
//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Booking</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete booking {bookingToDelete?.referenceNumber}? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
//         <DialogContent className="sm:max-w-md">
//           <div className="text-center space-y-4 p-4">
//             <div className="flex justify-center">
//               <div className="bg-green-50 p-3 rounded-full">
//                 <CheckCircle2 className="h-12 w-12 text-green-500" />
//               </div>
//             </div>
            
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
//               <p className="text-gray-600 mt-1">Your service booking has been successfully scheduled.</p>
//             </div>

//             <div className="bg-[#f0f7ff] border border-[#cce3ff] p-4 rounded-lg">
//               <p className="text-sm text-[#003087]">Reference Number</p>
//               <p className="text-2xl font-bold text-[#003087]">{confirmedBooking?.referenceNumber}</p>
//               <p className="text-xs text-[#4d77b3] mt-1">Please save this number for future reference</p>
//             </div>

//             <div className="bg-white border rounded-lg divide-y divide-gray-100">
//               <div className="grid grid-cols-1 gap-4 p-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">Appointment Details</p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {confirmedBooking?.appointmentDate && 
//                       new Date(confirmedBooking.appointmentDate).toLocaleString([], {
//                         dateStyle: 'medium',
//                         timeStyle: 'short'
//                       })
//                     }
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {SERVICE_LOCATIONS.find(loc => loc.id === confirmedBooking?.serviceLocation)?.name}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <Button 
//               onClick={() => {
//                 setShowConfirmation(false);
//                 // Reset form after confirmation
//                 setFormData({
//                   vehicle: "",
//                   vin: "",
//                   serviceType: "",
//                   serviceLocation: SERVICE_LOCATIONS[0].id,
//                   packageLevel: "",
//                   searchVIN: "",
//                   orderReason: "",
//                   lastKMReading: "",
//                   selectedPackages: [],
//                   appointmentDate: ""
//                 });
//                 setCurrentStep(1);
//               }}
//               className="w-full bg-[#003087] hover:bg-[#002670] text-white"
//             >
//               Done
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// });

// import React, { useState, useEffect, useMemo } from 'react';
// import { History, Edit2, Trash2, CheckCircle2 } from "lucide-react";
// import { AppointmentDatePicker } from "./AppointmentDatePicker";
// import { cn } from "@/lib/utils";
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { ServiceBookingSidebar } from "./ServiceBookingSidebar";

// // Custom error boundary
// class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
//   constructor(props: { children: React.ReactNode }) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Card className="p-6">
//           <div className="text-center">
//             <p className="text-red-500">Something went wrong loading the packages.</p>
//             <Button onClick={() => this.setState({ hasError: false })} className="mt-4">
//               Try again
//             </Button>
//           </div>
//         </Card>
//       );
//     }
//     return this.props.children;
//   }
// }

// const LazyPackagesStep = React.lazy(() => import('./PackagesStep'));

// // Types
// interface ServicePackage {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// interface CustomerData {
//   id: string;
//   name: string;
//   customerId: string;
//   type: string;
//   vehicleIndicator: string;
//   brand: string;
// }

// interface VehicleData {
//   brand: string;
//   plateNo: string;
//   model: string;
//   modelGroup: string;
//   modelDescription: string;
//   kmReading: string;
//   engineNo: string;
//   engineSize: string;
//   exteriorColor: string;
//   katashiki: string;
//   vin: string;
//   nextServiceDate: string;
//   purchasedFrom: string;
// }

// interface Step {
//   number: number;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// import { ServiceBookingForm, StepPropsCommon } from '@/types';

// interface ServiceBooking extends ServiceBookingForm {
//   id: string;
//   referenceNumber: string;
//   status: 'scheduled' | 'completed' | 'cancelled';
//   createdAt: string;
// }

// interface ServiceBookingProps {
//   customer: CustomerData;
//   vehicle: VehicleData;
// }

// interface BookingStepProps extends StepPropsCommon {
//   isSearchingVIN: boolean;
//   onSearchVIN: () => void;
// }

// interface AppointmentStepProps extends StepPropsCommon {
//   onTimeSlotSelect?: (slot: string) => void;
// }

// interface ExistingBookingsProps {
//   bookings: ServiceBooking[];
//   onEdit: (booking: ServiceBooking) => void;
//   onDelete: (booking: ServiceBooking) => void;
// }

// // Constants
// export const AVAILABLE_PACKAGES: readonly ServicePackage[] = [
//   { id: "1", name: "Basic Service", description: "Oil change, filter replacement, basic inspection", price: 299 },
//   { id: "2", name: "Premium Service", description: "Complete service with brake check and tire rotation", price: 599 },
//   { id: "3", name: "Deluxe Service", description: "Full service with detailed inspection and cleaning", price: 899 },
//   { id: "4", name: "Express Service", description: "Quick oil change and basic check", price: 199 },
// ] as const;

// export const SERVICE_LOCATIONS = [
//   { id: "loc1", name: "Al-Futtaim Toyota - Dubai Festival City" },
//   { id: "loc2", name: "Al-Futtaim Toyota - Sheikh Zayed Road" },
//   { id: "loc3", name: "Al-Futtaim Toyota - Abu Dhabi" },
// ] as const;

// export const generateBookingReference = () => {
//   const prefix = "SB";
//   const timestamp = Date.now().toString().slice(-6);
//   const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//   return `${prefix}${timestamp}${random}`;
// };

// export const getAvailableTimeSlotsForDate = (date?: Date): string[] => {
//   const dt = date ? new Date(date) : new Date();
//   const day = dt.getDay();
//   const slots: string[] = [];

//   if (day === 0) return slots; // Sunday closed

//   const startHour = 9;
//   const lastHour = 17;
//   for (let hour = startHour; hour <= lastHour; hour++) {
//     slots.push(`${hour}:00`);
//     slots.push(`${hour}:30`);
//   }
//   return slots;
// };

// // StepIndicator Component
// export function StepIndicator({ steps, currentStep }: { steps: Step[]; currentStep: number; }) {
//   return (
//     <div className="flex items-center justify-center w-full mb-8">
//       <div className="flex items-center space-x-4 w-full max-w-3xl">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.number}>
//             <div className={cn("flex items-center justify-center w-8 h-8 rounded-full border-2", {
//               "border-green-500 text-green-500": step.completed,
//               "border-gray-300": !step.completed,
//             })}>
//               {step.completed ? '✓' : step.number}
//             </div>
//             {index < steps.length - 1 && (
//               <div className={cn("flex-1 h-0.5 mx-2", {
//                 "bg-green-500": step.completed,
//                 "bg-gray-200": !step.completed,
//               })} />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// // BookingStep Component
// export function BookingStep({
//   formData,
//   onUpdateFormData,
//   validateField,
//   customer,
//   vehicle,
//   formErrors,
//   isLoading,
//   isSearchingVIN,
//   onSearchVIN
// }: StepPropsCommon & { isSearchingVIN: boolean; onSearchVIN: () => void; customer: CustomerData; vehicle: VehicleData }) {
//   const computedSlots = useMemo(() => {
//     const date = formData.appointmentDate ? new Date(formData.appointmentDate) : undefined;
//     return getAvailableTimeSlotsForDate(date);
//   }, [formData.appointmentDate]);

//   return (
//     <Card className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Vehicle Brand & Model</label>
//           <Input type="text" value={formData.vehicle} readOnly className="bg-gray-50" />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">VIN Number</label>
//           <Input type="text" value={formData.vin} readOnly className="bg-gray-50" />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Service Location</label>
//           <Select value={formData.serviceLocation} onValueChange={(value) => onUpdateFormData({ serviceLocation: value })}>
//             <SelectTrigger><SelectValue placeholder="Select Location" /></SelectTrigger>
//             <SelectContent>
//               {SERVICE_LOCATIONS.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>)}
//             </SelectContent>
//           </Select>
//           {formErrors.serviceLocation && <p className="text-red-500 text-sm mt-1">{formErrors.serviceLocation}</p>}
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Appointment Date & Time</label>
//           <AppointmentDatePicker
//             value={formData.appointmentDate ? new Date(formData.appointmentDate) : undefined}
//             onChange={(date) => { if (date) onUpdateFormData({ appointmentDate: date.toISOString() }); validateField('appointmentDate'); }}
//             availableTimeSlots={computedSlots}
//             className="w-full"
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }

// // AppointmentStep Component
// export function AppointmentStep({
//   formData,
//   onUpdateFormData,
//   validateField,
//   customer,
//   vehicle,
//   formErrors
// }: StepPropsCommon) {
//   const availableSlots = useMemo(() => {
//     const date = formData.appointmentDate ? new Date(formData.appointmentDate) : new Date();
//     return getAvailableTimeSlotsForDate(date);
//   }, [formData.appointmentDate]);

//   return (
//     <Card className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Appointment Date/Time</label>
//           <Input
//             type="datetime-local"
//             value={formData.appointmentDate}
//             onChange={(e) => { onUpdateFormData({ appointmentDate: e.target.value }); validateField('appointmentDate'); }}
//             min={new Date().toISOString().slice(0, 16)}
//             max={new Date(Date.now() + 30*24*60*60*1000).toISOString().slice(0,16)}
//             className={formErrors.appointmentDate ? 'border-red-500' : ''}
//           />
//           {formErrors.appointmentDate && <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>}
//         </div>
//       </div>
//     </Card>
//   );
// }

// // ExistingBookings Component
// export function ExistingBookings({ bookings, onEdit, onDelete }: ExistingBookingsProps) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium">Existing Bookings</h3>
//       <div className="grid gap-4">
//         {bookings.map(b => (
//           <Card key={b.id} className="p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium">{b.referenceNumber}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs ${b.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : b.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground mt-1">{new Date(b.appointmentDate).toLocaleString()}</p>
//                 <p className="text-sm mt-1">{b.serviceType} - {b.serviceLocation}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="ghost" size="icon" onClick={() => onEdit(b)} disabled={b.status !== 'scheduled'}><Edit2 className="h-4 w-4" /></Button>
//                 <Button variant="ghost" size="icon" onClick={() => onDelete(b)} disabled={b.status !== 'scheduled'}><Trash2 className="h-4 w-4" /></Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --------------------
// // Main ServiceBooking Component
// // --------------------

// export const ServiceBooking = ({ customer, vehicle }: ServiceBookingProps) => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(9,0,0,0);

//   const [formData, setFormData] = useState<ServiceBookingForm>({
//     vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
//     vin: vehicle.vin || "",
//     serviceLocation: SERVICE_LOCATIONS[0].id,
//     packageLevel: "",
//     serviceType: "general",
//     searchVIN: vehicle.vin || "",
//     orderReason: "Regular Service",
//     lastKMReading: vehicle.kmReading || "",
//     selectedPackages: [],
//     appointmentDate: tomorrow.toISOString().slice(0,16)
//     // confirmationDate: new Date().toISOString()
//   });

//   const [formErrors, setFormErrors] = useState<Record<string,string>>({});
//   const [isSearchingVIN, setIsSearchingVIN] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookings, setBookings] = useState<ServiceBooking[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState<ServiceBooking | null>(null);
//   const [bookingToDelete, setBookingToDelete] = useState<ServiceBooking | null>(null);

//   // Memoized callbacks
//   const handleUpdateFormData = React.useCallback((data: Partial<ServiceBookingForm> | ((prev: ServiceBookingForm) => Partial<ServiceBookingForm>)) => {
//     setFormData(prev => ({ ...prev, ...(typeof data === 'function' ? data(prev) : data) }));
//   }, []);
//   const validateField = React.useCallback((field: string) => { /* same as your existing validation */ return true; }, []);

//   const memoizedUpdateFormData = React.useCallback(handleUpdateFormData, [handleUpdateFormData]);
//   const memoizedValidateField = React.useCallback(validateField, [validateField]);

//   const renderStep = () => {
//     switch(currentStep) {
//       case 1:
//         return <BookingStep formData={formData} onUpdateFormData={handleUpdateFormData} validateField={validateField} customer={customer} vehicle={vehicle} formErrors={formErrors} isSearchingVIN={isSearchingVIN} onSearchVIN={() => {}} isLoading={isLoading} />;
//       case 2:
//         return <ErrorBoundary><React.Suspense fallback={<div>Loading Packages...</div>}><LazyPackagesStep key={`packages-step-${currentStep}`} formData={formData} onUpdateFormData={memoizedUpdateFormData} validateField={memoizedValidateField} customer={customer} vehicle={vehicle} /></React.Suspense></ErrorBoundary>;
//       case 3:
//         return <AppointmentStep formData={formData} onUpdateFormData={handleUpdateFormData} validateField={validateField} customer={customer} vehicle={vehicle} formErrors={formErrors} />;
//       default: return null;
//     }
//   };

//   const handleNext = () => { if(currentStep<3) setCurrentStep(prev=>prev+1); else { setShowConfirmation(true); setConfirmedBooking({ id:'1', referenceNumber: generateBookingReference(), ...formData, status:'scheduled', createdAt: new Date().toISOString()}); } };
//   const handlePrevious = () => { if(currentStep>1) setCurrentStep(prev=>prev-1); };

//   return (
//     <>
//       <div className="min-h-screen p-6">
//         <div className="max-w-5xl mx-auto space-y-6">
//           <h2 className="text-2xl font-bold">Service Booking</h2>
//           <StepIndicator steps={[{number:1,title:'Booking',description:'',completed:currentStep>1},{number:2,title:'Packages',description:'',completed:currentStep>2},{number:3,title:'Appointment',description:'',completed:currentStep>3}]} currentStep={currentStep} />
//           {renderStep()}
//           <div className="flex justify-between pt-6">
//             <Button variant="outline" onClick={handlePrevious} disabled={currentStep===1}>Previous</Button>
//             <Button onClick={handleNext}>{currentStep===3?'Confirm Booking':'Next'}</Button>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialog */}
//       <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
//         <DialogContent className="sm:max-w-md">
//           <div className="text-center space-y-4 p-4">
//             <div className="flex justify-center"><CheckCircle2 className="h-12 w-12 text-green-500" /></div>
//             <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
//             <p className="text-gray-600 mt-1">Your service booking has been successfully scheduled.</p>
//             <div className="bg-[#f0f7ff] border border-[#cce3ff] p-4 rounded-lg">
//               <p className="text-sm text-[#003087]">Reference Number</p>
//               <p className="text-2xl font-bold text-[#003087]">{confirmedBooking?.referenceNumber}</p>
//             </div>
//             <Button onClick={()=>{setShowConfirmation(false); setCurrentStep(1); setFormData({...formData, selectedPackages: []})}} className="w-full bg-[#003087] hover:bg-[#002670] text-white">Done</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// import React, { useState, useMemo } from 'react';

// import { CheckCircle2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { SERVICE_LOCATIONS, AVAILABLE_PACKAGES, generateBookingReference, getAvailableTimeSlotsForDate } from './constants';
// import { ServiceBookingForm, ServiceBooking, CustomerData, VehicleData, ServicePackage } from '@/types';

// interface ServiceBookingProps {
//   customer: CustomerData;
//   vehicle: VehicleData;
// }

// export const ServiceBookingSinglePage: React.FC<ServiceBookingProps> = ({ customer, vehicle }) => {
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   tomorrow.setHours(9, 0, 0, 0);

//   const [formData, setFormData] = useState<ServiceBookingForm>({
//     vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
//     vin: vehicle.vin || '',
//     serviceLocation: SERVICE_LOCATIONS[0].id,
//     packageLevel: '',
//     serviceType: 'general',
//     searchVIN: vehicle.vin || '',
//     orderReason: 'Regular Service',
//     lastKMReading: vehicle.kmReading || '',
//     selectedPackages: [],
//     appointmentDate: tomorrow.toISOString().slice(0,16),
//   });

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [bookings, setBookings] = useState<ServiceBooking[]>([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState<ServiceBooking | null>(null);

//   // Compute available time slots
//   const availableSlots = useMemo(() => {
//     const date = formData.appointmentDate ? new Date(formData.appointmentDate) : new Date();
//     return getAvailableTimeSlotsForDate(date);
//   }, [formData.appointmentDate]);

//   const handleUpdate = (data: Partial<ServiceBookingForm>) => {
//     setFormData(prev => ({ ...prev, ...data }));
//   };

//   const togglePackage = (pkg: ServicePackage) => {
//     setFormData(prev => {
//       const exists = prev.selectedPackages.find(p => p.id === pkg.id);
//       return {
//         ...prev,
//         selectedPackages: exists
//           ? prev.selectedPackages.filter(p => p.id !== pkg.id)
//           : [...prev.selectedPackages, pkg]
//       };
//     });
//   };

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!formData.serviceLocation) errors.serviceLocation = 'Select a service location';
//     if (!formData.selectedPackages.length) errors.selectedPackages = 'Select at least one package';
//     if (!formData.appointmentDate) errors.appointmentDate = 'Select appointment date & time';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleConfirmBooking = () => {
//     if (!validateForm()) return;

//     const referenceNumber = generateBookingReference();
//     const newBooking: ServiceBooking = {
//       id: Date.now().toString(),
//       referenceNumber,
//       ...formData,
//       status: 'scheduled',
//       createdAt: new Date().toISOString()
//     };

//     setBookings(prev => [...prev, newBooking]);
//     setConfirmedBooking(newBooking);
//     setShowConfirmation(true);
//   };

//   return (
//     <>
//       <Card className="p-6 max-w-3xl mx-auto space-y-6">
//         <h2 className="text-2xl font-bold">Service Booking</h2>

//         {/* Vehicle & VIN */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Vehicle</label>
//             <Input value={formData.vehicle} readOnly className="bg-gray-50" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">VIN</label>
//             <Input value={formData.vin} readOnly className="bg-gray-50" />
//           </div>
//         </div>

//         {/* Service Location */}
//         <div>
//           <label className="text-sm font-medium">Service Location</label>
//           <Select value={formData.serviceLocation} onValueChange={(v) => handleUpdate({ serviceLocation: v })}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select location" />
//             </SelectTrigger>
//             <SelectContent>
//               {SERVICE_LOCATIONS.map(loc => (
//                 <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {formErrors.serviceLocation && <p className="text-red-500 text-sm">{formErrors.serviceLocation}</p>}
//         </div>

//         {/* Package Selection */}
//         <div>
//           <label className="text-sm font-medium">Select Packages</label>
//           <div className="grid md:grid-cols-2 gap-2 mt-2">
//             {AVAILABLE_PACKAGES.map(pkg => {
//               const selected = formData.selectedPackages.some(p => p.id === pkg.id);
//               return (
//                 <Button
//                   key={pkg.id}
//                   variant={selected ? 'default' : 'outline'}
//                   onClick={() => togglePackage(pkg)}
//                   className="text-left"
//                 >
//                   <div className="font-medium">{pkg.name}</div>
//                   <div className="text-sm">{pkg.price} AED</div>
//                 </Button>
//               );
//             })}
//           </div>
//           {formErrors.selectedPackages && <p className="text-red-500 text-sm">{formErrors.selectedPackages}</p>}
//         </div>

//         {/* Appointment Date & Time */}
//         <div>
//           <label className="text-sm font-medium">Appointment Date/Time</label>
//           <Input
//             type="datetime-local"
//             value={formData.appointmentDate}
//             onChange={(e) => handleUpdate({ appointmentDate: e.target.value })}
//             min={new Date().toISOString().slice(0,16)}
//             max={new Date(Date.now() + 30*24*60*60*1000).toISOString().slice(0,16)}
//           />
//           {formErrors.appointmentDate && <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>}

//           {formData.appointmentDate && (
//             <div className="mt-2 flex flex-wrap gap-2">
//               {availableSlots.map(slot => {
//                 const [hours, minutes] = slot.split(':').map(Number);
//                 const selectedDate = new Date(formData.appointmentDate);
//                 const isSelected = selectedDate.getHours() === hours && selectedDate.getMinutes() === minutes;

//                 return (
//                   <Button
//                     key={slot}
//                     variant={isSelected ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => {
//                       const date = new Date(formData.appointmentDate);
//                       date.setHours(hours, minutes, 0, 0);
//                       handleUpdate({ appointmentDate: date.toISOString() });
//                     }}
//                   >
//                     {slot}
//                   </Button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <Button className="w-full bg-[#003087] hover:bg-[#002670] text-white" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </Button>
//       </Card>

//       {/* Confirmation Dialog */}
//       <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
//         <DialogContent className="sm:max-w-md">
//           <div className="text-center space-y-4 p-4">
//             <div className="flex justify-center">
//               <div className="bg-green-50 p-3 rounded-full">
//                 <CheckCircle2 className="h-12 w-12 text-green-500" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
//             <p className="text-gray-600">Your service booking has been successfully scheduled.</p>

//             <div className="bg-[#f0f7ff] border border-[#cce3ff] p-4 rounded-lg">
//               <p className="text-sm text-[#003087]">Reference Number</p>
//               <p className="text-2xl font-bold text-[#003087]">{confirmedBooking?.referenceNumber}</p>
//               <p className="text-xs text-[#4d77b3] mt-1">Please save this number for future reference</p>
//             </div>

//             <Button
//               className="w-full bg-[#003087] hover:bg-[#002670] text-white"
//               onClick={() => setShowConfirmation(false)}
//             >
//               Done
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AVAILABLE_PACKAGES, SERVICE_LOCATIONS } from "./constants";
import { CheckCircle2 } from "lucide-react";


interface VehicleData {
  brand: string;
  model: string;
  plateNo: string;
  vin: string;
  kmReading: string;
}

interface ServiceBookingForm {
  vehicle: string;
  vin: string;
  serviceLocation: string;
  selectedPackages: string[];
  appointmentDate: string;
  lastKMReading: string;
}

interface ServiceBookingFormPageProps {
  vehicle: VehicleData;
}
export default function ServiceBookingFormPage({ vehicle }: ServiceBookingFormPageProps) {
  const [formData, setFormData] = useState<ServiceBookingForm>({
    vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
    vin: vehicle.vin,
    serviceLocation: SERVICE_LOCATIONS[0].id,
    selectedPackages: [],
    appointmentDate: new Date().toISOString().slice(0, 16),
    lastKMReading: vehicle.kmReading || "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [bookings, setBookings] = useState<ServiceBookingForm[]>([]);
  const [showSuccess, setShowSuccess] = useState(false); // Add this state

  const handleUpdate = (data: Partial<ServiceBookingForm>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.selectedPackages.length) errors.selectedPackages = "Select at least one package";
    if (!formData.appointmentDate) errors.appointmentDate = "Appointment date is required";
    if (!formData.lastKMReading) errors.lastKMReading = "KM reading is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setBookings(prev => [...prev, formData]);
    setShowSuccess(true); // Show success message
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

// export default function ServiceBookingFormPage({ vehicle }: ServiceBookingFormPageProps) {
//   const [formData, setFormData] = useState<ServiceBookingForm>({
//     vehicle: `${vehicle.brand} ${vehicle.model} (${vehicle.plateNo})`,
//     vin: vehicle.vin,
//     serviceLocation: SERVICE_LOCATIONS[0].id,
//     selectedPackages: [],
//     appointmentDate: new Date().toISOString().slice(0, 16),
//     lastKMReading: vehicle.kmReading || "",
//   });

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [bookings, setBookings] = useState<ServiceBookingForm[]>([]);

//   const handleUpdate = (data: Partial<ServiceBookingForm>) => {
//     setFormData(prev => ({ ...prev, ...data }));
//   };

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!formData.selectedPackages.length) errors.selectedPackages = "Select at least one package";
//     if (!formData.appointmentDate) errors.appointmentDate = "Appointment date is required";
//     if (!formData.lastKMReading) errors.lastKMReading = "KM reading is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;
//     setBookings(prev => [...prev, formData]);
//     alert("Booking Confirmed!");
//   };

  // Compute time slots (30 min intervals, Mon-Sat 09:00-17:30)
 const availableSlots = useMemo(() => {
  const slots: string[] = [];
  const dt = new Date();
  const day = dt.getDay();
  if (day === 0) return slots; // Sunday closed
  for (let h = 9; h <= 17; h++) {
    const hourStr = h.toString().padStart(2, '0');
    slots.push(`${hourStr}:00`, `${hourStr}:30`);
  }
  return slots;
}, []);



  return (
      <div className="space-y-6 max-w-3xl mx-auto">
      {/* Success Message */}
      {showSuccess && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Booking Confirmed!</h3>
              <p className="text-sm text-green-700">
                Your service appointment has been successfully scheduled for{" "}
                {new Date(formData.appointmentDate).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </Card>
      )}

    <Card className="p-6 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Service Booking</h2>
      <div className="bg-[#f0f7ff] border border-[#cce3ff] p-4 rounded-lg">  

      {/* Vehicle Info */}
      <div className="space-y-2">
        <label>Vehicle</label>
        <Input value={formData.vehicle} readOnly className="bg-gray-50" />
      </div>
      <div className="space-y-2">
        <label>VIN</label>
        <Input value={formData.vin} readOnly className="bg-gray-50" />
      </div>

      {/* Service Location */}
      <div className="space-y-2">
        <label>Service Location</label>
        <Select
          value={formData.serviceLocation}
          onValueChange={val => handleUpdate({ serviceLocation: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_LOCATIONS.map(loc => (
              <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Package Selection */}
      <div className="space-y-2">
        <label>Service Packages</label>
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_PACKAGES.map(pkg => {
            const selected = formData.selectedPackages.includes(pkg.id);
            return (
              <Button
                key={pkg.id}
                variant={selected ? "default" : "outline"}
                onClick={() => {
                  handleUpdate({
                    selectedPackages: selected
                      ? formData.selectedPackages.filter(id => id !== pkg.id)
                      : [...formData.selectedPackages, pkg.id]
                  });
                }}
              >
                {pkg.name} - AED {pkg.price}
              </Button>
            );
          })}
        </div>
        {formErrors.selectedPackages && (
          <p className="text-red-500 text-sm">{formErrors.selectedPackages}</p>
        )}
      </div>
      </div>

      {/* Appointment Date/Time */}

  <div className="bg-[#f0f7ff] border border-[#cce3ff] p-4 rounded-lg">     
<div className="space-y-2">  
  <label>Appointment Date</label>
  <Input
    type="date"
    value={formData.appointmentDate.slice(0, 10)}
    onChange={e => {
      const currentTime = formData.appointmentDate.slice(11, 16) || "09:00";
      handleUpdate({ appointmentDate: `${e.target.value}T${currentTime}` });
    }}
    min={new Date().toISOString().slice(0, 10)}
  />
  {formErrors.appointmentDate && (
    <p className="text-red-500 text-sm">{formErrors.appointmentDate}</p>
  )}

  <label className="block mt-4">Select Time Slot</label>
  <div className="grid grid-cols-3 gap-2">
    {availableSlots.map(slot => {
      const currentDateTime = formData.appointmentDate;
      const selectedTime = currentDateTime.slice(11, 16); // Extract HH:MM from datetime
      const isSelected = selectedTime === slot;

      return (
        <Button
          key={slot}
          variant={isSelected ? "default" : "outline"}
          size="sm"
          onClick={() => {
            const dateOnly = formData.appointmentDate.slice(0, 10);
            handleUpdate({ appointmentDate: `${dateOnly}T${slot}` });
          }}
        >
          {slot}
        </Button>
      );
    })}
  </div>
</div>

      {/* KM Reading */}
      <div className="space-y-2">
        <label>Last KM Reading</label>
        <Input
          value={formData.lastKMReading}
          onChange={e => handleUpdate({ lastKMReading: e.target.value })}
        />
        {formErrors.lastKMReading && (
          <p className="text-red-500 text-sm">{formErrors.lastKMReading}</p>
        )}
      </div>
      </div>

      {/* Submit */}
 <Button className="w-full" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </Card>
    </div>
    
  );
}