import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AlFuttaimLogo } from "@/components/ui/logo";
import ServiceBooking from "@/components/ServiceBooking";
import {AVAILABLE_PACKAGES} from "@/components/constants";
import { SERVICE_LOCATIONS } from "@/components/constants";


import {
  ArrowLeft,
  UserCircle,
  CreditCard,
  Globe,
  Phone,
  Mail,
  Calendar,
  Settings,
  Bell,
  Car,
  Wrench,
  Package,
  History,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VehicleData {
  id: string;
  brand: string;
  plateNo: string;
  model: string;
  modelGroup: string;
  modelDescription: string;
  kmReadings: { value: string; date: string; }[];
  kmReading: string;  // Added for compatibility
  engineNo: string;
  engineSize: string;
  exteriorColor: string;
  katashiki: string;
  vin: string;
  nextServiceDate: string;
  purchasedFrom: string;
}

interface TabItem {
  id: string;
  label: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface KBArticle {
  id: number;
  title: string;
}

const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const bookingData = location.state || {};
  const [activeSidebar, setActiveSidebar] = useState("overview");
  const [expandedNBA, setExpandedNBA] = useState(true);
  const [expandedVehicle, setExpandedVehicle] = useState(true);
  
  // Sample customer data for demonstration
  const customerDatabase = [
    {
      id: "CUS001",
      name: "Alpha Smith One",
      customerId: "SAMPLE101",
      type: "Regular",
      vehicleIndicator: "Active",
      brand: "Toyota"
    },
    {
      id: "CUS002",
      name: "Beta Jones Two",
      customerId: "SAMPLE102",
      type: "Premium",
      vehicleIndicator: "Service Due",
      brand: "Lexus"
    },
    {
      id: "CUS003",
      name: "Gamma Davis Three",
      customerId: "SAMPLE103",
      type: "VIP",
      vehicleIndicator: "Active",
      brand: "Toyota"
    },
    {
      id: "CUS004",
      name: "Delta Wilson Four",
      customerId: "SAMPLE104",
      type: "Regular",
      vehicleIndicator: "Inactive",
      brand: "Toyota"
    },
    {
      id: "CUS005",
      name: "Epsilon Brown Five",
      customerId: "SAMPLE105",
      type: "Premium",
      vehicleIndicator: "Active",
      brand: "Lexus"
    }
  ];

  // Find the customer by ID from the URL params, with a fallback to first customer if not found
  const customerData = customerDatabase.find(customer => customer.id === id) || customerDatabase[0];
  
  // Log the customer lookup for debugging
  console.log('Customer ID from URL:', id);
  console.log('Found customer:', customerData);

  const vehicleDatabase: Record<string, VehicleData[]> = {
    "CUS001": [{
      id: "VEH001",
      brand: "Toyota",
      plateNo: "ABC123",
      model: "Camry",
      modelGroup: "Sedan",
      modelDescription: "Luxury Sedan",
      kmReadings: [
        { value: "15000", date: "2025-10-15" },
        { value: "12000", date: "2025-08-15" }
      ],
      kmReading: "15000",
      engineNo: "ENG123456",
      engineSize: "2.5L",
      exteriorColor: "Pearl White",
      katashiki: "KAT123",
      vin: "VIN123456789",
      nextServiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      purchasedFrom: "Al-Futtaim Toyota"
    }],
    "CUS002": [{
      id: "VEH002",
      brand: "Lexus",
      plateNo: "XYZ789",
      model: "ES",
      modelGroup: "Luxury Sedan",
      modelDescription: "Executive Sedan",
      kmReadings: [
        { value: "8000", date: "2025-10-20" }
      ],
      kmReading: "8000",
      engineNo: "ENG789012",
      engineSize: "3.5L",
      exteriorColor: "Metallic Black",
      katashiki: "KAT456",
      vin: "VIN987654321",
      nextServiceDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      purchasedFrom: "Al-Futtaim Lexus"
    },
    {
      id: "VEH003",
      brand: "Lexus",
      plateNo: "LMN456",
      model: "RX",
      modelGroup: "SUV",
      modelDescription: "Luxury SUV",
      kmReadings: [
        { value: "12000", date: "2025-10-18" },
        { value: "10000", date: "2025-09-15" }
      ],
      kmReading: "12000",
      engineNo: "ENG345678",
      engineSize: "3.0L",
      exteriorColor: "Sonic Silver",
      katashiki: "KAT789",
      vin: "VIN345678912",
      nextServiceDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      purchasedFrom: "Al-Futtaim Lexus"
    }]
  };

  // Get the vehicle data for the current customer, with a fallback to CUS001's vehicle if not found
  const mockVehicle: VehicleData = (vehicleDatabase[customerData.id] || vehicleDatabase["CUS001"])[0];

  const currentVehicle = mockVehicle;

  const handleNavigateToBooking = () => {
    setActiveSidebar('vehicle');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#003087] via-[#002670] to-[#001c4d] text-white border-b border-[#002670]/50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10 text-white"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <AlFuttaimLogo className="text-white" />
            </div>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="rounded-full bg-white/15 text-white hover:bg-white/25 border-white/20"
                    >
                      <History className="h-4 w-4 mr-2" />
                      Last Service: {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Full Service History</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                        <Bell className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <aside className="w-16 sm:w-64 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                customerData.type === 'VIP' ? 'bg-amber-500' :
                customerData.type === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
              }`}>
                <UserCircle className="h-6 w-6" />
              </div>
              <div className="hidden sm:block">
                <h3 className="text-sm font-medium text-gray-900">{customerData.name}</h3>
                <p className="text-xs text-gray-500">{customerData.customerId}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-2 space-y-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'overview' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('overview')}
                  >
                    <UserCircle className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Customer Information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Customer Overview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'vehicle-info' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('vehicle-info')}
                  >
                    <Car className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Vehicle Information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Vehicle Information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'service-history' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('service-history')}
                  >
                    <History className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Service History</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Service History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'service-packages' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('service-packages')}
                  >
                    <Package className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Service Packages</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Service Packages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'maintenance' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('maintenance')}
                  >
                    <Wrench className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Maintenance Schedule</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Maintenance Schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'preferences' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('preferences')}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">Preferences</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Service Preferences</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full justify-start ${activeSidebar === 'booking' ? 'bg-gray-100' : ''}`}
                    onClick={() => setActiveSidebar('booking')}
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    <span className="hidden sm:inline">New Booking</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Create New Service Booking</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {/* Page Title */}
          <div className="bg-white border-b sticky top-[57px] z-30 shadow-sm">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Customer Dashboard</h1>
                <Button 
                  variant="secondary"
                  onClick={() => setActiveSidebar('booking')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Service
                </Button>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-6">
            {activeSidebar === 'booking' ? (
  <ServiceBooking 
    vehicle={currentVehicle}
  />
) : (
              <div className="space-y-6">
                {/* Customer Information Section */}
                {activeSidebar === 'overview' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="text-xl font-semibold">Customer Information</h2>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          customerData.type === 'VIP' ? 'bg-amber-100 text-amber-800' :
                          customerData.type === 'Premium' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {customerData.type} Customer
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <UserCircle className="h-5 w-5 mr-2 text-gray-500" />
                              Personal Details
                            </h3>
                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                              <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-lg">{customerData.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Customer ID</p>
                                <p className="font-medium text-blue-600">{customerData.customerId}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Loyalty Points</p>
                                <p className="font-medium text-green-600">2,450 points</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Car className="h-5 w-5 mr-2 text-gray-500" />
                              Vehicle Status
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="p-3 bg-amber-50 border-amber-200">
                                <p className="text-sm text-amber-600">Next Service</p>
                                <p className="font-medium">{currentVehicle.nextServiceDate}</p>
                              </Card>
                              <Card className="p-3 bg-blue-50 border-blue-200">
                                <p className="text-sm text-blue-600">Last Service</p>
                                <p className="font-medium">{new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                              </Card>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Phone className="h-5 w-5 mr-2 text-gray-500" />
                              Contact Details
                            </h3>
                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                  customer@example.com
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                  +971 50 123 4567
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium flex items-center">
                                  <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                  Dubai, UAE
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Bell className="h-5 w-5 mr-2 text-gray-500" />
                              Notifications
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">Service Reminders</span>
                                <span className="text-sm font-medium text-green-600">Enabled</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">SMS Updates</span>
                                <span className="text-sm font-medium text-green-600">Enabled</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">Email Updates</span>
                                <span className="text-sm font-medium text-green-600">Enabled</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <h3 className="font-medium mb-4 flex items-center">
                        <History className="h-5 w-5 mr-2 text-gray-500" />
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Car className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Service Booking Completed</p>
                            <p className="text-sm text-gray-500">Regular maintenance service completed</p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="text-sm font-medium">Today</p>
                            <p className="text-xs text-gray-500">09:30 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Package Updated</p>
                            <p className="text-sm text-gray-500">Upgraded to Premium Service Package</p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="text-sm font-medium">Yesterday</p>
                            <p className="text-xs text-gray-500">02:15 PM</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Vehicle Information Section */}
                {activeSidebar === 'vehicle-info' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl font-semibold">Vehicle Information</h2>
                          <p className="text-sm text-gray-500 mt-1">{currentVehicle.brand} {currentVehicle.model}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveSidebar('booking')}
                          className="flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Service
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Car className="h-5 w-5 mr-2 text-gray-500" />
                              Basic Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Plate Number</p>
                                <p className="font-medium text-lg">{currentVehicle.plateNo}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">VIN</p>
                                <p className="font-medium text-lg">{currentVehicle.vin}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Model</p>
                                <p className="font-medium">{currentVehicle.model}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Year</p>
                                <p className="font-medium">2023</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Wrench className="h-5 w-5 mr-2 text-gray-500" />
                              Service Status
                            </h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">Next Service Due</p>
                                  <p className="text-sm text-gray-500">Based on mileage or date</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-amber-600">{currentVehicle.nextServiceDate}</p>
                                  <p className="text-sm text-gray-500">{parseInt(currentVehicle.kmReading) + 5000} km</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">Current Mileage</p>
                                  <p className="text-sm text-gray-500">Last updated today</p>
                                </div>
                                <p className="font-medium">{currentVehicle.kmReading} km</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <Settings className="h-5 w-5 mr-2 text-gray-500" />
                              Technical Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Engine Number</p>
                                <p className="font-medium">{currentVehicle.engineNo}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Engine Size</p>
                                <p className="font-medium">{currentVehicle.engineSize}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Color</p>
                                <p className="font-medium">{currentVehicle.exteriorColor}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Katashiki</p>
                                <p className="font-medium">{currentVehicle.katashiki}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-4 flex items-center">
                              <History className="h-5 w-5 mr-2 text-gray-500" />
                              Service Timeline
                            </h3>
                            <div className="relative pl-4 border-l border-gray-200 space-y-4">
                              <div className="relative">
                                <div className="absolute -left-[21px] h-4 w-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="font-medium">Regular Maintenance</p>
                                  <p className="text-sm text-gray-500">Oil Change, Filter Replacement</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="relative">
                                <div className="absolute -left-[21px] h-4 w-4 rounded-full bg-gray-100 border-2 border-gray-500"></div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="font-medium">Major Service</p>
                                  <p className="text-sm text-gray-500">Full Service with Brake Check</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6">
                      <h3 className="font-medium mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                        Maintenance Alerts
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 p-3 bg-amber-50 text-amber-800 rounded-lg">
                          <AlertTriangle className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Service Due Soon</p>
                            <p className="text-sm">Next service is due in 15 days or 1,000 km</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                            onClick={() => setActiveSidebar('booking')}
                          >
                            Schedule Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Service History Section */}
                {activeSidebar === 'service-history' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl font-semibold">Service History</h2>
                          <p className="text-sm text-gray-500 mt-1">Complete service records for your vehicle</p>
                        </div>
                        <div className="flex gap-2">
                          <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Services</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="repair">Repairs</SelectItem>
                              <SelectItem value="inspection">Inspections</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="icon">
                            <History className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                            type: 'Regular Maintenance',
                            description: 'Oil Change, Filter Replacement',
                            advisor: 'John Smith',
                            status: 'completed',
                            cost: 299,
                            mileage: 15000,
                            parts: ['Oil Filter', 'Air Filter', 'Engine Oil'],
                            duration: '2 hours'
                          },
                          {
                            date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
                            type: 'Major Service',
                            description: 'Full Service with Brake Check',
                            advisor: 'Sarah Johnson',
                            status: 'completed',
                            cost: 599,
                            mileage: 10000,
                            parts: ['Brake Pads', 'Filters', 'Engine Oil', 'Coolant'],
                            duration: '4 hours'
                          },
                          {
                            date: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000),
                            type: 'Inspection',
                            description: 'Annual Vehicle Inspection',
                            advisor: 'Michael Brown',
                            status: 'completed',
                            cost: 199,
                            mileage: 5000,
                            parts: [],
                            duration: '1 hour'
                          }
                        ].map((service, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start gap-4">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                service.type === 'Regular Maintenance' ? 'bg-blue-100 text-blue-600' :
                                service.type === 'Major Service' ? 'bg-purple-100 text-purple-600' :
                                'bg-green-100 text-green-600'
                              }`}>
                                {service.type === 'Regular Maintenance' ? 
                                  <Wrench className="h-5 w-5" /> :
                                  service.type === 'Major Service' ?
                                  <Settings className="h-5 w-5" /> :
                                  <CheckCircle2 className="h-5 w-5" />
                                }
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{service.type}</h3>
                                    <p className="text-sm text-gray-500">{service.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{service.date.toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">{service.mileage} km</p>
                                  </div>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Service Advisor</p>
                                    <p className="font-medium">{service.advisor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-medium">{service.duration}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Cost</p>
                                    <p className="font-medium">{service.cost} AED</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-medium text-green-600 capitalize">{service.status}</p>
                                  </div>
                                </div>

                                {service.parts.length > 0 && (
                                  <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm text-gray-500 mb-2">Parts Replaced</p>
                                    <div className="flex flex-wrap gap-2">
                                      {service.parts.map((part, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                          {part}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="font-medium mb-4">Service Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-600">Total Services</p>
                          <p className="text-2xl font-semibold text-blue-700">12</p>
                          <p className="text-sm text-blue-600 mt-1">Last 12 months</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-600">Average Cost</p>
                          <p className="text-2xl font-semibold text-green-700">365 AED</p>
                          <p className="text-sm text-green-600 mt-1">Per service</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-600">On-Time Services</p>
                          <p className="text-2xl font-semibold text-purple-700">98%</p>
                          <p className="text-sm text-purple-600 mt-1">Completion rate</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Service Packages Section */}
                {activeSidebar === 'service-packages' && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Available Service Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {AVAILABLE_PACKAGES.map((pkg) => (
                        <Card key={pkg.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{pkg.name}</h3>
                              <p className="text-sm text-gray-500">{pkg.description}</p>
                              <p className="font-semibold mt-2">{pkg.price} AED</p>
                            </div>
                            <Button
                              onClick={() => setActiveSidebar('booking')}
                              variant="secondary"
                              size="sm"
                            >
                              Book Now
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Maintenance Schedule Section */}
                {activeSidebar === 'maintenance' && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Maintenance Schedule</h2>
                    <div className="space-y-6">
                      {[
                        { km: "10,000", items: ["Oil Change", "Filter Replacement", "Basic Inspection"] },
                        { km: "20,000", items: ["Full Service", "Brake Check", "Tire Rotation"] },
                        { km: "40,000", items: ["Major Service", "Belt Inspection", "Transmission Check"] },
                      ].map((schedule) => (
                        <Card key={schedule.km} className="p-4">
                          <h3 className="font-medium mb-2">{schedule.km} km Service</h3>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {schedule.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Preferences Section */}
                {activeSidebar === 'preferences' && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Service Preferences</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Communication Preferences</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="sms" className="mr-2" />
                            <label htmlFor="sms">SMS Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="email" className="mr-2" />
                            <label htmlFor="email">Email Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="reminders" className="mr-2" />
                            <label htmlFor="reminders">Service Reminders</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-4">Preferred Service Center</h3>
                        <Select defaultValue="loc1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICE_LOCATIONS.map(location => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Overview Dashboard */}
                {activeSidebar === 'overview' && (
                  <div className="space-y-6">
                    {/* Customer Overview Card */}
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl font-semibold flex items-center gap-2">
                            <UserCircle className="h-6 w-6 text-primary" />
                            {customerData.name}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">ID: {customerData.customerId}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          customerData.type === 'VIP' ? 'bg-amber-100 text-amber-800' :
                          customerData.type === 'Premium' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {customerData.type} Customer
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Contact Information */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">customer@example.com</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">+971 50 123 4567</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Dubai, UAE</span>
                          </div>
                        </div>

                        {/* Vehicle Information */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{currentVehicle.brand} {currentVehicle.model}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">Plate: {currentVehicle.plateNo}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <History className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{currentVehicle.kmReadings[0]?.value || '0'} km</span>
                          </div>
                        </div>

                        {/* Service Status */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Next Service</span>
                            <span className="text-sm font-medium text-amber-600">{currentVehicle.nextServiceDate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Last Service</span>
                            <span className="text-sm font-medium">
                              {new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Service Status</span>
                            <span className="text-sm font-medium text-green-600">On Track</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="p-4 bg-blue-50 border-blue-100">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-600">Active Package</p>
                            <p className="font-semibold text-blue-900">Premium Service</p>
                            <p className="text-xs text-blue-600 mt-1">Valid until Dec 2025</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-purple-50 border-purple-100">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <History className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-purple-600">Service History</p>
                            <p className="font-semibold text-purple-900">12 Services</p>
                            <p className="text-xs text-purple-600 mt-1">Last 12 months</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-green-50 border-green-100">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-green-600">Loyalty Points</p>
                            <p className="font-semibold text-green-900">2,450 points</p>
                            <p className="text-xs text-green-600 mt-1">Silver Tier</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Recent Activity and Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Wrench className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Regular Maintenance</p>
                              <p className="text-sm text-gray-500">Oil Change, Filter Replacement</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">Today</p>
                              <p className="text-xs text-gray-500">09:30 AM</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setActiveSidebar('service-history')}
                          >
                            View Full History
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                          <Button 
                            variant="default" 
                            className="w-full justify-start"
                            onClick={() => setActiveSidebar('booking')}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Service
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Wrench className="h-4 w-4 mr-2" />
                            Request Roadside Assistance
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Package className="h-4 w-4 mr-2" />
                            View Service Packages
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="h-4 w-4 mr-2" />
                            Update Preferences
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDetails;