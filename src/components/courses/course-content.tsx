'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CourseSidebar } from './course-sidebar'
import { LessonContent } from './lesson-content'
import { Menu, X } from 'lucide-react'

// Define our types
interface Lesson {
  id: string
  title: string
  content: string
}

interface Unit {
  id: string
  title: string
  lessons: Lesson[]
}

interface CourseData {
  title: string
  units: Unit[]
}

export function CourseContent({
  courseData,
  courseId
}: {
  courseData: CourseData
  courseId: string
}) {
  const searchParams = useSearchParams()

  // Get current unit and lesson from URL or default to first ones
  const currentUnitId = searchParams.get('unit') || courseData.units[0].id
  const currentLessonId = searchParams.get('lesson') || courseData.units[0].lessons[0].id

  // Find current lesson
  const currentUnit = courseData.units.find(u => u.id === currentUnitId)
  const currentLesson = currentUnit?.lessons.find(l => l.id === currentLessonId)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex-1 overflow-hidden">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar with mobile responsive classes */}
      <div className={`
        fixed inset-y-0 left-0 lg:relative lg:flex
        ${isSidebarOpen ? 'flex' : 'hidden lg:flex'}
        z-40 lg:z-auto
      `}>
        {/* Optional overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar component with mobile styles */}
        <div className="relative w-[300px] h-full bg-background border-r">
          <CourseSidebar
            units={courseData.units}
            currentUnitId={currentUnitId}
            currentLessonId={currentLessonId}
            courseId={courseId}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 w-full overflow-y-auto">
        {currentLesson && (
          <LessonContent
            lesson={currentLesson}
            courseTitle={courseData.title}
            courseId={courseId}
            isLessonComplete={function (lessonId: string): boolean {
              throw new Error('Function not implemented.')
            }}
            markLessonComplete={function (lessonId: string): void {
              throw new Error('Function not implemented.')
            }}
            markLessonIncomplete={function (lessonId: string): void {
              throw new Error('Function not implemented.')
            }}
          />
        )}
      </div>
    </div>
  )
}