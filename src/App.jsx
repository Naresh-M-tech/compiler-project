import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PipelineVisualization from './components/PipelineVisualization';
import ComponentExplorer from './components/ComponentExplorer';
import OptimizationDemo from './components/OptimizationDemo';
import CodePlayground from './components/CodePlayground';
import ResultsSection from './components/ResultsSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <PipelineVisualization />
        <ComponentExplorer />
        <OptimizationDemo />
        <CodePlayground />
        <ResultsSection />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Multi-Phase Compiler</h4>
              <p>Final Year Capstone Project</p>
              <p className="footer-subtitle">Development of a Multi-Phase Compiler with Optimization Techniques</p>
            </div>
            <div className="footer-section">
              <h4>Project Highlights</h4>
              <ul className="footer-list">
                <li>26 Compiler Components</li>
                <li>7 Compilation Phases</li>
                <li>5 Optimization Techniques</li>
                <li>42-95% Performance Improvement</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Technologies</h4>
              <ul className="footer-list">
                <li>Python 3.10+</li>
                <li>PLY (Python Lex-Yacc)</li>
                <li>Three-Address Code IR</li>
                <li>Graph-based Optimization</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Multi-Phase Compiler Project. All rights reserved.</p>
            <p>Academically rigorous, scalable, and suitable for capstone evaluation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;