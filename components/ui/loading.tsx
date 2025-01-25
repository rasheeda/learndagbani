// src/components/ui/loading.tsx
export function Loading() {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          {/* Creating a simple pulsing circle animation for loading state */}
          <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-pulse">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-800 rounded-full animate-spin border-t-transparent"></div>
          </div>
          {/* Loading text below the spinner */}
          <p className="mt-4 text-gray-600 text-center">Loading...</p>
        </div>
      </div>
    )
  }