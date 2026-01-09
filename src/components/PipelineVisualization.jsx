import { useState } from 'react';
import { compilerPhases } from '../data/compilerData';
import './PipelineVisualization.css';

function PipelineVisualization() {
    const [selectedPhase, setSelectedPhase] = useState(null);

    return (
        <section id="architecture" className="section pipeline-section">
            <div className="container">
                <h2 className="section-title">Compiler Architecture</h2>
                <p className="section-subtitle">
                    A seven-phase pipeline with clear separation between front-end, middle-end, and back-end components
                </p>

                <div className="pipeline-container">
                    {compilerPhases.map((phase, index) => (
                        <div key={phase.id} className="pipeline-phase-wrapper">
                            <div
                                className={`pipeline-phase ${selectedPhase === phase.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                                style={{ '--phase-color': phase.color }}
                            >
                                <div className="phase-number">{phase.id}</div>
                                <div className="phase-content">
                                    <h3 className="phase-name">{phase.name}</h3>
                                    <span className="phase-category badge badge-primary">{phase.category}</span>
                                    <p className="phase-description">{phase.description}</p>

                                    {selectedPhase === phase.id && (
                                        <div className="phase-details">
                                            <div className="phase-io">
                                                <div className="io-item">
                                                    <strong>Input:</strong> {phase.input}
                                                </div>
                                                <div className="io-item">
                                                    <strong>Output:</strong> {phase.output}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {index < compilerPhases.length - 1 && (
                                <div className="pipeline-arrow">
                                    <svg width="40" height="60" viewBox="0 0 40 60">
                                        <path d="M20 0 L20 45 M10 35 L20 45 L30 35" stroke="var(--accent-primary)" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="architecture-categories">
                    <div className="category-card">
                        <h4>Front-End</h4>
                        <p>Source language dependent analysis and validation</p>
                        <div className="category-phases">Phases 1-3</div>
                    </div>
                    <div className="category-card">
                        <h4>Middle-End</h4>
                        <p>Target-independent IR generation and optimization</p>
                        <div className="category-phases">Phases 4-5</div>
                    </div>
                    <div className="category-card">
                        <h4>Back-End</h4>
                        <p>Target architecture specific code generation</p>
                        <div className="category-phases">Phases 6-7</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PipelineVisualization;
