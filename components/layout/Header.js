"use client";

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { isAdmin } from '@/lib/utils'

export function Header({ addSpacer = false, currentPage = "/" }) {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10) 
    }

    
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  
  useEffect(() => {
    
    return () => {
      
    }
  }, [isScrolled])
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-b from-black/20 to-transparent backdrop-blur-none'
      }`}
      style={{
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'h-20' : 'h-24'
        }`}>
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md border border-gray-200 p-2 
                group-hover:shadow-lg transition-all duration-300">
                <img 
                  src="https://i.imgur.com/bNSIi2C.jpeg" 
                  alt="Atakum Bilişim Derneği" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 
                border-2 border-white rounded-full"></div>
            </div>
            
            <div className="hidden lg:block">
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Atakum Bilişim
              </h1>
              <p className={`text-sm transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-gray-200'
              }`}>
                Teknoloji & İnovasyon Derneği
              </p>
            </div>
          </Link>
          
          
          <nav className="hidden md:flex space-x-10">
            <Link 
              href="/" 
              className={`text-lg font-medium hover:scale-105 transition-all duration-200 relative group ${
                currentPage === "/"
                  ? (isScrolled ? 'text-blue-600' : 'text-blue-300')
                  : (isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-300 drop-shadow-md')
              }`}
            >
              Ana Sayfa
              <span className={`absolute bottom-0 left-0 transition-all duration-300 ${
                currentPage === "/"
                  ? `w-full h-0.5 ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
                  : `w-0 h-0.5 group-hover:w-full ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
              }`}></span>
            </Link>
            <Link 
              href="/announcements" 
              className={`text-lg font-medium hover:scale-105 transition-all duration-200 relative group ${
                currentPage === "/announcements"
                  ? (isScrolled ? 'text-blue-600' : 'text-blue-300')
                  : (isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-300 drop-shadow-md')
              }`}
            >
              Duyurular
              <span className={`absolute bottom-0 left-0 transition-all duration-300 ${
                currentPage === "/announcements"
                  ? `w-full h-0.5 ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
                  : `w-0 h-0.5 group-hover:w-full ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
              }`}></span>
            </Link>
            <Link 
              href="/documents" 
              className={`text-lg font-medium hover:scale-105 transition-all duration-200 relative group ${
                currentPage === "/documents"
                  ? (isScrolled ? 'text-blue-600' : 'text-blue-300')
                  : (isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-300 drop-shadow-md')
              }`}
            >
              Belgeler
              <span className={`absolute bottom-0 left-0 transition-all duration-300 ${
                currentPage === "/documents"
                  ? `w-full h-0.5 ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
                  : `w-0 h-0.5 group-hover:w-full ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`text-lg font-medium hover:scale-105 transition-all duration-200 relative group ${
                currentPage === "/about"
                  ? (isScrolled ? 'text-blue-600' : 'text-blue-300')
                  : (isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-300 drop-shadow-md')
              }`}
            >
              Hakkımızda
              <span className={`absolute bottom-0 left-0 transition-all duration-300 ${
                currentPage === "/about"
                  ? `w-full h-0.5 ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
                  : `w-0 h-0.5 group-hover:w-full ${isScrolled ? 'bg-blue-600' : 'bg-blue-300'}`
              }`}></span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-5">
            {session ? (
              <>
                {isAdmin(session.user) && (
                  <Link href="/admin/announcements">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className={`text-base font-medium border-2 hover:scale-105 transition-all duration-200 ${
                        isScrolled 
                          ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                          : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
                      }`}
                    >
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <div className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gray-50/90' 
                    : 'bg-white/5 border border-white/10'
                }`}>
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'Kullanıcı'} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className={`text-base font-medium transition-all duration-300 ${
                    isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
                  }`}>
                    {session.user.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className={`text-base font-medium hover:scale-105 transition-all duration-200 ${
                      isScrolled 
                        ? 'text-red-600 hover:text-red-700 hover:bg-red-50/80' 
                        : 'text-white hover:text-red-200 hover:bg-red-500/10'
                    }`}
                    onClick={() => signOut()}
                  >
                    Çıkış
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button 
                    variant="ghost"
                    size="lg"
                    className={`text-base font-medium hover:scale-105 transition-all duration-200 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80' 
                        : 'text-white hover:text-blue-200 hover:bg-blue-500/10'
                    }`}
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button 
                    size="lg"
                    className={`text-base font-semibold hover:scale-105 transition-all duration-200 shadow-lg ${
                      isScrolled 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-600/80 hover:bg-blue-600 text-white border border-blue-400/30'
                    }`}
                  >
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
        </header>
  )
  
}