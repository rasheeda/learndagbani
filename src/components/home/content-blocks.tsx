// src/components/home/content-blocks.tsx
import Image from 'next/image'
import Link from 'next/link'

// The ContentBlock component now implements a more grid-like structure
// that matches your screenshot exactly
function ContentBlock({
  title,
  description,
  image,
  buttonText,
  buttonLink,
  imageOnLeft = true
}: {
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  imageOnLeft?: boolean
}) {
  // We create the content section that will be positioned alongside the image
  const content = (
    <div className="bg-white p-8">
      <h2 className="text-[32px] font-bold mb-4 text-gray-900">
        {title}
      </h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      <Link
        href={buttonLink}
        className="inline-block bg-[#55d7c6] hover:bg-[#69a4d2] text-white px-6 py-2 rounded text-sm font-medium transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  )

  // The image section now uses a consistent aspect ratio
  const imageContent = (
    <div className="relative w-full h-full min-h-[400px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
    </div>
  )

  // We use CSS Grid to create the alternating layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
      {imageOnLeft ? (
        <>
          {imageContent}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageContent}
        </>
      )}
    </div>
  )
}

export function ContentBlocks() {
  // The content blocks data remains the same but is now displayed
  // in a more structured grid layout
  const blocks = [
    {
      title: "Lessons",
      description: "Watch the lessons on our Youtube channel. Read accompanying lessons online.",
      image: "/images/classroom.jpg",
      buttonText: "LEARN MORE",
      buttonLink: "/courses",
      imageOnLeft: true
    },
    {
      title: "Dagbanli Dictionary",
      description: "Explore a draft/unofficial Dagbanli dictionary created by Tony Naden. We are looking for volunteers to help us create an updated dictionary. Learn how you can help by emailing hello@learndagbani.org",
      image: "/images/book-leaf.jpg",
      buttonText: "VIEW UNOFFICIAL DICTIONARY",
      buttonLink: "/files/dagbani-dictionary-pdf",
      imageOnLeft: false
    },
    {
      title: "Help Us Make Lessons!!",
      description: "Learn Dagbanli will not exist without contributors. Help us keep this alive by contributing to the project. All forms of lesson contributions are welcome; text, audio, video, etc. Click below to learn more about how you can contribute to the lessons.",
      image: "/images/male-working-on-computer.jpg",
      buttonText: "LEARN MORE",
      buttonLink: "/contact-us",
      imageOnLeft: true
    }
  ]

  // We wrap the blocks in a container that provides consistent spacing
  // and a light background that matches your screenshot
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {blocks.map((block, index) => (
            <ContentBlock
              key={index}
              {...block}
            />
          ))}
        </div>
      </div>
    </section>
  )
}