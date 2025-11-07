const Header = () => {
  return (
    <header className="sticky top-0 z-40 text-white bg-gradient-to-r from-[#003087] via-[#002670] to-[#001c4d]" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-5">
          <div className="bg-white rounded-xl p-2.5 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <img 
              src="https://www.alfuttaim.com/wp-content/uploads/sites/22/2024/12/AF-logo.svg" 
              alt="Al-Futtaim Logo" 
              className="h-8 sm:h-10 w-auto"
              style={{ filter: 'brightness(1.05) contrast(1.15) saturate(1.1)' }}
            />
          </div>
          <div className="leading-tight">
            <div className="text-lg sm:text-xl font-bold tracking-wide">Al-Futtaim</div>
            <div className="text-xs sm:text-sm opacity-90">Automotive</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 items-center">
            <a className="text-sm font-medium hover:text-white/90 transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium hover:text-white/90 transition-colors" href="#">Customers</a>
            <a className="text-sm font-medium hover:text-white/90 transition-colors" href="#">Reports</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="bg-white/15 hover:bg-white/25 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
