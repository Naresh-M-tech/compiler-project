import { useState } from 'react';
import { compilerComponents } from '../data/compilerData';
import ComponentModal from './ComponentModal';
import './ComponentExplorer.css';

function ComponentExplorer() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [filterPhase, setFilterPhase] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const phases = ['All', 'Front-End', 'Middle-End', 'Optimization', 'Back-End', 'Supporting'];

    const filteredComponents = compilerComponents.filter(component => {
        const matchesPhase = filterPhase === 'All' || component.phase === filterPhase;
        const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPhase && matchesSearch;
    });

    return (
        <section id="components" className="section components-section">
            <div className="container">
                <h2 className="section-title">Compiler Components</h2>
                <p className="section-subtitle">
                    Explore all {compilerComponents.length} components across the compilation pipeline
                </p>

                <div className="components-controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <div className="filter-tabs">
                        {phases.map(phase => (
                            <button
                                key={phase}
                                className={`filter-tab ${filterPhase === phase ? 'active' : ''}`}
                                onClick={() => setFilterPhase(phase)}
                            >
                                {phase}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="components-grid">
                    {filteredComponents.map(component => (
                        <div
                            key={component.id}
                            className="component-card"
                            onClick={() => setSelectedComponent(component)}
                        >
                            <div className="component-header">
                                <span className="component-number">#{component.id}</span>
                                <span className={`component-phase-badge badge ${component.phase === 'Front-End' ? 'badge-primary' :
                                        component.phase === 'Middle-End' ? 'badge-success' :
                                            component.phase === 'Optimization' ? 'badge-warning' :
                                                'badge-primary'
                                    }`}>
                                    {component.phase}
                                </span>
                            </div>
                            <h3 className="component-name">{component.name}</h3>
                            <p className="component-description">{component.description.substring(0, 120)}...</p>
                            <button className="component-view-btn">View Details →</button>
                        </div>
                    ))}
                </div>

                {filteredComponents.length === 0 && (
                    <div className="no-results">
                        <p>No components found matching your criteria</p>
                    </div>
                )}
            </div>

            {selectedComponent && (
                <ComponentModal
                    component={selectedComponent}
                    onClose={() => setSelectedComponent(null)}
                />
            )}
        </section>
    );
}

export default ComponentExplorer;
