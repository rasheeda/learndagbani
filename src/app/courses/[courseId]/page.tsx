

import { Suspense } from 'react'
import { getCourseContent, getLesson } from '../../../lib/course-utils'
import { CourseSidebar } from '../../../components/courses/course-sidebar'
import { LessonContent } from '../../../components/courses/lesson-content'
import { Loading } from '../../../../components/ui/loading'

export default async function CoursePage({
    params,
    searchParams
  }: {
    params: { courseId: string }
    searchParams: { unit?: string; lesson?: string }
  }) {
    // Load the course content
    const courseContent = await getCourseContent(params.courseId)
    
    // Determine current unit and lesson
    let currentUnit = searchParams.unit || courseContent.units[0].id
    let currentLesson = searchParams.lesson
    
    // If no lesson is specified, use the first lesson of the current unit
    if (!currentLesson) {
      const unit = courseContent.units.find(u => u.id === currentUnit)
      currentLesson = unit?.lessons[0].id
    }
    
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
  
  // Helper function to get the next lesson
  function getNextLesson(courseContent, currentUnit, currentLesson) {
    let foundCurrent = false
    let nextLesson = null
  
    for (const unit of courseContent.units) {
      for (const lesson of unit.lessons) {
        if (foundCurrent) {
          nextLesson = {
            id: lesson.id,
            title: lesson.title,
            unitId: unit.id
          }
          return nextLesson
        }
        if (lesson.id === currentLesson && unit.id === currentUnit) {
          foundCurrent = true
        }
      }
    }
    return null
  }
  
  // Helper function to get the previous lesson
  function getPrevLesson(courseContent, currentUnit, currentLesson) {
    let prevLesson = null
  
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
    return null
  }