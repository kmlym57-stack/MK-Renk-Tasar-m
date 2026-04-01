import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Phone,
  MapPin,
  Menu,
  X,
  Paintbrush,
  Hammer,
  Home,
  Wrench,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Star,
  Clock,
  Shield,
  Award,
  Mail,
  Calculator,
  Send,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PHONE_NUMBER = "05455653257";
const WHATSAPP_LINK = `https://wa.me/90${PHONE_NUMBER.replace(/^0/, "")}`;
const BUSINESS_NAME = "MK Renk & Tasarım";
const EMAIL = "mlymmyasar@gmail.com";

const services = [
  {
    id: 1,
    title: "İç Mekan Boya",
    description: "Evinizin her köşesine profesyonel boya uygulaması. Kaliteli malzeme ve uzman ekibimizle duvarlarınıza yeni bir hayat veriyoruz.",
    icon: Paintbrush,
    features: ["Su bazlı boyalar", "Antibakteriyel seçenekler", "Renk danışmanlığı"],
  },
  {
    id: 2,
    title: "Badana",
    description: "Temiz, hijyenik ve pürüzsüz badana uygulamaları. Duvarlarınız bembeyaz ve tertemiz görünsün.",
    icon: Home,
    features: ["Kireç badana", "Plastik badana", "Silinebilir yüzey"],
  },
  {
    id: 3,
    title: "Tadilat",
    description: "Küçük veya büyük ölçekli tadilat projeleriniz için yanınızdayız. Evinizi hayallerinize uygun şekilde yeniliyoruz.",
    icon: Hammer,
    features: ["Komple tadilat", "Kısmi yenileme", "Proje yönetimi"],
  },
  {
    id: 4,
    title: "Tamirat",
    description: "Çatlak onarımı, alçı tamiri, su kaçağı sonrası tamirat ve daha fazlası. Hızlı ve kalıcı çözümler sunuyoruz.",
    icon: Wrench,
    features: ["Çatlak onarımı", "Alçı tamiri", "Rutubet giderme"],
  },
];

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1758972581344-85dd3ccb10db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb20lMjBwYWludGVkJTIwd2FsbHN8ZW58MHx8fHwxNzc1MDczMjExfDA&ixlib=rb-4.1.0&q=85",
    title: "Modern Salon",
    category: "Boya",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1634638415860-cef1aafb60c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb20lMjBwYWludGVkJTIwd2FsbHN8ZW58MHx8fHwxNzc1MDczMjExfDA&ixlib=rb-4.1.0&q=85",
    title: "Şık Oturma Odası",
    category: "Tadilat",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1639059790587-95625e6b764c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb20lMjBwYWludGVkJTIwd2FsbHN8ZW58MHx8fHwxNzc1MDczMjExfDA&ixlib=rb-4.1.0&q=85",
    title: "Minimalist Tasarım",
    category: "Boya",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1693985120993-e9b203ce7631?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwcGFpbnRpbmclMjB3YWxsJTIwcm9sbGVyJTIwd2hpdGUlMjBpbnRlcmlvciUyMHJlbm92YXRpb258ZW58MHx8fHwxNzc1MDczNzIxfDA&ixlib=rb-4.1.0&q=85",
    title: "Duvar Boyama",
    category: "Çalışma",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb20lMjBwYWludGVkJTIwd2FsbHN8ZW58MHx8fHwxNzc1MDczMjExfDA&ixlib=rb-4.1.0&q=85",
    title: "Lüks Salon",
    category: "Boya",
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/8583595/pexels-photo-8583595.jpeg",
    title: "Şömineli Oda",
    category: "Tadilat",
  },
];

const stats = [
  { number: "500+", label: "Mutlu Müşteri", icon: Star },
  { number: "10+", label: "Yıl Deneyim", icon: Clock },
  { number: "100%", label: "Müşteri Memnuniyeti", icon: Shield },
  { number: "250+", label: "Tamamlanan Proje", icon: Award },
];

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "Ev Sahibi",
    text: "Evimizin boyasını yaptırdık, sonuç mükemmel oldu. Hem temiz çalıştılar hem de söyledikleri tarihte bitirdiler.",
    rating: 5,
  },
  {
    name: "Adnan Demirtaş",
    role: "Ev Sahibi",
    text: "Evimizin tadilatını MK Renk & Tasarım'a yaptırdık. Profesyonel yaklaşımları ve kaliteli işçilikleri için teşekkürler.",
    rating: 5,
  },
  {
    name: "Mehmet Demir",
    role: "Ev Sahibi",
    text: "Fiyat/performans açısından çok memnun kaldık. Kesinlikle tavsiye ediyorum.",
    rating: 5,
  },
];

// Intersection Observer Hook
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
};

// Animated Counter
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    const numericEnd = parseInt(end.replace(/\D/g, ''));
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numericEnd));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{end.includes('+') ? '+' : ''}{end.includes('%') ? '%' : ''}</span>;
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#hizmetler", label: "Hizmetler" },
    { href: "#fiyat-hesapla", label: "Fiyat Hesapla" },
    { href: "#galeri", label: "Galeri" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#yorumlar", label: "Yorumlar" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <>
      <header
        data-testid="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-header border-b border-[#D5D5C8]/50 shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" data-testid="logo" className="flex items-center gap-3 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled ? "bg-[#2B4433]" : "bg-white/20 backdrop-blur-sm"
              } group-hover:scale-105`}>
                <Paintbrush className={`w-6 h-6 ${isScrolled ? "text-white" : "text-white"}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tight transition-colors ${
                  isScrolled ? "text-[#1C1C18]" : "text-white"
                }`}>
                  MK Renk
                </span>
                <span className={`text-xs tracking-widest uppercase transition-colors ${
                  isScrolled ? "text-[#DE6B48]" : "text-[#DE6B48]"
                }`}>
                  & Tasarım
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase().replace('ı', 'i')}`}
                  className={`text-sm font-medium transition-all duration-300 hover:text-[#DE6B48] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#DE6B48] after:transition-all hover:after:w-full ${
                    isScrolled ? "text-[#1C1C18]" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? "text-[#1C1C18]" : "text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
              <Button
                data-testid="header-cta-btn"
                asChild
                className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full px-6 shadow-lg shadow-[#DE6B48]/30 hover:shadow-[#DE6B48]/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <a href="#teklif">Ücretsiz Teklif</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-btn"
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className={`w-6 h-6 ${isScrolled ? "text-[#1C1C18]" : "text-white"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2B4433] rounded-lg flex items-center justify-center">
              <Paintbrush className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#1C1C18]">{BUSINESS_NAME}</span>
          </div>
          <button
            data-testid="close-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#1C1C18]" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1C1C18] hover:text-[#DE6B48] hover:bg-[#F7F7F2] transition-all py-3 px-4 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-[#D5D5C8]">
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 py-3 px-4 text-[#1C1C18]">
              <Phone className="w-5 h-5 text-[#DE6B48]" />
              {PHONE_NUMBER}
            </a>
          </div>
          <Button
            asChild
            className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full mt-4"
          >
            <a href="#teklif" onClick={() => setIsMobileMenuOpen(false)}>
              Ücretsiz Teklif Al
            </a>
          </Button>
        </nav>
      </div>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const [ref, isInView] = useInView();

  return (
    <section data-testid="hero-section" className="hero-section" ref={ref}>
      <div className="hero-bg-wrapper">
        <img
          src="https://images.unsplash.com/photo-1745665777586-09381ba528d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxwYWludGVyJTIwcGFpbnRpbmclMjB3YWxsJTIwcm9sbGVyJTIwd2hpdGUlMjBpbnRlcmlvciUyMHJlbm92YXRpb258ZW58MHx8fHwxNzc1MDczNzIxfDA&ixlib=rb-4.1.0&q=85"
          alt="MK Renk & Tasarım - Profesyonel Boya Hizmeti"
          className="hero-bg"
        />
        <div className="hero-gradient" />
      </div>
      
      <div className={`hero-content ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-[#DE6B48] rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Profesyonel Hizmet Garantisi</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight">
          Mekanlarınıza
          <span className="block text-[#DE6B48]">Değer Katıyoruz</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          10 yılı aşkın deneyimimizle boya, badana ve tadilat hizmetlerinde 
          kaliteli işçilik ve uygun fiyat garantisi sunuyoruz.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            data-testid="hero-cta-btn"
            asChild
            size="lg"
            className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full px-8 py-6 text-base shadow-2xl shadow-[#DE6B48]/30 hover:shadow-[#DE6B48]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <a href="#teklif">
              Ücretsiz Teklif Al
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            data-testid="hero-call-btn"
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white rounded-full px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 w-5 h-5" />
              Hemen Ara
            </a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="relative -mt-20 z-10" ref={ref}>
      <div className="container-custom">
        <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-14 h-14 bg-[#2B4433]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2B4433] group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-[#2B4433] group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#1C1C18] mb-1">
                <AnimatedCounter end={stat.number} />
              </div>
              <div className="text-sm text-[#63635E]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      id="hizmetler"
      data-testid="services-section"
      className="section-spacing bg-[#F7F7F2]"
      ref={ref}
    >
      <div className="container-custom">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block bg-[#2B4433]/10 text-[#2B4433] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            HİZMETLERİMİZ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Profesyonel Çözümler
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto text-lg">
            Her ihtiyaca özel, kaliteli ve güvenilir hizmetler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`group bg-white rounded-2xl p-8 border border-[#D5D5C8] hover:border-[#2B4433]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2B4433] to-[#3d5c47] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1C1C18] mb-3 group-hover:text-[#2B4433] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#63635E] leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#63635E]">
                        <CheckCircle className="w-4 h-4 text-[#DE6B48]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            data-testid="services-cta-btn"
            asChild
            className="bg-[#2B4433] hover:bg-[#1f3326] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <a href="#teklif">
              Tüm Hizmetler İçin Teklif Al
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      id="galeri"
      data-testid="gallery-section"
      className="section-spacing bg-white overflow-hidden"
      ref={ref}
    >
      <div className="container-custom">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block bg-[#DE6B48]/10 text-[#DE6B48] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            GALERİ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Projelerimizden Örnekler
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto text-lg">
            Tamamladığımız işlerden görüntüler
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              data-testid={`gallery-item-${image.id}`}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`aspect-square ${index === 0 ? 'md:aspect-[4/3]' : ''}`}>
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <span className="text-[#DE6B48] text-sm font-medium mb-1">{image.category}</span>
                <span className="text-white font-bold text-lg">{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, isInView] = useInView();

  const features = [
    { icon: Clock, text: "10+ yıl sektör deneyimi" },
    { icon: Shield, text: "Garanti ve güvence" },
    { icon: Star, text: "Kaliteli malzeme kullanımı" },
    { icon: CheckCircle, text: "Zamanında teslim" },
  ];

  return (
    <section
      id="hakkimizda"
      data-testid="about-section"
      className="section-spacing bg-[#1C1C18] relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#DE6B48] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2B4433] rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`${isInView ? 'animate-fade-right' : 'opacity-0'}`}>
            <span className="inline-block bg-[#DE6B48]/20 text-[#DE6B48] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              HAKKIMIZDA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Neden <span className="text-[#DE6B48]">{BUSINESS_NAME}</span>?
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 text-lg">
              {BUSINESS_NAME} olarak, yılların getirdiği tecrübe ve profesyonel
              yaklaşımımızla mekanlarınızı en iyi şekilde yeniliyoruz. Müşteri
              memnuniyetini ön planda tutarak, kaliteli malzemeler ve uzman
              ekibimizle hizmet veriyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-[#DE6B48]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#DE6B48]/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#DE6B48]" />
                  </div>
                  <span className="text-white/90 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full px-8 py-6 shadow-lg shadow-[#DE6B48]/30"
            >
              <a href="#teklif">
                Teklif Al
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className={`relative ${isInView ? 'animate-fade-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1639059790587-95625e6b764c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb20lMjBwYWludGVkJTIwd2FsbHN8ZW58MHx8fHwxNzc1MDczMjExfDA&ixlib=rb-4.1.0&q=85"
                  alt="MK Renk & Tasarım Çalışması"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#DE6B48] rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#1C1C18]">10+</div>
                    <div className="text-[#63635E]">Yıllık Deneyim</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Price Calculator Section
const PriceCalculatorSection = () => {
  const [ref, isInView] = useInView();
  const [selectedService, setSelectedService] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const prices = {
    "ic-mekan-boya": { name: "İç Mekan Boya", price: 85 },
    "badana": { name: "Badana", price: 45 },
    "tadilat": { name: "Tadilat", price: 150 },
    "tamirat": { name: "Tamirat", price: 120 },
  };

  const calculatePrice = () => {
    if (!selectedService || !squareMeters || squareMeters <= 0) {
      toast.error("Lütfen hizmet türü ve metrekare giriniz");
      return;
    }
    const price = prices[selectedService].price * parseFloat(squareMeters);
    setCalculatedPrice(price);
  };

  return (
    <section
      id="fiyat-hesapla"
      data-testid="calculator-section"
      className="section-spacing bg-white"
      ref={ref}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${isInView ? 'animate-fade-right' : 'opacity-0'}`}>
            <span className="inline-block bg-[#DE6B48]/10 text-[#DE6B48] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              FİYAT HESAPLA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-6 leading-tight">
              Tahmini Fiyat
              <span className="block text-[#DE6B48]">Hesaplayıcı</span>
            </h2>
            <p className="text-[#63635E] leading-relaxed mb-8 text-lg">
              Hizmet türünü seçin ve metrekare girin, size anında tahmini fiyat sunalım. 
              Kesin fiyat için yerinde keşif gerekmektedir.
            </p>
            
            <div className="bg-[#F7F7F2] rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(prices).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center bg-white rounded-xl p-3">
                    <span className="text-sm text-[#1C1C18] font-medium">{value.name}</span>
                    <span className="text-[#DE6B48] font-bold">{value.price}₺/m²</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#63635E] text-center mt-4">
                * Fiyatlar ortalama değerlerdir. İşin detayına göre değişiklik gösterebilir.
              </p>
            </div>
          </div>

          <div className={`${isInView ? 'animate-fade-left' : 'opacity-0'}`}>
            <div className="bg-[#2B4433] rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Hızlı Hesapla</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-white/80">Hizmet Türü</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger 
                      data-testid="calc-service-select"
                      className="bg-white/10 border-white/20 text-white h-12 rounded-xl"
                    >
                      <SelectValue placeholder="Hizmet seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ic-mekan-boya">İç Mekan Boya</SelectItem>
                      <SelectItem value="badana">Badana</SelectItem>
                      <SelectItem value="tadilat">Tadilat</SelectItem>
                      <SelectItem value="tamirat">Tamirat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Metrekare (m²)</Label>
                  <Input
                    type="number"
                    data-testid="calc-sqm-input"
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    placeholder="Örn: 50"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl"
                  />
                </div>

                <Button
                  onClick={calculatePrice}
                  data-testid="calc-button"
                  className="w-full bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-xl py-6 text-base font-semibold"
                >
                  Fiyat Hesapla
                  <Calculator className="ml-2 w-5 h-5" />
                </Button>

                {calculatedPrice !== null && (
                  <div className="bg-white rounded-2xl p-6 text-center animate-fade-up">
                    <p className="text-sm text-[#63635E] mb-2">Tahmini Fiyat</p>
                    <p className="text-4xl font-bold text-[#2B4433]">
                      {calculatedPrice.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-xs text-[#63635E] mt-2">
                      {prices[selectedService]?.name} - {squareMeters} m²
                    </p>
                    <Button
                      asChild
                      className="mt-4 bg-[#2B4433] hover:bg-[#1f3326] text-white rounded-full"
                    >
                      <a href="#teklif">Kesin Teklif Al</a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section with Add Review Form
const ReviewsSection = () => {
  const [ref, isInView] = useInView();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    service_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/reviews`);
      // Combine static testimonials with dynamic reviews
      const dynamicReviews = response.data.map(r => ({
        name: r.name,
        role: r.service_type || "Müşteri",
        text: r.comment,
        rating: r.rating,
      }));
      setReviews([...testimonials, ...dynamicReviews]);
    } catch (error) {
      // If API fails, just show static testimonials
      setReviews(testimonials);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.name || !newReview.comment) {
      toast.error("Lütfen adınızı ve yorumunuzu yazın");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, newReview);
      toast.success("Yorumunuz gönderildi! Onaylandıktan sonra yayınlanacaktır.");
      setNewReview({ name: "", rating: 5, comment: "", service_type: "" });
      setShowForm(false);
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="yorumlar"
      data-testid="reviews-section"
      className="section-spacing bg-[#F7F7F2]"
      ref={ref}
    >
      <div className="container-custom">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block bg-[#2B4433]/10 text-[#2B4433] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            MÜŞTERİ YORUMLARI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto">
            Sizin de deneyimlerinizi paylaşmanızı isteriz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.slice(0, 6).map((review, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[#63635E] leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#2B4433] rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#1C1C18]">{review.name}</div>
                  <div className="text-sm text-[#63635E]">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Button & Form */}
        <div className="text-center">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              data-testid="add-review-btn"
              className="bg-[#2B4433] hover:bg-[#1f3326] text-white rounded-full px-8 py-6"
            >
              <Star className="mr-2 w-5 h-5" />
              Siz de Değerlendirin
            </Button>
          ) : (
            <div className={`max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-xl ${isInView ? 'animate-fade-up' : ''}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1C1C18]">Yorum Yazın</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-[#63635E] hover:text-[#1C1C18]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#1C1C18]">Adınız *</Label>
                  <Input
                    data-testid="review-name-input"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="Adınız Soyadınız"
                    className="bg-[#F7F7F2] border-[#D5D5C8] h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1C1C18]">Puanınız</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1C1C18]">Aldığınız Hizmet</Label>
                  <Select 
                    value={newReview.service_type} 
                    onValueChange={(value) => setNewReview({...newReview, service_type: value})}
                  >
                    <SelectTrigger className="bg-[#F7F7F2] border-[#D5D5C8] h-12 rounded-xl">
                      <SelectValue placeholder="Hizmet seçin (isteğe bağlı)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="İç Mekan Boya">İç Mekan Boya</SelectItem>
                      <SelectItem value="Badana">Badana</SelectItem>
                      <SelectItem value="Tadilat">Tadilat</SelectItem>
                      <SelectItem value="Tamirat">Tamirat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1C1C18]">Yorumunuz *</Label>
                  <Textarea
                    data-testid="review-comment-input"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Deneyiminizi paylaşın..."
                    rows={4}
                    className="bg-[#F7F7F2] border-[#D5D5C8] rounded-xl resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="submit-review-btn"
                  disabled={isSubmitting}
                  className="w-full bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-xl py-6"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Yorumu Gönder"}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Quote Form Section
const QuoteFormSection = () => {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: "",
    message: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({ ...prev, service_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.service_type) {
      toast.error("Lütfen zorunlu alanları doldurun");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/quotes`, formData);
      toast.success("Teklif talebiniz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_type: "",
        message: "",
        address: "",
      });
    } catch (error) {
      console.error("Quote submission error:", error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="teklif"
      data-testid="quote-section"
      className="section-spacing bg-gradient-to-br from-[#2B4433] to-[#1a2d22] relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DE6B48]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`${isInView ? 'animate-fade-right' : 'opacity-0'}`}>
            <span className="inline-block bg-[#DE6B48]/20 text-[#DE6B48] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              ÜCRETSİZ TEKLİF
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Projeniz İçin
              <span className="block text-[#DE6B48]">Hemen Teklif Alın</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 text-lg">
              Formu doldurun, size en uygun fiyat teklifimizi sunalım. 
              Uzman ekibimiz 24 saat içinde sizinle iletişime geçecektir.
            </p>

            <div className="space-y-4">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#DE6B48]/50 transition-all group"
              >
                <div className="w-12 h-12 bg-[#DE6B48] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Telefon</p>
                  <p className="text-white font-semibold text-lg">{PHONE_NUMBER}</p>
                </div>
              </a>

              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#25D366]/50 transition-all group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">WhatsApp</p>
                  <p className="text-white font-semibold">Hemen Yazın</p>
                </div>
              </a>
            </div>
          </div>

          <div className={`${isInView ? 'animate-fade-left' : 'opacity-0'}`}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} data-testid="quote-form" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1C1C18] font-medium">
                      Adınız Soyadınız *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      data-testid="quote-name-input"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınız Soyadınız"
                      className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1C1C18] font-medium">
                      Telefon *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      data-testid="quote-phone-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05XX XXX XX XX"
                      className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1C1C18] font-medium">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      data-testid="quote-email-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service_type" className="text-[#1C1C18] font-medium">
                      Hizmet Türü *
                    </Label>
                    <Select
                      value={formData.service_type}
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger
                        data-testid="quote-service-select"
                        className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] h-12 rounded-xl"
                      >
                        <SelectValue placeholder="Hizmet seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ic-mekan-boya">İç Mekan Boya</SelectItem>
                        <SelectItem value="badana">Badana</SelectItem>
                        <SelectItem value="tadilat">Tadilat</SelectItem>
                        <SelectItem value="tamirat">Tamirat</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#1C1C18] font-medium">
                    Adres
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    data-testid="quote-address-input"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Adresiniz"
                    className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#1C1C18] font-medium">
                    Mesajınız
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    data-testid="quote-message-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projeniz hakkında detay verin..."
                    rows={4}
                    className="bg-[#F7F7F2] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] resize-none rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="quote-submit-btn"
                  disabled={isSubmitting}
                  className="w-full bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-xl py-6 text-base font-semibold shadow-lg shadow-[#DE6B48]/30 hover:shadow-[#DE6B48]/50 transition-all duration-300"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Ücretsiz Teklif Al"}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      id="iletisim"
      data-testid="contact-section"
      className="section-spacing bg-white"
      ref={ref}
    >
      <div className="container-custom">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block bg-[#DE6B48]/10 text-[#DE6B48] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            İLETİŞİM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Bize Ulaşın
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto text-lg">
            Sorularınız için 7/24 ulaşabilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href={`tel:${PHONE_NUMBER}`}
            data-testid="contact-phone"
            className={`group bg-[#F7F7F2] rounded-2xl p-6 text-center hover:bg-[#2B4433] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <div className="w-16 h-16 bg-[#2B4433] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
              <Phone className="w-7 h-7 text-white group-hover:text-[#2B4433] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] group-hover:text-white mb-2 transition-colors">Telefon</h3>
            <p className="text-[#DE6B48] font-semibold">{PHONE_NUMBER}</p>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-whatsapp"
            className={`group bg-[#F7F7F2] rounded-2xl p-6 text-center hover:bg-[#25D366] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            <div className="w-16 h-16 bg-[#25D366] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
              <MessageCircle className="w-7 h-7 text-white group-hover:text-[#25D366] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] group-hover:text-white mb-2 transition-colors">WhatsApp</h3>
            <p className="text-[#25D366] group-hover:text-white font-semibold transition-colors">Mesaj Gönderin</p>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            data-testid="contact-email"
            className={`group bg-[#F7F7F2] rounded-2xl p-6 text-center hover:bg-[#2B4433] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-16 h-16 bg-[#2B4433] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
              <Mail className="w-7 h-7 text-white group-hover:text-[#2B4433] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] group-hover:text-white mb-2 transition-colors">E-posta</h3>
            <p className="text-[#DE6B48] font-semibold text-sm">{EMAIL}</p>
          </a>

          <div
            data-testid="contact-location"
            className={`group bg-[#F7F7F2] rounded-2xl p-6 text-center hover:bg-[#DE6B48] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-16 h-16 bg-[#DE6B48] group-hover:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
              <MapPin className="w-7 h-7 text-white group-hover:text-[#DE6B48] transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] group-hover:text-white mb-2 transition-colors">Hizmet Bölgesi</h3>
            <p className="text-[#63635E] group-hover:text-white/90 transition-colors text-sm">İstanbul & Tekirdağ<br/>Tüm İlçeler</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#1C1C18] pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#2B4433] rounded-xl flex items-center justify-center">
                <Paintbrush className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white block">MK Renk</span>
                <span className="text-xs text-[#DE6B48] tracking-widest uppercase">& Tasarım</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md mb-6">
              10 yılı aşkın deneyimimizle boya, badana ve tadilat hizmetlerinde 
              kaliteli işçilik ve müşteri memnuniyeti garantisi sunuyoruz.
            </p>
            <div className="flex gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#DE6B48] transition-colors"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a 
                href={`mailto:${EMAIL}`}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2B4433] transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              {['İç Mekan Boya', 'Badana', 'Tadilat', 'Tamirat'].map((service) => (
                <li key={service}>
                  <a href="#hizmetler" className="text-white/60 hover:text-[#DE6B48] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              {[
                { label: 'Hakkımızda', href: '#hakkimizda' },
                { label: 'Galeri', href: '#galeri' },
                { label: 'Yorumlar', href: '#yorumlar' },
                { label: 'İletişim', href: '#iletisim' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-[#DE6B48] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 {BUSINESS_NAME}. Tüm hakları saklıdır.
          </p>
          <a 
            href="#teklif"
            className="text-[#DE6B48] text-sm font-medium hover:underline"
          >
            Ücretsiz Teklif Al →
          </a>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-contact-btn"
      className="whatsapp-btn group"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30" />
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="white"
        className="relative z-10 group-hover:scale-110 transition-transform"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
};

// Home Page
const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PriceCalculatorSection />
        <GallerySection />
        <AboutSection />
        <ReviewsSection />
        <QuoteFormSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
