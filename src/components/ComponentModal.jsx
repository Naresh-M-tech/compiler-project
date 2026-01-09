import { useEffect } from 'react';
import './ComponentModal.css';

function ComponentModal({ component, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-header">
                    <div className="modal-title-row">
                        <span className="modal-number">#{component.id}</span>
                        <h2 className="modal-title">{component.name}</h2>
                    </div>
                    <span className={`badge ${component.phase === 'Front-End' ? 'badge-primary' :
                            component.phase === 'Middle-End' ? 'badge-success' :
                                component.phase === 'Optimization' ? 'badge-warning' :
                                    'badge-primary'
                        }`}>
                        {component.phase}
                    </span>
                </div>

                <div className="modal-body">
                    <section className="modal-section">
                        <h3>Description</h3>
                        <p>{component.description}</p>
                    </section>

                    <div className="modal-io-grid">
                        <section className="modal-section">
                            <h3>Input</h3>
                            <p className="io-text">{component.input}</p>
                        </section>

                        <section className="modal-section">
                            <h3>Output</h3>
                            <p className="io-text">{component.output}</p>
                        </section>
                    </div>

                    {component.algorithms && component.algorithms.length > 0 && (
                        <section className="modal-section">
                            <h3>Algorithms & Techniques</h3>
                            <ul className="modal-list">
                                {component.algorithms.map((algo, index) => (
                                    <li key={index}>{algo}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {component.optimization && (
                        <section className="modal-section">
                            <h3>Optimization Contribution</h3>
                            <p className="optimization-text">{component.optimization}</p>
                        </section>
                    )}

                    {component.impact && (
                        <section className="modal-section">
                            <h3>Performance Impact</h3>
                            <div className="impact-badge">{component.impact}</div>
                        </section>
                    )}

                    {component.interactions && component.interactions.length > 0 && (
                        <section className="modal-section">
                            <h3>Component Interactions</h3>
                            <ul className="modal-list">
                                {component.interactions.map((interaction, index) => (
                                    <li key={index}>{interaction}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComponentModal;
