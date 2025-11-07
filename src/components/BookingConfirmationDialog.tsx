import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  referenceNumber: string;
  bookingDetails: {
    vehicle: string;
    appointmentDate: string;
    serviceType: string;
    serviceLocation: string;
    selectedPackages: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  };
}

const BookingConfirmationDialog: React.FC<BookingConfirmationDialogProps> = ({
  open,
  onClose,
  referenceNumber,
  bookingDetails
}) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-gray-600">Your service booking has been successfully scheduled.</p>
            <p className="text-lg font-semibold mt-2">Reference Number:</p>
            <p className="text-xl font-bold text-[#003087]">{referenceNumber}</p>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">{bookingDetails.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Appointment:</span>
                <span className="font-medium">
                  {new Date(bookingDetails.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-medium">{bookingDetails.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{bookingDetails.serviceLocation}</span>
              </div>
            </div>
          </Card>

          {bookingDetails.selectedPackages.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Selected Packages</h3>
              <div className="space-y-2 text-sm">
                {bookingDetails.selectedPackages.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between">
                    <span className="text-gray-600">{pkg.name}</span>
                    <span className="font-medium">{pkg.price} AED</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      {bookingDetails.selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0)} AED
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-center">
            <Button 
              onClick={onClose}
              className="w-full bg-[#003087] hover:bg-[#002670]"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationDialog;