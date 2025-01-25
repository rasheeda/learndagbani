// src/components/courses/lesson-content.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight, Link } from 'lucide-react'

// Define the types for our lesson content
type LessonContentProps = {
  lesson: {
    title: string
    content: string
    duration: number
  }
  courseTitle: string
  totalLessons: number
  currentLessonNumber: number
  nextLesson?: {
    id: string
    title: string
    unitId: string
  }
  prevLesson?: {
    id: string
    title: string
    unitId: string
  }
}

export function LessonContent({
  lesson,
  courseTitle,
  totalLessons,
  currentLessonNumber,
  nextLesson,
  prevLesson
}: LessonContentProps) {
  // Custom components for markdown rendering
  const markdownComponents = {
    // Custom table rendering
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    
    // Handle the YouTube embed component
    youtube: ({ id }: { id: string }) => (
      <div className="aspect-w-16 aspect-h-9 my-6">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Purple header showing course progress */}
      <header className="bg-purple-800 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">{courseTitle}</h1>
        <div className="text-purple-200">
          {currentLessonNumber} of {totalLessons} items
        </div>
      </header>

      {/* Main content area with lesson */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold mb-6 text-black">{lesson.title}</h2>
          
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-4 flex justify-between">
        {/* Previous lesson button */}
        {prevLesson ? (
          <Link
            href={`?unit=${prevLesson.unitId}&lesson=${prevLesson.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>
              <div className="text-sm text-gray-500">Previous</div>
              <div>{prevLesson.title}</div>
            </span>
          </Link>
        ) : (
          <div /> // Empty div to maintain spacing
        )}
        
        {/* Next lesson button */}
        {nextLesson ? (
          <Link
            href={`?unit=${nextLesson.unitId}&lesson=${nextLesson.id}`}
            className="flex items-center text-right text-gray-600 hover:text-gray-900"
          >
            <span>
              <div className="text-sm text-gray-500">Next</div>
              <div>{nextLesson.title}</div>
            </span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        ) : (
          <div /> // Empty div to maintain spacing
        )}
      </footer>
    </div>
  )
}