import { useState, useEffect } from 'react';
import './Navigation.css';

function Navigation() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'components', label: 'Components' },
        { id: 'optimization', label: 'Optimization' },
        { id: 'playground', label: 'Playground' },
        { id: 'results', label: 'Results' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <span className="logo-icon">⚙️</span>
                    <span className="logo-text">Multi-Phase Compiler</span>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
