"use client"

import React, { useState, useEffect } from 'react';
import { Target, Users, Lightbulb, Eye, MapPin, Phone, Mail, Award } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Animasyon hook'u
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, isInView];
};

// Card Component
const Card = ({ children, className = "", animate = false }) => {
  const [ref, isInView] = useInView();
  
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
        animate && isInView ? 'animate-fade-in-up' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className = "" }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

// Value Card Component
const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [ref, isInView] = useInView();
  
  return (
    <div
      ref={ref}
      className={`text-center transform transition-all duration-700 ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative group">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Icon className="w-10 h-10 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Stats Section kaldırıldı

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
              Hakkımızda
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Atakum Bilişim Derneği, bilişim teknolojilerinin geliştirilmesi ve yaygınlaştırılması 
              amacıyla kurulan yenilikçi bir sivil toplum kuruluşudur.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card animate={true}>
                <CardBody>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Misyonumuz</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Bilişim teknolojileri alanında eğitim, araştırma ve geliştirme faaliyetleri 
                    yürüterek toplumun dijital dönüşümüne katkı sağlamak. Sektör profesyonellerini 
                    bir araya getirerek bilgi paylaşımı ve işbirliği ortamı oluşturmak.
                  </p>
                </CardBody>
              </Card>
              
              <Card animate={true}>
                <CardBody>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Vizyonumuz</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Bilişim teknolojileri alanında öncü bir dernek olarak, yenilikçi projeler 
                    geliştiren, eğitim kalitesini yükselten ve sektörün gelişimine katkı sağlayan 
                    bir kuruluş olmak.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Kimiz?
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Atakum Bilişim Derneği, 2024 yılında Samsun'un Atakum ilçesinde kurulan 
                    genç ve dinamik bir sivil toplum kuruluşudur. Derneğimiz, bilişim sektöründe 
                    faaliyet gösteren profesyoneller, akademisyenler ve öğrenciler tarafından 
                    oluşturulmuştur.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Temel amacımız, bilişim teknolojilerinin geliştirilmesi ve yaygınlaştırılması 
                    yoluyla toplumsal fayda sağlamaktır. Bu doğrultuda eğitim programları, 
                    seminerler, konferanslar ve workshop'lar düzenlemekteyiz.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Sektörel işbirliği ve bilgi paylaşımına önem veren derneğimiz, üyelerimiz 
                    ve geniş katılımcı kitlemiz ile birlikte bilişim ekosisteminin gelişmesine 
                    katkı sağlamaya devam etmektedir.
                  </p>

                  <div className="flex items-center space-x-4 pt-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Kaliteli Eğitim</h3>
                      <p className="text-gray-600">Sertifikalı eğitim programları</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Atakum Bilişim Derneği Ekibi"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-20 transform rotate-12"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl opacity-20 transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Değerlerimiz
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Çalışmalarımızı yönlendiren temel değerlerimiz
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                icon={Target}
                title="Kalite"
                description="Yaptığımız her işte en yüksek kalite standartlarını hedefliyoruz."
                delay={0}
              />
              
              <ValueCard
                icon={Users}
                title="İşbirliği"
                description="Birlikte çalışmanın gücüne inanıyor ve işbirliğini destekliyoruz."
                delay={200}
              />
              
              <ValueCard
                icon={Lightbulb}
                title="Yenilikçilik"
                description="Sürekli öğrenme ve yenilikçi çözümler geliştirme odaklıyız."
                delay={400}
              />
              
              <ValueCard
                icon={Eye}
                title="Şeffaflık"
                description="Tüm faaliyetlerimizde açık ve şeffaf olmaya özen gösteriyoruz."
                delay={600}
              />
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                İletişim & Konum
              </h2>
              <p className="text-xl text-gray-600">
                Bizimle iletişime geçin veya ofisimizi ziyaret edin
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <Card animate={true}>
                <CardBody>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    İletişim Bilgileri
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Adres</h4>
                        <p className="text-gray-600">
                          Mimarsinan, İsmet İnönü Blv. No:114<br />
                          55200 Atakum/Samsun, Türkiye
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Telefon</h4>
                        <p className="text-gray-600">+90 362 XXX XX XX</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">E-posta</h4>
                        <p className="text-gray-600">info@atakumbilesim.org</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card animate={true}>
                <CardBody className="p-2">
                  <div className="relative rounded-xl overflow-hidden h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3050.354!2d36.3311!3d41.3157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x408871c2c7f7c7e5%3A0x5b7c8a8a8a8a8a8a!2sMimarsinan%2C%20%C4%B0smet%20%C4%B0n%C3%B6n%C3%BC%20Blv.%20No%3A114%2C%2055200%20Atakum%2FSamsun!5e0!3m2!1str!2str!4v1647891234567!5m2!1str!2str"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-sm font-medium text-gray-900">Atakum Bilişim Derneği</p>
                      <p className="text-xs text-gray-600">Mimarsinan Mah.</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}