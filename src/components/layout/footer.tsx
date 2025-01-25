import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              About Learn Dagbanli
            </h3>
            <p className="text-base text-gray-600">
              Learn Dagbanli is a collective effort by volunteers who want to make 
              the Dagbani language more accessible and available to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/courses" className="text-base text-gray-600 hover:text-gray-900">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-base text-gray-600 hover:text-gray-900">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@learndagbani.org"
                  className="text-base text-gray-600 hover:text-gray-900"
                >
                  hello@learndagbani.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Learn Dagbanli. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}