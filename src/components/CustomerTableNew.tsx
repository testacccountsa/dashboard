import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Customer {
  id: string;
  name: string;
  customerId: string;
  type: string;
  vehicleIndicator: string;
  brand: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onInfo: (customer: Customer) => void;
}

const CustomerTableNew = ({ customers, onView, onInfo }: CustomerTableProps) => {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSearch, setTableSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toLowerCase().includes(tableSearch.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / parseInt(entriesPerPage)));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + parseInt(entriesPerPage)
  );

  const tableHeaderClass = "px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-50/80 first:rounded-tl-xl last:rounded-tr-xl backdrop-blur-sm";
  const tableCellClass = "px-6 py-4 text-sm text-gray-700 border-b border-gray-100";
  const tableRowHoverClass = "hover:bg-[#003087]/5 transition-all duration-200";
  const cardClass = "p-5 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer";

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedRows(newExpanded);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b p-4">
        <div className="flex items-center gap-2">
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">entries per page</span>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Search in table..."
            className="w-[200px]"
          />
        </div>
      </div>

      {/* Desktop / Tablet table view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Customer ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Customer Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Vehicle Brand</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className={tableCellClass}>
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => toggleRow(customer.id)} 
                      className="w-7 h-7 rounded flex items-center justify-center transition-colors duration-150 bg-[#003087]/10 text-[#003087] hover:bg-[#003087]/20"
                    >
                      {expandedRows.has(customer.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{customer.brand} • {customer.type}</div>
                    </div>
                  </div>
                </td>
                <td className={`${tableCellClass} hidden sm:table-cell font-medium text-[#003087]`}>{customer.customerId}</td>
                <td className={`${tableCellClass} hidden md:table-cell`}>{customer.type}</td>
                <td className={`${tableCellClass} hidden lg:table-cell`}>{customer.vehicleIndicator}</td>
                <td className={`${tableCellClass} hidden lg:table-cell`}>{customer.brand}</td>
                <td className={tableCellClass}>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      className="w-8 h-8 rounded-full shadow-sm transition-all duration-150 hover:shadow hover:scale-105 bg-[#003087] text-white hover:bg-[#004087]" 
                      onClick={() => navigate(`/customer-details/${customer.id}`)} 
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="w-8 h-8 rounded-full shadow-sm transition-all duration-150 hover:shadow hover:scale-105 bg-amber-500 text-white hover:bg-amber-600" 
                      onClick={() => navigate(`/customer-details/${customer.id}`)} 
                      title="Info"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-3">
        {paginatedCustomers.map((customer) => (
          <Card key={customer.id} className={cardClass}>
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="font-semibold text-base text-gray-900">{customer.name}</div>
                <div className="text-sm text-[#003087] font-medium">ID: {customer.customerId}</div>
                <div className="text-sm text-gray-500">{customer.brand} • {customer.type}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <Button size="icon" className="w-9 h-9 rounded-full hover:opacity-90" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }} onClick={() => navigate(`/customer-details/${customer.id}`)} title="View">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="w-9 h-9 rounded-full hover:opacity-90" style={{ background: 'hsl(var(--warning))', color: 'hsl(var(--warning-foreground))' }} onClick={() => navigate(`/customer-details/${customer.id}`)} title="Info">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <button onClick={() => toggleRow(customer.id)} className="text-xs text-muted-foreground mt-2">{expandedRows.has(customer.id) ? 'Hide details' : 'Show details'}</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          ««
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </Button>
        {Array.from({ length: Math.min(6, totalPages) }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(page)}
            className={currentPage === page ? "bg-secondary hover:bg-secondary/90" : ""}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </Button>
      </div>
    </div>
  );
};

export default CustomerTableNew;
