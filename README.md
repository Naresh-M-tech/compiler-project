# Compiler Website

An interactive, educational website showcasing a Multi-Phase Compiler Framework with optimization techniques.

## 🚀 Features

- **Visual Compiler Pipeline** - Interactive visualization of all 7 compilation phases
- **Component Explorer** - Detailed view of all 26 compiler components
- **Optimization Demo** - Step-by-step demonstration of optimization techniques
- **Interactive Code Playground** - Write and compile your own code with real-time results
- **Performance Results** - Comprehensive evaluation and benchmarking data

## 🛠️ Technologies

- **Frontend**: React + Vite
- **Styling**: CSS3 with modern design patterns
- **Animations**: CSS transitions and keyframes
- **Responsive**: Mobile-first design approach

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/compiler-website.git

# Navigate to project directory
cd compiler-website

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Usage

The website will be available at `http://localhost:5173/`

### Navigation
- **Home** - Project overview and introduction
- **Architecture** - Visual compiler pipeline
- **Components** - Explore all 26 compiler components
- **Optimization** - See optimization techniques in action
- **Playground** - Write and compile your own code
- **Results** - Performance metrics and evaluation

## 🎨 Interactive Playground

The playground allows you to:
1. Write custom C code or select from example templates
2. Compile and see the optimization process
3. View before/after Three-Address Code (TAC) comparison
4. See performance metrics and optimization impact

### Example Templates
- Arithmetic Expression
- Loop Optimization
- Conditional Statements
- Nested Loops
- Custom Code

## 📊 Optimization Techniques

The compiler implements:
- **Constant Folding** - Evaluate constant expressions at compile time
- **Loop Optimization** - Loop-invariant code motion and strength reduction
- **Dead Code Elimination** - Remove unreachable and unused code
- **Common Subexpression Elimination** - Eliminate redundant computations
- **Peephole Optimization** - Local pattern-based optimization

## 🏗️ Project Structure

```
compiler-website/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── PipelineVisualization.jsx
│   │   ├── ComponentExplorer.jsx
│   │   ├── OptimizationDemo.jsx
│   │   ├── CodePlayground.jsx
│   │   └── ResultsSection.jsx
│   ├── data/               # Data and examples
│   │   ├── compilerData.js
│   │   └── optimizationExamples.js
│   ├── App.jsx             # Main app component
│   ├── App.css             # App styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML entry point
└── package.json           # Dependencies
```

## 🎓 Academic Context

This website is part of a Final Year Capstone Project:
**"Development of a Multi-Phase Compiler with Optimization Techniques"**

### Project Highlights
- 26 Compiler Components
- 7 Compilation Phases
- 5 Optimization Techniques
- 42-95% Performance Improvement

## 🚀 Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📝 License

This project is created for academic purposes as part of a capstone project.

## 👨‍💻 Author

Created as a Final Year Capstone Project - 2026

---

**Note**: This is an educational project demonstrating compiler design and optimization techniques.
