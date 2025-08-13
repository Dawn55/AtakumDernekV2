"use client";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl animate-pulse animation-delay-500"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company info section */}
          <div className="col-span-1 md:col-span-1 animate-fade-in-up">
            {/* Logo and title */}
  <div className="flex items-center mb-6 group">
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <img
          src="https://i.imgur.com/bNSIi2C.jpeg"
          alt="Atakum Bilişim Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-75"></div>
    </div>
    <div className="ml-4">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
        Atakum Bilişim Derneği
      </h3>
      <p className="text-blue-200 font-medium">Teknolojinin Öncüsü</p>
    </div>
  </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Bilişim teknolojilerinin geliştirilmesi ve yaygınlaştırılması amacıyla 
              faaliyet gösteren yenilikçi bir sivil toplum kuruluşudur. Geleceği bugünden inşa ediyoruz.
            </p>
            
            {/* Enhanced social media links */}
            <div className="flex space-x-6">
              {[
                { platform: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: 'from-blue-500 to-blue-600' },
                { platform: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: 'from-cyan-400 to-blue-500' },
                { platform: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: 'from-blue-600 to-purple-600' },
                { platform: 'Instagram', icon: 'M12.017 0C8.396 0 7.989.013 6.782.048 5.579.084 4.75.212 4.013.412A5.997 5.997 0 002.18 1.678 5.997 5.997 0 00.412 4.013C.212 4.75.084 5.579.048 6.782.013 7.989 0 8.396 0 12.017c0 3.624.013 4.031.048 5.238.036 1.203.164 2.032.364 2.769a5.997 5.997 0 001.266 2.333 5.997 5.997 0 002.333 1.266c.737.2 1.566.328 2.769.364 1.207.035 1.614.048 5.238.048 3.624 0 4.031-.013 5.238-.048 1.203-.036 2.032-.164 2.769-.364a5.997 5.997 0 002.333-1.266 5.997 5.997 0 001.266-2.333c.2-.737.328-1.566.364-2.769.035-1.207.048-1.614.048-5.238 0-3.624-.013-4.031-.048-5.238-.036-1.203-.164-2.032-.364-2.769a5.997 5.997 0 00-1.266-2.333A5.997 5.997 0 0019.786.412C19.049.212 18.22.084 17.017.048 15.81.013 15.403 0 12.017 0zm0 2.162c3.564 0 3.99.012 5.194.047 1.254.057 1.935.269 2.388.447.6.233 1.026.511 1.475.96.449.449.727.875.96 1.475.178.453.39 1.134.447 2.388.035 1.204.047 1.63.047 5.194s-.012 3.99-.047 5.194c-.057 1.254-.269 1.935-.447 2.388-.233.6-.511 1.026-.96 1.475-.449.449-.875.727-1.475.96-.453.178-1.134.39-2.388.447-1.204.035-1.63.047-5.194.047s-3.99-.012-5.194-.047c-1.254-.057-1.935-.269-2.388-.447-.6-.233-1.026-.511-1.475-.96-.449-.449-.727-.875-.96-1.475-.178-.453-.39-1.134-.447-2.388-.035-1.204-.047-1.63-.047-5.194s.012-3.99.047-5.194c.057-1.254.269-1.935.447-2.388.233-.6.511-1.026.96-1.475.449-.449.875-.727 1.475-.96.453-.178 1.134-.39 2.388-.447 1.204-.035 1.63-.047 5.194-.047z', color: 'from-pink-500 to-purple-600' }
              ].map((social, index) => (
                <a 
                  key={social.platform}
                  href="#" 
                  className="group relative"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.platform}
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-3"></span>
              Hızlı Linkler
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Ana Sayfa", icon: "🏠" },
                { href: "/announcements", label: "Duyurular", icon: "📢" },
                { href: "/documents", label: "Belgeler", icon: "📄" },
                { href: "/about", label: "Hakkımızda", icon: "ℹ️" }
              ].map((link, index) => (
                <li key={link.href} style={{ animationDelay: `${index * 100}ms` }}>
                  <a 
                    href={link.href} 
                    className="flex items-center text-gray-300 hover:text-white group transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-3 text-lg group-hover:scale-125 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="animate-fade-in-up animation-delay-400">
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-3"></span>
              İletişim
            </h4>
            <div className="space-y-4">
              {[
                { icon: "📍", label: "Adres", value: "Atakum/Samsun" },
                { icon: "📞", label: "Telefon", value: "+90 362 XXX XX XX" },
                { icon: "📧", label: "E-posta", value: "info@atakumbilesim.org" },
                { icon: "🌐", label: "Web", value: "www.atakumbilesim.org" }
              ].map((contact, index) => (
                <div 
                  key={contact.label}
                  className="flex items-start group hover:bg-white/5 p-3 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl mr-4 group-hover:scale-125 transition-transform duration-300">
                    {contact.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-blue-200 mb-1">
                      {contact.label}
                    </div>
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 flex items-center">
                <span className="mr-2">©</span>
                2024 Atakum Bilişim Derneği. Tüm hakları saklıdır.
              </p>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                  Gizlilik Politikası
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                  Kullanım Şartları
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                  Çerez Politikası
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500">Built with</span>
              {[
                { name: 'React', color: 'from-blue-400 to-cyan-400' },
                { name: 'Next.js', color: 'from-gray-600 to-gray-800' },
                { name: 'Tailwind', color: 'from-teal-400 to-blue-500' }
              ].map((tech, index) => (
                <span 
                  key={tech.name}
                  className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${tech.color} text-white rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
      </button>
      

    </footer>
  )
}