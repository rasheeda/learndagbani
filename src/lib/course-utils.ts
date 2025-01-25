// src/lib/course-utils.ts
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// Types for our course structure
type LessonMeta = {
  title: string
  duration: number
  order: number
  status: 'draft' | 'published'
  lastUpdated: string
}

type Lesson = LessonMeta & {
  id: string
  content: string
  unitId: string
}

type Unit = {
  id: string
  title: string
  order: number
  description: string
}

type Course = {
  id: string
  title: string
  description: string
  units: (Unit & { lessons: Lesson[] })[]
}

// Function to read a markdown file and parse its contents
async function readMarkdownFile(filePath: string): Promise<{ meta: LessonMeta; content: string }> {
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    meta: data as LessonMeta,
    content
  }
}

// Function to read all lessons in a unit
async function getUnitLessons(coursePath: string, unitId: string): Promise<Lesson[]> {
  const unitPath = path.join(coursePath, 'units', unitId)
  const files = await fs.readdir(unitPath)
  
  const lessons = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async file => {
        const { meta, content } = await readMarkdownFile(
          path.join(unitPath, file)
        )
        
        return {
          ...meta,
          id: path.basename(file, '.md'),
          content,
          unitId
        }
      })
  )
  
  // Sort lessons by their order
  return lessons.sort((a, b) => a.order - b.order)
}

// Function to read unit metadata
async function getUnitMeta(coursePath: string, unitId: string): Promise<Unit> {
  const unitMetaPath = path.join(coursePath, 'units', unitId, 'unit.json')
  // Add debug logging
  const fileContent = await fs.readFile(unitMetaPath, 'utf-8')
  console.log('Unit JSON content:', fileContent)
  const unitMeta = JSON.parse(fileContent)
  return {
    id: unitId,
    ...unitMeta
  }
}

// Main function to get all course content
export async function getCourseContent(courseId: string): Promise<Course> {
  const coursePath = path.join(process.cwd(), 'src/content/courses', courseId)
  
  // Read course metadata
  const courseMeta = JSON.parse(
    await fs.readFile(
      path.join(coursePath, 'course.json'),
      'utf-8'
    )
  )
  
  // Get all unit directories
  const unitDirs = await fs.readdir(path.join(coursePath, 'units'))
  
  // Read all units and their lessons
  const units = await Promise.all(
    unitDirs.map(async unitId => {
      const unitMeta = await getUnitMeta(coursePath, unitId)
      const lessons = await getUnitLessons(coursePath, unitId)
      
      return {
        ...unitMeta,
        lessons
      }
    })
  )
  
  // Sort units by their order
  const sortedUnits = units.sort((a, b) => a.order - b.order)
  
  return {
    id: courseId,
    ...courseMeta,
    units: sortedUnits
  }
}

// Function to get a specific lesson
export async function getLesson(
  courseId: string,
  unitId: string,
  lessonId: string
): Promise<Lesson | null> {
  try {
    const lessonPath = path.join(
      process.cwd(),
      'src/content/courses',
      courseId,
      'units',
      unitId,
      `${lessonId}.md`
    )
    
    const { meta, content } = await readMarkdownFile(lessonPath)
    
    return {
      ...meta,
      id: lessonId,
      content,
      unitId
    }
  } catch (error) {
    console.error(`Error reading lesson: ${error}`)
    return null
  }
}