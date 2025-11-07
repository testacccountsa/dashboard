import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Users,
  Car,
  Settings,
  Bell,
  FileText,
  BarChart2,
  Calendar,
  HelpCircle,
  LogOut
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { icon: Users, label: "Customers", path: "/" },
  { icon: Car, label: "Vehicles", path: "/vehicles" },
  { icon: Calendar, label: "Service Bookings", path: "/bookings" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string, label: string) => {
    // Add animation effect before navigation
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 100);
    }

    // Show toast for demo purposes
    console.log(`Navigating to ${label}`);
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      onOpenChange(false);
    }
    
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-base font-normal",
                    "hover:bg-secondary/80 transition-all duration-200"
                  )}
                  onClick={() => handleNavigation(item.path, item.label)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-base font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}