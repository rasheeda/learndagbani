import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface LessonContentProps {
  lesson: {
    title: string
    content: string
  }
  courseTitle: string
}

export function LessonContent({ lesson, courseTitle }: LessonContentProps) {
  return (
    <div className="flex flex-col h-screen ml-80"> {/* Add margin to account for fixed sidebar */}
      {/* Header - fixed at top */}
      <div className="bg-purple-800 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">{courseTitle}</h1>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">{lesson.title}</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}