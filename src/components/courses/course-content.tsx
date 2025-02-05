'use client'

import { useSearchParams } from 'next/navigation'
import { CourseSidebar } from './course-sidebar'
import { LessonContent } from './lesson-content'

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

  return (
    <div className="flex min-h-0"> {/* min-h-0 is important for nested flex containers */}
      <CourseSidebar
        units={courseData.units}
        currentUnitId={currentUnitId}
        currentLessonId={currentLessonId}
        courseId={courseId}
      />
      <div className="flex-1 overflow-hidden">
        {currentLesson && (
          <LessonContent
            lesson={currentLesson}
            courseTitle={courseData.title} courseId={''} 
            isLessonComplete={function (lessonId: string): boolean {
              throw new Error('Function not implemented.')
            } } markLessonComplete={function (lessonId: string): void {
              throw new Error('Function not implemented.')
            } } markLessonIncomplete={function (lessonId: string): void {
              throw new Error('Function not implemented.')
            } }          />
        )}
      </div>
    </div>
  )
}