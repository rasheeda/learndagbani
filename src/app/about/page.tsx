import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/about-us.jpg"
                alt="Our Journey"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  We came together after a twitter and facebook post discussion 
                  on why there were no resources for learning Dagbani. We're on 
                  a journey!
                </p>
                <p className="text-lg text-gray-700">
                  We are team of young Dagombas committed to spending our free 
                  time in developing resources for anyone who wants to learn 
                  Dagbani.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}