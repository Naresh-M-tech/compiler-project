import { projectStats } from '../data/compilerData';
import './Hero.css';

function Hero() {
    return (
        <section id="home" className="hero-section">
            <div className="hero-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-badge">
                    <span className="badge badge-primary">Final Year Capstone Project</span>
                </div>

                <h1 className="hero-title">
                    Development of a Multi-Phase Compiler
                    <br />
                    <span className="hero-subtitle-gradient">with Optimization Techniques</span>
                </h1>

                <p className="hero-description">
                    A comprehensive, modular compiler system demonstrating all major compilation phases
                    with effective optimization techniques. Academically rigorous, scalable, and suitable
                    for capstone evaluation.
                </p>

                <div className="hero-stats">
                    <div className="stat-card">
                        <div className="stat-value">{projectStats.totalComponents}</div>
                        <div className="stat-label">Components</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{projectStats.phases}</div>
                        <div className="stat-label">Phases</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{projectStats.optimizationTechniques}</div>
                        <div className="stat-label">Optimizations</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{projectStats.performanceImprovement}</div>
                        <div className="stat-label">Performance Gain</div>
                    </div>
                </div>

                <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => document.getElementById('architecture').scrollIntoView({ behavior: 'smooth' })}>
                        Explore Architecture
                    </button>
                    <button className="btn btn-secondary" onClick={() => document.getElementById('optimization').scrollIntoView({ behavior: 'smooth' })}>
                        View Optimizations
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
