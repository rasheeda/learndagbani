# Learn Dagbanli

https://learndagbani.org

Learn Dagbanli is an open-source project aimed at making the Dagbani language more accessible and available to everyone. Through this platform, we provide free video and text lessons for learning how to speak and write Dagbanli.

## About the Project

We came together after discussions on social media about the lack of resources for learning Dagbani. As a team of young Dagombas, we're committed to developing comprehensive learning materials that anyone can access freely. This project represents our journey to preserve and share our language.

## Project Structure

The project is built using Next.js 14 with App Router, TypeScript, and Tailwind CSS. Here's an overview of how the project is organized:

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable React components
├── content/              # Course content in markdown
│   └── courses/
│       └── learn-dagbanli/
│           ├── course.json
│           └── units/
│               └── unit-1/
│                   ├── unit.json
│                   └── lessons/
└── lib/                 # Utility functions and helpers
```

### Course Content Structure

We use markdown files for lesson content, making it easy for contributors to add or modify lessons. Each course follows this structure:

```
courses/
└── [course-name]/
    ├── course.json         # Course metadata
    └── units/
        └── unit-1/
            ├── unit.json   # Unit metadata
            └── [lesson].md # Lesson content
```

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/learn-dagbanli.git
   cd learn-dagbanli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Contribute

We welcome contributions of all kinds. Here are some ways you can help:

### Content Contributions

1. **Add or Improve Lessons**: You can contribute by:
   - Writing new lessons
   - Improving existing lessons
   - Adding examples and exercises
   - Creating audio pronunciations

2. **Course Structure**: Help us organize content better by:
   - Suggesting new course topics
   - Improving unit organization
   - Adding learning objectives

### Technical Contributions

1. **Code Improvements**: 
   - Fix bugs
   - Improve performance
   - Add new features
   - Enhance accessibility

2. **Documentation**: 
   - Improve this README
   - Add code comments
   - Create development guides

### Contributing Guidelines

1. **Fork the Repository**: Create your own fork of the project.

2. **Create a Branch**: Make a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Follow these guidelines:
   - For lesson content: Add markdown files in the appropriate unit directory
   - For code: Follow the existing code style and add comments
   - Test your changes locally

4. **Submit a Pull Request**: 
   - Provide a clear description of your changes
   - Reference any related issues
   - Follow the pull request template

## Creating Courses and Lessons

### Creating a New Course

A course is the main container for your learning content. Each course consists of multiple units, and each unit contains lessons. Here's how to create a new course:

1. First, create a new directory for your course in `src/content/courses`. The directory name should be URL-friendly (lowercase, hyphens instead of spaces):

```bash
mkdir -p src/content/courses/your-course-name
```

2. Create a course.json file in your course directory. This file defines the course metadata:

```json
{
  "title": "Your Course Title",
  "description": "A detailed description of what learners will achieve in this course. Be specific about the learning outcomes and prerequisites if any.",
  "author": "Your Name",
  "level": "Beginner", // Beginner, Intermediate, or Advanced
  "status": "published", // or "draft" if still in development
  "lastUpdated": "2024-01-26"
}
```

3. Create the units directory structure:

```bash
mkdir -p src/content/courses/your-course-name/units/unit-1
```

### Creating Course Units

Each course is organized into units that group related lessons together. To create a unit:

1. Create a unit.json file in your unit directory:

```json
{
  "title": "Unit One: Introduction",
  "order": 1,
  "description": "A clear description of what this unit covers and what learners will achieve."
}
```

The `order` field determines where this unit appears in the course sequence.

### Creating Lessons

Lessons are written in Markdown format, which allows for rich formatting while remaining easy to write and maintain. Here's how to create a new lesson:

1. Create a new markdown file in your unit directory. Use a descriptive, URL-friendly name:

```bash
touch src/content/courses/your-course-name/units/unit-1/introduction-to-topic.md
```

2. Add the required frontmatter and content. Here's a complete example:

```markdown
---
title: "Introduction to Topic"
duration: 30
order: 1
status: published
lastUpdated: 2024-01-26
---

# Introduction to Topic

Begin your lesson with a clear introduction that sets expectations
and provides context for what will be learned.

## Learning Objectives

After completing this lesson, you will be able to:
- Understand key concept A
- Apply principle B
- Demonstrate skill C

## Main Content

Your main content goes here. You can use all standard Markdown formatting:

### Subheadings

Use subheadings to organize your content logically.

### Tables

| English | Dagbani |
|---------|---------|
| Hello   | Deseba  |
| Good    | Soma    |

### Code Examples

\```python
print("Hello, World!")
\```

### Special Components

We support several special components that you can include in your lessons:

#### YouTube Videos

Include video lessons using the YouTube component:



#### Audio Pronunciations

Add audio pronunciations:



## Practice Exercises

End your lesson with exercises that reinforce the learning:

1. Exercise one description
2. Exercise two description

## Additional Resources

Provide links to additional learning materials:

- Related lesson: [Link to related lesson]
- External resource: [Description of resource]

```

### Best Practices for Creating Content

1. **Consistent Structure**: Follow the established template to maintain consistency across lessons.

2. **Clear Learning Objectives**: Start each lesson with clear objectives that tell learners what they'll achieve.

3. **Progressive Difficulty**: Structure content to build upon previous knowledge.

4. **Rich Media**: Include relevant images, audio, and video to enhance learning.

5. **Interactive Elements**: Add exercises and practice activities throughout the lesson.

6. **Accessibility**: Provide text alternatives for media content.

### Example Course Structure

Here's an example of a well-organized course structure:

```
courses/
└── learn-dagbanli/
    ├── course.json
    └── units/
        ├── unit-1/
        │   ├── unit.json
        │   ├── 1-introduction.md
        │   ├── 2-basic-greetings.md
        │   └── 3-numbers.md
        └── unit-2/
            ├── unit.json
            ├── 1-present-tense.md
            └── 2-daily-phrases.md
```

### Testing Your Content

After creating your content:

1. Run the development server:
```bash
npm run dev
```

2. Navigate to your course in the browser to verify:
   - Content appears correctly
   - Media elements work
   - Navigation between lessons functions properly
   - Formatting renders as expected

Remember, content development is an iterative process. Start with a basic structure and improve it based on feedback and experience.

## Development Guidelines

- Use TypeScript for type safety
- Follow the existing component structure
- Add comments for complex logic
- Use Tailwind CSS for styling
- Test responsiveness across devices

## Contact

For questions or suggestions, reach out to us:
- Email: hello@learndagbani.org
- Website: [learndagbani.org](https://learndagbani.org)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Join us in making Dagbanli language learning resources accessible to everyone! Whether you're a native speaker, language enthusiast, or developer, your contributions are valuable to this project.