import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-white to-blue-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Welcome to Dental AI Assistant (Design Implementation Pending)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Begin your journey with our AI-powered dental assistant. Get instant answers to your dental health questions.
            </p>
            <Link 
              href="/chat"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Chat
            </Link>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Us</h2>
            <p className="text-gray-600 mb-4">
              Our AI assistant is trained to provide accurate dental health information and guidance. Get professional insights anytime, anywhere.
            </p>
            <Link 
              href="/about"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
} 