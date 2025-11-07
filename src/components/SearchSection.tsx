import { Search, RefreshCw, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchType: string;
  setSearchType: (value: string) => void;
  onSearch: () => void;
  onRefresh: () => void;
  onExport: () => void;
}

const SearchSection = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  onSearch,
  onRefresh,
  onExport,
}: SearchSectionProps) => {
  return (
    <section className="bg-card rounded-lg shadow-[var(--shadow-elevated)] p-4 sm:p-6 mb-6">
      <h2 className="text-lg text-muted-foreground mb-4">Search</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Customer Name</SelectItem>
              <SelectItem value="id">Customer ID</SelectItem>
              <SelectItem value="brand">Vehicle Brand</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="flex-1"
          />
        </div>
        <div className="flex gap-2 justify-center sm:justify-start">
          <Button
            size="icon"
            variant="default"
            className="rounded-full hover:opacity-90"
            onClick={onSearch}
            title="Search"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="bg-success hover:bg-success/90 rounded-full"
            onClick={onRefresh}
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="bg-secondary hover:bg-secondary/90 rounded-full"
            title="Filter"
          >
            <Filter className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="default"
            className="bg-warning hover:bg-warning/90 rounded-full"
            onClick={onExport}
            title="Export"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
