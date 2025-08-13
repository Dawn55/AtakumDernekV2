"use client"
import Link from "next/link";

export default function BackButton({ href, variant = "blue" }) {
  const variants = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      border: "border-blue-400"
    },
    green: {
      bg: "bg-gradient-to-br from-green-500 to-green-600", 
      hover: "hover:from-green-600 hover:to-green-700",
      border: "border-green-400"
    }
  };

  const currentVariant = variants[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center w-12 h-12 
                 rounded-lg
                 ${currentVariant.bg}
                 shadow-lg hover:shadow-xl transition-all duration-200
                 ${currentVariant.hover}
                 hover:scale-105 hover:-translate-y-0.5
                 text-white
                 border ${currentVariant.border}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}