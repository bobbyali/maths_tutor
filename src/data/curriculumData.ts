import { Strand, Topic } from '../types/curriculum';

export const STRANDS: Strand[] = [
  {
    id: 'number',
    name: 'Number',
    iconName: 'Hash',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Surds, indices, bounds, prime factorisation and error intervals'
  },
  {
    id: 'algebra',
    name: 'Algebra & Functions',
    iconName: 'Variable',
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Quadratics, algebraic fractions, non-linear equations, proofs and functions'
  },
  {
    id: 'ratio',
    name: 'Ratio & Proportion',
    iconName: 'Scale',
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Direct & inverse proportion, compound growth, rates of change and scaling'
  },
  {
    id: 'geometry',
    name: 'Geometry & Measures',
    iconName: 'Compass',
    color: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Circle theorems, 3D trigonometry, Sine/Cosine rules and vector proofs'
  },
  {
    id: 'probability',
    name: 'Probability',
    iconName: 'Dice5',
    color: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Conditional probability, Venn diagrams, set notation and tree diagrams'
  },
  {
    id: 'statistics',
    name: 'Statistics',
    iconName: 'BarChart2',
    color: 'text-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Histograms with unequal widths, cumulative frequency and box plots'
  },
  {
    id: 'lateral',
    name: 'UKMT Lateral Stretch',
    iconName: 'Lightbulb',
    color: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Mathematical Challenge puzzles, Olympiad deduction, invariant logic and multi-step lateral problem solving'
  }
];

export const TOPICS: Topic[] = [
  // --- NUMBER ---
  {
    id: 'num_surds',
    strandId: 'number',
    title: 'Surds & Rationalising Denominators',
    shortCode: 'N-SRD',
    description: 'Simplifying radical expressions, expanding brackets with surds, and rationalising binomial denominators using conjugates.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['num_primes_roots'],
    keyFormulas: [
      '\\sqrt{ab} = \\sqrt{a}\\sqrt{b}',
      '\\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}'
    ],
    tags: ['Surds', 'Radicals', 'Rationalising', 'Algebraic Manipulation']
  },
  {
    id: 'num_indices',
    strandId: 'number',
    title: 'Fractional & Negative Indices',
    shortCode: 'N-IND',
    description: 'Evaluating expressions with negative and fractional powers, solving exponential index equations.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [7, 8, 9, 10],
    prerequisites: ['num_basic_powers'],
    keyFormulas: [
      'a^{-n} = \\frac{1}{a^n}',
      'a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m = \\sqrt[n]{a^m}'
    ],
    tags: ['Indices', 'Powers', 'Roots', 'Algebra']
  },
  {
    id: 'num_bounds',
    strandId: 'number',
    title: 'Bounds & Error Intervals',
    shortCode: 'N-BND',
    description: 'Upper and lower bounds in complex calculations, error intervals, determining maximum/minimum values of quotients.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['num_rounding'],
    keyFormulas: [
      '\\text{Max}\\left(\\frac{A}{B}\\right) = \\frac{\\text{Upper}(A)}{\\text{Lower}(B)}',
      '\\text{Min}\\left(\\frac{A}{B}\\right) = \\frac{\\text{Lower}(A)}{\\text{Upper}(B)}'
    ],
    tags: ['Bounds', 'Approximation', 'Division Bounds']
  },
  {
    id: 'num_primes_hcf',
    strandId: 'number',
    title: 'Prime Factorisation & Number Theory',
    shortCode: 'N-PRF',
    description: 'Product of prime factors, highest common factor (HCF), lowest common multiple (LCM), square/cube constraints.',
    tier: 'foundation_higher',
    targetGrades: ['grade_5_6', 'grade_7', 'ukmt_junior'],
    recommendedYears: [7, 8, 9],
    prerequisites: [],
    keyFormulas: [
      '\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b'
    ],
    tags: ['Primes', 'HCF', 'LCM', 'Venn Diagrams']
  },
  {
    id: 'num_recurring',
    strandId: 'number',
    title: 'Recurring Decimals to Fractions',
    shortCode: 'N-REC',
    description: 'Converting simple and mixed recurring decimals to exact simplified fractions using algebraic proof.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10],
    prerequisites: ['alg_linear_eq'],
    keyFormulas: [
      'x = 0.\\dot{a}\\dot{b} \\implies 100x = ab.\\dot{a}\\dot{b} \\implies 99x = ab'
    ],
    tags: ['Fractions', 'Decimals', 'Proof']
  },

  // --- ALGEBRA ---
  {
    id: 'alg_quadratics_solve',
    strandId: 'algebra',
    title: 'Quadratic Equations & Completing the Square',
    shortCode: 'A-QUD',
    description: 'Solving quadratics by factorisation, the quadratic formula, completing the square, finding turning points.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['alg_brackets_expansion'],
    keyFormulas: [
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c'
    ],
    tags: ['Quadratics', 'Turning Points', 'Formula']
  },
  {
    id: 'alg_fractions',
    strandId: 'algebra',
    title: 'Algebraic Fractions',
    shortCode: 'A-FRC',
    description: 'Simplifying algebraic fractions, adding/subtracting with polynomial denominators, solving fractional equations.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['alg_quadratics_solve'],
    keyFormulas: [
      '\\frac{A}{B} \\pm \\frac{C}{D} = \\frac{AD \\pm BC}{BD}'
    ],
    tags: ['Fractions', 'Factorisation', 'Equations']
  },
  {
    id: 'alg_simultaneous_nonlinear',
    strandId: 'algebra',
    title: 'Non-Linear Simultaneous Equations',
    shortCode: 'A-SIM',
    description: 'Solving one linear and one quadratic/circle equation simultaneously by substitution, geometric intersection.',
    tier: 'higher_only',
    targetGrades: ['grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['alg_quadratics_solve'],
    keyFormulas: [
      'y = mx + c \\quad \\text{and} \\quad x^2 + y^2 = r^2'
    ],
    tags: ['Simultaneous Equations', 'Circles', 'Intersection']
  },
  {
    id: 'alg_functions',
    strandId: 'algebra',
    title: 'Functions: Composite & Inverse',
    shortCode: 'A-FNC',
    description: 'Evaluating $f(x)$, composite functions $fg(x)$, finding inverse functions $f^{-1}(x)$, domain and range.',
    tier: 'higher_only',
    targetGrades: ['grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['alg_linear_eq'],
    keyFormulas: [
      'fg(x) = f(g(x))',
      'f(f^{-1}(x)) = x'
    ],
    tags: ['Functions', 'Composite', 'Inverse']
  },
  {
    id: 'alg_proof',
    strandId: 'algebra',
    title: 'Algebraic Proof & Identity',
    shortCode: 'A-PRF',
    description: 'Rigorous algebraic proofs of even/odd integers, consecutive squares, divisibility, and difference of identities.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9', 'ukmt_intermediate'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['alg_brackets_expansion'],
    keyFormulas: [
      '2n \\text{ (even)}, \\; 2n + 1 \\text{ (odd)}',
      '(n+1)^2 - n^2 = 2n + 1'
    ],
    tags: ['Proof', 'Identities', 'Logic']
  },
  {
    id: 'alg_sequences_quad',
    strandId: 'algebra',
    title: 'Quadratic Sequences ($n^{\\text{th}}$ term)',
    shortCode: 'A-SEQ',
    description: 'Finding the $n^{\\text{th}}$ term formula $an^2 + bn + c$ using second differences, term evaluation.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10],
    prerequisites: ['alg_linear_eq'],
    keyFormulas: [
      '2a = \\text{second difference}',
      '3a + b = \\text{first difference of 1st step}'
    ],
    tags: ['Sequences', 'Nth term', 'Differences']
  },

  // --- RATIO & PROPORTION ---
  {
    id: 'rat_proportion',
    strandId: 'ratio',
    title: 'Direct & Inverse Proportion ($y \\propto x^n$)',
    shortCode: 'R-PRP',
    description: 'Formulating equations involving direct and inverse proportion with powers, finding constant $k$, solving for variables.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['alg_linear_eq'],
    keyFormulas: [
      'y = kx^n \\quad (\\text{direct})',
      'y = \\frac{k}{x^n} \\quad (\\text{inverse})'
    ],
    tags: ['Proportion', 'Inverse', 'Algebraic Modeling']
  },
  {
    id: 'rat_growth_decay',
    strandId: 'ratio',
    title: 'Compound Growth, Decay & Reverse Percentages',
    shortCode: 'R-GDC',
    description: 'Multi-year compound interest, depreciation, population growth models, reverse percentage calculations.',
    tier: 'foundation_higher',
    targetGrades: ['grade_5_6', 'grade_7'],
    recommendedYears: [7, 8, 9],
    prerequisites: [],
    keyFormulas: [
      '\\text{Total} = P \\times (1 \\pm r)^n',
      '\\text{Original} = \\frac{\\text{New Value}}{\\text{Multiplier}}'
    ],
    tags: ['Percentages', 'Finance', 'Exponential']
  },

  // --- GEOMETRY & MEASURES ---
  {
    id: 'geo_pythagoras',
    strandId: 'geometry',
    title: "Pythagoras' Theorem (2D, Algebraic & Multi-Step)",
    shortCode: 'G-PYT',
    description: "Right-angled triangle theorem $a^2 + b^2 = c^2$, multi-step geometric problem solving with circle chords, coordinate distances, algebraic side lengths leading to quadratic equations, and UKMT lateral nets.",
    tier: 'foundation_higher',
    targetGrades: ['grade_5_6', 'grade_7', 'grade_8_9', 'ukmt_junior', 'ukmt_intermediate'],
    recommendedYears: [7, 8, 9, 10, 11],
    prerequisites: ['num_surds'],
    keyFormulas: [
      'a^2 + b^2 = c^2',
      'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
      '(x+a)^2 + (x+b)^2 = (x+c)^2'
    ],
    tags: ['Pythagoras', 'Triangles', 'Algebraic Geometry', 'Coordinate Geometry', 'Proofs']
  },
  {
    id: 'geo_circle_theorems',
    strandId: 'geometry',
    title: 'Circle Theorems & Geometric Proofs',
    shortCode: 'G-CIR',
    description: 'Angle at centre is twice angle at circumference, angles in same segment, cyclic quadrilaterals, alternate segment theorem, tangent perpendicular to radius.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9', 'ukmt_intermediate'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['geo_angles_basics'],
    keyFormulas: [
      '\\angle \\text{centre} = 2 \\times \\angle \\text{circumference}',
      '\\text{Opposite angles in cyclic quad} = 180^\\circ',
      '\\text{Alternate segment theorem: } \\angle \\text{tangent-chord} = \\angle \\text{subtended}'
    ],
    tags: ['Circle Theorems', 'Angle Chasing', 'Proofs', 'Geometry']
  },
  {
    id: 'geo_trig_sine_cosine',
    strandId: 'geometry',
    title: 'Sine Rule, Cosine Rule & Triangle Area',
    shortCode: 'G-TRG',
    description: 'Applying Sine rule (missing side/angle, ambiguous case), Cosine rule for sides and angles, non-right angled area $\\frac{1}{2}ab\\sin C$.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['geo_pythagoras_trig'],
    keyFormulas: [
      '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
      'a^2 = b^2 + c^2 - 2bc \\cos A',
      '\\text{Area} = \\frac{1}{2}ab \\sin C'
    ],
    tags: ['Trigonometry', 'Sine Rule', 'Cosine Rule', 'Area']
  },
  {
    id: 'geo_3d_trig',
    strandId: 'geometry',
    title: '3D Pythagoras & 3D Trigonometry',
    shortCode: 'G-3DT',
    description: 'Finding space diagonals in cuboids/pyramids, angle between a line and a plane, angle between two intersecting planes.',
    tier: 'higher_only',
    targetGrades: ['grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['geo_trig_sine_cosine'],
    keyFormulas: [
      'd^2 = x^2 + y^2 + z^2',
      '\\tan \\theta = \\frac{\\text{vertical height}}{\\text{base diagonal projection}}'
    ],
    tags: ['3D Geometry', 'Pythagoras', 'Space Diagonals']
  },
  {
    id: 'geo_vectors',
    strandId: 'geometry',
    title: 'Vector Geometry & Collinear Proofs',
    shortCode: 'G-VEC',
    description: 'Vector arithmetic, finding position vectors, ratio points along segments, proving lines are parallel or points are collinear.',
    tier: 'higher_only',
    targetGrades: ['grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['alg_brackets_expansion'],
    keyFormulas: [
      '\\vec{AB} = \\vec{OB} - \\vec{OA}',
      '\\vec{PQ} = k \\vec{QR} \\implies P, Q, R \\text{ collinear}'
    ],
    tags: ['Vectors', 'Geometric Proof', 'Ratios']
  },

  // --- PROBABILITY ---
  {
    id: 'prob_conditional',
    strandId: 'probability',
    title: 'Conditional Probability & Tree Diagrams',
    shortCode: 'P-CND',
    description: 'Selection without replacement, conditional probability $P(A|B)$, multi-branch probability trees, algebraic probability problems.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [8, 9, 10, 11],
    prerequisites: ['prob_basic_trees'],
    keyFormulas: [
      'P(A \\cap B) = P(A) \\times P(B|A)',
      'P(A|B) = \\frac{P(A \\cap B)}{P(B)}'
    ],
    tags: ['Probability', 'Tree Diagrams', 'Without Replacement']
  },
  {
    id: 'prob_venn',
    strandId: 'probability',
    title: 'Venn Diagrams & Set Notation',
    shortCode: 'P-VEN',
    description: 'Union ($\\cup$), intersection ($\\cap$), complement ($A\'$), conditional probability from Venn diagrams.',
    tier: 'foundation_higher',
    targetGrades: ['grade_5_6', 'grade_7'],
    recommendedYears: [7, 8, 9],
    prerequisites: [],
    keyFormulas: [
      'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
      'P(A\') = 1 - P(A)'
    ],
    tags: ['Sets', 'Venn', 'Notation']
  },

  // --- STATISTICS ---
  {
    id: 'stat_histograms',
    strandId: 'statistics',
    title: 'Histograms with Unequal Class Widths',
    shortCode: 'S-HST',
    description: 'Calculating and drawing frequency density, estimating medians and proportions from area under the histogram.',
    tier: 'higher_only',
    targetGrades: ['grade_7', 'grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: [],
    keyFormulas: [
      '\\text{Frequency Density} = \\frac{\\text{Frequency}}{\\text{Class Width}}',
      '\\text{Frequency} = \\text{Area of bar}'
    ],
    tags: ['Histograms', 'Frequency Density', 'Statistics']
  },

  // --- LATERAL THINKING & UKMT CHALLENGES ---
  {
    id: 'lat_ukmt_junior',
    strandId: 'lateral',
    title: 'UKMT Junior Challenge: Numerical & Logic Puzzles',
    shortCode: 'L-JMC',
    description: 'Lateral thinking, invariant properties, digit puzzles, folding geometry, and logic deduction suitable for stretching Year 7 & 8 learners.',
    tier: 'lateral_challenge',
    targetGrades: ['ukmt_junior', 'grade_7'],
    recommendedYears: [7, 8],
    prerequisites: ['num_primes_hcf'],
    keyFormulas: [
      '\\text{Parity: Even} + \\text{Odd} = \\text{Odd}',
      '\\text{Angle sum of } n\\text{-gon} = (n - 2) \\times 180^\\circ'
    ],
    tags: ['UKMT', 'JMC', 'Lateral', 'Puzzles', 'Logic']
  },
  {
    id: 'lat_ukmt_intermediate',
    strandId: 'lateral',
    title: 'UKMT Intermediate Challenge: Advanced Problem Solving',
    shortCode: 'L-IMC',
    description: 'Multi-step non-routine problems combining algebraic identities, angle chasing, combinatorial reasoning, and Olympiad style thinking.',
    tier: 'lateral_challenge',
    targetGrades: ['ukmt_intermediate', 'grade_8_9'],
    recommendedYears: [9, 10, 11],
    prerequisites: ['alg_quadratics_solve', 'geo_circle_theorems'],
    keyFormulas: [
      'a^2 - b^2 = (a-b)(a+b)',
      '\\text{Pigeonhole Principle: } \\lceil n/k \\rceil'
    ],
    tags: ['UKMT', 'IMC', 'Olympiad', 'Lateral', 'Synthesis']
  }
];
