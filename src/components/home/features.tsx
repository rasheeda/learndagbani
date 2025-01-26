import { CheckCircle } from 'lucide-react'

// Individual feature card component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center px-4">
      {/* Checkmark icon */}
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-[#55d7c6]" />
      </div>
      
      {/* Feature title */}
      <h3 className="text-xl font-semibold mb-3 text-black">
        {title}
      </h3>
      
      {/* Feature description */}
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}

// Features section that contains all feature cards
export function Features() {
  const features = [
    {
      title: "Video Lessons",
      description: "Watch video pronunciations and subscribe to our YouTube channel"
    },
    {
      title: "Text Lessons",
      description: "Read accompanying text lessons and save for offline reading"
    },
    {
      title: "Audio Pronunciations",
      description: "Hear how words are pronounced in Dagbani and say along"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}