'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
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
  // Keep track of which units are expanded
  const [expandedUnits, setExpandedUnits] = useState<string[]>([currentUnitId])

  // Toggle unit expansion
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
          {/* Unit header - clickable to expand/collapse */}
          <button
            onClick={() => toggleUnit(unit.id)}
            className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
          >
            <span className="font-medium">{unit.title}</span>
            {expandedUnits.includes(unit.id) ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {/* Lessons - only show if unit is expanded */}
          {expandedUnits.includes(unit.id) && (
            <div className="pl-4">
              {unit.lessons.map((lesson: any) => (
                <Link
                  key={lesson.id}
                  href={`${pathname}?unit=${unit.id}&lesson=${lesson.id}`}
                  className={`block px-4 py-2 text-sm ${currentLessonId === lesson.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {lesson.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}