import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import type { ReactNode } from 'react'

// We'll create a helper function to safely handle YouTube content
function isYouTubeContent(content: ReactNode): content is string {
  if (typeof content === 'string' && content.startsWith('youtube:')) {
    return true
  }
  return false
}

const markdownComponents: Components = {
  // Table components with proper typing
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      {...props}
    >
      {children}
    </td>
  ),

  // Paragraph component with safe type handling
  p: ({ children }) => {
    // Handle case where children is an array
    if (Array.isArray(children) && children.length > 0) {
      const firstChild = children[0]

      // Check for YouTube content
      if (isYouTubeContent(firstChild)) {
        const videoId = firstChild.split('youtube:')[1].trim()
        return (
          <div className="aspect-w-16 aspect-h-9 my-6">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        )
      }
    }

    // Regular paragraph
    return <p className="mb-4">{children}</p>
  }
}

// Interface for the component props
interface LessonContentProps {
  lesson: {
    content: string;
    title: string;
  };
  courseTitle: string;
  totalLessons: number;
  currentLessonNumber: number;
  nextLesson?: {
    id: string;
    title: string;
    unitId: string;
  };
  prevLesson?: {
    id: string;
    title: string;
    unitId: string;
  };
}

export function LessonContent({
  lesson,
  courseTitle,
  totalLessons,
  currentLessonNumber,
  nextLesson,
  prevLesson
}: LessonContentProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-purple-800 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">{courseTitle}</h1>
        <div className="text-purple-200">
          {currentLessonNumber} of {totalLessons} items
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white px-6 py-4 flex justify-between">
        {prevLesson && (
          <button
            onClick={() => window.location.href = `?unit=${prevLesson.unitId}&lesson=${prevLesson.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span>Previous: {prevLesson.title}</span>
          </button>
        )}

        {nextLesson && (
          <button
            onClick={() => window.location.href = `?unit=${nextLesson.unitId}&lesson=${nextLesson.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span>Next: {nextLesson.title}</span>
          </button>
        )}
      </div>
    </div>
  )
}