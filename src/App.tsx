// import { useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { genesys } from "@/utils/genesysIntegration";
// import Index from "./pages/Index";
// import CustomerDetails from "./pages/CustomerDetails";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => {
//   useEffect(() => {
//     // Notify Genesys Cloud when app is loaded
//     if (genesys.isEmbedded()) {
//       genesys.notifyReady();
//       console.log('App running in Genesys Cloud iframe');
//     }
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/customer-details/:id" element={<CustomerDetails />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { genesys } from "@/utils/genesysIntegration";

import Index from "./pages/Index";
import CustomerDetails from "./pages/CustomerDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Notify Genesys Cloud when app is loaded
    if (genesys.isEmbedded()) {
      genesys.notifyReady();
      console.log("App running in Genesys Cloud iframe");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Use HashRouter instead of BrowserRouter for GitHub Pages */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/customer-details/:id" element={<CustomerDetails />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
