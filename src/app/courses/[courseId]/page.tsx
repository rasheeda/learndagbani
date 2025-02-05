import { Suspense } from 'react'
import { getCourseContent } from '../../../lib/course-utils'
import { CourseContent } from '../../../components/courses/course-content'
import { Loading } from '../../../../components/ui/loading'
import { notFound } from 'next/navigation'

// This function tells Next.js which courseId values to generate at build time
export async function generateStaticParams() {
    return [
        { courseId: 'learn-dagbanli' },
        //   { courseId: 'dagbon-culture' },
        //   { courseId: 'history-of-dagbon' }
    ]
}


export default async function CoursePage({
    params
  }: {
    params: any
  }) {
    const courseContent = getCourseContent(params.courseId)
    
    if (!courseContent) {
      notFound()
    }
  
    return (
      <Suspense fallback={<Loading />}>
        <CourseContent 
          courseData={courseContent} 
          courseId={params.courseId}
        />
      </Suspense>
    )
  }
  