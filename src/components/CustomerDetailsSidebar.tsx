interface SidebarProps {
  activeSidebar: string;
  setActiveSidebar: (id: string) => void;
  items: Array<{ id: string; label: string; icon: string; }>;
}

export const CustomerDetailsSidebar = ({ activeSidebar, setActiveSidebar, items }: SidebarProps) => {
  return (
    <aside className="bg-[#003087] w-[88px] shrink-0 flex flex-col shadow-lg">
      <div className="py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSidebar(item.id)}
            className={`flex flex-col items-center justify-center w-full py-4 px-2 text-white text-xs font-medium transition-all border-l-[3px] border-transparent group ${
              activeSidebar === item.id 
                ? "bg-[#002670] border-l-white" 
                : "hover:bg-[#002670]/60 hover:border-l-white/50"
            }`}
          >
            <span className="text-2xl mb-2.5 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
            <span className="text-center whitespace-pre-line leading-tight opacity-90 group-hover:opacity-100 transition-opacity">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto border-t border-white/10 py-4 flex justify-center">
        <button className="w-14 h-14 rounded-xl bg-[#002670] flex flex-col items-center justify-center text-white font-medium text-xs shadow-lg hover:bg-[#001c4d] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20">
          <span>CK</span>
          <span>360°</span>
        </button>
      </div>
    </aside>
  );
};