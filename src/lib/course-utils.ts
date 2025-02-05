import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'

export async function getCourseContent(courseId: string) {
  try {
    const coursePath = path.join(process.cwd(), 'src/content/courses', courseId)
    
    // Read course metadata
    const courseData = JSON.parse(
      await fs.readFile(path.join(coursePath, 'course.json'), 'utf8')
    )

    // Read units
    const unitsPath = path.join(coursePath, 'units')
    const unitDirs = await fs.readdir(unitsPath)

    // Load each unit and its lessons
    const units = await Promise.all(
      unitDirs.map(async (unitDir) => {
        const unitPath = path.join(unitsPath, unitDir)
        
        // Read unit metadata
        const unitData = JSON.parse(
          await fs.readFile(path.join(unitPath, 'unit.json'), 'utf8')
        )

        // Read lesson files
        const files = await fs.readdir(unitPath)
        const lessonFiles = files.filter(file => file.endsWith('.md'))

        // Load each lesson
        const lessons = await Promise.all(
          lessonFiles.map(async (file) => {
            const content = await fs.readFile(
              path.join(unitPath, file), 
              'utf8'
            )
            const { data, content: lessonContent } = matter(content)
            
            return {
              id: path.basename(file, '.md'),
              title: data.title,
              content: lessonContent
            }
          })
        )

        return {
          id: unitDir,
          title: unitData.title,
          order: unitData.order,
          lessons: lessons.sort((a: any, b: any) => 
            (a.order || 0) - (b.order || 0)
          )
        }
      })
    )

    return {
      ...courseData,
      units: units.sort((a, b) => a.order - b.order)
    }
  } catch (error) {
    console.error('Error loading course:', error)
    throw error
  }
}