// Comprehensive compiler data extracted from project documentation

export const compilerPhases = [
  {
    id: 1,
    name: "Lexical Analysis",
    category: "Front-End",
    description: "Scans source code and produces token stream",
    input: "Character stream",
    output: "Token stream",
    color: "#FF6B6B"
  },
  {
    id: 2,
    name: "Syntax Analysis",
    category: "Front-End",
    description: "Validates token sequence structure using grammar",
    input: "Token stream",
    output: "Parse tree / AST",
    color: "#4ECDC4"
  },
  {
    id: 3,
    name: "Semantic Analysis",
    category: "Front-End",
    description: "Type checking and semantic validation",
    input: "AST + Symbol Table",
    output: "Annotated AST",
    color: "#45B7D1"
  },
  {
    id: 4,
    name: "Intermediate Code Generation",
    category: "Middle-End",
    description: "Generates three-address code representation",
    input: "Annotated AST",
    output: "Three-address code (TAC)",
    color: "#96CEB4"
  },
  {
    id: 5,
    name: "Code Optimization",
    category: "Middle-End",
    description: "Applies optimization transformations",
    input: "Unoptimized TAC",
    output: "Optimized TAC",
    color: "#FFEAA7"
  },
  {
    id: 6,
    name: "Target Code Generation",
    category: "Back-End",
    description: "Generates assembly/machine code",
    input: "Optimized TAC",
    output: "Assembly code",
    color: "#DDA15E"
  },
  {
    id: 7,
    name: "Code Emission",
    category: "Back-End",
    description: "Formats and emits final executable",
    input: "Target code fragments",
    output: "Executable binary",
    color: "#BC6C25"
  }
];

export const compilerComponents = [
  // Front-End Components (1-10)
  {
    id: 1,
    name: "Source Program Loader",
    phase: "Front-End",
    phaseId: 1,
    description: "Reads source code from files or input streams, performs character encoding validation, and provides a buffered character stream interface.",
    input: "File path or input stream",
    output: "Buffered character stream with position tracking",
    algorithms: ["Double buffering for efficient I/O", "UTF-8 encoding validation", "Line and column position tracking"],
    optimization: "Efficient buffering reduces I/O overhead during compilation",
    interactions: ["Provides character stream to Lexical Analyzer"]
  },
  {
    id: 2,
    name: "Lexical Analyzer (Scanner)",
    phase: "Front-End",
    phaseId: 1,
    description: "Performs lexical analysis by scanning the character stream and producing a sequence of tokens using finite automaton for pattern recognition.",
    input: "Character stream",
    output: "Token stream with lexeme, token type, and position",
    algorithms: ["Deterministic Finite Automaton (DFA)", "Regular expression matching", "Maximal munch principle", "Panic mode error recovery"],
    optimization: "Efficient tokenization reduces parsing overhead; early error detection prevents unnecessary processing",
    interactions: ["Receives from Source Program Loader", "Sends tokens to Syntax Analyzer", "Updates Symbol Table Manager"]
  },
  {
    id: 3,
    name: "Token Classification Unit",
    phase: "Front-End",
    phaseId: 1,
    description: "Classifies tokens into categories (keywords, identifiers, literals, operators, delimiters) and assigns token codes for parser consumption.",
    input: "Raw lexemes from lexical analyzer",
    output: "Classified tokens with type codes and attributes",
    algorithms: ["Hash table for keyword recognition", "Token attribute extraction", "Operator precedence tagging"],
    optimization: "Fast keyword lookup using perfect hashing reduces classification overhead",
    interactions: ["Works with Lexical Analyzer"]
  },
  {
    id: 4,
    name: "Symbol Table Manager",
    phase: "Front-End",
    phaseId: 1,
    description: "Maintains symbol table storing identifier information including name, type, scope, memory location, and attributes. Supports nested scopes.",
    input: "Symbol insertion/lookup requests",
    output: "Symbol information records",
    algorithms: ["Hash table with chaining (O(1) lookup)", "Scope stack for nested scopes", "Symbol attributes tracking"],
    optimization: "Efficient symbol lookup reduces semantic analysis time; scope information enables dead code elimination",
    interactions: ["Updated by Lexical Analyzer and Semantic Analyzer", "Queried by all subsequent phases"]
  },
  {
    id: 5,
    name: "Syntax Analyzer (Parser)",
    phase: "Front-End",
    phaseId: 2,
    description: "Performs syntax analysis using context-free grammar to validate token sequence structure. Implements predictive or LR parsing.",
    input: "Token stream",
    output: "Parse tree or direct AST",
    algorithms: ["Recursive descent parsing (LL(1))", "LR(1)/LALR parsing", "Error recovery with synchronization tokens"],
    optimization: "Early syntax error detection prevents unnecessary semantic analysis",
    interactions: ["Receives tokens from Lexical Analyzer", "Produces parse tree", "Triggers AST Generator"]
  },
  {
    id: 6,
    name: "Parse Tree Generator",
    phase: "Front-End",
    phaseId: 2,
    description: "Constructs explicit parse tree representation showing derivation structure according to grammar productions.",
    input: "Grammar productions matched during parsing",
    output: "Parse tree with parent-child relationships",
    algorithms: ["Tree construction during parsing", "Node allocation and linking", "Attribute propagation"],
    optimization: "Parse tree serves as intermediate structure for AST generation",
    interactions: ["Built by Syntax Analyzer", "Consumed by AST Generator"]
  },
  {
    id: 7,
    name: "Abstract Syntax Tree Generator",
    phase: "Front-End",
    phaseId: 2,
    description: "Transforms parse tree into AST by eliminating grammar-specific details and retaining only semantically significant structure.",
    input: "Parse tree",
    output: "Abstract Syntax Tree with typed nodes",
    algorithms: ["Tree transformation rules", "Node type hierarchy", "Operator node creation", "Control flow structuring"],
    optimization: "Compact AST representation reduces memory usage; simplified structure accelerates analysis",
    interactions: ["Receives parse tree", "Provides AST to Semantic Analyzer"]
  },
  {
    id: 8,
    name: "Grammar Normalization Module",
    phase: "Front-End",
    phaseId: 2,
    description: "Transforms input grammar into normalized form suitable for parser generation. Eliminates left recursion and performs left factoring.",
    input: "Context-free grammar specification",
    output: "Normalized grammar with parsing tables",
    algorithms: ["Left recursion elimination", "Left factoring", "FIRST/FOLLOW set computation", "Parsing table generation"],
    optimization: "Optimized grammar reduces parser state space and improves parsing performance",
    interactions: ["Preprocessing step that configures Syntax Analyzer"]
  },
  {
    id: 9,
    name: "Semantic Analyzer",
    phase: "Front-End",
    phaseId: 3,
    description: "Performs semantic validation including type checking, scope resolution, declaration-use consistency, and semantic constraint enforcement.",
    input: "AST and Symbol Table",
    output: "Annotated AST with type and scope information",
    algorithms: ["Type inference and checking", "Scope resolution", "Type coercion rules", "Semantic error detection"],
    optimization: "Type information enables type-specific optimizations; scope analysis supports dead code elimination",
    interactions: ["Receives AST", "Queries/updates Symbol Table", "Provides annotated AST to IR Generator"]
  },
  {
    id: 10,
    name: "Error Detection and Recovery Module",
    phase: "Front-End",
    phaseId: 3,
    description: "Centralized error handling system that detects, reports, and recovers from errors at all compilation phases.",
    input: "Error notifications from all phases",
    output: "Formatted error messages with source location",
    algorithms: ["Panic mode recovery", "Phrase-level recovery", "Error production insertion", "Error message formatting"],
    optimization: "Efficient error recovery minimizes redundant error cascades",
    interactions: ["Receives error reports from all components"]
  },
  
  // Middle-End Components (11-15)
  {
    id: 11,
    name: "Intermediate Code Generator",
    phase: "Middle-End",
    phaseId: 4,
    description: "Translates annotated AST into three-address code (TAC) intermediate representation with at most one operator per instruction.",
    input: "Annotated AST",
    output: "Three-address code instruction sequence",
    algorithms: ["Syntax-directed translation", "Temporary variable generation", "Label generation", "Address calculation", "Short-circuit evaluation"],
    optimization: "TAC's simple structure enables pattern-based optimization; explicit temporaries facilitate data flow analysis",
    interactions: ["Receives AST from Semantic Analyzer", "Uses Temporary Variable Manager", "Provides TAC to CFG Constructor"]
  },
  {
    id: 12,
    name: "Control Flow Graph Constructor",
    phase: "Middle-End",
    phaseId: 4,
    description: "Constructs control flow graph from three-address code, representing program execution paths with basic blocks and edges.",
    input: "Three-address code instruction sequence",
    output: "Control Flow Graph with basic blocks and edges",
    algorithms: ["Leader identification", "Basic block formation", "Edge creation for control flow", "Entry/exit node identification"],
    optimization: "CFG enables control flow analysis, loop detection, and global optimization algorithms",
    interactions: ["Receives TAC from IR Generator", "Provides CFG to Data Flow Analysis", "Used by Loop Optimization"]
  },
  {
    id: 13,
    name: "Data Flow Analysis Module",
    phase: "Middle-End",
    phaseId: 4,
    description: "Performs data flow analysis to compute information about variable definitions and uses throughout the program.",
    input: "Control Flow Graph",
    output: "Data flow information sets (IN/OUT sets)",
    algorithms: ["Iterative data flow equations", "Reaching definitions (forward)", "Live variable analysis (backward)", "Available expressions", "Worklist algorithm"],
    optimization: "Data flow information is prerequisite for dead code elimination, CSE, and register allocation",
    interactions: ["Receives CFG", "Provides data flow info to optimization modules"]
  },
  {
    id: 14,
    name: "Type and Scope Validation Unit",
    phase: "Middle-End",
    phaseId: 4,
    description: "Validates type consistency and scope correctness in intermediate representation, ensuring type safety through IR transformations.",
    input: "Three-address code with type annotations",
    output: "Validation report and corrected IR",
    algorithms: ["Type propagation through TAC", "Implicit conversion insertion", "Scope boundary validation", "Type compatibility checking"],
    optimization: "Ensures optimization transformations preserve type safety; enables type-based optimizations",
    interactions: ["Works with Semantic Analyzer and IR Generator"]
  },
  {
    id: 15,
    name: "Temporary Variable Manager",
    phase: "Middle-End",
    phaseId: 4,
    description: "Manages allocation and reuse of temporary variables in intermediate code, tracking lifetimes and enabling efficient reuse.",
    input: "Temporary variable allocation/deallocation requests",
    output: "Unique temporary variable identifiers",
    algorithms: ["Temporary variable pool management", "Lifetime tracking", "Variable reuse for non-overlapping lifetimes"],
    optimization: "Reduces number of temporaries, improving register allocation efficiency",
    interactions: ["Used by IR Generator", "Coordinates with Register Allocation"]
  },
  
  // Optimization Components (16-20)
  {
    id: 16,
    name: "Constant Folding Module",
    phase: "Optimization",
    phaseId: 5,
    description: "Evaluates constant expressions at compile time, replacing them with computed values. Handles arithmetic, logical, and relational operations.",
    input: "TAC with constant expressions",
    output: "Optimized TAC with constants folded",
    algorithms: ["Pattern matching for constant operands", "Compile-time expression evaluation", "Constant propagation", "Algebraic simplification"],
    optimization: "Reduces runtime computation; enables further optimizations by exposing additional constants",
    impact: "91-93% instruction reduction for expression-heavy code",
    interactions: ["Operates on TAC", "Enables Dead Code Elimination"]
  },
  {
    id: 17,
    name: "Dead Code Elimination Unit",
    phase: "Optimization",
    phaseId: 5,
    description: "Removes unreachable code and instructions whose results are never used using control flow and data flow analysis.",
    input: "TAC with potential dead code",
    output: "Optimized TAC with dead code removed",
    algorithms: ["Unreachable code detection via CFG", "Live variable analysis", "Mark-and-sweep elimination", "Dead store elimination"],
    optimization: "Reduces code size and execution time; simplifies subsequent optimization",
    impact: "30-40% reduction in unreachable/unused code",
    interactions: ["Uses CFG and Data Flow Analysis", "Triggered by Constant Folding"]
  },
  {
    id: 18,
    name: "Common Subexpression Elimination",
    phase: "Optimization",
    phaseId: 5,
    description: "Identifies and eliminates redundant computation of identical expressions by reusing previously computed values.",
    input: "TAC with redundant expressions",
    output: "Optimized TAC with CSE applied",
    algorithms: ["Available expressions analysis", "Expression hashing", "Temporary variable reuse", "Value numbering"],
    optimization: "Reduces redundant computation, improving execution speed",
    interactions: ["Uses Data Flow Analysis", "Coordinates with Temporary Variable Manager"]
  },
  {
    id: 19,
    name: "Loop Optimization Module",
    phase: "Optimization",
    phaseId: 5,
    description: "Applies loop-specific optimizations including loop-invariant code motion, strength reduction, and loop unrolling.",
    input: "CFG with loop structures",
    output: "Optimized TAC with improved loop performance",
    algorithms: ["Natural loop detection using dominators", "Loop-invariant code motion", "Strength reduction", "Loop unrolling", "Induction variable analysis"],
    optimization: "Significant performance improvement for loop-intensive code; reduces iteration overhead",
    impact: "43% reduction in loop code with savings scaling by iteration count",
    interactions: ["Uses CFG and Data Flow Analysis", "Major contributor to optimization effectiveness"]
  },
  {
    id: 20,
    name: "Peephole Optimization Unit",
    phase: "Optimization",
    phaseId: 5,
    description: "Performs local optimization by examining small instruction windows and replacing inefficient sequences with improved equivalents.",
    input: "TAC or target code instruction sequence",
    output: "Optimized instruction sequence",
    algorithms: ["Sliding window pattern matching", "Instruction combination", "Redundant load/store elimination", "Algebraic simplification", "Branch optimization"],
    optimization: "Low-overhead optimization with measurable impact; applicable to both IR and target code",
    interactions: ["Operates on TAC or target code", "Final optimization pass"]
  },
  
  // Back-End Components (21-24)
  {
    id: 21,
    name: "Instruction Selection Module",
    phase: "Back-End",
    phaseId: 6,
    description: "Maps intermediate code instructions to target machine instructions, handling ISA-specific details and selecting optimal sequences.",
    input: "Optimized three-address code",
    output: "Target machine instruction sequence",
    algorithms: ["Tree pattern matching", "Dynamic programming for optimal tiling", "Instruction templates", "Addressing mode selection"],
    optimization: "Selects efficient instruction sequences; exploits target architecture features",
    interactions: ["Receives optimized TAC", "Provides instructions to Register Allocation"]
  },
  {
    id: 22,
    name: "Register Allocation Unit",
    phase: "Back-End",
    phaseId: 6,
    description: "Assigns machine registers to variables and temporaries, minimizing memory accesses. Handles register spilling when needed.",
    input: "Target instructions with virtual registers",
    output: "Instructions with physical register assignments",
    algorithms: ["Graph coloring algorithm", "Live range analysis", "Register interference graph", "Spill code generation", "Linear scan allocation"],
    optimization: "Critical for performance; register access is orders of magnitude faster than memory",
    interactions: ["Uses Data Flow Analysis for liveness", "Receives from Instruction Selection", "Provides to Target Code Generator"]
  },
  {
    id: 23,
    name: "Target Code Generator",
    phase: "Back-End",
    phaseId: 6,
    description: "Generates final target code (assembly or machine code) from register-allocated instructions with target-specific details.",
    input: "Register-allocated instruction sequence",
    output: "Assembly code or machine code",
    algorithms: ["Instruction encoding", "Symbol resolution and relocation", "Calling convention implementation", "Stack frame management"],
    optimization: "Produces efficient, executable target code; applies target-specific optimizations",
    interactions: ["Receives from Register Allocation", "Provides to Code Emission"]
  },
  {
    id: 24,
    name: "Code Emission and Formatting Module",
    phase: "Back-End",
    phaseId: 7,
    description: "Formats and emits final target code to output files, handling assembly syntax and optional linking with runtime libraries.",
    input: "Target code from Code Generator",
    output: "Formatted assembly file or object file",
    algorithms: ["Assembly directive generation", "Label resolution", "Object file format generation", "Debug information emission"],
    optimization: "Efficient code layout improves instruction cache performance",
    interactions: ["Receives from Target Code Generator", "Produces final compiler output"]
  },
  
  // Supporting Components (25-26)
  {
    id: 25,
    name: "Optimization Pass Manager",
    phase: "Optimization",
    phaseId: 5,
    description: "Coordinates execution of multiple optimization passes, determining pass ordering and iteration until fixed point.",
    input: "Unoptimized IR and optimization configuration",
    output: "Fully optimized IR",
    algorithms: ["Pass scheduling and ordering", "Fixed-point iteration", "Optimization level configuration", "Pass dependency management"],
    optimization: "Ensures optimizations are applied in effective order; enables aggressive optimization through iterations",
    interactions: ["Orchestrates all optimization components"]
  },
  {
    id: 26,
    name: "Diagnostic and Profiling Module",
    phase: "Supporting",
    phaseId: 0,
    description: "Provides compilation statistics, performance metrics, and optimization reports. Enables profiling-guided optimization.",
    input: "Compilation events and metrics",
    output: "Diagnostic reports and optimization statistics",
    algorithms: ["Compilation time tracking", "Optimization impact measurement", "Code size metrics", "Instruction count analysis"],
    optimization: "Quantifies optimization effectiveness; guides tuning of optimization heuristics",
    interactions: ["Monitors all compiler phases", "Provides feedback for optimization tuning"]
  }
];

export const projectStats = {
  totalComponents: 26,
  phases: 7,
  optimizationTechniques: 5,
  performanceImprovement: "42-95%",
  instructionReduction: "Up to 93.3%"
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
