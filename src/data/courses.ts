// First, let's import our Course type to ensure type safety
import { Course } from '../types/courses'

// We'll export our courses array with detailed information for each course
export const courses: Course[] = [
  {
    id: 'learn-dagbanli',
    title: 'Learn Dagbanli (Dagbanli Bↄhimbu)',
    description: 'Welcome to the online course for learning how to write and speak Dagbanli/Dagbani. This and all courses on the website are FREE and available for multiple retakes.',
    duration: 10,
    level: 'All Levels',
    image: '/images/two-school-boys-smiling.jpg',
    author: 'Mandeeya',
    lessonsCount: 22,
    quizzesCount: 0,
    studentsCount: 70,
    status: 'published',
    // add additional metadata as needed
    syllabus: [
      'Unit One: Introduction to Dagbanli',
      'Unit Two: Basic Grammar',
      'Unit Three: Everyday Conversations'
    ],
    objectives: [
      'Learn basic Dagbanli vocabulary',
      'Understand fundamental grammar structures',
      'Develop conversational skills'
    ]
  },
  {
    id: 'dagbon-culture',
    title: 'The Dagbon Culture',
    description: 'This course explores the rich cultural heritage of the Dagbon people. Learn about traditions, customs, and cultural practices that have been passed down through generations.',
    duration: 10,
    level: 'All Levels',
    image: '/images/damba-dance-11.jpg',
    author: 'Mandeeya',
    lessonsCount: 0,
    quizzesCount: 0,
    studentsCount: 0,
    status: 'coming_soon',
    syllabus: [
      'Introduction to Dagbon History',
      'Cultural Practices and Traditions',
      'Music and Dance',
      'Social Structure and Organization'
    ],
    objectives: [
      'Understand Dagbon cultural heritage',
      'Learn about traditional practices',
      'Explore music and dance traditions'
    ]
  },
  {
    id: 'history-of-dagbon',
    title: 'History of Dagbon',
    description: 'Dive deep into the fascinating history of Dagbon, from its origins to modern times. This comprehensive course covers key historical events, important figures, and the evolution of Dagbon society.',
    duration: 10,
    level: 'All Levels',
    image: '/images/tree-landscape.jpg',
    author: 'Mandeeya',
    lessonsCount: 0,
    quizzesCount: 0,
    studentsCount: 1,
    status: 'coming_soon',
    syllabus: [
      'Origins of Dagbon',
      'Historical Timeline',
      'Important Historical Figures',
      'Modern Dagbon'
    ],
    objectives: [
      'Learn about Dagbon\'s historical origins',
      'Understand key historical events',
      'Explore the development of modern Dagbon'
    ]
  }
]

// Helper function to get a course by ID
export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id)
}

// Helper function to get published courses
export function getPublishedCourses(): Course[] {
  return courses.filter(course => course.status === 'published')
}

// Helper function to get upcoming courses
export function getUpcomingCourses(): Course[] {
  return courses.filter(course => course.status === 'coming_soon')
}

// Helper function to search courses
export function searchCourses(query: string): Course[] {
  const lowercaseQuery = query.toLowerCase()
  return courses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery)
  )
}