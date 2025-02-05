import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Lesson {
  id: string
  title: string
  content: string
  order: number
}

export function getCourseContent(courseId: string) {
  try {
    const coursePath = path.join(process.cwd(), 'src/content/courses', courseId)
    const courseData = JSON.parse(fs.readFileSync(path.join(coursePath, 'course.json'), 'utf8'))

    const unitsPath = path.join(coursePath, 'units')
    const unitDirs = fs.readdirSync(unitsPath)

    const units = unitDirs.map(unitDir => {
      const unitPath = path.join(unitsPath, unitDir)
      const unitData = JSON.parse(fs.readFileSync(path.join(unitPath, 'unit.json'), 'utf8'))

      const files = fs.readdirSync(unitPath)
      const lessonFiles = files.filter(file => file.endsWith('.md'))

      const lessons = lessonFiles.map(file => {
        const content = fs.readFileSync(path.join(unitPath, file), 'utf8')
        const { data, content: lessonContent } = matter(content)
        
        return {
          id: path.basename(file, '.md'),
          title: data.title,
          content: lessonContent,
          order: data.order || 0  // Default to 0 if order is not specified
        } as Lesson
      })

      return {
        id: unitDir,
        title: unitData.title,
        order: unitData.order,
        lessons: lessons.sort((a, b) => a.order - b.order)
      }
    })

    return {
      ...courseData,
      units: units.sort((a, b) => a.order - b.order)
    }
  } catch (error) {
    console.error('Error loading course:', error)
    return null
  }
}