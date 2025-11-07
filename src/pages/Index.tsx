import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  RefreshCw,
  Download,
  Filter,
  MoreVertical,
  Users,
  Clock,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Settings,
  FileSpreadsheet,
  FileDown,
  Menu
} from "lucide-react";
import { AlFuttaimLogo, ToyotaLogo } from "@/components/ui/logo";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import CustomerTable from "@/components/CustomerTable";

interface Customer {
  id: string;
  name: string;
  customerId: string;
  type: string;
  vehicleIndicator: string;
  brand: string;
}

const mockCustomers: Customer[] = [
  {
    id: "CUS001",
    name: "Alpha Smith One",
    customerId: "SAMPLE101",
    type: "Regular",
    vehicleIndicator: "Active",
    brand: "Brand A"
  },
  {
    id: "CUS002",
    name: "Beta Jones Two",
    customerId: "SAMPLE102",
    type: "Premium",
    vehicleIndicator: "Service Due",
    brand: "Brand B"
  },
  {
    id: "CUS003",
    name: "Gamma Davis Three",
    customerId: "SAMPLE103",
    type: "VIP",
    vehicleIndicator: "Active",
    brand: "Brand C"
  },
  {
    id: "CUS004",
    name: "Delta Wilson Four",
    customerId: "SAMPLE104",
    type: "Regular",
    vehicleIndicator: "Inactive",
    brand: "Brand A"
  },
  {
    id: "CUS005",
    name: "Epsilon Brown Five",
    customerId: "SAMPLE105",
    type: "Premium",
    vehicleIndicator: "Active",
    brand: "Brand D"
  },
  {
    id: "CUS006",
    name: "Zeta Miller Six",
    customerId: "SAMPLE106",
    type: "Regular",
    vehicleIndicator: "Service Due",
    brand: "Brand B"
  },
  {
    id: "CUS007",
    name: "Eta Taylor Seven",
    customerId: "SAMPLE107",
    type: "VIP",
    vehicleIndicator: "Active",
    brand: "Brand E"
  },
  {
    id: "CUS008",
    name: "Theta Moore Eight",
    customerId: "SAMPLE108",
    type: "Premium",
    vehicleIndicator: "Inactive",
    brand: "Brand C"
  },
  {
    id: "CUS009",
    name: "Iota Clark Nine",
    customerId: "SAMPLE109",
    type: "Regular",
    vehicleIndicator: "Active",
    brand: "Brand D"
  },
  {
    id: "CUS010",
    name: "Kappa Lee Ten",
    customerId: "SAMPLE110",
    type: "VIP",
    vehicleIndicator: "Service Due",
    brand: "Brand A"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter((customer) => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          return customer.name.toLowerCase().includes(term);
        case "id":
          return customer.customerId.toLowerCase().includes(term);
        case "brand":
          return customer.brand.toLowerCase().includes(term);
        default:
          return false;
      }
    });

    setFilteredCustomers(filtered);
    toast.success(`Found ${filtered.length} result(s)`);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setFilteredCustomers(customers);
    toast.success("Data refreshed");
  };

  const handleExport = () => {
    toast.success("Exporting data...");
  };

  const handleView = (customer: Customer) => {
    toast.info(`Viewing details for ${customer.name}`);
  };

  const handleInfo = (customer: Customer) => {
    toast.info(`Showing info for ${customer.name}`);
  };

  const handleAddNew = () => {
    toast.info("Opening add new customer form...");
  };

  const navigate = useNavigate();

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.vehicleIndicator === 'Active').length,
    serviceDue: customers.filter(c => c.vehicleIndicator === 'Service Due').length,
    inactive: customers.filter(c => c.vehicleIndicator === 'Inactive').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#003087] via-[#002670] to-[#001c4d] text-white border-b border-[#002670]/50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10 text-white lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <AlFuttaimLogo className="text-white" />
            </div>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
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
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
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
      </header>

      <main className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{customerStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-semibold text-green-600">{customerStats.active}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Service Due</p>
                <p className="text-2xl font-semibold text-amber-600">{customerStats.serviceDue}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Inactive</p>
                <p className="text-2xl font-semibold text-red-600">{customerStats.inactive}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Search by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="id">Customer ID</SelectItem>
                    <SelectItem value="brand">Vehicle Brand</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                  Search
                </Button>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleRefresh}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh Data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <FileDown className="h-4 w-4 mr-2" />
                      Export
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport()}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export to Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport()}>
                      <FileDown className="h-4 w-4 mr-2" />
                      Export to CSV
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="default" onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Table */}
        <Card>
          <CustomerTable
            customers={filteredCustomers}
            onView={(customer) => navigate(`/customer-details/${customer.id}`)}
            onInfo={(customer) => navigate(`/customer-details/${customer.id}`)}
          />
        </Card>
      </main>
    </div>
  );
};

export default Index;
