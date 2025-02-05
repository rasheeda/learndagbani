'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react'
import { useLessonProgress } from '@/hooks/use-lesson-progress'

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
  const [expandedUnits, setExpandedUnits] = useState<string[]>([currentUnitId])
  const { isLessonComplete } = useLessonProgress(courseId)

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(current =>
      current.includes(unitId)
        ? current.filter(id => id !== unitId)
        : [...current, unitId]
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0">
      {units.map((unit) => (
        <div key={unit.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleUnit(unit.id)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{unit.title}</span>
            {expandedUnits.includes(unit.id) ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedUnits.includes(unit.id) && (
            <div className="pl-4">
              {unit.lessons.map((lesson: any) => (
                <Link
                  key={lesson.id}
                  href={`${pathname}?unit=${unit.id}&lesson=${lesson.id}`}
                  className={`group flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    currentLessonId === lesson.id
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate">{lesson.title}</span>
                  {isLessonComplete(lesson.id) && (
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 ml-2" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}