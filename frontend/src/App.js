import { useState, useEffect } from "react";
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
  Mail,
  Menu,
  X,
  Paintbrush,
  Hammer,
  Home,
  Wrench,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PHONE_NUMBER = "05455653257";
const WHATSAPP_LINK = `https://wa.me/90${PHONE_NUMBER.replace(/^0/, "")}`;

const services = [
  {
    id: 1,
    title: "İç Mekan Boya",
    description: "Evinizin her köşesine profesyonel boya uygulaması. Kaliteli malzeme ve uzman ekibimizle duvarlarınıza yeni bir hayat veriyoruz.",
    icon: Paintbrush,
    image: "https://images.pexels.com/photos/5493669/pexels-photo-5493669.jpeg",
  },
  {
    id: 2,
    title: "Badana",
    description: "Temiz, hijyenik ve pürüzsüz badana uygulamaları. Duvarlarınız bembeyaz ve tertemiz görünsün.",
    icon: Home,
    image: "https://images.pexels.com/photos/6474339/pexels-photo-6474339.jpeg",
  },
  {
    id: 3,
    title: "Tadilat",
    description: "Küçük veya büyük ölçekli tadilat projeleriniz için yanınızdayız. Evinizi hayallerinize uygun şekilde yeniliyoruz.",
    icon: Hammer,
    image: "https://images.pexels.com/photos/15798784/pexels-photo-15798784.jpeg",
  },
  {
    id: 4,
    title: "Tamirat",
    description: "Çatlak onarımı, alçı tamiri, su kaçağı sonrası tamirat ve daha fazlası. Hızlı ve kalıcı çözümler sunuyoruz.",
    icon: Wrench,
    image: "https://images.pexels.com/photos/7587872/pexels-photo-7587872.jpeg",
  },
];

const galleryImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/7587872/pexels-photo-7587872.jpeg",
    title: "Modern Salon",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1749704647804-81338ade5546?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwzfHxob21lJTIwcmVub3ZhdGlvbiUyMGxpdmluZyUyMHJvb218ZW58MHx8fHwxNzc1MDcxMzA5fDA&ixlib=rb-4.1.0&q=85",
    title: "Mutfak Yenileme",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/5493669/pexels-photo-5493669.jpeg",
    title: "Profesyonel Boya",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/6474339/pexels-photo-6474339.jpeg",
    title: "Detaylı İşçilik",
  },
];

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
    { href: "#galeri", label: "Galeri" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <>
      <header
        data-testid="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-header border-b border-[#D5D5C8]/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" data-testid="logo" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2B4433] rounded-lg flex items-center justify-center">
                <Paintbrush className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-2xl font-bold tracking-tight ${
                  isScrolled ? "text-[#1C1C18]" : "text-white"
                }`}
              >
                Dekorix
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-[#DE6B48] ${
                    isScrolled ? "text-[#1C1C18]" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                data-testid="header-cta-btn"
                asChild
                className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full px-6"
              >
                <a href="#teklif">Teklif Al</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-btn"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu
                className={`w-6 h-6 ${isScrolled ? "text-[#1C1C18]" : "text-white"}`}
              />
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
          <span className="text-xl font-bold text-[#1C1C18]">Dekorix</span>
          <button
            data-testid="close-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6 text-[#1C1C18]" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-[#1C1C18] hover:text-[#DE6B48] transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full mt-4"
          >
            <a href="#teklif" onClick={() => setIsMobileMenuOpen(false)}>
              Teklif Al
            </a>
          </Button>
        </nav>
      </div>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section data-testid="hero-section" className="hero-section">
      <img
        src="https://images.pexels.com/photos/15798784/pexels-photo-15798784.jpeg"
        alt="Dekorix Boya ve Tadilat"
        className="hero-bg"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="accent-text text-[#DE6B48] mb-4">PROFESYONEL HİZMET</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
          Evinize Değer Katıyoruz
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Boya, badana, alçı ve tamirat hizmetlerinde 10 yılı aşkın deneyimimizle
          evinizi hayallerinize kavuşturuyoruz. Kaliteli işçilik, uygun fiyat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            data-testid="hero-cta-btn"
            asChild
            size="lg"
            className="bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full px-8 text-base"
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
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white rounded-full px-8 text-base"
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 w-5 h-5" />
              Hemen Ara
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  return (
    <section
      id="hizmetler"
      data-testid="services-section"
      className="section-spacing bg-[#F7F7F2]"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="accent-text text-[#DE6B48] mb-4">HİZMETLERİMİZ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Neler Yapıyoruz?
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto">
            Evinizin her köşesinde profesyonel çözümler sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`service-card card-lift stagger-${index + 1}`}
              style={{ animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#2B4433] rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1C1C18] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#63635E] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            data-testid="services-cta-btn"
            asChild
            className="bg-[#2B4433] hover:bg-[#1f3326] text-white rounded-full px-8"
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
  return (
    <section
      id="galeri"
      data-testid="gallery-section"
      className="section-spacing bg-white"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="accent-text text-[#DE6B48] mb-4">GALERİ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Çalışmalarımız
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto">
            Tamamladığımız projelerden örnekler
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              data-testid={`gallery-item-${image.id}`}
              className="gallery-item"
            >
              <img src={image.url} alt={image.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{image.title}</span>
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
  const features = [
    "10+ yıl sektör deneyimi",
    "Profesyonel ve uzman ekip",
    "Kaliteli malzeme kullanımı",
    "Zamanında teslim garantisi",
    "Uygun fiyat politikası",
    "Müşteri memnuniyeti odaklı",
  ];

  return (
    <section
      id="hakkimizda"
      data-testid="about-section"
      className="section-spacing bg-[#2B4433]"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="accent-text text-[#DE6B48] mb-4">HAKKIMIZDA</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Neden Dekorix?
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Dekorix olarak, yılların getirdiği tecrübe ve profesyonel
              yaklaşımımızla evinizi en iyi şekilde yeniliyoruz. Müşteri
              memnuniyetini ön planda tutarak, kaliteli malzemeler ve uzman
              ekibimizle hizmet veriyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                >
                  <CheckCircle className="w-5 h-5 text-[#DE6B48] flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6474339/pexels-photo-6474339.jpeg"
                alt="Dekorix Ekibi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#DE6B48] rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm opacity-90">Yıllık Deneyim</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Quote Form Section
const QuoteFormSection = () => {
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
      className="section-spacing bg-[#EAEADF]"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="accent-text text-[#DE6B48] mb-4">ÜCRETSİZ TEKLİF</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-6">
              Hemen Teklif Alın
            </h2>
            <p className="text-[#63635E] leading-relaxed mb-8">
              Formu doldurun, size en uygun fiyat teklifimizi sunalım. Tüm
              sorularınızı yanıtlamak için buradayız.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2B4433] rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#63635E]">Telefon</p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-[#1C1C18] font-medium hover:text-[#DE6B48] transition-colors"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2B4433] rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#63635E]">WhatsApp</p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C1C18] font-medium hover:text-[#DE6B48] transition-colors"
                  >
                    WhatsApp ile yazın
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="quote-form">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#1C1C18]">
                    Adınız Soyadınız *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="quote-name-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#1C1C18]">
                    Telefon *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    data-testid="quote-phone-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05XX XXX XX XX"
                    className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1C1C18]">
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
                    className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_type" className="text-[#1C1C18]">
                    Hizmet Türü *
                  </Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={handleServiceChange}
                  >
                    <SelectTrigger
                      data-testid="quote-service-select"
                      className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433]"
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
                <Label htmlFor="address" className="text-[#1C1C18]">
                  Adres
                </Label>
                <Input
                  id="address"
                  name="address"
                  data-testid="quote-address-input"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Adresiniz"
                  className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#1C1C18]">
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
                  className="bg-[#EAEADF] border-[#D5D5C8] focus:border-[#2B4433] focus:ring-[#2B4433] resize-none"
                />
              </div>

              <Button
                type="submit"
                data-testid="quote-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-[#DE6B48] hover:bg-[#c55a3a] text-white rounded-full py-6 text-base"
              >
                {isSubmitting ? "Gönderiliyor..." : "Teklif Talep Et"}
                {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section
      id="iletisim"
      data-testid="contact-section"
      className="section-spacing bg-[#F7F7F2]"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="accent-text text-[#DE6B48] mb-4">İLETİŞİM</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1C18] mb-4">
            Bize Ulaşın
          </h2>
          <p className="text-[#63635E] max-w-2xl mx-auto">
            Sorularınız için bize ulaşabilir, hemen teklif alabilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`tel:${PHONE_NUMBER}`}
            data-testid="contact-phone"
            className="service-card card-lift text-center"
          >
            <div className="w-16 h-16 bg-[#2B4433] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] mb-2">Telefon</h3>
            <p className="text-[#DE6B48] font-medium">{PHONE_NUMBER}</p>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-whatsapp"
            className="service-card card-lift text-center"
          >
            <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] mb-2">WhatsApp</h3>
            <p className="text-[#DE6B48] font-medium">Mesaj Gönderin</p>
          </a>

          <div
            data-testid="contact-location"
            className="service-card card-lift text-center"
          >
            <div className="w-16 h-16 bg-[#2B4433] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1C18] mb-2">Konum</h3>
            <p className="text-[#63635E]">Türkiye Geneli Hizmet</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#1C1C18] py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2B4433] rounded-lg flex items-center justify-center">
              <Paintbrush className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Dekorix</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#hizmetler"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Hizmetler
            </a>
            <a
              href="#galeri"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Galeri
            </a>
            <a
              href="#hakkimizda"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Hakkımızda
            </a>
            <a
              href="#iletisim"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              İletişim
            </a>
          </div>

          <p className="text-white/50 text-sm">
            © 2024 Dekorix. Tüm hakları saklıdır.
          </p>
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
      className="whatsapp-btn"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="white"
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
        <ServicesSection />
        <GallerySection />
        <AboutSection />
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
