# Exam Schedule Arabizer

Exam Schedule Arabizer - Arabic exam schedule generator with customizable formatting and export options.

## Features

-   📚 Load subjects from CSV data with auto-generated IDs
-   🎯 Select subjects by academic year and semester
-   🎨 Customizable table formats, colors, and typography
-   📊 Multiple table layouts (Subject-Date-Time, Date-Subjects-Time, Time-Subjects-Dates)
-   📱 Responsive design with Arabic RTL support
-   💾 Export as HTML table or downloadable JPG image
-   ✨ Optional motivational quotes in Arabic

## Tech Stack

-   **React 18** with TypeScript
-   **Vite** for fast development and building
-   **Tailwind CSS** for styling
-   **shadcn/ui** for UI components
-   **html2canvas** for image export
-   **Lucide React** for icons

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd exam-schedule-arabizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Select your subjects from the organized year/semester sections
2. Choose your preferred table format and styling options
3. Generate the exam schedule table
4. Export as HTML or download as JPG image

## Project Structure

```
src/
├── pages/
│   └── Index.tsx          # Main application component
├── components/ui/         # shadcn/ui components
public/
├── subjects.csv           # The subjects data
└── logo.png               # Organization logo
```

## License

This project is private and intended for educational use.
