// src/components/courses/course-card.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, BookOpen, Award } from 'lucide-react'
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
        {/* Author */}
        <div className="text-sm text-gray-600 mb-2">
          by <span className="text-blue-600">{course.author}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {course.duration} Weeks
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award className="w-4 h-4 mr-2" />
            {course.level}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2" />
            {course.lessonsCount} Lessons
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {course.studentsCount} Students
          </div>
        </div>

        {/* Course Status and Action Button */}
        <div className="flex justify-between items-center">
          <span className={`text-sm ${
            course.status === 'published' ? 'text-green-600' : 'text-orange-600'
          }`}>
            {course.status === 'published' ? 'Free' : 'Coming Soon'}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="bg-[#F4A442] hover:bg-[#E89432] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {course.status === 'published' ? 'Read more' : 'Learn more'}
          </Link>
        </div>
      </div>
    </div>
  )
}