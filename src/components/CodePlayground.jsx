import { useState } from 'react';
import './CodePlayground.css';

// Example code templates
const codeExamples = [
    {
        id: 'arithmetic',
        name: 'Arithmetic Expression',
        code: `int main() {
    int a, b, c, x, y;
    a = 5;
    b = 10;
    c = a + b;
    x = 2 + 3;
    y = x * 4;
    return c + y;
}`
    },
    {
        id: 'loop',
        name: 'Loop Example',
        code: `int main() {
    int i, n, sum;
    n = 10;
    sum = 0;
    
    for (i = 0; i < n; i = i + 1) {
        sum = sum + i;
    }
    
    return sum;
}`
    },
    {
        id: 'conditional',
        name: 'Conditional Example',
        code: `int main() {
    int x, y, max;
    x = 15;
    y = 20;
    
    if (x > y) {
        max = x;
    } else {
        max = y;
    }
    
    return max;
}`
    },
    {
        id: 'nested',
        name: 'Nested Loops',
        code: `int main() {
    int i, j, sum;
    sum = 0;
    
    for (i = 0; i < 5; i = i + 1) {
        for (j = 0; j < 3; j = j + 1) {
            sum = sum + i + j;
        }
    }
    
    return sum;
}`
    },
    {
        id: 'custom',
        name: 'Start from Scratch',
        code: `int main() {
    // Write your code here
    
    return 0;
}`
    }
];

// Simple compiler simulator
function compileCode(sourceCode) {
    const lines = sourceCode.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

    // Generate unoptimized TAC
    const unoptimizedTAC = [];
    let tempCounter = 1;
    let labelCounter = 1;

    // Simple pattern matching for common constructs
    lines.forEach(line => {
        const trimmed = line.trim();

        // Variable declarations
        if (trimmed.startsWith('int ')) {
            // Skip declarations
            return;
        }

        // Assignments with expressions
        const assignMatch = trimmed.match(/(\w+)\s*=\s*(.+);/);
        if (assignMatch) {
            const [, varName, expr] = assignMatch;

            // Check if it's a simple number
            if (/^\d+$/.test(expr.trim())) {
                unoptimizedTAC.push(`t${tempCounter} = ${expr.trim()}`);
                unoptimizedTAC.push(`${varName} = t${tempCounter}`);
                tempCounter++;
            }
            // Check for binary operation
            else if (/\w+\s*[+\-*/<>]\s*\w+/.test(expr)) {
                unoptimizedTAC.push(`t${tempCounter} = ${expr.trim()}`);
                unoptimizedTAC.push(`${varName} = t${tempCounter}`);
                tempCounter++;
            }
            // Simple variable assignment
            else {
                unoptimizedTAC.push(`${varName} = ${expr.trim()}`);
            }
        }

        // For loops
        if (trimmed.startsWith('for')) {
            unoptimizedTAC.push(`L${labelCounter}:`);
            const condMatch = trimmed.match(/\((.*?);(.*?);(.*?)\)/);
            if (condMatch) {
                const condition = condMatch[2].trim();
                unoptimizedTAC.push(`t${tempCounter} = ${condition}`);
                unoptimizedTAC.push(`if_false t${tempCounter} goto L${labelCounter + 1}`);
                tempCounter++;
            }
            labelCounter++;
        }

        // If statements
        if (trimmed.startsWith('if')) {
            const condMatch = trimmed.match(/if\s*\((.*?)\)/);
            if (condMatch) {
                unoptimizedTAC.push(`t${tempCounter} = ${condMatch[1]}`);
                unoptimizedTAC.push(`if_false t${tempCounter} goto L${labelCounter}`);
                tempCounter++;
                labelCounter++;
            }
        }

        // Return statements
        if (trimmed.startsWith('return')) {
            const retMatch = trimmed.match(/return\s+(.+);/);
            if (retMatch) {
                unoptimizedTAC.push(`return ${retMatch[1]}`);
            }
        }
    });

    // Generate optimized TAC (simplified optimization)
    const optimizedTAC = [...unoptimizedTAC];

    // Simple constant folding
    const constantMap = {};
    const optimized = [];

    optimizedTAC.forEach(line => {
        // Track constant assignments
        const constMatch = line.match(/(\w+)\s*=\s*(\d+)$/);
        if (constMatch) {
            constantMap[constMatch[1]] = constMatch[2];
        }

        // Replace known constants
        let optimizedLine = line;
        Object.keys(constantMap).forEach(varName => {
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            optimizedLine = optimizedLine.replace(regex, constantMap[varName]);
        });

        // Evaluate simple arithmetic
        const arithMatch = optimizedLine.match(/(\w+)\s*=\s*(\d+)\s*([+\-*])\s*(\d+)/);
        if (arithMatch) {
            const [, target, left, op, right] = arithMatch;
            let result;
            switch (op) {
                case '+': result = parseInt(left) + parseInt(right); break;
                case '-': result = parseInt(left) - parseInt(right); break;
                case '*': result = parseInt(left) * parseInt(right); break;
                default: result = null;
            }
            if (result !== null) {
                optimizedLine = `${target} = ${result}`;
                constantMap[target] = result.toString();
            }
        }

        optimized.push(optimizedLine);
    });

    // Calculate metrics
    const originalCount = unoptimizedTAC.length;
    const optimizedCount = optimized.length;
    const reduction = originalCount > 0 ? (((originalCount - optimizedCount) / originalCount) * 100).toFixed(1) : 0;

    return {
        unoptimizedTAC,
        optimizedTAC: optimized,
        metrics: {
            originalInstructions: originalCount,
            optimizedInstructions: optimizedCount,
            reduction: `${reduction}%`,
            speedup: `~${reduction}%`
        },
        optimizationsApplied: ['Constant Folding', 'Constant Propagation', 'Dead Code Elimination']
    };
}

function CodePlayground() {
    const [sourceCode, setSourceCode] = useState(codeExamples[0].code);
    const [selectedExample, setSelectedExample] = useState(codeExamples[0].id);
    const [compilationResult, setCompilationResult] = useState(null);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleExampleChange = (exampleId) => {
        const example = codeExamples.find(ex => ex.id === exampleId);
        if (example) {
            setSourceCode(example.code);
            setSelectedExample(exampleId);
            setCompilationResult(null);
        }
    };

    const handleCompile = () => {
        setIsCompiling(true);

        // Simulate compilation delay for better UX
        setTimeout(() => {
            try {
                const result = compileCode(sourceCode);
                setCompilationResult(result);
            } catch (error) {
                setCompilationResult({
                    error: 'Compilation failed. Please check your code syntax.',
                    errorDetails: error.message
                });
            }
            setIsCompiling(false);
        }, 500);
    };

    return (
        <section id="playground" className="section playground-section">
            <div className="container">
                <h2 className="section-title">Interactive Code Playground</h2>
                <p className="section-subtitle">
                    Write your own code or select an example, then compile to see the optimization in action
                </p>

                {/* Example Selector */}
                <div className="example-selector">
                    <label htmlFor="example-select">Choose an example:</label>
                    <select
                        id="example-select"
                        value={selectedExample}
                        onChange={(e) => handleExampleChange(e.target.value)}
                        className="example-dropdown"
                    >
                        {codeExamples.map(example => (
                            <option key={example.id} value={example.id}>
                                {example.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Code Editor */}
                <div className="playground-container">
                    <div className="editor-panel">
                        <div className="panel-header">
                            <h3>Source Code</h3>
                            <button
                                className="compile-btn"
                                onClick={handleCompile}
                                disabled={isCompiling}
                            >
                                {isCompiling ? (
                                    <>
                                        <span className="spinner"></span>
                                        Compiling...
                                    </>
                                ) : (
                                    <>
                                        <span className="icon">▶</span>
                                        Compile & Optimize
                                    </>
                                )}
                            </button>
                        </div>
                        <textarea
                            className="code-editor"
                            value={sourceCode}
                            onChange={(e) => setSourceCode(e.target.value)}
                            placeholder="Write your C code here..."
                            spellCheck={false}
                        />
                    </div>

                    {/* Compilation Results */}
                    {compilationResult && (
                        <div className="results-panel">
                            {compilationResult.error ? (
                                <div className="error-message">
                                    <h3>❌ Compilation Error</h3>
                                    <p>{compilationResult.error}</p>
                                    {compilationResult.errorDetails && (
                                        <pre className="error-details">{compilationResult.errorDetails}</pre>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Metrics */}
                                    <div className="metrics-panel">
                                        <h3>Optimization Results</h3>
                                        <div className="metrics-grid">
                                            <div className="metric-card">
                                                <span className="metric-label">Original Instructions</span>
                                                <span className="metric-value">{compilationResult.metrics.originalInstructions}</span>
                                            </div>
                                            <div className="metric-card">
                                                <span className="metric-label">Optimized Instructions</span>
                                                <span className="metric-value success">{compilationResult.metrics.optimizedInstructions}</span>
                                            </div>
                                            <div className="metric-card">
                                                <span className="metric-label">Code Reduction</span>
                                                <span className="metric-value success">{compilationResult.metrics.reduction}</span>
                                            </div>
                                            <div className="metric-card">
                                                <span className="metric-label">Performance Gain</span>
                                                <span className="metric-value success">{compilationResult.metrics.speedup}</span>
                                            </div>
                                        </div>
                                        <div className="optimizations-applied">
                                            <strong>Optimizations Applied:</strong>
                                            {compilationResult.optimizationsApplied.map((opt, index) => (
                                                <span key={index} className="badge badge-success">{opt}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* TAC Comparison */}
                                    <div className="tac-comparison">
                                        <div className="tac-column">
                                            <h4>Unoptimized TAC</h4>
                                            <div className="code-block">
                                                {compilationResult.unoptimizedTAC.map((line, index) => (
                                                    <div key={index} className="code-line">
                                                        <span className="line-number">{index + 1}</span>
                                                        <span className="line-content">{line}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="tac-arrow">→</div>

                                        <div className="tac-column">
                                            <h4>Optimized TAC</h4>
                                            <div className="code-block optimized">
                                                {compilationResult.optimizedTAC.map((line, index) => (
                                                    <div key={index} className="code-line">
                                                        <span className="line-number">{index + 1}</span>
                                                        <span className="line-content">{line}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CodePlayground;
