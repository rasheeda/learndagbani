import { CourseCard } from '@/components/courses/course-card'
import { courses } from '../../data/courses'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black">Courses</h1>
          <p className="text-gray-600 text-lg">
            Learn Dagbanli through our free online courses. Start with the basics 
            and progress to advanced topics at your own pace.
          </p>
        </div>
        {/* Courses Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}