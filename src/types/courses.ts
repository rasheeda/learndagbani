// src/types/course.ts
export type Course = {
    id: string
    title: string
    description: string
    duration: number // in weeks
    level: string
    image: string
    author: string
    lessonsCount: number
    quizzesCount: number
    studentsCount: number
    status: 'published' | 'coming_soon'
    syllabus: string[],
    objectives: string[]
  }
  
  // src/data/courses.ts
  export const courses: Course[] = [
    {
      id: 'learn-dagbanli',
      title: 'Learn Dagbanli (Dagbanli Bↄhimbu)',
      description: 'Learn how to write and speak Dagbanli/Dagbani. This and all courses on the website are FREE and available for multiple retakes.',
      duration: 10,
      level: 'All Levels',
      image: '/images/courses/learn-dagbanli.jpg',
      author: 'Mandeeya',
      lessonsCount: 22,
      quizzesCount: 0,
      studentsCount: 70,
      status: 'published',
      syllabus: [],
      objectives: []
    },
    {
      id: 'dagbon-culture',
      title: 'The Dagbon Culture',
      description: 'This course is in progress. You can help us get this course up and running...',
      duration: 10,
      level: 'All Levels',
      image: '/images/courses/dagbon-culture.jpg',
      author: 'Mandeeya',
      lessonsCount: 0,
      quizzesCount: 0,
      studentsCount: 0,
      status: 'coming_soon',
      syllabus: [],
      objectives: []
    },
    {
      id: 'history-of-dagbon',
      title: 'History of Dagbon',
      description: 'This course is in progress. You can help us get this course up and running...',
      duration: 10,
      level: 'All Levels',
      image: '/images/courses/history.jpg',
      author: 'Mandeeya',
      lessonsCount: 0,
      quizzesCount: 0,
      studentsCount: 1,
      status: 'coming_soon',
      syllabus: [],
      objectives: []
    }
  ]