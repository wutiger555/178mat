import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Showcase3D from "./pages/Showcase3D";
// 管理後台
import Dashboard from "./admin/pages/Dashboard";
import ProjectsManager from "./admin/pages/ProjectsManager";
import ProductsManager from "./admin/pages/ProductsManager";
import MediaManager from "./admin/pages/MediaManager";
import MapManager from "./admin/pages/MapManager";

// 配置 GitHub Pages base path
const basePath = import.meta.env.BASE_URL.slice(0, -1) || "";

// 檢查是否為開發模式（管理後台只在開發模式下可用）
const isDevelopment = import.meta.env.DEV;

// 自定義 Hook: 路由切換時滾動到頂部
function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

// 滾動到頂部組件
function ScrollToTop() {
  useScrollToTop();
  return null;
}

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <WouterRouter base={basePath}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "pt-20" : ""}>
        <Switch>
          {/* 管理後台路由 - 只在開發模式下可用 */}
          {isDevelopment && (
            <>
              <Route path="/admin" component={Dashboard} />
              <Route path="/admin/projects" component={ProjectsManager} />
              <Route path="/admin/products" component={ProductsManager} />
              <Route path="/admin/media" component={MediaManager} />
              <Route path="/admin/map" component={MapManager} />
            </>
          )}

          {/* 一般網站路由 */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/products" component={Products} />
          <Route path="/showcase-3d" component={Showcase3D} />
          <Route path="/contact" component={Contact} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminRoute && <Footer />}
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
