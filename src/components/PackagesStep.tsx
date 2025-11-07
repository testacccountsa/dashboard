import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CustomerData, VehicleData, ServicePackage, ServiceBookingForm } from '@/types';
const AVAILABLE_PACKAGES: ServicePackage[] = [
  { id: "1", name: "Basic Service", description: "Oil change, filter replacement, basic inspection", price: 299 },
  { id: "2", name: "Premium Service", description: "Complete service with brake check and tire rotation", price: 599 },
  { id: "3", name: "Deluxe Service", description: "Full service with detailed inspection and cleaning", price: 899 },
  { id: "4", name: "Express Service", description: "Quick oil change and basic check", price: 199 },
];

interface PackagesStepProps {
  formData: ServiceBookingForm;
  onUpdateFormData: (data: Partial<ServiceBookingForm>) => void;
  validateField: (field: string) => void;
  customer: CustomerData;
  vehicle: VehicleData;
}

interface PackageCardProps {
  pkg: ServicePackage;
  isSelected: boolean;
  onToggle: () => void;
}

const PackageCard = React.memo(({ pkg, isSelected, onToggle }: PackageCardProps) => {
  return (
    <Card key={pkg.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{pkg.name}</h3>
          <p className="text-sm text-muted-foreground">{pkg.description}</p>
          <p className="text-sm font-semibold mt-2">{pkg.price} AED</p>
        </div>
        <Button
          variant={isSelected ? "destructive" : "secondary"}
          size="sm"
          onClick={onToggle}
        >
          {isSelected ? "Remove" : "Add"}
        </Button>
      </div>
    </Card>
  );
});

interface SelectedPackagesProps {
  packages: ServicePackage[];
}

const SelectedPackages = ({ packages }: SelectedPackagesProps) => (
  <Card className="p-4">
    <h3 className="font-medium mb-4">Selected Packages</h3>
    {packages.length === 0 ? (
      <p className="text-sm text-muted-foreground">No packages selected</p>
    ) : (
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex justify-between items-center pb-2 border-b last:border-0">
            <div>
              <p className="font-medium">{pkg.name}</p>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
            </div>
            <p className="font-semibold">{pkg.price} AED</p>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2 border-t">
          <p className="font-medium">Total</p>
          <p className="font-bold text-lg">
            {packages.reduce((sum, pkg) => sum + pkg.price, 0)} AED
          </p>
        </div>
      </div>
    )}
  </Card>
);

const CustomerInfoCard = ({ customer, vehicle }: { customer: CustomerData; vehicle: VehicleData }) => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center gap-4 mb-4">
        <UserCircle className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-lg">{customer.name}</h3>
          <p className="text-sm text-muted-foreground">Customer ID: {customer.customerId}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Customer Type</p>
          <p className="font-medium">{customer.type}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Vehicle Indicator</p>
          <p className="font-medium">{customer.vehicleIndicator}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Brand</p>
          <p className="font-medium">{customer.brand}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Vehicle Details</p>
          <p className="font-medium">{vehicle.model} ({vehicle.plateNo})</p>
        </div>
      </div>
    </Card>
  );
}

// Components moved to top of file with proper interfaces

const UnmemoizedPackagesStep = ({ formData, onUpdateFormData, validateField, customer, vehicle }: PackagesStepProps) => {
  const handleTogglePackage = React.useCallback((pkg: ServicePackage) => {
    const isSelected = formData.selectedPackages.some(p => p.id === pkg.id);
    if (isSelected) {
      onUpdateFormData({
        selectedPackages: formData.selectedPackages.filter(p => p.id !== pkg.id)
      });
    } else {
      onUpdateFormData({
        selectedPackages: [...formData.selectedPackages, pkg]
      });
    }
    validateField('selectedPackages');
  }, [formData.selectedPackages, onUpdateFormData, validateField]);

  return (
    <div className="flex-1 space-y-6">
        <CustomerInfoCard customer={customer} vehicle={vehicle} />
        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Packages</h3>
              <div className="grid grid-cols-1 gap-4">
                {AVAILABLE_PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={formData.selectedPackages.some(p => p.id === pkg.id)}
                    onToggle={() => handleTogglePackage(pkg)}
                  />
                ))}
              </div>
            </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Selected Packages</h3>
                <SelectedPackages packages={formData.selectedPackages} />
                {formData.selectedPackages.length === 0 && (
                  <p className="text-red-500 text-sm">Please select at least one package</p>
                )}
            </div>
          </div>
        </Card>
      </div>
  );
}

const PackagesStep = React.memo(UnmemoizedPackagesStep);
export default PackagesStep;