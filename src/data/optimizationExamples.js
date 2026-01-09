// Sample programs for optimization demonstrations

export const testPrograms = [
    {
        id: 1,
        name: "Arithmetic Expression Optimization",
        description: "Demonstrates constant folding and dead code elimination",
        sourceCode: `int main() {
    int a, b, c, x, y;
    a = 5;
    b = 10;
    c = a + b;
    x = 2 + 3;
    y = x * 4;
    return c + y;
}`,
        unoptimizedTAC: [
            "t1 = 5",
            "a = t1",
            "t2 = 10",
            "b = t2",
            "t3 = a + b",
            "c = t3",
            "t4 = 2 + 3",
            "x = t4",
            "t5 = x * 4",
            "y = t5",
            "t6 = c + y",
            "return t6"
        ],
        optimizedTAC: [
            "return 35"
        ],
        metrics: {
            originalInstructions: 12,
            optimizedInstructions: 1,
            reduction: "91.7%",
            speedup: "~95%"
        },
        optimizationsApplied: ["Constant Folding", "Dead Code Elimination"]
    },
    {
        id: 2,
        name: "Loop Optimization",
        description: "Demonstrates loop-invariant code motion and strength reduction",
        sourceCode: `int main() {
    int i, n, sum, temp;
    n = 100;
    sum = 0;
    temp = n * 2;
    
    for (i = 0; i < n; i = i + 1) {
        sum = sum + temp + i;
    }
    
    return sum;
}`,
        unoptimizedTAC: [
            "t1 = 100",
            "n = t1",
            "t2 = 0",
            "sum = t2",
            "t3 = n * 2",
            "temp = t3",
            "t4 = 0",
            "i = t4",
            "L1:",
            "t5 = i < n",
            "if_false t5 goto L2",
            "t6 = sum + temp",
            "t7 = t6 + i",
            "sum = t7",
            "t8 = i + 1",
            "i = t8",
            "goto L1",
            "L2:",
            "return sum"
        ],
        optimizedTAC: [
            "n = 100",
            "sum = 0",
            "temp = 200",
            "i = 0",
            "L1:",
            "if_false (i < 100) goto L2",
            "sum = sum + 200 + i",
            "i = i + 1",
            "goto L1",
            "L2:",
            "return sum"
        ],
        metrics: {
            originalInstructions: 717,
            optimizedInstructions: 407,
            reduction: "43.2%",
            speedup: "~42%"
        },
        optimizationsApplied: ["Loop-Invariant Code Motion", "Constant Folding", "Strength Reduction"]
    },
    {
        id: 3,
        name: "Dead Code and Common Subexpression",
        description: "Demonstrates CSE and dead code elimination",
        sourceCode: `int main() {
    int a, b, c, d, e, f;
    a = 10;
    b = 20;
    c = a + b;
    d = a + b;  // Common subexpression
    e = c * 2;
    f = 50;     // Dead code (f never used)
    
    if (0) {    // Dead code block
        e = 100;
    }
    
    return e;
}`,
        unoptimizedTAC: [
            "t1 = 10",
            "a = t1",
            "t2 = 20",
            "b = t2",
            "t3 = a + b",
            "c = t3",
            "t4 = a + b",
            "d = t4",
            "t5 = c * 2",
            "e = t5",
            "t6 = 50",
            "f = t6",
            "t7 = 0",
            "if_false t7 goto L1",
            "t8 = 100",
            "e = t8",
            "L1:",
            "return e"
        ],
        optimizedTAC: [
            "return 60"
        ],
        metrics: {
            originalInstructions: 15,
            optimizedInstructions: 1,
            reduction: "93.3%",
            speedup: "~94%"
        },
        optimizationsApplied: ["Common Subexpression Elimination", "Constant Folding", "Dead Code Elimination"]
    }
];

export const optimizationSteps = {
    1: [
        {
            step: 1,
            name: "Original Code",
            code: ["t1 = 5", "a = t1", "t2 = 10", "b = t2", "t3 = a + b", "c = t3", "t4 = 2 + 3", "x = t4", "t5 = x * 4", "y = t5", "t6 = c + y", "return t6"],
            description: "Unoptimized three-address code with 12 instructions"
        },
        {
            step: 2,
            name: "Constant Folding",
            code: ["a = 5", "b = 10", "t3 = a + b", "c = t3", "x = 5", "y = 20", "t6 = c + y", "return t6"],
            description: "Folded constants: 2+3=5, 5*4=20. Reduced to 8 instructions.",
            highlight: [4, 5]
        },
        {
            step: 3,
            name: "Further Constant Folding",
            code: ["c = 15", "t6 = 15 + 20", "return t6"],
            description: "Propagated constants: a+b=15, c+y=35. Reduced to 3 instructions.",
            highlight: [0, 1]
        },
        {
            step: 4,
            name: "Final Optimization",
            code: ["return 35"],
            description: "Complete compile-time evaluation. Final: 1 instruction (91.7% reduction)",
            highlight: [0]
        }
    ],
    2: [
        {
            step: 1,
            name: "Original Code",
            code: ["n = 100", "sum = 0", "i = 0", "L1:", "t5 = i < n", "if_false t5 goto L2", "t3 = n * 2", "temp = t3", "t6 = sum + temp", "t7 = t6 + i", "sum = t7", "i = i + 1", "goto L1", "L2:", "return sum"],
            description: "Loop with invariant computation inside (n * 2)"
        },
        {
            step: 2,
            name: "Loop-Invariant Code Motion",
            code: ["n = 100", "sum = 0", "temp = 200", "i = 0", "L1:", "if_false (i < 100) goto L2", "sum = sum + 200 + i", "i = i + 1", "goto L1", "L2:", "return sum"],
            description: "Moved 'n * 2' outside loop and folded to constant 200. Saves 200 instructions over 100 iterations.",
            highlight: [2, 6]
        }
    ],
    3: [
        {
            step: 1,
            name: "Original Code",
            code: ["a = 10", "b = 20", "t3 = a + b", "c = t3", "t4 = a + b", "d = t4", "e = c * 2", "f = 50", "if_false 0 goto L1", "e = 100", "L1:", "return e"],
            description: "Code with common subexpression (a+b) and dead code (f, unreachable block)"
        },
        {
            step: 2,
            name: "Common Subexpression Elimination",
            code: ["a = 10", "b = 20", "t3 = a + b", "c = t3", "d = t3", "e = c * 2", "f = 50", "if_false 0 goto L1", "e = 100", "L1:", "return e"],
            description: "Eliminated redundant 'a + b' computation, reusing t3",
            highlight: [4]
        },
        {
            step: 3,
            name: "Constant Folding",
            code: ["c = 30", "d = 30", "e = 60", "f = 50", "if_false 0 goto L1", "e = 100", "L1:", "return e"],
            description: "Folded all constant expressions",
            highlight: [0, 1, 2]
        },
        {
            step: 4,
            name: "Dead Code Elimination",
            code: ["return 60"],
            description: "Removed unused variable f and unreachable if block. Final: 1 instruction (93.3% reduction)",
            highlight: [0]
        }
    ]
};

export const optimizationTechniques = [
    {
        name: "Constant Folding",
        impact: "High",
        applications: 8,
        instructionsSaved: 18,
        description: "Evaluates constant expressions at compile time"
    },
    {
        name: "Loop Optimization",
        impact: "Very High",
        applications: 1,
        instructionsSaved: 300,
        description: "Loop-invariant code motion and strength reduction"
    },
    {
        name: "Dead Code Elimination",
        impact: "Medium",
        applications: 5,
        instructionsSaved: 7,
        description: "Removes unreachable and unused code"
    },
    {
        name: "Common Subexpression Elimination",
        impact: "Low-Medium",
        applications: 1,
        instructionsSaved: 1,
        description: "Eliminates redundant expression computation"
    },
    {
        name: "Peephole Optimization",
        impact: "Medium",
        applications: 3,
        instructionsSaved: 4,
        description: "Local pattern-based optimization"
    }
];

