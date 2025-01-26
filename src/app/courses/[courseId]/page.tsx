import { Suspense } from 'react'
import { getCourseContent, getLesson } from '../../../lib/course-utils'
import { CourseSidebar } from '../../../components/courses/course-sidebar'
import { LessonContent } from '../../../components/courses/lesson-content'
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

    /**
     * or statically
     * return [
      { courseId: 'learn-dagbanli' },
      { courseId: 'dagbon-culture' },
      { courseId: 'history-of-dagbon' }
    ]
     */
}

// Main page component simplified to just handle static params
export default function CoursePage(props: any) {
    // We wrap everything in a client component to handle the dynamic content
    return (
        <Suspense fallback={<Loading />}>
            <CourseContent {...props} />
        </Suspense>
    )
}

// Separate async component to handle the data fetching and rendering
async function CourseContent({ params, searchParams }: any) {
    const courseContent = await getCourseContent(params.courseId)

    // Handle search parameters with type safety
    const unit = typeof searchParams?.unit === 'string' ? searchParams.unit : undefined
    const currentUnit = unit || courseContent.units[0].id

    const lesson = typeof searchParams?.lesson === 'string' ? searchParams.lesson : undefined
    const currentLesson = lesson || courseContent.units[0]?.lessons[0]?.id

    const lessonContent = currentLesson
        ? await getLesson(params.courseId, currentUnit, currentLesson)
        : null

    if (!lessonContent) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">Lesson not found</p>
            </div>
        )
    }

    // Calculate lesson numbers
    let currentLessonNumber = 0
    let totalLessons = 0

    courseContent.units.forEach(unit => {
        unit.lessons.forEach(l => {
            totalLessons++
            if (l.id === currentLesson) {
                currentLessonNumber = totalLessons
            }
        })
    })

    return (
        <div className="flex h-screen">
            <CourseSidebar
                units={courseContent.units}
                currentUnitId={currentUnit}
                currentLessonId={currentLesson}
                courseId={params.courseId}
            />
            <LessonContent
                lesson={lessonContent}
                courseTitle={courseContent.title}
                totalLessons={totalLessons}
                currentLessonNumber={currentLessonNumber}
                nextLesson={getNextLesson(courseContent, currentUnit, currentLesson)}
                prevLesson={getPrevLesson(courseContent, currentUnit, currentLesson)}
            />
        </div>
    )
}

// Helper functions for navigation
function getNextLesson(courseContent: any, currentUnit: string, currentLesson: string) {
    let foundCurrent = false

    for (const unit of courseContent.units) {
        for (const lesson of unit.lessons) {
            if (foundCurrent) {
                return {
                    id: lesson.id,
                    title: lesson.title,
                    unitId: unit.id
                }
            }
            if (lesson.id === currentLesson && unit.id === currentUnit) {
                foundCurrent = true
            }
        }
    }
    return undefined
}

function getPrevLesson(courseContent: any, currentUnit: string, currentLesson: string) {
    let prevLesson: any = undefined

    for (const unit of courseContent.units) {
        for (const lesson of unit.lessons) {
            if (lesson.id === currentLesson && unit.id === currentUnit) {
                return prevLesson
            }
            prevLesson = {
                id: lesson.id,
                title: lesson.title,
                unitId: unit.id
            }
        }
    }
    return undefined
}