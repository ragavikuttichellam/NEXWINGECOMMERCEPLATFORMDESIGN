import { useState, useEffect, useRef } from "react";
import {
  Search, ShoppingCart, Heart, Bell, User, Menu, X, ChevronDown, ChevronRight,
  ChevronLeft, Star, Truck, Shield, RefreshCw, Award, MapPin, Phone, Mail,
  Package, TrendingUp, BarChart2, Users, DollarSign, Eye, Plus, Minus,
  Check, ArrowRight, ArrowLeft, Filter, Grid, List, Zap, Tag, Gift,
  CreditCard, Wallet, Settings, LogOut, Home, ShoppingBag, Layers,
  Percent, Clock, Share2, Copy, CheckCircle, AlertCircle, Info,
  Sun, Moon, ChevronUp, MoreHorizontal, Edit2, Trash2, Upload,
  Download, PieChart, Activity, Globe, Lock, Unlock, FileText,
  HelpCircle, MessageCircle, Headphones, Send, Instagram, Twitter,
  Facebook, Youtube, Linkedin, AlertTriangle, Wifi, WifiOff,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie,
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | "landing" | "home" | "category" | "search" | "products" | "product-detail"
  | "wishlist" | "compare" | "cart" | "checkout" | "payment" | "order-success"
  | "order-tracking" | "profile" | "addresses" | "coupons" | "wallet"
  | "gift-cards" | "notifications" | "recently-viewed" | "recommendations"
  | "seller-register" | "seller-dashboard" | "seller-products" | "seller-orders"
  | "seller-analytics" | "admin-dashboard" | "admin-products" | "admin-orders"
  | "admin-users" | "admin-analytics" | "admin-reports" | "delivery-dashboard"
  | "delivery-tracking" | "analytics" | "help" | "faq" | "contact" | "about"
  | "privacy" | "terms" | "404" | "500" | "empty-states" | "loading-states"
  | "design-system" | "login" | "register" | "forgot-password" | "reset-password"
  | "otp-verify";

// ─── Data ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Sony WH-1000XM5 Wireless Headphones", brand: "Sony", price: 349, originalPrice: 399, rating: 4.8, reviews: 3241, category: "Electronics", image: "photo-1505740420928-5e560c06d30e", badge: "Best Seller", inStock: true, discount: 13 },
  { id: 2, name: "Apple MacBook Pro 14\" M3 Pro", brand: "Apple", price: 1999, originalPrice: 2199, rating: 4.9, reviews: 1892, category: "Electronics", image: "photo-1496181133206-80ce9b88a853", badge: "New", inStock: true, discount: 9 },
  { id: 3, name: "Nike Air Max 270 React", brand: "Nike", price: 129, originalPrice: 160, rating: 4.6, reviews: 5412, category: "Footwear", image: "photo-1542291026-7eec264c27ff", badge: "Hot", inStock: true, discount: 19 },
  { id: 4, name: "Samsung 65\" QLED 4K Smart TV", brand: "Samsung", price: 1299, originalPrice: 1799, rating: 4.7, reviews: 2108, category: "Electronics", image: "photo-1593359677879-a4bb92f4834a", badge: "Sale", inStock: true, discount: 28 },
  { id: 5, name: "Dyson V15 Detect Absolute", brand: "Dyson", price: 699, originalPrice: 799, rating: 4.8, reviews: 1456, category: "Home", image: "photo-1558618666-fcd25c85cd64", badge: "Top Rated", inStock: true, discount: 13 },
  { id: 6, name: "Levi's 512 Slim Taper Jeans", brand: "Levi's", price: 79, originalPrice: 98, rating: 4.5, reviews: 8721, category: "Fashion", image: "photo-1542272604-787c3835535d", badge: "", inStock: true, discount: 19 },
  { id: 7, name: "Canon EOS R6 Mark II Camera", brand: "Canon", price: 2499, originalPrice: 2799, rating: 4.9, reviews: 892, category: "Electronics", image: "photo-1516035069371-29a1b244cc32", badge: "Pro", inStock: false, discount: 11 },
  { id: 8, name: "KitchenAid Artisan Stand Mixer", brand: "KitchenAid", price: 449, originalPrice: 549, rating: 4.8, reviews: 4231, category: "Home", image: "photo-1556909114-f6e7ad7d3136", badge: "Classic", inStock: true, discount: 18 },
];

const CATEGORIES = [
  { name: "Electronics", icon: "💻", count: 24500, color: "from-blue-500 to-blue-700", image: "photo-1498049794561-7780e7231661" },
  { name: "Fashion", icon: "👗", count: 89200, color: "from-pink-500 to-rose-600", image: "photo-1445205170230-053b83016050" },
  { name: "Home & Garden", icon: "🏡", count: 31400, color: "from-emerald-500 to-teal-600", image: "photo-1586023492125-27b2c045efd7" },
  { name: "Sports", icon: "⚽", count: 18700, color: "from-orange-500 to-amber-600", image: "photo-1461896836934-ffe607ba8211" },
  { name: "Beauty", icon: "💄", count: 42300, color: "from-purple-500 to-violet-600", image: "photo-1596462502278-27bfdc403348" },
  { name: "Books", icon: "📚", count: 12800, color: "from-yellow-500 to-orange-500", image: "photo-1481627834876-b7833e8f5570" },
  { name: "Automotive", icon: "🚗", count: 9400, color: "from-slate-600 to-slate-800", image: "photo-1533473359331-0135ef1b58bf" },
  { name: "Toys", icon: "🎮", count: 15600, color: "from-cyan-500 to-sky-600", image: "photo-1558060370-d644479cb6f7" },
];

const BRANDS = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "LG", "Dyson", "Canon"];

const CHART_REVENUE = [
  { month: "Jan", revenue: 420000, orders: 3200 },
  { month: "Feb", revenue: 380000, orders: 2900 },
  { month: "Mar", revenue: 510000, orders: 3800 },
  { month: "Apr", revenue: 490000, orders: 3600 },
  { month: "May", revenue: 620000, orders: 4500 },
  { month: "Jun", revenue: 710000, orders: 5200 },
  { month: "Jul", revenue: 680000, orders: 5000 },
  { month: "Aug", revenue: 750000, orders: 5400 },
  { month: "Sep", revenue: 820000, orders: 5900 },
  { month: "Oct", revenue: 900000, orders: 6400 },
  { month: "Nov", revenue: 1100000, orders: 7800 },
  { month: "Dec", revenue: 1350000, orders: 9200 },
];

const CHART_CATEGORIES = [
  { name: "Electronics", value: 38, fill: "#2563eb" },
  { name: "Fashion", value: 26, fill: "#8b5cf6" },
  { name: "Home", value: 18, fill: "#10b981" },
  { name: "Sports", value: 11, fill: "#f59e0b" },
  { name: "Others", value: 7, fill: "#94a3b8" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtPrice = (n: number) => `$${n.toLocaleString()}`;
const Stars = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const s = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </div>
  );
};

const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "blue" | "green" | "red" | "amber" | "purple" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>;
};

const Btn = ({
  children, variant = "primary", size = "md", className = "", onClick, disabled, fullWidth,
}: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg"; className?: string; onClick?: () => void; disabled?: boolean; fullWidth?: boolean;
}) => {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed select-none";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", placeholder, icon, value, onChange, className = "" }: {
  label?: string; type?: string; placeholder?: string; icon?: React.ReactNode;
  value?: string; onChange?: (v: string) => void; className?: string;
}) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${icon ? "pl-10" : ""}`}
      />
    </div>
  </div>
);

const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className} ${onClick ? "cursor-pointer" : ""}`}>
    {children}
  </div>
);

const StatCard = ({ label, value, change, icon, color = "blue" }: { label: string; value: string; change?: string; icon: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600", purple: "bg-purple-50 text-purple-600",
  };
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {change && <p className={`text-xs mt-1 font-medium ${change.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{change} vs last month</p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
    </Card>
  );
};

const ProductCard = ({ product, onNavigate }: { product: typeof PRODUCTS[0]; onNavigate: (s: Screen) => void }) => {
  const [wished, setWished] = useState(false);
  return (
    <Card className="group overflow-hidden" onClick={() => onNavigate("product-detail")}>
      <div className="relative overflow-hidden aspect-square bg-slate-50">
        <img
          src={`https://images.unsplash.com/${product.image}?w=400&h=400&fit=crop&auto=format`}
          alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">{product.badge}</span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{product.discount}% OFF</span>
        )}
        <button onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
          className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart className={`w-4 h-4 ${wished ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mb-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-slate-500">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">{fmtPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through ml-2">{fmtPrice(product.originalPrice)}</span>
            )}
          </div>
          {!product.inStock && <Badge variant="red">Out of Stock</Badge>}
        </div>
      </div>
    </Card>
  );
};

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 font-poppins">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { group: "Shop", items: [
    { label: "Home", screen: "home", icon: <Home className="w-4 h-4" /> },
    { label: "Categories", screen: "category", icon: <Layers className="w-4 h-4" /> },
    { label: "Products", screen: "products", icon: <ShoppingBag className="w-4 h-4" /> },
    { label: "Search", screen: "search", icon: <Search className="w-4 h-4" /> },
    { label: "Product Detail", screen: "product-detail", icon: <Package className="w-4 h-4" /> },
  ]},
  { group: "Account", items: [
    { label: "Profile", screen: "profile", icon: <User className="w-4 h-4" /> },
    { label: "Wishlist", screen: "wishlist", icon: <Heart className="w-4 h-4" /> },
    { label: "Compare", screen: "compare", icon: <Layers className="w-4 h-4" /> },
    { label: "Cart", screen: "cart", icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Addresses", screen: "addresses", icon: <MapPin className="w-4 h-4" /> },
    { label: "Coupons", screen: "coupons", icon: <Tag className="w-4 h-4" /> },
    { label: "Wallet", screen: "wallet", icon: <Wallet className="w-4 h-4" /> },
    { label: "Gift Cards", screen: "gift-cards", icon: <Gift className="w-4 h-4" /> },
    { label: "Notifications", screen: "notifications", icon: <Bell className="w-4 h-4" /> },
    { label: "Recently Viewed", screen: "recently-viewed", icon: <Eye className="w-4 h-4" /> },
    { label: "Recommendations", screen: "recommendations", icon: <TrendingUp className="w-4 h-4" /> },
  ]},
  { group: "Checkout", items: [
    { label: "Checkout", screen: "checkout", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Payment", screen: "payment", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Order Success", screen: "order-success", icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Order Tracking", screen: "order-tracking", icon: <Truck className="w-4 h-4" /> },
  ]},
  { group: "Seller", items: [
    { label: "Register", screen: "seller-register", icon: <Plus className="w-4 h-4" /> },
    { label: "Dashboard", screen: "seller-dashboard", icon: <BarChart2 className="w-4 h-4" /> },
    { label: "Products", screen: "seller-products", icon: <Package className="w-4 h-4" /> },
    { label: "Orders", screen: "seller-orders", icon: <ShoppingBag className="w-4 h-4" /> },
    { label: "Analytics", screen: "seller-analytics", icon: <TrendingUp className="w-4 h-4" /> },
  ]},
  { group: "Admin", items: [
    { label: "Dashboard", screen: "admin-dashboard", icon: <BarChart2 className="w-4 h-4" /> },
    { label: "Products", screen: "admin-products", icon: <Package className="w-4 h-4" /> },
    { label: "Orders", screen: "admin-orders", icon: <ShoppingBag className="w-4 h-4" /> },
    { label: "Users", screen: "admin-users", icon: <Users className="w-4 h-4" /> },
    { label: "Analytics", screen: "admin-analytics", icon: <Activity className="w-4 h-4" /> },
    { label: "Reports", screen: "admin-reports", icon: <FileText className="w-4 h-4" /> },
  ]},
  { group: "Delivery", items: [
    { label: "Dashboard", screen: "delivery-dashboard", icon: <Truck className="w-4 h-4" /> },
    { label: "Tracking", screen: "delivery-tracking", icon: <MapPin className="w-4 h-4" /> },
    { label: "Analytics", screen: "analytics", icon: <PieChart className="w-4 h-4" /> },
  ]},
  { group: "Auth", items: [
    { label: "Login", screen: "login", icon: <Lock className="w-4 h-4" /> },
    { label: "Register", screen: "register", icon: <Plus className="w-4 h-4" /> },
    { label: "Forgot Password", screen: "forgot-password", icon: <HelpCircle className="w-4 h-4" /> },
    { label: "OTP Verify", screen: "otp-verify", icon: <Shield className="w-4 h-4" /> },
  ]},
  { group: "Info", items: [
    { label: "Help Center", screen: "help", icon: <Headphones className="w-4 h-4" /> },
    { label: "FAQ", screen: "faq", icon: <HelpCircle className="w-4 h-4" /> },
    { label: "Contact Us", screen: "contact", icon: <Phone className="w-4 h-4" /> },
    { label: "About Us", screen: "about", icon: <Globe className="w-4 h-4" /> },
    { label: "Design System", screen: "design-system", icon: <Layers className="w-4 h-4" /> },
  ]},
  { group: "Errors", items: [
    { label: "404 Not Found", screen: "404", icon: <AlertCircle className="w-4 h-4" /> },
    { label: "500 Server Error", screen: "500", icon: <AlertTriangle className="w-4 h-4" /> },
    { label: "Empty States", screen: "empty-states", icon: <Package className="w-4 h-4" /> },
    { label: "Loading States", screen: "loading-states", icon: <RefreshCw className="w-4 h-4" /> },
  ]},
] as const;

// ─── Header ──────────────────────────────────────────────────────────────────
const Header = ({ onNavigate, current, cartCount, dark, toggleDark, sidebarOpen, setSidebarOpen }: {
  onNavigate: (s: Screen) => void; current: Screen; cartCount: number;
  dark: boolean; toggleDark: () => void; sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void;
}) => {
  const [searchQ, setSearchQ] = useState("");
  const [megaMenu, setMegaMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 px-4 h-16 max-w-[1600px] mx-auto">
        {/* Hamburger */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex-shrink-0">
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 font-poppins tracking-tight">Nex<span className="text-blue-600">wing</span></span>
        </button>

        {/* Mega Nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {["Electronics", "Fashion", "Home", "Sports", "Beauty"].map((cat) => (
            <button key={cat}
              onMouseEnter={() => setMegaMenu(cat)}
              onMouseLeave={() => setMegaMenu(null)}
              onClick={() => onNavigate("category")}
              className="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 flex items-center gap-1">
              {cat} <ChevronDown className="w-3 h-3" />
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
              onKeyDown={(e) => e.key === "Enter" && onNavigate("search")}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={toggleDark} className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => onNavigate("wishlist")} className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 hidden sm:flex">
            <Heart className="w-4 h-4" />
          </button>
          <button onClick={() => onNavigate("notifications")} className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 hidden sm:flex">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button onClick={() => onNavigate("cart")} className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
          <button onClick={() => onNavigate("profile")} className="flex items-center gap-2 ml-1 pl-3 pr-4 py-2 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:block">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ open, setOpen, current, onNavigate }: {
  open: boolean; setOpen: (v: boolean) => void; current: Screen; onNavigate: (s: Screen) => void;
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Shop: true, Account: true });

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-slate-900 z-40 flex flex-col overflow-hidden transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
          {NAV_ITEMS.map((group) => (
            <div key={group.group} className="mb-1">
              <button
                onClick={() => setExpanded((p) => ({ ...p, [group.group]: !p[group.group] }))}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-widest hover:text-slate-300 transition-colors">
                {group.group}
                {expanded[group.group] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {expanded[group.group] && (
                <div className="space-y-0.5 mb-2">
                  {group.items.map((item) => (
                    <button key={item.screen}
                      onClick={() => { onNavigate(item.screen as Screen); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        current === item.screen
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}>
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <footer className="bg-slate-900 text-slate-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-poppins">Nexwing</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">Enterprise ecommerce platform delivering premium shopping experiences worldwide.</p>
          <div className="flex gap-3">
            {[Twitter, Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", links: ["Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books"] },
          { title: "Account", links: ["My Profile", "Orders", "Wishlist", "Wallet", "Coupons", "Notifications"] },
          { title: "Company", links: ["About Us", "Help Center", "FAQ", "Contact Us", "Privacy Policy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-white mb-4 font-poppins">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}><button onClick={() => onNavigate("home")} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">© 2025 Nexwing Technologies. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <button onClick={() => onNavigate("privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => onNavigate("terms")} className="hover:text-white transition-colors">Terms of Service</button>
        </div>
      </div>
    </div>
  </footer>
);

// ─── SCREENS ─────────────────────────────────────────────────────────────────

// Landing Page
const LandingPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { headline: "Shop the Future, Today.", sub: "Discover millions of products from top brands worldwide. Premium quality, unbeatable prices.", cta: "Shop Now", bg: "from-blue-600 via-blue-700 to-indigo-800", image: "photo-1498049794561-7780e7231661" },
    { headline: "Flash Deals Live Now.", sub: "Up to 70% off on electronics, fashion, home & more. Limited time offers you can't miss.", cta: "View Deals", bg: "from-purple-600 via-violet-700 to-indigo-800", image: "photo-1445205170230-053b83016050" },
    { headline: "New Arrivals Weekly.", sub: "Stay ahead of the curve with the latest products from top global brands.", cta: "Explore New", bg: "from-emerald-600 via-teal-700 to-cyan-800", image: "photo-1441984904996-e0b6ba687e04" },
  ];
  const current = slides[slide];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${current.bg} text-white py-24 md:py-36`}>
        <div className="absolute inset-0 opacity-10">
          <img src={`https://images.unsplash.com/${current.image}?w=1600&h=800&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> Enterprise Ecommerce Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-poppins leading-tight mb-6">{current.headline}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">{current.sub}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => onNavigate("home")} className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-sm md:text-base">
              {current.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
            <button onClick={() => onNavigate("seller-register")} className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm md:text-base">
              Sell on Nexwing
            </button>
          </div>
          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-12">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`rounded-full transition-all ${i === slide ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "12M+", label: "Products Listed" },
            { val: "4.8M+", label: "Happy Customers" },
            { val: "180+", label: "Countries Served" },
            { val: "$2.4B+", label: "Annual GMV" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white font-poppins mb-1">{s.val}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-poppins mb-3">Shop by Category</h2>
          <p className="text-slate-500">Browse our extensive catalog across every category imaginable</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button key={cat.name} onClick={() => onNavigate("category")}
              className={`relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br ${cat.color} group`}>
              <img src={`https://images.unsplash.com/${cat.image}?w=400&h=400&fit=crop&auto=format`}
                alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="font-bold text-sm md:text-base font-poppins">{cat.name}</span>
                <span className="text-xs text-white/70 mt-1">{cat.count.toLocaleString()} items</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center text-white">
          {[
            { icon: <Truck className="w-8 h-8 mx-auto mb-3" />, title: "Free Shipping", sub: "On orders over $49" },
            { icon: <Shield className="w-8 h-8 mx-auto mb-3" />, title: "Secure Payment", sub: "256-bit SSL encryption" },
            { icon: <RefreshCw className="w-8 h-8 mx-auto mb-3" />, title: "Easy Returns", sub: "30-day hassle-free returns" },
            { icon: <Award className="w-8 h-8 mx-auto mb-3" />, title: "Quality Assured", sub: "Verified genuine products" },
          ].map((f) => (
            <div key={f.title} className="p-6 bg-white/10 backdrop-blur rounded-2xl hover:bg-white/20 transition-colors">
              {f.icon}
              <div className="font-bold font-poppins mb-1">{f.title}</div>
              <div className="text-sm text-blue-100">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold font-poppins text-slate-900 mb-4">Ready to start selling?</h2>
        <p className="text-lg text-slate-500 mb-8">Join 500,000+ sellers on Nexwing and reach millions of customers worldwide.</p>
        <button onClick={() => onNavigate("seller-register")} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg text-base">
          Become a Seller <ArrowRight className="inline w-4 h-4 ml-1" />
        </button>
      </section>
    </div>
  );
};

// Homepage
const HomePage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [slide, setSlide] = useState(0);
  const [dealTimer, setDealTimer] = useState({ h: 5, m: 23, s: 41 });

  useEffect(() => {
    const id = setInterval(() => setDealTimer((p) => {
      if (p.s > 0) return { ...p, s: p.s - 1 };
      if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
      if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
      return p;
    }), 1000);
    return () => clearInterval(id);
  }, []);

  const heroSlides = [
    { title: "Up to 50% Off", subtitle: "Premium Electronics", tag: "Flash Sale", bg: "from-blue-600 to-indigo-700", image: "photo-1498049794561-7780e7231661" },
    { title: "New Season Styles", subtitle: "Fashion Collection 2025", tag: "New Arrivals", bg: "from-violet-600 to-purple-700", image: "photo-1445205170230-053b83016050" },
    { title: "Smart Home Essentials", subtitle: "Transform Your Living Space", tag: "Trending", bg: "from-emerald-600 to-teal-700", image: "photo-1586023492125-27b2c045efd7" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Carousel */}
      <section className="px-4 pt-4 max-w-[1400px] mx-auto">
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${heroSlides[slide].bg} h-64 md:h-96`}>
          <img src={`https://images.unsplash.com/${heroSlides[slide].image}?w=1200&h=600&fit=crop&auto=format`}
            alt="" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-25" />
          <div className="relative p-8 md:p-16 text-white max-w-lg">
            <Badge variant="blue">{heroSlides[slide].tag}</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold font-poppins mt-3 mb-2">{heroSlides[slide].title}</h1>
            <p className="text-white/80 mb-6 text-sm md:text-base">{heroSlides[slide].subtitle}</p>
            <Btn onClick={() => onNavigate("products")} variant="primary" className="bg-white text-blue-700 hover:bg-blue-50">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Btn>
          </div>
          <div className="absolute bottom-4 left-8 md:left-16 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className={`rounded-full transition-all ${i === slide ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
            ))}
          </div>
          <button onClick={() => setSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => setSlide((p) => (p + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <button key={cat.name} onClick={() => onNavigate("category")}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-slate-700 text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="max-w-[1400px] mx-auto px-4 pb-10">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm">
                <Zap className="w-4 h-4" /> Flash Deals
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-xl">
                {[dealTimer.h, dealTimer.m, dealTimer.s].map((v, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-sm font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
                    {i < 2 && <span className="text-slate-400">:</span>}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => onNavigate("products")} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
              See All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-[1400px] mx-auto px-4 pb-10">
        <SectionHeader title="Best Sellers" subtitle="Top picks from our global shoppers"
          action={<button onClick={() => onNavigate("products")} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-[1400px] mx-auto px-4 pb-10">
        <SectionHeader title="Featured Brands" subtitle="Shop from world-leading brands" />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {BRANDS.map((b) => (
            <button key={b} onClick={() => onNavigate("products")}
              className="py-4 px-2 bg-white rounded-2xl border border-slate-100 hover:border-blue-500 hover:shadow-md transition-all text-sm font-semibold text-slate-700 hover:text-blue-600">
              {b}
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-[1400px] mx-auto px-4 pb-16">
        <SectionHeader title="Trending Now" subtitle="What everyone's buying this week"
          action={<button onClick={() => onNavigate("products")} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.slice(4).map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-2">Stay in the Loop</h2>
          <p className="text-blue-100 mb-6 text-sm">Get exclusive deals, new arrivals, and personalised offers straight to your inbox.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl text-slate-900 text-sm focus:outline-none" />
            <button className="px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Detail
const ProductDetail = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const product = PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState("specs");
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = [product.image, "photo-1505740420928-5e560c06d30e", "photo-1484704849700-f032a568e944"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <button onClick={() => onNavigate("home")} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate("products")} className="hover:text-blue-600">Electronics</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={`https://images.unsplash.com/${imgs[imgIdx]}?w=700&h=700&fit=crop&auto=format`}
              alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-blue-500" : "border-slate-200"}`}>
                <img src={`https://images.unsplash.com/${img}?w=200&h=200&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="blue">{product.badge}</Badge>
            {product.inStock ? <Badge variant="green">In Stock</Badge> : <Badge variant="red">Out of Stock</Badge>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-poppins mb-3 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <Stars rating={product.rating} size="md" />
            <span className="text-sm text-slate-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-slate-900">{fmtPrice(product.price)}</span>
            <span className="text-xl text-slate-400 line-through">{fmtPrice(product.originalPrice)}</span>
            <Badge variant="red">{product.discount}% OFF</Badge>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-slate-700">Quantity:</span>
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-slate-900">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Btn onClick={() => onNavigate("cart")} size="lg" fullWidth className="flex-1">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </Btn>
            <Btn onClick={() => onNavigate("checkout")} variant="secondary" size="lg" fullWidth className="flex-1">
              Buy Now
            </Btn>
            <button onClick={() => setWished(!wished)} className={`p-3.5 rounded-xl border-2 transition-colors ${wished ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"}`}>
              <Heart className={`w-5 h-5 ${wished ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: <Truck className="w-4 h-4 text-blue-600" />, text: "Free delivery above $49" },
              { icon: <Shield className="w-4 h-4 text-emerald-600" />, text: "2-year warranty" },
              { icon: <RefreshCw className="w-4 h-4 text-amber-600" />, text: "30-day free returns" },
              { icon: <Award className="w-4 h-4 text-purple-600" />, text: "Genuine product" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                {t.icon}
                <span className="text-xs text-slate-600 font-medium">{t.text}</span>
              </div>
            ))}
          </div>

          {/* Delivery Checker */}
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-sm font-semibold text-slate-900 mb-2">Check Delivery</p>
            <div className="flex gap-2">
              <Input placeholder="Enter ZIP / PIN code" className="flex-1 !mb-0" />
              <Btn size="sm">Check</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {["specs", "reviews", "qa", "related"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-colors ${tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}>
              {t === "qa" ? "Q&A" : t === "related" ? "Related Products" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {tab === "specs" && (
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            ["Brand", product.brand], ["Model", "WH-1000XM5"],
            ["Connectivity", "Bluetooth 5.2, 3.5mm"], ["Battery", "30 hours playback"],
            ["Noise Cancellation", "Industry-leading ANC"], ["Weight", "250g"],
            ["Color Options", "Black, Silver, Midnight Blue"], ["Warranty", "2 Years Manufacturer"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-500">{k}</span>
              <span className="text-sm font-semibold text-slate-900">{v}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-4 mb-12">
          {[
            { user: "Alex M.", rating: 5, date: "Dec 12, 2024", text: "Absolutely incredible sound quality. The ANC is the best I've ever experienced — truly industry-leading. Worth every penny.", helpful: 142 },
            { user: "Sarah K.", rating: 4, date: "Nov 28, 2024", text: "Great headphones overall. Comfort is excellent for long sessions. Call quality could be slightly better but otherwise perfect.", helpful: 89 },
            { user: "James R.", rating: 5, date: "Nov 15, 2024", text: "Upgraded from the XM4s and honestly the improvement is massive. Lighter, better ANC, cleaner design. Highly recommend.", helpful: 213 },
          ].map((r, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {r.user[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{r.user}</p>
                    <p className="text-xs text-slate-400">{r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{r.text}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <button className="hover:text-blue-600 transition-colors">Helpful ({r.helpful})</button>
                <button className="hover:text-slate-600 transition-colors">Report</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "related" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
        </div>
      )}
    </div>
  );
};

// Cart
const CartPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [items, setItems] = useState([
    { ...PRODUCTS[0], qty: 1 },
    { ...PRODUCTS[2], qty: 2 },
    { ...PRODUCTS[4], qty: 1 },
  ]);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 49 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-5 flex gap-4 items-start">
              <img src={`https://images.unsplash.com/${item.image}?w=120&h=120&fit=crop&auto=format`}
                alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-slate-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-1">{item.brand}</p>
                <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 border border-slate-200 rounded-lg">
                    <button onClick={() => setItems((p) => p.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                      className="p-1.5 hover:bg-slate-100 rounded-l-lg transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => setItems((p) => p.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                      className="p-1.5 hover:bg-slate-100 rounded-r-lg transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <button onClick={() => setItems((p) => p.filter((i) => i.id !== item.id))}
                    className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-slate-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-900">{fmtPrice(item.price * item.qty)}</p>
                {item.qty > 1 && <p className="text-xs text-slate-400">{fmtPrice(item.price)} each</p>}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{fmtPrice(subtotal)}</span></div>
              <div className="flex justify-between text-slate-600"><span>Shipping</span><span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>{shipping === 0 ? "FREE" : fmtPrice(shipping)}</span></div>
              <div className="flex justify-between text-slate-600"><span>Tax (8%)</span><span>{fmtPrice(tax)}</span></div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900 text-base">
                <span>Total</span><span>{fmtPrice(subtotal + shipping + tax)}</span>
              </div>
            </div>
            <Btn onClick={() => onNavigate("checkout")} fullWidth size="lg" className="mt-5">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Btn>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">Apply Coupon</p>
            <div className="flex gap-2">
              <input placeholder="Enter coupon code" className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" />
              <Btn size="sm">Apply</Btn>
            </div>
          </Card>
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">Secure checkout with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout
const CheckoutPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Checkout</h1>
      {/* Stepper */}
      <div className="flex items-center justify-center mb-10">
        {["Address", "Payment", "Review"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all ${step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
              {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${step === i + 1 ? "text-blue-600" : "text-slate-400"}`}>{s}</span>
            {i < 2 && <div className={`mx-4 h-0.5 w-16 transition-colors ${step > i + 1 ? "bg-emerald-500" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card className="p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Smith" />
                <Input label="Phone" placeholder="+1 (555) 000-0000" className="md:col-span-2" />
                <Input label="Address Line 1" placeholder="123 Main Street" className="md:col-span-2" />
                <Input label="City" placeholder="New York" />
                <Input label="ZIP Code" placeholder="10001" />
                <Input label="State" placeholder="New York" />
                <Input label="Country" placeholder="United States" />
              </div>
              <Btn onClick={() => setStep(2)} size="lg" className="mt-6">Continue to Payment <ArrowRight className="w-4 h-4" /></Btn>
            </Card>
          )}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {["Credit/Debit Card", "PayPal", "Nexwing Wallet", "Cash on Delivery"].map((m, i) => (
                  <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${i === 0 ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <input type="radio" name="payment" defaultChecked={i === 0} className="text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{m}</span>
                  </label>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <Input label="Card Number" placeholder="4242 4242 4242 4242" className="md:col-span-2" />
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVV" placeholder="• • •" />
              </div>
              <div className="flex gap-3">
                <Btn variant="outline" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</Btn>
                <Btn onClick={() => setStep(3)} size="lg" className="flex-1">Review Order <ArrowRight className="w-4 h-4" /></Btn>
              </div>
            </Card>
          )}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {PRODUCTS.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <img src={`https://images.unsplash.com/${p.image}?w=80&h=80&fit=crop&auto=format`} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{p.name}</p>
                      <p className="text-xs text-slate-500">Qty: 1</p>
                    </div>
                    <p className="font-bold text-slate-900">{fmtPrice(p.price)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Btn variant="outline" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4" /> Back</Btn>
                <Btn onClick={() => onNavigate("order-success")} size="lg" className="flex-1">
                  <Lock className="w-4 h-4" /> Place Order
                </Btn>
              </div>
            </Card>
          )}
        </div>
        <Card className="p-6 h-fit">
          <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-slate-600 mb-4">
            <div className="flex justify-between"><span>Subtotal (3 items)</span><span>$1,177</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-emerald-600">FREE</span></div>
            <div className="flex justify-between"><span>Tax</span><span>$94.16</span></div>
            <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900 text-base">
              <span>Total</span><span>$1,271.16</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-emerald-700 font-medium">Safe & Secure Payment</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Order Success
const OrderSuccessPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-emerald-500" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 font-poppins mb-2">Order Placed!</h1>
      <p className="text-slate-500 mb-2">Thank you for your purchase.</p>
      <p className="text-sm text-slate-400 mb-8">Order ID: <span className="font-semibold text-blue-600">#NXW-2025-84729</span></p>
      <div className="p-5 bg-slate-50 rounded-2xl text-left mb-8 border border-slate-100">
        <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Estimated Delivery</span><span className="font-semibold text-slate-900">Dec 19-21, 2025</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-500">Shipping to</span><span className="font-semibold text-slate-900">123 Main St, New York</span></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Btn onClick={() => onNavigate("order-tracking")}>Track Order</Btn>
        <Btn variant="outline" onClick={() => onNavigate("home")}>Continue Shopping</Btn>
      </div>
    </div>
  </div>
);

// Order Tracking
const OrderTrackingPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const steps = [
    { label: "Order Placed", time: "Dec 15, 2025 · 10:24 AM", done: true },
    { label: "Payment Confirmed", time: "Dec 15, 2025 · 10:31 AM", done: true },
    { label: "Preparing Shipment", time: "Dec 16, 2025 · 2:00 PM", done: true },
    { label: "Shipped", time: "Dec 17, 2025 · 9:15 AM", done: false },
    { label: "Out for Delivery", time: "Expected Dec 20", done: false },
    { label: "Delivered", time: "Expected Dec 20", done: false },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Track Your Order</h1>
      <p className="text-slate-500 mb-8">Order ID: <span className="font-semibold text-blue-600">#NXW-2025-84729</span></p>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-6">Delivery Progress</h3>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? "bg-blue-600" : i === steps.findIndex((s) => !s.done) ? "bg-blue-100 border-2 border-blue-600" : "bg-slate-100"}`}>
                    {s.done ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  {i < steps.length - 1 && <div className={`w-0.5 h-8 mt-1 ${s.done ? "bg-blue-600" : "bg-slate-200"}`} />}
                </div>
                <div className="pb-6">
                  <p className={`text-sm font-semibold ${s.done ? "text-slate-900" : "text-slate-400"}`}>{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Shipment Details</h3>
            <div className="space-y-3 text-sm">
              {[
                ["Carrier", "FedEx Express"],
                ["Tracking #", "1Z999AA10123456784"],
                ["Estimated Delivery", "Dec 20, 2025"],
                ["Status", "In Transit"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span className="text-slate-500">{k}</span><span className="font-semibold text-slate-900">{v}</span></div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Delivery Address</h3>
            <p className="text-sm text-slate-600 leading-relaxed">John Smith<br />123 Main Street<br />New York, NY 10001<br />United States</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Admin · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
      <div className="flex gap-2">
        <Btn variant="outline" size="sm"><Download className="w-4 h-4" /> Export</Btn>
        <Btn size="sm"><Plus className="w-4 h-4" /> New Report</Btn>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Revenue" value="$8.24M" change="+18.2%" icon={<DollarSign className="w-5 h-5" />} color="blue" />
      <StatCard label="Total Orders" value="124,891" change="+12.4%" icon={<ShoppingBag className="w-5 h-5" />} color="green" />
      <StatCard label="Active Users" value="4.82M" change="+8.1%" icon={<Users className="w-5 h-5" />} color="purple" />
      <StatCard label="Active Sellers" value="58,420" change="+22.3%" icon={<TrendingUp className="w-5 h-5" />} color="amber" />
    </div>

    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Revenue Overview</h3>
            <div className="flex gap-2">
              {["1W", "1M", "3M", "1Y"].map((p, i) => (
                <button key={p} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${i === 3 ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={CHART_REVENUE}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={180}>
          <RechartsPie>
            <Pie data={CHART_CATEGORIES} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {CHART_CATEGORIES.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </Pie>
            <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
          </RechartsPie>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {CHART_CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.fill }} />
              <span className="text-xs text-slate-600">{c.name} <span className="font-semibold">{c.value}%</span></span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Recent Orders Table */}
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Recent Orders</h3>
        <Btn variant="ghost" size="sm">View All</Btn>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="pb-3 pr-4 font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: "#NXW-84729", customer: "Alex Morrison", product: "Sony WH-1000XM5", amount: "$349", status: "Delivered", date: "Dec 15" },
              { id: "#NXW-84730", customer: "Sarah Chen", product: "Nike Air Max 270", amount: "$129", status: "Processing", date: "Dec 15" },
              { id: "#NXW-84731", customer: "James Wilson", product: "MacBook Pro 14\"", amount: "$1,999", status: "Shipped", date: "Dec 14" },
              { id: "#NXW-84732", customer: "Emma Davis", product: "Dyson V15", amount: "$699", status: "Pending", date: "Dec 14" },
              { id: "#NXW-84733", customer: "Michael Brown", product: "Samsung 65\" TV", amount: "$1,299", status: "Cancelled", date: "Dec 13" },
            ].map((row) => {
              const statusColors: Record<string, string> = {
                Delivered: "green", Processing: "blue", Shipped: "amber", Pending: "purple", Cancelled: "red",
              };
              return (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-blue-600">{row.id}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.customer}</td>
                  <td className="py-3 pr-4 text-slate-600 max-w-[180px] truncate">{row.product}</td>
                  <td className="py-3 pr-4 font-semibold text-slate-900">{row.amount}</td>
                  <td className="py-3 pr-4"><Badge variant={statusColors[row.status] as any}>{row.status}</Badge></td>
                  <td className="py-3 text-slate-500">{row.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// Seller Dashboard
const SellerDashboard = () => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Seller Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">TechGadgets Store · Seller ID: SLR-39218</p>
      </div>
      <Btn size="sm"><Plus className="w-4 h-4" /> Add Product</Btn>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="My Revenue" value="$124,800" change="+14.2%" icon={<DollarSign className="w-5 h-5" />} color="blue" />
      <StatCard label="Total Orders" value="2,841" change="+9.8%" icon={<ShoppingBag className="w-5 h-5" />} color="green" />
      <StatCard label="Products Listed" value="342" change="+5" icon={<Package className="w-5 h-5" />} color="amber" />
      <StatCard label="Avg. Rating" value="4.7 ★" change="+0.2" icon={<Star className="w-5 h-5" />} color="purple" />
    </div>
    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Monthly Orders</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={CHART_REVENUE.slice(6)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-5 text-xs font-bold text-slate-400 tabular-nums">{i + 1}.</span>
              <img src={`https://images.unsplash.com/${p.image}?w=40&h=40&fit=crop&auto=format`} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${90 - i * 15}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 flex-shrink-0">{fmtPrice(p.price)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// Auth Screens
const LoginPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[80vh] flex items-center justify-center px-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Welcome back</h1>
        <p className="text-slate-500 text-sm mt-1">Sign in to your Nexwing account</p>
      </div>
      <Card className="p-8">
        <div className="space-y-4 mb-6">
          <Input label="Email Address" type="email" placeholder="john@example.com" icon={<Mail className="w-4 h-4" />} />
          <Input label="Password" type="password" placeholder="Enter your password" icon={<Lock className="w-4 h-4" />} />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <button onClick={() => onNavigate("forgot-password")} className="text-sm text-blue-600 hover:underline">Forgot password?</button>
          </div>
        </div>
        <Btn fullWidth size="lg">Sign In</Btn>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">or continue with</span></div></div>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: "Google", icon: "G" }, { label: "Apple", icon: "" }].map((p) => (
            <button key={p.label} className="flex items-center justify-center gap-2 p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
              <span className="font-bold">{p.icon}</span> {p.label}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <button onClick={() => onNavigate("register")} className="text-blue-600 font-semibold hover:underline">Sign up</button>
        </p>
      </Card>
    </div>
  </div>
);

const RegisterPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Create Account</h1>
        <p className="text-slate-500 text-sm mt-1">Join millions of shoppers on Nexwing</p>
      </div>
      <Card className="p-8">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Smith" />
          </div>
          <Input label="Email Address" type="email" placeholder="john@example.com" icon={<Mail className="w-4 h-4" />} />
          <Input label="Phone Number" placeholder="+1 (555) 000-0000" icon={<Phone className="w-4 h-4" />} />
          <Input label="Password" type="password" placeholder="Create a strong password" icon={<Lock className="w-4 h-4" />} />
          <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
            <input type="checkbox" className="rounded mt-0.5" />
            I agree to the <button className="text-blue-600 hover:underline">Terms of Service</button> and <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </label>
        </div>
        <Btn fullWidth size="lg" onClick={() => onNavigate("otp-verify")}>Create Account</Btn>
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <button onClick={() => onNavigate("login")} className="text-blue-600 font-semibold hover:underline">Sign in</button>
        </p>
      </Card>
    </div>
  </div>
);

const OTPVerifyPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const r0 = useRef<HTMLInputElement>(null);
  const r1 = useRef<HTMLInputElement>(null);
  const r2 = useRef<HTMLInputElement>(null);
  const r3 = useRef<HTMLInputElement>(null);
  const r4 = useRef<HTMLInputElement>(null);
  const r5 = useRef<HTMLInputElement>(null);
  const refs = [r0, r1, r2, r3, r4, r5];
  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...otp]; n[i] = v;
    setOtp(n);
    if (v && i < 5) refs[i + 1].current?.focus();
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Verify Your Email</h1>
        <p className="text-slate-500 text-sm mb-8">We sent a 6-digit code to <strong>john@example.com</strong></p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((d, i) => (
            <input key={i} ref={refs[i]} value={d} onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1} className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              onKeyDown={(e) => e.key === "Backspace" && !d && i > 0 && refs[i - 1].current?.focus()}
            />
          ))}
        </div>
        <Btn fullWidth size="lg" onClick={() => onNavigate("home")}>Verify & Continue</Btn>
        <p className="text-sm text-slate-500 mt-4">Didn&apos;t receive the code? <button className="text-blue-600 font-semibold hover:underline">Resend</button></p>
      </div>
    </div>
  );
};

const ForgotPasswordPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Forgot Password?</h1>
        <p className="text-sm text-slate-500 mt-2">Enter your email and we'll send you a reset link.</p>
      </div>
      <Card className="p-6">
        <Input label="Email Address" type="email" placeholder="john@example.com" icon={<Mail className="w-4 h-4" />} className="mb-4" />
        <Btn fullWidth size="lg" onClick={() => onNavigate("otp-verify")}>Send Reset Link</Btn>
        <button onClick={() => onNavigate("login")} className="w-full text-center text-sm text-slate-500 mt-4 hover:text-blue-600 transition-colors">
          <ArrowLeft className="inline w-3.5 h-3.5 mr-1" /> Back to Sign In
        </button>
      </Card>
    </div>
  </div>
);

// Profile
const ProfilePage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const menuItems = [
    { icon: <ShoppingBag className="w-4 h-4" />, label: "My Orders", screen: "order-tracking" as Screen },
    { icon: <Heart className="w-4 h-4" />, label: "Wishlist", screen: "wishlist" as Screen },
    { icon: <MapPin className="w-4 h-4" />, label: "Saved Addresses", screen: "addresses" as Screen },
    { icon: <Wallet className="w-4 h-4" />, label: "Nexwing Wallet", screen: "wallet" as Screen },
    { icon: <Tag className="w-4 h-4" />, label: "Coupons", screen: "coupons" as Screen },
    { icon: <Gift className="w-4 h-4" />, label: "Gift Cards", screen: "gift-cards" as Screen },
    { icon: <Bell className="w-4 h-4" />, label: "Notifications", screen: "notifications" as Screen },
    { icon: <Settings className="w-4 h-4" />, label: "Account Settings", screen: "profile" as Screen },
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="p-6 mb-6 flex items-center gap-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold">J</div>
        <div className="flex-1">
          <h1 className="text-xl font-bold font-poppins">John Smith</h1>
          <p className="text-blue-100 text-sm">john.smith@example.com · Member since 2022</p>
          <div className="flex gap-4 mt-3 text-sm">
            {[["124", "Orders"], ["18", "Reviews"], ["4.2K", "Points"]].map(([v, l]) => (
              <div key={l}><span className="font-bold">{v}</span> <span className="text-blue-200">{l}</span></div>
            ))}
          </div>
        </div>
        <Btn variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 flex-shrink-0">Edit Profile</Btn>
      </Card>
      <div className="grid md:grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <button key={item.label} onClick={() => onNavigate(item.screen)}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Wishlist
const WishlistPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <SectionHeader title="My Wishlist" subtitle={`${PRODUCTS.length} saved items`} action={<Btn variant="outline" size="sm">Share Wishlist</Btn>} />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
    </div>
  </div>
);

// Products (Listing)
const ProductsPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-medium">Electronics</span>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Filters</h3>
              <button className="text-xs text-blue-600 hover:underline">Clear All</button>
            </div>
            {[
              { title: "Price Range", content: <div className="space-y-2"><div className="flex gap-2"><input placeholder="Min" className="flex-1 px-2 py-1.5 border border-slate-200 rounded-lg text-xs" /><input placeholder="Max" className="flex-1 px-2 py-1.5 border border-slate-200 rounded-lg text-xs" /></div></div> },
              { title: "Brand", content: <div className="space-y-1.5">{BRANDS.map((b) => <label key={b} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer"><input type="checkbox" className="rounded text-blue-600" /> {b}</label>)}</div> },
              { title: "Rating", content: <div className="space-y-1.5">{[5, 4, 3].map((r) => <label key={r} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="rating" className="text-blue-600" /><Stars rating={r} /><span className="text-xs text-slate-500">& above</span></label>)}</div> },
            ].map((f) => (
              <div key={f.title} className="border-t border-slate-100 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">{f.title}</h4>
                {f.content}
              </div>
            ))}
          </Card>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">{PRODUCTS.length} products found</p>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="flex gap-1 border border-slate-200 rounded-xl p-1">
                <button onClick={() => setView("grid")} className={`p-1.5 rounded-lg transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"}`}><Grid className="w-3.5 h-3.5" /></button>
                <button onClick={() => setView("list")} className={`p-1.5 rounded-lg transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"}`}><List className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
          <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-3"}>
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100"><ChevronLeft className="w-4 h-4" /></button>
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${p === 1 ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-100"}`}>{p}</button>
            ))}
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wallet
const WalletPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Nexwing Wallet</h1>
    <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 mb-6">
      <p className="text-blue-200 text-sm mb-2">Available Balance</p>
      <p className="text-4xl font-extrabold font-poppins mb-4">$248.50</p>
      <div className="flex gap-3">
        <Btn className="bg-white text-blue-700 hover:bg-blue-50 border-0"><Plus className="w-4 h-4" /> Add Money</Btn>
        <Btn className="bg-white/20 text-white hover:bg-white/30 border border-white/30"><ArrowRight className="w-4 h-4" /> Transfer</Btn>
      </div>
    </Card>
    <Card className="p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Transaction History</h3>
      <div className="space-y-3">
        {[
          { desc: "Order #NXW-84729 Payment", amount: "-$349.00", type: "debit", date: "Dec 15, 2025" },
          { desc: "Cashback on Nike Shoes", amount: "+$12.90", type: "credit", date: "Dec 12, 2025" },
          { desc: "Wallet Recharge", amount: "+$200.00", type: "credit", date: "Dec 10, 2025" },
          { desc: "Order #NXW-84615 Refund", amount: "+$79.00", type: "credit", date: "Dec 8, 2025" },
          { desc: "Order #NXW-84498 Payment", amount: "-$699.00", type: "debit", date: "Dec 5, 2025" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.type === "credit" ? "bg-emerald-100" : "bg-red-100"}`}>
              {t.type === "credit" ? <ArrowRight className="w-4 h-4 text-emerald-600 rotate-180" /> : <ArrowRight className="w-4 h-4 text-red-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">{t.desc}</p>
              <p className="text-xs text-slate-400">{t.date}</p>
            </div>
            <span className={`font-bold text-sm ${t.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>{t.amount}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// Notifications
const NotificationsPage = () => {
  const notifs = [
    { icon: <Truck className="w-4 h-4" />, title: "Your order has been shipped!", body: "Order #NXW-84729 is on its way. Expected delivery: Dec 20.", time: "2 hours ago", read: false, color: "blue" },
    { icon: <Tag className="w-4 h-4" />, title: "Flash Deal: 50% off Electronics", body: "Don't miss out — this deal ends in 4 hours.", time: "5 hours ago", read: false, color: "red" },
    { icon: <CheckCircle className="w-4 h-4" />, title: "Payment confirmed", body: "Your payment of $1,999 for MacBook Pro was successful.", time: "Yesterday", read: true, color: "green" },
    { icon: <Gift className="w-4 h-4" />, title: "You earned 250 loyalty points!", body: "Keep shopping to unlock Platinum membership.", time: "2 days ago", read: true, color: "purple" },
  ];
  const colorMap: Record<string, string> = { blue: "bg-blue-50 text-blue-600", red: "bg-red-50 text-red-600", green: "bg-emerald-50 text-emerald-600", purple: "bg-purple-50 text-purple-600" };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-poppins text-slate-900">Notifications</h1>
        <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
      </div>
      <div className="space-y-3">
        {notifs.map((n, i) => (
          <Card key={i} className={`p-4 flex gap-4 ${!n.read ? "border-blue-100 bg-blue-50/30" : ""}`}>
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${colorMap[n.color]}`}>{n.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold ${!n.read ? "text-slate-900" : "text-slate-700"}`}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Help Center
const HelpPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold font-poppins text-slate-900 mb-2">How can we help you?</h1>
      <p className="text-slate-500 mb-6">Search our knowledge base or browse topics below</p>
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input placeholder="Search help articles..." className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm" />
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-4 mb-10">
      {[
        { icon: <ShoppingBag className="w-6 h-6" />, title: "Orders & Shipping", desc: "Track orders, returns, and delivery info", color: "blue" },
        { icon: <CreditCard className="w-6 h-6" />, title: "Payments & Billing", desc: "Payment methods, refunds, and invoices", color: "green" },
        { icon: <User className="w-6 h-6" />, title: "Account & Security", desc: "Profile, password, and privacy settings", color: "purple" },
        { icon: <Package className="w-6 h-6" />, title: "Returns & Refunds", desc: "How to return items and get refunds", color: "amber" },
        { icon: <Headphones className="w-6 h-6" />, title: "Seller Support", desc: "Help for Nexwing sellers and vendors", color: "red" },
        { icon: <Globe className="w-6 h-6" />, title: "Technical Issues", desc: "App bugs, website errors, and fixes", color: "slate" },
      ].map((c) => {
        const clrMap: Record<string, string> = { blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600", purple: "bg-purple-50 text-purple-600", amber: "bg-amber-50 text-amber-600", red: "bg-red-50 text-red-600", slate: "bg-slate-100 text-slate-600" };
        return (
          <button key={c.title} onClick={() => onNavigate("faq")}
            className="flex flex-col items-start gap-3 p-5 bg-white rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-left">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${clrMap[c.color]}`}>{c.icon}</div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{c.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
    <div className="bg-blue-600 rounded-3xl p-8 text-white text-center">
      <Headphones className="w-10 h-10 mx-auto mb-3 opacity-80" />
      <h2 className="text-xl font-bold font-poppins mb-2">Still need help?</h2>
      <p className="text-blue-100 text-sm mb-5">Our support team is available 24/7</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => onNavigate("contact")} className="px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">Live Chat</button>
        <button className="px-5 py-2.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-sm">Email Support</button>
      </div>
    </div>
  </div>
);

// FAQ
const FAQPage = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How do I track my order?", a: "Go to My Account → My Orders → click on the order to see real-time tracking with carrier updates and estimated delivery time." },
    { q: "What is the return policy?", a: "Nexwing offers a hassle-free 30-day return policy for most items. Simply initiate a return from your Orders page and we'll arrange a free pickup." },
    { q: "How long does shipping take?", a: "Standard shipping takes 3-7 business days. Express shipping (1-2 business days) and same-day delivery are available in select cities." },
    { q: "Are the products on Nexwing authentic?", a: "Yes, we guarantee 100% authenticity. All products sold on Nexwing are verified and all sellers must pass our rigorous verification process." },
    { q: "How do I become a seller on Nexwing?", a: "Click 'Sell on Nexwing', complete our seller registration, provide required documents, and your store can be live within 24-48 hours." },
    { q: "What payment methods are accepted?", a: "We accept credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, bank transfers, and Nexwing Wallet." },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Frequently Asked Questions</h1>
      <p className="text-slate-500 mb-8">Quick answers to common questions</p>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
              <span className="text-sm font-semibold text-slate-900">{f.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{f.a}</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// Contact
const ContactPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="text-center mb-10">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Contact Us</h1>
      <p className="text-slate-500">We're here to help. Reach out anytime.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-8">
        <h2 className="font-semibold text-slate-900 mb-5">Send a Message</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Smith" />
          </div>
          <Input label="Email" type="email" placeholder="john@example.com" icon={<Mail className="w-4 h-4" />} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Subject</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-blue-500">
              <option>Order Issue</option>
              <option>Payment Problem</option>
              <option>Return Request</option>
              <option>General Inquiry</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Message</label>
            <textarea rows={4} placeholder="Describe your issue or question..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <Btn fullWidth size="lg"><Send className="w-4 h-4" /> Send Message</Btn>
        </div>
      </Card>
      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Get in Touch</h3>
          <div className="space-y-4">
            {[
              { icon: <Phone className="w-4 h-4 text-blue-600" />, label: "Phone Support", value: "+1 (800) NEX-WING", sub: "Mon–Fri, 9am–6pm EST" },
              { icon: <Mail className="w-4 h-4 text-emerald-600" />, label: "Email", value: "support@nexwing.com", sub: "24–48 hour response time" },
              { icon: <MessageCircle className="w-4 h-4 text-purple-600" />, label: "Live Chat", value: "Available 24/7", sub: "Instant response" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">{c.icon}</div>
                <div>
                  <p className="text-xs text-slate-500">{c.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{c.value}</p>
                  <p className="text-xs text-slate-400">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Average Response Times</h3>
          <div className="space-y-2">
            {[["Live Chat", "< 2 minutes", "green"], ["Email", "< 4 hours", "blue"], ["Phone", "< 1 minute", "green"]].map(([ch, t, c]) => (
              <div key={ch} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">{ch}</span>
                <Badge variant={c as any}>{t}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// About
const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 md:p-16 mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold font-poppins mb-4">About Nexwing</h1>
      <p className="text-blue-100 text-lg max-w-2xl mx-auto">We're on a mission to make global commerce accessible, transparent, and delightful for everyone — buyers, sellers, and partners alike.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900 mb-4">Our Story</h2>
        <p className="text-slate-600 leading-relaxed mb-4">Founded in 2019, Nexwing started as a small team with a big vision: to create an ecommerce platform that truly puts people first. Today, we serve over 4.8 million customers across 180 countries, with 58,000+ sellers offering 12 million products.</p>
        <p className="text-slate-600 leading-relaxed">We believe commerce should be fair, fast, and fun. Every feature we build, every policy we set, and every decision we make is guided by this simple principle.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { val: "4.8M+", label: "Customers", color: "blue" },
          { val: "58K+", label: "Sellers", color: "green" },
          { val: "180+", label: "Countries", color: "purple" },
          { val: "12M+", label: "Products", color: "amber" },
        ].map((s) => {
          const clr: Record<string, string> = { blue: "bg-blue-600", green: "bg-emerald-500", purple: "bg-purple-500", amber: "bg-amber-500" };
          return (
            <div key={s.label} className={`${clr[s.color]} rounded-2xl p-6 text-white text-center`}>
              <p className="text-3xl font-extrabold font-poppins">{s.val}</p>
              <p className="text-sm opacity-80 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Our Values</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: "🤝", title: "Trust", desc: "We build lasting relationships through transparency and reliability." },
          { icon: "🚀", title: "Innovation", desc: "We continuously improve to deliver world-class experiences." },
          { icon: "🌍", title: "Inclusivity", desc: "Commerce should work for everyone, everywhere, at any scale." },
        ].map((v) => (
          <Card key={v.title} className="p-6 text-center">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
            <p className="text-sm text-slate-500">{v.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// Design System
const DesignSystemPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Design System</h1>
    <p className="text-slate-500 mb-10">Nexwing's component library and design tokens</p>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Colors</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {[
          ["Blue 600", "#2563eb"], ["Blue 700", "#1d4ed8"], ["Slate 900", "#0f172a"], ["Slate 700", "#334155"],
          ["Slate 500", "#64748b"], ["Slate 200", "#e2e8f0"], ["Emerald 500", "#10b981"], ["Red 500", "#ef4444"],
          ["Amber 500", "#f59e0b"], ["Purple 500", "#8b5cf6"], ["Pink 500", "#ec4899"], ["Teal 500", "#14b8a6"],
        ].map(([name, hex]) => (
          <div key={name}>
            <div className="w-full aspect-square rounded-xl mb-1.5 shadow-sm" style={{ background: hex }} />
            <p className="text-xs font-medium text-slate-700">{name}</p>
            <p className="text-xs text-slate-400 font-mono">{hex}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Typography</h2>
      <Card className="p-6 space-y-4">
        {[
          { label: "Display XL", cls: "text-5xl font-extrabold font-poppins", text: "Nexwing Commerce" },
          { label: "Heading 2XL", cls: "text-3xl font-bold font-poppins", text: "Enterprise Platform" },
          { label: "Heading XL", cls: "text-2xl font-bold", text: "World-Class Shopping" },
          { label: "Body Large", cls: "text-lg text-slate-600", text: "Premium products from top brands worldwide." },
          { label: "Body Base", cls: "text-sm text-slate-600", text: "Discover millions of products at unbeatable prices." },
          { label: "Label Small", cls: "text-xs font-semibold text-slate-500 uppercase tracking-widest", text: "Category Label" },
        ].map((t) => (
          <div key={t.label} className="flex items-baseline gap-4">
            <span className="text-xs text-slate-400 w-28 flex-shrink-0">{t.label}</span>
            <span className={t.cls}>{t.text}</span>
          </div>
        ))}
      </Card>
    </section>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Buttons</h2>
      <Card className="p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <Btn>Primary</Btn>
          <Btn variant="secondary">Secondary</Btn>
          <Btn variant="outline">Outline</Btn>
          <Btn variant="ghost">Ghost</Btn>
          <Btn variant="danger">Danger</Btn>
          <Btn disabled>Disabled</Btn>
        </div>
        <div className="flex flex-wrap gap-3">
          <Btn size="sm">Small</Btn>
          <Btn size="md">Medium</Btn>
          <Btn size="lg">Large</Btn>
          <Btn><Plus className="w-4 h-4" /> With Icon</Btn>
        </div>
      </Card>
    </section>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Badges & Tags</h2>
      <Card className="p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="red">Red</Badge>
          <Badge variant="amber">Amber</Badge>
          <Badge variant="purple">Purple</Badge>
        </div>
      </Card>
    </section>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Form Inputs</h2>
      <Card className="p-6 grid md:grid-cols-2 gap-4">
        <Input label="Text Input" placeholder="Enter value..." />
        <Input label="Email Input" type="email" placeholder="email@example.com" icon={<Mail className="w-4 h-4" />} />
        <Input label="Password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
        <Input label="Search" placeholder="Search..." icon={<Search className="w-4 h-4" />} />
      </Card>
    </section>

    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Cards</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm font-semibold text-slate-900 mb-1">Basic Card</p>
          <p className="text-xs text-slate-500">White background, subtle border and shadow.</p>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 border-0">
          <p className="text-sm font-semibold text-white mb-1">Gradient Card</p>
          <p className="text-xs text-blue-200">For featured content and CTAs.</p>
        </Card>
        <Card className="p-5 bg-slate-900 border-0">
          <p className="text-sm font-semibold text-white mb-1">Dark Card</p>
          <p className="text-xs text-slate-400">For high-contrast contexts.</p>
        </Card>
      </div>
    </section>
  </div>
);

// 404 Page
const NotFoundPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <div className="text-8xl font-black font-poppins text-blue-600 mb-2">404</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Btn onClick={() => onNavigate("home")}><Home className="w-4 h-4" /> Go Home</Btn>
        <Btn variant="outline" onClick={() => onNavigate("help")}>Get Help</Btn>
      </div>
    </div>
  </div>
);

// 500 Page
const ServerErrorPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <div className="text-6xl font-black font-poppins text-slate-300 mb-2">500</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Server Error</h1>
      <p className="text-slate-500 text-sm mb-8">Something went wrong on our end. Our team has been notified and is working on a fix.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Btn onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4" /> Try Again</Btn>
        <Btn variant="outline" onClick={() => onNavigate("home")}>Go Home</Btn>
      </div>
    </div>
  </div>
);

// Empty States
const EmptyStatesPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-8">Empty States</h1>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { icon: <ShoppingCart className="w-10 h-10" />, title: "Your cart is empty", sub: "Add items to your cart to get started.", action: "Start Shopping", screen: "products" as Screen, color: "blue" },
        { icon: <Heart className="w-10 h-10" />, title: "No saved items", sub: "Items you wish for will appear here.", action: "Browse Products", screen: "products" as Screen, color: "red" },
        { icon: <Package className="w-10 h-10" />, title: "No orders yet", sub: "Your order history will show here.", action: "Shop Now", screen: "home" as Screen, color: "green" },
        { icon: <Bell className="w-10 h-10" />, title: "No notifications", sub: "We'll notify you about orders and deals.", action: "Go to Home", screen: "home" as Screen, color: "purple" },
      ].map((s) => {
        const clrMap: Record<string, string> = { blue: "bg-blue-50 text-blue-500", red: "bg-red-50 text-red-500", green: "bg-emerald-50 text-emerald-500", purple: "bg-purple-50 text-purple-500" };
        return (
          <Card key={s.title} className="p-10 flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${clrMap[s.color]}`}>{s.icon}</div>
            <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
            <p className="text-sm text-slate-500 mb-5">{s.sub}</p>
            <Btn size="sm" onClick={() => onNavigate(s.screen)}>{s.action}</Btn>
          </Card>
        );
      })}
    </div>
  </div>
);

// Loading States
const LoadingStatesPage = () => {
  const Skeleton = ({ className }: { className: string }) => (
    <div className={`bg-slate-200 rounded-xl animate-pulse ${className}`} />
  );
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-8">Loading States</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Product Card Skeleton</p>
          <Card className="overflow-hidden">
            <Skeleton className="aspect-square rounded-none" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </Card>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">List Item Skeleton</p>
          <Card className="p-5 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
                <Skeleton className="w-16 h-6" />
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-3">Dashboard Skeleton</p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-5 space-y-3">
              <div className="flex justify-between"><Skeleton className="h-3 w-24" /><Skeleton className="w-8 h-8 rounded-lg" /></div>
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-3 w-20" />
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton className="h-48 w-full" />
        </Card>
      </div>
    </div>
  );
};

// Coupons
const CouponsPage = () => {
  const coupons = [
    { code: "NEXWING20", discount: "20% OFF", desc: "20% off on orders above $100", expires: "Dec 31, 2025", valid: true },
    { code: "FREESHIP", discount: "Free Shipping", desc: "Free shipping on any order", expires: "Jan 15, 2026", valid: true },
    { code: "FLASH50", discount: "50% OFF", desc: "Flash sale — Electronics only", expires: "Dec 15, 2025", valid: false },
    { code: "NEWUSER15", discount: "15% OFF", desc: "New user welcome discount", expires: "Jan 31, 2026", valid: true },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">My Coupons</h1>
      <div className="space-y-3">
        {coupons.map((c) => (
          <Card key={c.code} className={`p-5 flex items-center gap-4 ${!c.valid ? "opacity-60" : ""}`}>
            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 ${c.valid ? "bg-blue-600" : "bg-slate-300"} text-white text-center`}>
              <Percent className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-bold leading-tight">{c.discount.split(" ")[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-slate-900 text-sm font-mono">{c.code}</p>
                {!c.valid && <Badge variant="red">Expired</Badge>}
              </div>
              <p className="text-xs text-slate-500">{c.desc}</p>
              <p className="text-xs text-slate-400 mt-0.5">Expires: {c.expires}</p>
            </div>
            <button onClick={() => navigator.clipboard?.writeText(c.code)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${c.valid ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`} disabled={!c.valid}>
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Gift Cards
const GiftCardsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Gift Cards</h1>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div>
        <h2 className="font-semibold text-slate-900 mb-4">Send a Gift Card</h2>
        <Card className="p-6">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[25, 50, 100, 200, 500, "Custom"].map((v) => (
              <button key={v} className="p-3 border-2 border-slate-200 hover:border-blue-500 rounded-xl text-sm font-bold text-slate-900 transition-colors">{v === "Custom" ? v : `$${v}`}</button>
            ))}
          </div>
          <Input label="Recipient Email" placeholder="friend@example.com" icon={<Mail className="w-4 h-4" />} className="mb-3" />
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-medium text-slate-700">Personal Message</label>
            <textarea rows={3} placeholder="Add a personal note..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <Btn fullWidth size="lg"><Gift className="w-4 h-4" /> Send Gift Card</Btn>
        </Card>
      </div>
      <div>
        <h2 className="font-semibold text-slate-900 mb-4">Redeem a Gift Card</h2>
        <Card className="p-6">
          <div className="w-full h-36 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-center text-white">
              <Zap className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <p className="font-bold text-lg font-poppins">Nexwing Gift Card</p>
              <p className="text-blue-200 text-xs">Shop Anything, Anytime</p>
            </div>
          </div>
          <Input label="Gift Card Code" placeholder="XXXX-XXXX-XXXX-XXXX" className="mb-3" />
          <Btn fullWidth><Check className="w-4 h-4" /> Redeem Card</Btn>
        </Card>
      </div>
    </div>
  </div>
);

// Seller Register
const SellerRegisterPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <ShoppingBag className="w-7 h-7 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold font-poppins text-slate-900">Sell on Nexwing</h1>
      <p className="text-slate-500 text-sm mt-1">Join 500K+ sellers. Start selling in minutes.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {[["500K+", "Sellers"], ["12M+", "Products"], ["4.8M+", "Buyers"]].map(([v, l]) => (
        <div key={l} className="text-center p-4 bg-blue-50 rounded-2xl">
          <p className="text-2xl font-extrabold text-blue-600 font-poppins">{v}</p>
          <p className="text-sm text-slate-600">{l}</p>
        </div>
      ))}
    </div>
    <Card className="p-8">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Business Name" placeholder="TechGadgets Store" />
        <Input label="Business Type" placeholder="Individual / Company" />
        <Input label="Email Address" type="email" placeholder="seller@business.com" icon={<Mail className="w-4 h-4" />} />
        <Input label="Phone Number" placeholder="+1 (555) 000-0000" icon={<Phone className="w-4 h-4" />} />
        <Input label="Business Address" placeholder="123 Commerce Ave" className="md:col-span-2" />
        <Input label="Tax ID / GST Number" placeholder="Enter your tax ID" />
        <Input label="Bank Account Number" placeholder="XXXXXXXXXXXX" />
      </div>
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">Your information is securely encrypted and used only for seller verification. We'll review your application within 24-48 hours.</p>
      </div>
      <Btn fullWidth size="lg" className="mt-5" onClick={() => onNavigate("seller-dashboard")}>
        Submit Application <ArrowRight className="w-4 h-4" />
      </Btn>
    </Card>
  </div>
);

// Seller Products
const SellerProductsPage = () => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold font-poppins text-slate-900">My Products</h1>
      <Btn><Plus className="w-4 h-4" /> Add Product</Btn>
    </div>
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Search products..." className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 w-64" />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"><option>All Status</option><option>Active</option><option>Inactive</option></select>
          <Btn variant="outline" size="sm"><Filter className="w-4 h-4" /> Filter</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100 bg-slate-50">
              {["Product", "SKU", "Price", "Stock", "Sales", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={`https://images.unsplash.com/${p.image}?w=48&h=48&fit=crop&auto=format`} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 text-xs max-w-[160px] truncate">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">SKU-{p.id.toString().padStart(4, "0")}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{fmtPrice(p.price)}</td>
                <td className="px-4 py-3 text-slate-700">{p.inStock ? <span className="text-emerald-600 font-medium">128</span> : <span className="text-red-500 font-medium">0</span>}</td>
                <td className="px-4 py-3 text-slate-700">{(p.reviews / 20).toFixed(0)}</td>
                <td className="px-4 py-3"><Badge variant={p.inStock ? "green" : "red"}>{p.inStock ? "Active" : "Out of Stock"}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// Analytics Dashboard
const AnalyticsDashboardPage = () => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Analytics Dashboard</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Pageviews" value="8.4M" change="+22%" icon={<Eye className="w-5 h-5" />} color="blue" />
      <StatCard label="Conversion Rate" value="3.8%" change="+0.4%" icon={<TrendingUp className="w-5 h-5" />} color="green" />
      <StatCard label="Avg. Order Value" value="$186" change="+$12" icon={<DollarSign className="w-5 h-5" />} color="purple" />
      <StatCard label="Cart Abandonment" value="68.2%" change="-2.1%" icon={<ShoppingCart className="w-5 h-5" />} color="amber" />
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Revenue vs Orders</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={CHART_REVENUE}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} name="Revenue ($)" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={false} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Monthly Order Volume</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={CHART_REVENUE}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

// Delivery Dashboard
const DeliveryDashboardPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="p-6 max-w-[1400px] mx-auto">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Delivery Dashboard</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard label="Today's Deliveries" value="247" change="+18" icon={<Truck className="w-5 h-5" />} color="blue" />
      <StatCard label="Delivered" value="189" change="+14" icon={<CheckCircle className="w-5 h-5" />} color="green" />
      <StatCard label="In Transit" value="42" icon={<Activity className="w-5 h-5" />} color="amber" />
      <StatCard label="Failed" value="16" change="-3" icon={<AlertCircle className="w-5 h-5" />} color="purple" />
    </div>
    <Card className="p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Active Deliveries</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100 bg-slate-50">
              {["Order ID", "Customer", "Address", "Driver", "Status", "ETA"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: "#NXW-84729", cust: "Alex M.", addr: "123 Main St, NY", driver: "Carlos R.", status: "Out for Delivery", eta: "2:30 PM" },
              { id: "#NXW-84730", cust: "Sarah K.", addr: "456 Oak Ave, LA", driver: "James T.", status: "In Transit", eta: "4:00 PM" },
              { id: "#NXW-84731", cust: "Mike P.", addr: "789 Elm Rd, SF", driver: "Priya M.", status: "Picked Up", eta: "5:30 PM" },
            ].map((r) => {
              const sc: Record<string, string> = { "Out for Delivery": "green", "In Transit": "blue", "Picked Up": "amber" };
              return (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-blue-600">{r.id}</td>
                  <td className="px-4 py-3 text-slate-700">{r.cust}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{r.addr}</td>
                  <td className="px-4 py-3 text-slate-700">{r.driver}</td>
                  <td className="px-4 py-3"><Badge variant={sc[r.status] as any}>{r.status}</Badge></td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.eta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// Addresses Page
const AddressesPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold font-poppins text-slate-900">Saved Addresses</h1>
      <Btn size="sm"><Plus className="w-4 h-4" /> Add Address</Btn>
    </div>
    <div className="space-y-3">
      {[
        { type: "Home", name: "John Smith", addr: "123 Main Street, Apt 4B", city: "New York, NY 10001", default: true },
        { type: "Work", name: "John Smith", addr: "456 Business Park, Floor 12", city: "New York, NY 10022", default: false },
      ].map((a) => (
        <Card key={a.type} className={`p-5 ${a.default ? "border-blue-500 border-2" : ""}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-slate-900 text-sm">{a.type}</span>
                  {a.default && <Badge variant="blue">Default</Badge>}
                </div>
                <p className="text-sm text-slate-600">{a.name}</p>
                <p className="text-sm text-slate-500">{a.addr}</p>
                <p className="text-sm text-slate-500">{a.city}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600"><Edit2 className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// Recently Viewed
const RecentlyViewedPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <SectionHeader title="Recently Viewed" subtitle="Items you've checked out recently" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
    </div>
  </div>
);

// Recommendations
const RecommendationsPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <SectionHeader title="Personalized for You" subtitle="Based on your browsing and purchase history" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
    </div>
    <SectionHeader title="Trending in Electronics" subtitle="Popular picks from the past 7 days" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
    </div>
  </div>
);

// Compare Products
const ComparePage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const compared = PRODUCTS.slice(0, 3);
  const specs = ["Brand", "Price", "Rating", "Category", "In Stock", "Discount"];
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 overflow-x-auto">
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-6">Compare Products</h1>
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="w-32 text-left pb-4 text-sm text-slate-500 font-medium">Feature</th>
            {compared.map((p) => (
              <th key={p.id} className="pb-4 px-3">
                <Card className="p-3">
                  <img src={`https://images.unsplash.com/${p.image}?w=150&h=150&fit=crop&auto=format`} alt="" className="w-full aspect-square object-cover rounded-xl mb-2" />
                  <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight mb-1">{p.name}</p>
                  <p className="text-sm font-bold text-blue-600">{fmtPrice(p.price)}</p>
                  <Btn size="sm" className="mt-2 w-full text-xs py-1.5" onClick={() => onNavigate("cart")}>Add to Cart</Btn>
                </Card>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, si) => (
            <tr key={spec} className={si % 2 === 0 ? "bg-slate-50" : "bg-white"}>
              <td className="py-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">{spec}</td>
              {compared.map((p) => {
                const vals: Record<string, string | React.ReactNode> = {
                  Brand: p.brand, Price: fmtPrice(p.price),
                  Rating: <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs text-slate-500">{p.rating}</span></div>,
                  Category: p.category,
                  "In Stock": p.inStock ? <Badge variant="green">Yes</Badge> : <Badge variant="red">No</Badge>,
                  Discount: <Badge variant="red">{p.discount}% OFF</Badge>,
                };
                return <td key={p.id} className="py-3 px-4 text-sm text-slate-700 text-center">{vals[spec]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Search Results
const SearchResultsPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-[1400px] mx-auto px-4 py-8">
    <div className="flex items-center gap-3 mb-6">
      <h1 className="text-xl font-bold text-slate-900">Results for <span className="text-blue-600">"sony headphones"</span></h1>
      <span className="text-sm text-slate-500">({PRODUCTS.length} results)</span>
    </div>
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-56 flex-shrink-0">
        <Card className="p-4">
          <p className="font-semibold text-sm text-slate-900 mb-3">Refine Results</p>
          <div className="space-y-3">
            {[{ label: "Price", options: ["Under $50", "$50–$200", "$200–$500", "$500+"] },
              { label: "Brand", options: BRANDS.slice(0, 4) },
              { label: "Rating", options: ["4★ & above", "3★ & above"] }].map((f) => (
              <div key={f.label} className="border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold text-slate-700 mb-2">{f.label}</p>
                {f.options.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-xs text-slate-600 mb-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" /> {o}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </aside>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
      </div>
    </div>
  </div>
);

// Category Listing
const CategoryPage = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="max-w-[1400px] mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Shop by Category</h1>
    <p className="text-slate-500 mb-8">Explore our complete catalog</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {CATEGORIES.map((cat) => (
        <button key={cat.name} onClick={() => onNavigate("products")}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} p-6 text-left group hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}>
          <img src={`https://images.unsplash.com/${cat.image}?w=400&h=400&fit=crop&auto=format`} alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative text-white">
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="font-bold font-poppins text-base mb-0.5">{cat.name}</h3>
            <p className="text-white/70 text-xs">{cat.count.toLocaleString()} products</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Privacy Policy
const PrivacyPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Privacy Policy</h1>
    <p className="text-slate-500 text-sm mb-8">Last updated: December 15, 2025</p>
    <div className="space-y-6">
      {[
        { title: "1. Information We Collect", content: "We collect information you provide directly to us — such as name, email, phone number, shipping address, and payment details — when you create an account, make a purchase, or contact us for support." },
        { title: "2. How We Use Your Information", content: "We use your information to process orders and payments, send order confirmations and updates, provide customer support, personalize your shopping experience, and send promotional communications (with your consent)." },
        { title: "3. Information Sharing", content: "We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist in our operations, subject to confidentiality obligations." },
        { title: "4. Data Security", content: "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information against unauthorized access or disclosure." },
        { title: "5. Cookies", content: "We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser preferences." },
        { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by clicking 'unsubscribe' in any email or contacting us directly." },
      ].map((s) => (
        <div key={s.title}>
          <h2 className="font-bold text-slate-900 mb-2 text-base">{s.title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);

// Terms
const TermsPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">Terms & Conditions</h1>
    <p className="text-slate-500 text-sm mb-8">Last updated: December 15, 2025</p>
    <div className="space-y-6">
      {[
        { title: "1. Acceptance of Terms", content: "By accessing or using Nexwing, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform." },
        { title: "2. Account Registration", content: "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account." },
        { title: "3. Purchases", content: "All purchases are subject to availability and our return policy. We reserve the right to cancel orders in case of pricing errors, fraud, or other exceptional circumstances." },
        { title: "4. Seller Responsibilities", content: "Sellers must provide accurate product descriptions, maintain adequate inventory, fulfill orders promptly, and comply with all applicable laws and regulations." },
        { title: "5. Prohibited Activities", content: "Users may not engage in fraudulent activity, post fake reviews, sell counterfeit goods, or engage in any activity that harms other users or disrupts the platform." },
        { title: "6. Limitation of Liability", content: "Nexwing is not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our maximum liability is limited to the amount you paid for the specific transaction." },
      ].map((s) => (
        <div key={s.title}>
          <h2 className="font-bold text-slate-900 mb-2 text-base">{s.title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);

// Generic placeholder for less complex screens
const PlaceholderScreen = ({ title, icon, desc }: { title: string; icon: React.ReactNode; desc: string }) => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">{icon}</div>
      <h1 className="text-2xl font-bold font-poppins text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-2"><div className="h-3 bg-slate-100 rounded animate-pulse" /><div className="h-2 bg-slate-100 rounded w-3/4 animate-pulse" /></div>
          </div>
          <div className="h-2 bg-slate-100 rounded animate-pulse mb-1" />
          <div className="h-2 bg-slate-100 rounded animate-pulse w-4/5" />
        </Card>
      ))}
    </div>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const cartCount = 3;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const navigate = (s: Screen) => {
    setScreen(s);
    setSidebarOpen(false);
  };

  const isAuthScreen = ["login", "register", "forgot-password", "reset-password", "otp-verify"].includes(screen);
  const isLanding = screen === "landing";
  const showLayout = !isAuthScreen && !isLanding;

  const renderScreen = () => {
    switch (screen) {
      case "landing": return <LandingPage onNavigate={navigate} />;
      case "home": return <HomePage onNavigate={navigate} />;
      case "category": return <CategoryPage onNavigate={navigate} />;
      case "search": return <SearchResultsPage onNavigate={navigate} />;
      case "products": return <ProductsPage onNavigate={navigate} />;
      case "product-detail": return <ProductDetail onNavigate={navigate} />;
      case "wishlist": return <WishlistPage onNavigate={navigate} />;
      case "compare": return <ComparePage onNavigate={navigate} />;
      case "cart": return <CartPage onNavigate={navigate} />;
      case "checkout": return <CheckoutPage onNavigate={navigate} />;
      case "payment": return <CheckoutPage onNavigate={navigate} />;
      case "order-success": return <OrderSuccessPage onNavigate={navigate} />;
      case "order-tracking": return <OrderTrackingPage onNavigate={navigate} />;
      case "profile": return <ProfilePage onNavigate={navigate} />;
      case "addresses": return <AddressesPage />;
      case "coupons": return <CouponsPage />;
      case "wallet": return <WalletPage />;
      case "gift-cards": return <GiftCardsPage />;
      case "notifications": return <NotificationsPage />;
      case "recently-viewed": return <RecentlyViewedPage onNavigate={navigate} />;
      case "recommendations": return <RecommendationsPage onNavigate={navigate} />;
      case "seller-register": return <SellerRegisterPage onNavigate={navigate} />;
      case "seller-dashboard": return <SellerDashboard />;
      case "seller-products": return <SellerProductsPage />;
      case "seller-orders": return <PlaceholderScreen title="Seller Orders" icon={<ShoppingBag className="w-7 h-7" />} desc="Manage and fulfill your customer orders" />;
      case "seller-analytics": return <AnalyticsDashboardPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-products": return <SellerProductsPage />;
      case "admin-orders": return <PlaceholderScreen title="Admin Orders" icon={<ShoppingBag className="w-7 h-7" />} desc="Platform-wide order management" />;
      case "admin-users": return <PlaceholderScreen title="User Management" icon={<Users className="w-7 h-7" />} desc="Manage all platform users and sellers" />;
      case "admin-analytics": return <AnalyticsDashboardPage />;
      case "admin-reports": return <PlaceholderScreen title="Reports" icon={<FileText className="w-7 h-7" />} desc="Generate and download platform reports" />;
      case "delivery-dashboard": return <DeliveryDashboardPage onNavigate={navigate} />;
      case "delivery-tracking": return <OrderTrackingPage onNavigate={navigate} />;
      case "analytics": return <AnalyticsDashboardPage />;
      case "help": return <HelpPage onNavigate={navigate} />;
      case "faq": return <FAQPage />;
      case "contact": return <ContactPage />;
      case "about": return <AboutPage />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      case "design-system": return <DesignSystemPage />;
      case "404": return <NotFoundPage onNavigate={navigate} />;
      case "500": return <ServerErrorPage onNavigate={navigate} />;
      case "empty-states": return <EmptyStatesPage onNavigate={navigate} />;
      case "loading-states": return <LoadingStatesPage />;
      case "login": return <LoginPage onNavigate={navigate} />;
      case "register": return <RegisterPage onNavigate={navigate} />;
      case "forgot-password": return <ForgotPasswordPage onNavigate={navigate} />;
      case "reset-password": return <ForgotPasswordPage onNavigate={navigate} />;
      case "otp-verify": return <OTPVerifyPage onNavigate={navigate} />;
      default: return <NotFoundPage onNavigate={navigate} />;
    }
  };

  if (isAuthScreen) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex justify-center pt-8 mb-4">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-poppins">Nex<span className="text-blue-600">wing</span></span>
          </button>
        </div>
        <div className="flex-1">{renderScreen()}</div>
        <div className="text-center p-4 text-xs text-slate-400">© 2025 Nexwing Technologies</div>
      </div>
    );
  }

  if (isLanding) {
    return (
      <div className="min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-poppins">Nexwing</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate("login")} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Sign In</button>
              <button onClick={() => navigate("home")} className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors">Shop Now</button>
            </div>
          </div>
        </header>
        {renderScreen()}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 ${dark ? "dark" : ""}`}>
      <Header onNavigate={navigate} current={screen} cartCount={cartCount} dark={dark} toggleDark={() => setDark(!dark)} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} current={screen} onNavigate={navigate} />
      <main className={`pt-16 transition-all min-h-screen`}>
        {renderScreen()}
        {showLayout && <Footer onNavigate={navigate} />}
      </main>
    </div>
  );
}
