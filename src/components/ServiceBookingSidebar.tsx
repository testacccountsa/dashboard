import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserCircle, 
  Car, 
  Calendar, 
  Wrench, 
  ClipboardList, 
  History, 
  Settings 
} from 'lucide-react';

interface ServiceBookingSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export function ServiceBookingSidebar({ activeItem, onItemClick }: ServiceBookingSidebarProps) {
  const menuItems = [
    { id: 'customer-info', label: 'Customer Information', icon: <UserCircle className="h-5 w-5" /> },
    { id: 'vehicle-info', label: 'Vehicle Information', icon: <Car className="h-5 w-5" /> },
    { id: 'service-history', label: 'Service History', icon: <History className="h-5 w-5" /> },
    { id: 'booking-details', label: 'Booking Details', icon: <Calendar className="h-5 w-5" /> },
    { id: 'service-packages', label: 'Service Packages', icon: <Wrench className="h-5 w-5" /> },
    { id: 'maintenance-schedule', label: 'Maintenance Schedule', icon: <ClipboardList className="h-5 w-5" /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <Card className="p-4 w-64 h-full">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onItemClick?.(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}