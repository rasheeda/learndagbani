// src/components/home/hero.tsx
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    // Creating a relative container for background image positioning
    <section className="relative h-[600px] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/background-mountains.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Semi-transparent overlay to ensure text readability 
            We're using a light blue color that matches your design */}
        {/* <div className="absolute inset-0 bg-[#E5EBEE]/80" /> */}
      </div>

      {/* Content positioned over the background */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Main heading */}
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Learn Dagbanli
        </h1>
        
        {/* Subtitle text with improved readability */}
        <p className="text-xl mb-10 text-gray-700">
          Learn how to speak and write Dagbanli with video and text lessons 
          online for free. Learn Dagbanli is a collective effort by volunteers 
          who want to make the Dagbani language more accessible and available.
        </p>
        
        {/* Call to action buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="bg-[#55d7c6] hover:bg-[#61abcb] text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            LEARN MORE
          </Link>
          <Link
            href="/courses"
            className="bg-[#333333] hover:bg-[#222222] text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            START LEARNING
          </Link>
        </div>
      </div>
    </section>
  )
}