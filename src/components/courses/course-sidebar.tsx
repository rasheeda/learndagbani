"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'

// First, let's define our types for better type safety
type Unit = {
  id: string
  title: string
  lessons: {
    id: string
    title: string
    duration: number
  }[]
}

type SidebarProps = {
  units: Unit[]
  currentUnitId?: string
  currentLessonId?: string
  courseId: string
}

export function CourseSidebar({
  units,
  currentUnitId,
  currentLessonId,
  courseId
}: SidebarProps) {
  // Track which units are expanded in the sidebar
  const [expandedUnits, setExpandedUnits] = useState<string[]>([currentUnitId || units[0]?.id])

  // Function to toggle a unit's expanded state
  const toggleUnit = (unitId: string) => {
    setExpandedUnits(current =>
      current.includes(unitId)
        ? current.filter(id => id !== unitId)
        : [...current, unitId]
    )
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Search bar at the top */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="search"
          placeholder="Search for course content"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          aria-label="Search course content"
        />
      </div>

      {/* Units and lessons list */}
      <nav className="divide-y divide-gray-200">
        {units.map((unit) => (
          <div key={unit.id} className="py-2">
            {/* Unit header - clickable to expand/collapse */}
            <button
              onClick={() => toggleUnit(unit.id)}
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 text-left"
            >
              <span className="font-medium text-gray-900">{unit.title}</span>
              {expandedUnits.includes(unit.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Lessons within the unit */}
            {expandedUnits.includes(unit.id) && (
              <div className="mt-1 space-y-1">
                {unit.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${courseId}?unit=${unit.id}&lesson=${lesson.id}`}
                    className={`
                      flex items-center px-8 py-2 text-sm group
                      ${currentLessonId === lesson.id
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-xs text-gray-500">
                        {lesson.duration} minutes
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}