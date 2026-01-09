import { useState } from 'react';
import { testPrograms, optimizationSteps } from '../data/optimizationExamples';
import './OptimizationDemo.css';

function OptimizationDemo() {
    const [selectedProgram, setSelectedProgram] = useState(testPrograms[0]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showComparison, setShowComparison] = useState(false);

    const steps = optimizationSteps[selectedProgram.id] || [];

    const handleProgramChange = (program) => {
        setSelectedProgram(program);
        setCurrentStep(0);
        setShowComparison(false);
    };

    return (
        <section id="optimization" className="section optimization-section">
            <div className="container">
                <h2 className="section-title">Optimization Demonstration</h2>
                <p className="section-subtitle">
                    See how optimization techniques transform code step-by-step
                </p>

                <div className="program-selector">
                    {testPrograms.map(program => (
                        <button
                            key={program.id}
                            className={`program-btn ${selectedProgram.id === program.id ? 'active' : ''}`}
                            onClick={() => handleProgramChange(program)}
                        >
                            <div className="program-btn-title">{program.name}</div>
                            <div className="program-btn-subtitle">{program.metrics.reduction} reduction</div>
                        </button>
                    ))}
                </div>

                <div className="demo-container">
                    <div className="demo-header">
                        <h3>{selectedProgram.name}</h3>
                        <p>{selectedProgram.description}</p>
                        <div className="optimization-badges">
                            {selectedProgram.optimizationsApplied.map((opt, index) => (
                                <span key={index} className="badge badge-success">{opt}</span>
                            ))}
                        </div>
                    </div>

                    <div className="demo-tabs">
                        <button
                            className={`demo-tab ${!showComparison ? 'active' : ''}`}
                            onClick={() => setShowComparison(false)}
                        >
                            Step-by-Step
                        </button>
                        <button
                            className={`demo-tab ${showComparison ? 'active' : ''}`}
                            onClick={() => setShowComparison(true)}
                        >
                            Before/After
                        </button>
                    </div>

                    {!showComparison ? (
                        <div className="step-by-step">
                            {steps.length > 0 && (
                                <>
                                    <div className="step-controls">
                                        <button
                                            className="step-btn"
                                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                            disabled={currentStep === 0}
                                        >
                                            ← Previous
                                        </button>
                                        <span className="step-indicator">
                                            Step {currentStep + 1} of {steps.length}
                                        </span>
                                        <button
                                            className="step-btn"
                                            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                                            disabled={currentStep === steps.length - 1}
                                        >
                                            Next →
                                        </button>
                                    </div>

                                    <div className="step-content">
                                        <h4 className="step-name">{steps[currentStep].name}</h4>
                                        <p className="step-description">{steps[currentStep].description}</p>
                                        <div className="code-block">
                                            {steps[currentStep].code.map((line, index) => (
                                                <div
                                                    key={index}
                                                    className={`code-line ${steps[currentStep].highlight?.includes(index) ? 'highlighted' : ''
                                                        }`}
                                                >
                                                    <span className="line-number">{index + 1}</span>
                                                    <span className="line-content">{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="comparison-view">
                            <div className="comparison-column">
                                <h4>Before Optimization</h4>
                                <div className="metrics-box">
                                    <div className="metric">
                                        <span className="metric-label">Instructions:</span>
                                        <span className="metric-value">{selectedProgram.metrics.originalInstructions}</span>
                                    </div>
                                </div>
                                <div className="code-block">
                                    {selectedProgram.unoptimizedTAC.map((line, index) => (
                                        <div key={index} className="code-line">
                                            <span className="line-number">{index + 1}</span>
                                            <span className="line-content">{line}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="comparison-arrow">→</div>

                            <div className="comparison-column">
                                <h4>After Optimization</h4>
                                <div className="metrics-box success">
                                    <div className="metric">
                                        <span className="metric-label">Instructions:</span>
                                        <span className="metric-value">{selectedProgram.metrics.optimizedInstructions}</span>
                                    </div>
                                    <div className="metric">
                                        <span className="metric-label">Reduction:</span>
                                        <span className="metric-value success">{selectedProgram.metrics.reduction}</span>
                                    </div>
                                    <div className="metric">
                                        <span className="metric-label">Speedup:</span>
                                        <span className="metric-value success">{selectedProgram.metrics.speedup}</span>
                                    </div>
                                </div>
                                <div className="code-block">
                                    {selectedProgram.optimizedTAC.map((line, index) => (
                                        <div key={index} className="code-line">
                                            <span className="line-number">{index + 1}</span>
                                            <span className="line-content">{line}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default OptimizationDemo;
