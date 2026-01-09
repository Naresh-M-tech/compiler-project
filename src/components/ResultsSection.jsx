import { testPrograms, optimizationTechniques } from '../data/optimizationExamples';
import './ResultsSection.css';

function ResultsSection() {
    return (
        <section id="results" className="section results-section">
            <div className="container">
                <h2 className="section-title">Results & Evaluation</h2>
                <p className="section-subtitle">
                    Measurable performance improvements through systematic optimization
                </p>

                <div className="results-grid">
                    <div className="results-card">
                        <h3>Test Programs Performance</h3>
                        <div className="performance-table">
                            <div className="table-header">
                                <div>Program</div>
                                <div>Original</div>
                                <div>Optimized</div>
                                <div>Reduction</div>
                            </div>
                            {testPrograms.map(program => (
                                <div key={program.id} className="table-row">
                                    <div className="program-name">{program.name}</div>
                                    <div className="metric-cell">{program.metrics.originalInstructions}</div>
                                    <div className="metric-cell success">{program.metrics.optimizedInstructions}</div>
                                    <div className="metric-cell highlight">{program.metrics.reduction}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="results-card">
                        <h3>Optimization Techniques Impact</h3>
                        <div className="techniques-list">
                            {optimizationTechniques.map((technique, index) => (
                                <div key={index} className="technique-item">
                                    <div className="technique-header">
                                        <span className="technique-name">{technique.name}</span>
                                        <span className={`impact-badge impact-${technique.impact.toLowerCase().replace(' ', '-')}`}>
                                            {technique.impact}
                                        </span>
                                    </div>
                                    <p className="technique-description">{technique.description}</p>
                                    <div className="technique-stats">
                                        <div className="stat">
                                            <span className="stat-label">Applications:</span>
                                            <span className="stat-value">{technique.applications}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Instructions Saved:</span>
                                            <span className="stat-value">{technique.instructionsSaved}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="key-findings">
                    <h3>Key Findings</h3>
                    <div className="findings-grid">
                        <div className="finding-card">
                            <div className="finding-icon">🎯</div>
                            <h4>Constant Folding</h4>
                            <p>Highest impact for expression-heavy code with 91-93% instruction reduction</p>
                        </div>
                        <div className="finding-card">
                            <div className="finding-icon">🔄</div>
                            <h4>Loop Optimization</h4>
                            <p>Significant impact for iterative code with savings multiplied by iteration count</p>
                        </div>
                        <div className="finding-card">
                            <div className="finding-icon">🧹</div>
                            <h4>Dead Code Elimination</h4>
                            <p>Effectively removes 30-40% of unreachable and unused code</p>
                        </div>
                        <div className="finding-card">
                            <div className="finding-icon">⚡</div>
                            <h4>Synergistic Effects</h4>
                            <p>Combined optimizations yield greater improvements than individual techniques</p>
                        </div>
                    </div>
                </div>

                <div className="validation-section">
                    <h3>Correctness Validation</h3>
                    <p>All optimizations preserve semantic equivalence across test cases</p>
                    <div className="validation-badges">
                        <div className="validation-badge">
                            <span className="badge-icon">✓</span>
                            <span>Semantic Equivalence</span>
                        </div>
                        <div className="validation-badge">
                            <span className="badge-icon">✓</span>
                            <span>Type Safety Preserved</span>
                        </div>
                        <div className="validation-badge">
                            <span className="badge-icon">✓</span>
                            <span>Edge Cases Tested</span>
                        </div>
                        <div className="validation-badge">
                            <span className="badge-icon">✓</span>
                            <span>Control Flow Integrity</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResultsSection;
