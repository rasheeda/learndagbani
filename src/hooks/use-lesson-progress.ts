'use client'

import { useState, useEffect } from 'react'

const PROGRESS_KEY = 'dagbanli-lesson-progress'

interface LessonProgress {
    [courseId: string]: {
        [lessonId: string]: boolean
    }
}

export function useLessonProgress(courseId: string) {
    const [progress, setProgress] = useState<LessonProgress>({})

    // Load progress from localStorage on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem(PROGRESS_KEY)
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress))
        }
    }, [])

    // Mark a lesson as completed
    const markLessonComplete = (lessonId: string) => {
        const newProgress = {
            ...progress,
            [courseId]: {
                ...progress[courseId],
                [lessonId]: true
            }
        }
        setProgress(newProgress)
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress))
    }

    // Mark a lesson as incomplete
    const markLessonIncomplete = (lessonId: string) => {
        const newProgress = {
            ...progress,
            [courseId]: {
                ...progress[courseId],
                [lessonId]: false
            }
        }
        setProgress(newProgress)
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress))
    }

    // Check if a lesson is completed
    const isLessonComplete = (lessonId: string) => {
        return progress[courseId]?.[lessonId] || false
    }

    return {
        isLessonComplete,
        markLessonComplete,
        markLessonIncomplete
    }
}