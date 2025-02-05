import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLessonProgress } from '@/hooks/use-lesson-progress'
import { CheckCircle, Circle } from 'lucide-react'

interface LessonContentProps {
  lesson: {
    id: string
    title: string
    content: string
  }
  courseTitle: string
  courseId: string
  isLessonComplete: (lessonId: string) => boolean
  markLessonComplete: (lessonId: string) => void
  markLessonIncomplete: (lessonId: string) => void
}

export function LessonContent({
  lesson,
  courseTitle,
  courseId
}: LessonContentProps) {
  const { isLessonComplete, markLessonComplete, markLessonIncomplete } = useLessonProgress(courseId)
  const completed = isLessonComplete(lesson.id)

  return (
    <div className="flex flex-col h-screen ml-80">
      <div className="bg-purple-800 text-white px-6 py-4">
        <h1 className="text-xl font-semibold">{courseTitle}</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
            <button
              onClick={() => completed ? markLessonIncomplete(lesson.id) : markLessonComplete(lesson.id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full
                transition-all duration-200 ease-in-out
                ${completed
                  ? 'bg-green-50 text-green-600 hover:bg-green-100 ring-1 ring-green-100'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ring-1 ring-gray-100'
                }
              `}
            >
              {completed ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>

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