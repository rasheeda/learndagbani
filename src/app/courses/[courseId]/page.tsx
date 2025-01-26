import { Suspense } from 'react'
import { getCourseContent, getLesson } from '../../../lib/course-utils'
import { CourseSidebar } from '../../../components/courses/course-sidebar'
import { LessonContent } from '../../../components/courses/lesson-content'
import { Loading } from '../../../../components/ui/loading'

// Define the page props interface according to Next.js conventions
interface CoursePageProps {
    params: {
        courseId: string;
    };
    searchParams: {
        unit?: string;
        lesson?: string;
    };
}

// Type for adjacent (next/prev) lessons
interface AdjacentLesson {
    id: string;
    title: string;
    unitId: string;
}

// Type for course content structure
interface CourseUnit {
    id: string;
    title: string;
    lessons: Array<{
        id: string;
        title: string;
    }>;
}

interface CourseContent {
    units: CourseUnit[];
    title: string;
}

// The page component with proper type annotations
export default async function CoursePage({
    params,
    searchParams,
}: CoursePageProps) {
    // Load the course content
    const courseContent = await getCourseContent(params.courseId)

    // Determine current unit and lesson using const
    const currentUnit = searchParams.unit || courseContent.units[0].id
    const currentLesson = searchParams.lesson || courseContent.units[0]?.lessons[0]?.id;

    // Load the lesson content
    const lesson = currentLesson
        ? await getLesson(params.courseId, currentUnit, currentLesson)
        : null

    // Calculate lesson number and total
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

    if (!lesson) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600">Lesson not found</p>
            </div>
        )
    }

    return (
        <div className="flex h-screen">
            <CourseSidebar
                units={courseContent.units}
                currentUnitId={currentUnit}
                currentLessonId={currentLesson}
                courseId={params.courseId}
            />

            <Suspense fallback={<Loading />}>
                <LessonContent
                    lesson={lesson}
                    courseTitle={courseContent.title}
                    totalLessons={totalLessons}
                    currentLessonNumber={currentLessonNumber}
                    nextLesson={getNextLesson(courseContent, currentUnit, currentLesson)}
                    prevLesson={getPrevLesson(courseContent, currentUnit, currentLesson)}
                />
            </Suspense>
        </div>
    )
}

// Helper function to find the next lesson
function getNextLesson(
    courseContent: CourseContent,
    currentUnit: string,
    currentLesson: string
): AdjacentLesson | undefined {
    let foundCurrent = false;

    for (const unit of courseContent.units) {
        for (const lesson of unit.lessons) {
            if (foundCurrent) {
                return {
                    id: lesson.id,
                    title: lesson.title,
                    unitId: unit.id
                };
            }
            if (lesson.id === currentLesson && unit.id === currentUnit) {
                foundCurrent = true;
            }
        }
    }
    return undefined; // Return undefined instead of null
}

// Helper function to find the previous lesson with proper typing
function getPrevLesson(
    courseContent: CourseContent,
    currentUnit: string,
    currentLesson: string
): AdjacentLesson | undefined {
    let prevLesson: AdjacentLesson | undefined = undefined;

    for (const unit of courseContent.units) {
        for (const lesson of unit.lessons) {
            if (lesson.id === currentLesson && unit.id === currentUnit) {
                return prevLesson;
            }
            prevLesson = {
                id: lesson.id,
                title: lesson.title,
                unitId: unit.id
            };
        }
    }
    return undefined;
}