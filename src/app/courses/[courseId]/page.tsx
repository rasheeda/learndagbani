import { Suspense } from 'react'
import { getCourseContent } from '../../../lib/course-utils'
import { CourseContent } from '../../../components/courses/course-content'
import { Loading } from '../../../../components/ui/loading'
import fs from 'fs/promises'
import path from 'path'

// This function tells Next.js which courseId values to generate at build time
export async function generateStaticParams() {
    // Get the courses directory path
    const coursesPath = path.join(process.cwd(), 'src/content/courses')

    try {
        // Read all directory names in the courses folder
        const courseDirs = await fs.readdir(coursesPath)

        // Transform directory names into params objects
        return courseDirs.map((courseId) => ({
            courseId: courseId,
        }))
    } catch (error) {
        console.error('Error reading course directories:', error)
        // Return at least one course ID to prevent build failure
        return [{ courseId: 'learn-dagbanli' }]
    }

    // return [
    //   { courseId: 'learn-dagbanli' },
    //   { courseId: 'dagbon-culture' },
    //   { courseId: 'history-of-dagbon' }
    // ]
}

export default async function CoursePage({
    params
}: {
    params: any
}) {
    const courseContent = await getCourseContent(params.courseId)

    return (
        <Suspense fallback={<Loading />}>
            <CourseContent
                courseData={courseContent}
                courseId={params.courseId}
            />
        </Suspense>
    )
}