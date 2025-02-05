// src/components/courses/course-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function CourseSidebar({
  units,
  currentUnitId,
  currentLessonId,
  courseId
}: {
  units: any[]
  currentUnitId: string
  currentLessonId: string
  courseId: string
}) {
  const pathname = usePathname()

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {units.map((unit) => (
        <div key={unit.id} className="border-b border-gray-200">
          <div className="px-4 py-2 font-medium bg-gray-50">
            {unit.title}
          </div>
          <div className="pl-4">
            {unit.lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                href={`${pathname}?unit=${unit.id}&lesson=${lesson.id}`}
                className={`block px-4 py-2 text-sm ${
                  currentLessonId === lesson.id
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {lesson.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}