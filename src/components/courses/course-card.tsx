import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Award } from 'lucide-react'
import type { Course } from '../../types/courses'

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Course Image */}
      <div className="relative h-48">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Course Content */}
      
      <div className="p-6">

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-black">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Award className="w-4 h-4 mr-2" />
            {course.level}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2" />
            {course.lessonsCount} Lessons
          </div>
        </div>

        {/* Course Status and Action Button */}
        <div className="flex justify-between items-center">
          <span className={`text-sm ${
            course.status === 'published' ? 'text-green-600' : 'text-orange-600'
          }`}>
            {course.status === 'published' ? 'Available (Free)' : 'Coming Soon'}
          </span>
          {
            course.status === 'published' ? <Link
            href={`/courses/${course.id}`}
            className="bg-[#7aac7d] hover:bg-[#E89432] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Start Course
          </Link> : <></>
          }
          
        </div>
      </div>
    </div>
  )
}