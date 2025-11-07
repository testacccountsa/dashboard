import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// ServiceBooking.tsx


interface HeaderProps {
  navigate: (path: string) => void;
}

export const CustomerDetailsHeader = ({ navigate }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 text-white bg-gradient-to-r from-[#003087] via-[#002670] to-[#001c4d] border-b border-[#002670]/50" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className="container mx-auto px-6 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-xl transition-all duration-200 focus:bg-white/20 focus:outline-none"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/20">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#003087] flex items-center justify-center font-bold text-lg text-white">
                T
              </div>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-xl font-bold tracking-wide">TOYOTA</span>
              <span className="text-xs text-white/80">Vehicle Details</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="opacity-80">Last Visit:</span>
            <span>🔧 2018-09-20</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📧 30-11-2021</span>
          </div>
        </div>
      </div>
    </header>
  );
};