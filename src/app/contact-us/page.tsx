import { Phone, Mail, MapPin, LucideIcon } from 'lucide-react'

// Contact card component for better organization
function ContactCard({
  icon: Icon,
  title,
  content
}: {
  icon: LucideIcon
  title: string
  content: string
}) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <div className="w-16 h-16 bg-[#55d7c6] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  )
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+233**********"
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@learndagbani.org"
    },
    {
      icon: MapPin,
      title: "Offices",
      content: "we're remote!"
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <h1 className="text-5xl font-bold text-black">Get in Touch</h1>
      </section>

      {/* Contact Cards Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <ContactCard
                key={index}
                icon={info.icon}
                title={info.title}
                content={info.content}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}