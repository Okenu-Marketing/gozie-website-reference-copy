import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Websites from "./pages/Websites";
import LocalSeo from "./pages/LocalSeo";
import AiReceptionist from "./pages/AiReceptionist";
import Contact from "./pages/Contact";
import Start from "./pages/Start";
import ClientOnboarding from "./pages/ClientOnboarding";
import Funnel from "./pages/Funnel";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

/* ─── GLOBAL FLOATING CHAT WIDGET ─── */
const GlobalChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/start" || location.pathname === "/client-onboarding" || location.pathname === "/funnel") return;
    if (document.getElementById("ghl-global-widget")) return;

    const script = document.createElement("script");
    script.id = "ghl-global-widget";
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    script.setAttribute("data-widget-id", "69d0965010e73a1b70ca78c4");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("ghl-global-widget");
      if (existing) existing.remove();
    };
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <GlobalChatWidget />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/local-seo" element={<LocalSeo />} />
          <Route path="/ai-receptionist" element={<AiReceptionist />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/start" element={<Start />} />
          <Route path="/client-onboarding" element={<ClientOnboarding />} />
          <Route path="/funnel" element={<Funnel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
