"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// We define our navigation structure with TypeScript for better type safety
type NavItem = {
  label: string
  href: string
  children?: Array<{
    label: string
    href: string
  }>
}

// Our navigation items, including the courses dropdown
const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { 
    label: 'COURSES', 
    href: '/courses',
    // children: [
    //   { label: 'Learn Dagbanli (Dagbanli Bↄhimbu)', href: '/courses/learn-dagbanli' },
    //   { label: 'The Dagbon Culture', href: '/courses/dagbon-culture' },
    //   { label: 'History of Dagbon', href: '/courses/history-of-dagbon' }
    // ]
  },
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT US', href: '/contact-us' }
]

export function Navbar() {
  // Track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo and site name */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/learn-dagbani-logo.jpeg"
            alt="Learn Dagbani Logo"
            width={150}
            height={150}
          />
          {/* <span className="text-xl text-black font-normal">
            Learn Dagbanli
          </span> */}
        </Link>

        {/* Main navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div 
              key={item.href} 
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.children ? (
                // Items with dropdown
                <button 
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                // Regular navigation links
                <Link 
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown menu */}
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  )
}