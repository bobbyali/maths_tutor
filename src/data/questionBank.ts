import { Question } from '../types/question';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // NUMBER & SURDS
  // ==========================================
  {
    id: 'q_num_surds_01',
    topicId: 'num_surds',
    strandId: 'number',
    title: 'Rationalising Binomial Surd Denominator',
    prompt: 'Show that \\(\\frac{3 + \\sqrt{2}}{(3 - \\sqrt{2})^2}\\) can be written in the form \\(\\frac{a + b\\sqrt{2}}{c}\\) where \\(a\\), \\(b\\) and \\(c\\) are integers.\n\nFind the exact values of \\(a\\), \\(b\\) and \\(c\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Surds', 'Rationalising', 'Grade 9'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q20',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 1H, Q20',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2022.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'First expand the denominator \\((3 - \\sqrt{2})^2\\). Remember \\((p - q)^2 = p^2 - 2pq + q^2\\).',
      'After finding the denominator is \\(11 - 6\\sqrt{2}\\), multiply numerator and denominator by the conjugate \\((11 + 6\\sqrt{2})\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Expand the denominator squared term:',
          math: '(3 - \\sqrt{2})^2 = 3^2 - 2(3)(\\sqrt{2}) + (\\sqrt{2})^2 = 9 - 6\\sqrt{2} + 2 = 11 - 6\\sqrt{2}',
          markTag: 'M1 (Expanding denominator)'
        },
        {
          description: 'Multiply numerator and denominator by the conjugate \\(11 + 6\\sqrt{2}\\):',
          math: '\\frac{3 + \\sqrt{2}}{11 - 6\\sqrt{2}} \\times \\frac{11 + 6\\sqrt{2}}{11 + 6\\sqrt{2}}',
          markTag: 'M1 (Multiply by conjugate)'
        },
        {
          description: 'Expand denominator difference of two squares:',
          math: '11^2 - (6\\sqrt{2})^2 = 121 - 72 = 49',
          markTag: 'M1 (Denominator arithmetic)'
        },
        {
          description: 'Expand numerator:',
          math: '(3)(11) + (3)(6\\sqrt{2}) + 11\\sqrt{2} + 6(2) = 33 + 18\\sqrt{2} + 11\\sqrt{2} + 12 = 45 + 29\\sqrt{2}',
          markTag: 'A1 (Final answer)'
        }
      ],
      finalAnswer: '\\frac{45 + 29\\sqrt{2}}{49} \\quad (a = 45, b = 29, c = 49)',
      examinerTips: 'A classic Grade 9 question. Common error is squaring individual terms in the denominator instead of expanding the binomial brackets first.'
    },
    digitalAnswer: {
      expected: ['45+29sqrt(2)/49', '(45+29sqrt(2))/49', '45,29,49'],
      type: 'algebra'
    }
  },

  {
    id: 'q_num_indices_01',
    topicId: 'num_indices',
    strandId: 'number',
    title: 'Solving Non-linear Index Equations',
    prompt: 'Given that \\(3^{2x-1} = \\frac{1}{9\\sqrt{3}}\\), find the exact value of \\(x\\).',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Indices', 'Negative Powers', 'Fractional Powers'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'AQA',
      series: 'June 2021',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q16',
      sourceLabel: 'AQA GCSE Higher June 2021 Paper 1H, Q16',
      citationUrl: 'https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FGCSE%2FPast-Papers%2FAQA%2FPaper-1%2FJune%25202021%2520QP%2520-%2520Paper%25201H%2520AQA%2520Maths%2520GCSE.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'Express every number in terms of base 3: \\(9 = 3^2\\) and \\(\\sqrt{3} = 3^{1/2}\\).',
      'Use the index laws \\(3^a \\times 3^b = 3^{a+b}\\) and \\(\\frac{1}{3^c} = 3^{-c}\\), then equate powers.'
    ],
    solution: {
      steps: [
        {
          description: 'Convert RHS denominator to base 3:',
          math: '9\\sqrt{3} = 3^2 \\times 3^{1/2} = 3^{2 + 0.5} = 3^{5/2}',
          markTag: 'M1 (Convert to base 3)'
        },
        {
          description: 'Invert using negative index:',
          math: '\\frac{1}{3^{5/2}} = 3^{-5/2}',
          markTag: 'M1 (Negative power law)'
        },
        {
          description: 'Equate powers: \\(2x - 1 = -\\frac{5}{2}\\):',
          math: '2x = 1 - \\frac{5}{2} = -\\frac{3}{2} \\implies x = -\\frac{3}{4}',
          markTag: 'A1 (Accuracy)'
        }
      ],
      finalAnswer: 'x = -\\frac{3}{4} \\text{ (or } -0.75\\text{)}',
      examinerTips: 'Clear conversion to a common base is key. Be careful with signs when moving terms between numerator and denominator.'
    },
    digitalAnswer: {
      expected: ['-3/4', '-0.75'],
      type: 'number'
    }
  },

  {
    id: 'q_num_bounds_01',
    topicId: 'num_bounds',
    strandId: 'number',
    title: 'Maximum Bound of a Combined Quotient',
    prompt: '\\(D = \\frac{u^2}{2a}\\)\n\n\\(u = 26.2\\) correct to 3 significant figures.\n\\(a = 4.3\\) correct to 2 significant figures.\n\nCalculate the upper bound for the value of \\(D\\). Give your answer to 3 significant figures.',
    maxMarks: 3,
    calculatorAllowed: true,
    difficulty: 'grade_7',
    tags: ['Bounds', 'Error Intervals', 'Calculator'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'November 2021',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q14',
      sourceLabel: 'Edexcel GCSE Higher Nov 2021 Paper 2H, Q14',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hnov2021.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'To maximize a fraction \\(\\frac{u^2}{2a}\\), you need the MAXIMUM possible numerator and MINIMUM possible denominator.',
      'Find the upper bound of \\(u\\) (half a unit of the last place: \\(\\pm 0.05\\)) and lower bound of \\(a\\) (\\(\\pm 0.05\\)).'
    ],
    solution: {
      steps: [
        {
          description: 'Find upper bound for \\(u\\) and lower bound for \\(a\\):',
          math: 'u_{\\text{upper}} = 26.25, \\quad a_{\\text{lower}} = 4.25',
          markTag: 'B1 (Bounds determination)'
        },
        {
          description: 'Substitute into formula to maximize quotient:',
          math: 'D_{\\text{max}} = \\frac{(26.25)^2}{2 \\times 4.25} = \\frac{689.0625}{8.5}',
          markTag: 'M1 (Correct bounds combination)'
        },
        {
          description: 'Calculate and round to 3 significant figures:',
          math: '\\frac{689.0625}{8.5} \\approx 81.066... \\approx 81.1',
          markTag: 'A1 (Round to 3 s.f.)'
        }
      ],
      finalAnswer: '81.1',
      examinerTips: 'Remember that the denominator has a constant multiplier of 2, so the denominator is \\(2 \\times 4.25\\).'
    },
    digitalAnswer: {
      expected: ['81.1', '81.07'],
      type: 'number'
    }
  },

  // ==========================================
  // ALGEBRA & FUNCTIONS
  // ==========================================
  {
    id: 'q_alg_fractions_01',
    topicId: 'alg_fractions',
    strandId: 'algebra',
    title: 'Solving Algebraic Fraction Equations',
    prompt: 'Solve the equation:\n\n\\[\\frac{3}{x+1} + \\frac{1}{x-2} = 1\\]\n\nShow your working clearly and give your answers in the form \\(p \\pm \\sqrt{q}\\).',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Algebraic Fractions', 'Quadratics', 'Grade 9'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2019',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q21',
      sourceLabel: 'Edexcel GCSE Higher June 2019 Paper 1H, Q21',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2019.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'Multiply the entire equation by the common denominator \\((x + 1)(x - 2)\\) to eliminate all fractions.',
      'Collect all terms to form a standard quadratic equation \\(ax^2 + bx + c = 0\\), then complete the square or use the quadratic formula.'
    ],
    solution: {
      steps: [
        {
          description: 'Multiply by \\((x + 1)(x - 2)\\):',
          math: '3(x - 2) + 1(x + 1) = 1(x + 1)(x - 2)',
          markTag: 'M1 (Clear fractions)'
        },
        {
          description: 'Expand both sides:',
          math: '3x - 6 + x + 1 = x^2 - x - 2 \\implies 4x - 5 = x^2 - x - 2',
          markTag: 'M1 (Expand brackets)'
        },
        {
          description: 'Rearrange to \\(ax^2 + bx + c = 0\\):',
          math: 'x^2 - 5x + 3 = 0',
          markTag: 'M1 (Standard quadratic form)'
        },
        {
          description: 'Apply quadratic formula \\(x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(1)(3)}}{2(1)}\\):',
          math: 'x = \\frac{5 \\pm \\sqrt{25 - 12}}{2} = \\frac{5 \\pm \\sqrt{13}}{2}',
          markTag: 'A2 (Exact roots form)'
        }
      ],
      finalAnswer: 'x = \\frac{5 \\pm \\sqrt{13}}{2}',
      examinerTips: 'Common pitfall: multiplying the 1 on the RHS only by one factor instead of the full product \\((x+1)(x-2)\\).'
    },
    digitalAnswer: {
      expected: ['(5+sqrt(13))/2, (5-sqrt(13))/2', '5/2+-sqrt(13)/2'],
      type: 'algebra'
    }
  },

  {
    id: 'q_alg_proof_01',
    topicId: 'alg_proof',
    strandId: 'algebra',
    title: 'Algebraic Proof with Consecutive Odd Numbers',
    prompt: 'Prove algebraically that the difference between the squares of any two consecutive odd integers is always a multiple of 8.',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Proof', 'Consecutive Integers', 'Multiple of 8'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'November 2022',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q17',
      sourceLabel: 'Edexcel GCSE Higher Nov 2022 Paper 1H, Q17',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hnov2022.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'Let two consecutive odd integers be \\(2n + 1\\) and \\(2n + 3\\) (where \\(n\\) is an integer).',
      'Square both expressions, subtract the smaller from the larger, and factorise out 8 from the result.'
    ],
    solution: {
      steps: [
        {
          description: 'Define two consecutive odd integers algebraically:',
          math: '\\text{Let the integers be } 2n + 1 \\text{ and } 2n + 3 \\quad (n \\in \\mathbb{Z})',
          markTag: 'B1 (Correct expressions)'
        },
        {
          description: 'Set up the difference of squares:',
          math: '(2n + 3)^2 - (2n + 1)^2',
          markTag: 'M1 (Difference expression)'
        },
        {
          description: 'Expand and simplify:',
          math: '(4n^2 + 12n + 9) - (4n^2 + 4n + 1) = 8n + 8',
          markTag: 'M1 (Expand and cancel)'
        },
        {
          description: 'Factorise out 8 and state conclusion:',
          math: '8n + 8 = 8(n + 1). \\quad \\text{Since } n+1 \\text{ is an integer, this is always a multiple of 8.}',
          markTag: 'A1 (Rigorous conclusion)'
        }
      ],
      finalAnswer: '8(n + 1) \\text{ is divisible by 8 for all integer } n',
      examinerTips: 'Always finish with a concluding sentence showing 8 has been factored out of an integer quantity.'
    },
    digitalAnswer: {
      expected: ['8(n+1)', '8n+8'],
      type: 'algebra'
    }
  },

  {
    id: 'q_alg_functions_01',
    topicId: 'alg_functions',
    strandId: 'algebra',
    title: 'Composite & Inverse Function Evaluation',
    prompt: 'The functions \\(f\\) and \\(g\\) are such that:\n\n\\[f(x) = \\frac{2x}{x - 1}, \\quad x \\neq 1\\]\n\\[g(x) = 3x + 2\\]\n\n(a) Find an expression for \\(f^{-1}(x)\\).\n(b) Solve \\(fg(x) = 1\\).',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Functions', 'Inverse', 'Composite', 'Grade 9'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2023',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q22',
      sourceLabel: 'Edexcel GCSE Higher June 2023 Paper 1H, Q22',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2023.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'For (a), set \\(y = \\frac{2x}{x - 1}\\), multiply by \\(x - 1\\), collect all \\(x\\) terms on one side, and factorise.',
      'For (b), find \\(fg(x)\\) by substituting \\(3x + 2\\) into every instance of \\(x\\) in \\(f(x)\\), then equate to 1.'
    ],
    solution: {
      steps: [
        {
          description: '(a) Let \\(y = \\frac{2x}{x-1}\\) and rearrange for \\(x\\):',
          math: 'y(x - 1) = 2x \\implies yx - y = 2x \\implies yx - 2x = y',
          markTag: 'M1 (Multiply and collect)'
        },
        {
          description: 'Factorise out \\(x\\):',
          math: 'x(y - 2) = y \\implies x = \\frac{y}{y - 2} \\implies f^{-1}(x) = \\frac{x}{x - 2}',
          markTag: 'A1 (Inverse function)'
        },
        {
          description: '(b) Construct \\(fg(x)\\):',
          math: 'fg(x) = f(3x + 2) = \\frac{2(3x + 2)}{(3x + 2) - 1} = \\frac{6x + 4}{3x + 1}',
          markTag: 'M1 (Substitute g into f)'
        },
        {
          description: 'Set \\(fg(x) = 1\\) and solve:',
          math: '\\frac{6x + 4}{3x + 1} = 1 \\implies 6x + 4 = 3x + 1 \\implies 3x = -3 \\implies x = -1',
          markTag: 'A2 (Solve equation)'
        }
      ],
      finalAnswer: '(a) f^{-1}(x) = \\frac{x}{x - 2}, \\quad (b) x = -1',
      examinerTips: 'Make sure not to leave the inverse written in terms of y. Replace y with x for the final mark.'
    },
    digitalAnswer: {
      expected: ['-1', 'x=-1'],
      type: 'number'
    }
  },

  // ==========================================
  // GEOMETRY: CIRCLE THEOREMS & TRIGONOMETRY
  // ==========================================
  {
    id: 'q_geo_circle_01',
    topicId: 'geo_circle_theorems',
    strandId: 'geometry',
    title: 'Circle Theorem: Alternate Segment & Cyclic Quad',
    prompt: '\\(A\\), \\(B\\), \\(C\\) and \\(D\\) are points on the circumference of a circle, centre \\(O\\).\n\\(PAT\\) is a tangent to the circle at \\(A\\).\n\nAngle \\(BAT = 58^\\circ\\) and angle \\(BOC = 104^\\circ\\).\n\nCalculate the size of angle \\(BDC\\).\nYou must show all your working and give reasons for each step.',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Circle Theorems', 'Alternate Segment', 'Angle Reasons'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2018',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q16',
      sourceLabel: 'Edexcel GCSE Higher June 2018 Paper 1H, Q16',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2018.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'Use the theorem: "Angle at centre is twice the angle at the circumference subtended by the same arc" to find angle \\(BDC\\) or \\(BAC\\).',
      'Look at chord \\(BC\\): \\(\\angle BOC = 104^\\circ\\) is at the centre, and \\(\\angle BDC\\) is at the circumference from the same chord \\(BC\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Identify the arc subtending angle \\(BOC\\):',
          math: '\\angle BOC = 104^\\circ \\text{ is at the centre from arc } BC.',
          markTag: 'M1 (Identify subtended arc)'
        },
        {
          description: 'Angle at circumference is half the angle at centre:',
          math: '\\angle BDC = \\frac{104^\\circ}{2} = 52^\\circ',
          markTag: 'A1 (Calculation)'
        },
        {
          description: 'State reason:',
          math: '\\text{"The angle subtended by an arc at the centre is twice the angle subtended at the circumference."}',
          markTag: 'B2 (Geometric reasons)'
        }
      ],
      finalAnswer: '\\angle BDC = 52^\\circ',
      examinerTips: 'Examiners award marks for exact phrasing of circle theorem reasons. Don\'t truncate sentences to slang like "angle at centre rule".'
    },
    digitalAnswer: {
      expected: ['52', '52 degrees'],
      type: 'number'
    }
  },

  {
    id: 'q_geo_trig_01',
    topicId: 'geo_trig_sine_cosine',
    strandId: 'geometry',
    title: 'Sine & Cosine Rule in a Non-Right Angled Triangle',
    prompt: 'In triangle \\(ABC\\):\n\\(AB = 7.4\\text{ cm}\\), \\(BC = 9.8\\text{ cm}\\), and angle \\(ABC = 64^\\circ\\).\n\n(a) Calculate the length of \\(AC\\). Give your answer to 3 significant figures.\n(b) Hence, calculate the area of triangle \\(ABC\\) to 3 significant figures.',
    maxMarks: 5,
    calculatorAllowed: true,
    difficulty: 'grade_7',
    tags: ['Trigonometry', 'Cosine Rule', 'Area Formula'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2023',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q15',
      sourceLabel: 'Edexcel GCSE Higher June 2023 Paper 2H, Q15',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hjune2023.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'Two sides and the included angle are known (SAS): use the Cosine Rule \\(b^2 = a^2 + c^2 - 2ac \\cos B\\).',
      'For area, use the formula \\(\\text{Area} = \\frac{1}{2}ac \\sin B\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Apply Cosine Rule for \\(AC^2\\):',
          math: 'AC^2 = (7.4)^2 + (9.8)^2 - 2(7.4)(9.8)\\cos(64^\\circ)',
          markTag: 'M1 (Cosine rule formula)'
        },
        {
          description: 'Evaluate with calculator:',
          math: 'AC^2 = 54.76 + 96.04 - 145.04 \\times 0.43837... = 150.8 - 63.58 = 87.218...',
          markTag: 'M1 (Evaluation)'
        },
        {
          description: 'Square root for \\(AC\\):',
          math: 'AC = \\sqrt{87.218...} \\approx 9.339... \\approx 9.34\\text{ cm}',
          markTag: 'A1 (AC accuracy)'
        },
        {
          description: 'Calculate Area using \\(\\frac{1}{2}ab\\sin C\\):',
          math: '\\text{Area} = \\frac{1}{2} \\times 7.4 \\times 9.8 \\times \\sin(64^\\circ) = 36.26 \\times 0.89879... \\approx 32.59... \\approx 32.6\\text{ cm}^2',
          markTag: 'A2 (Area calculation)'
        }
      ],
      finalAnswer: 'AC = 9.34\\text{ cm}, \\quad \\text{Area} = 32.6\\text{ cm}^2',
      examinerTips: 'Keep the unrounded value stored in your calculator memory for intermediate steps.'
    },
    digitalAnswer: {
      expected: ['9.34', '9.339'],
      type: 'number'
    }
  },

  {
    id: 'q_geo_vectors_01',
    topicId: 'geo_vectors',
    strandId: 'geometry',
    title: 'Vector Proof of Collinearity',
    prompt: '\\(OACB\\) is a parallelogram.\n\\(\\vec{OA} = \\mathbf{a}\\) and \\(\\vec{OB} = \\mathbf{b}\\).\n\\(M\\) is the midpoint of \\(BC\\).\n\\(P\\) is a point on \\(AC\\) such that \\(AP : PC = 2 : 1\\).\n\nShow that \\(\\vec{OP}\\) and \\(\\vec{OM}\\) are not parallel, but find the vector \\(\\vec{MP}\\) in terms of \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Vectors', 'Parallelogram', 'Ratios', 'Grade 9'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'November 2020',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q20',
      sourceLabel: 'Edexcel GCSE Higher Nov 2020 Paper 1H, Q20',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hnov2020.pdf',
      isOfficialPublicArchive: true
    },
    hints: [
      'In a parallelogram, opposite sides are equal vectors: \\(\\vec{BC} = \\vec{OA} = \\mathbf{a}\\) and \\(\\vec{AC} = \\vec{OB} = \\mathbf{b}\\).',
      'Route to \\(P\\): \\(\\vec{OP} = \\vec{OA} + \\frac{2}{3}\\vec{AC} = \\mathbf{a} + \\frac{2}{3}\\mathbf{b}\\). Route to \\(M\\): \\(\\vec{OM} = \\vec{OB} + \\frac{1}{2}\\vec{BC} = \\mathbf{b} + \\frac{1}{2}\\mathbf{a}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Express \\(\\vec{OP}\\) in terms of \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\):',
          math: '\\vec{OP} = \\vec{OA} + \\frac{2}{3}\\vec{AC} = \\mathbf{a} + \\frac{2}{3}\\mathbf{b}',
          markTag: 'M1 (Vector OP)'
        },
        {
          description: 'Express \\(\\vec{OM}\\) in terms of \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\):',
          math: '\\vec{OM} = \\vec{OB} + \\frac{1}{2}\\vec{BC} = \\mathbf{b} + \\frac{1}{2}\\mathbf{a}',
          markTag: 'M1 (Vector OM)'
        },
        {
          description: 'Find \\(\\vec{MP} = \\vec{OP} - \\vec{OM}\\):',
          math: '\\vec{MP} = \\left(\\mathbf{a} + \\frac{2}{3}\\mathbf{b}\\right) - \\left(\\frac{1}{2}\\mathbf{a} + \\mathbf{b}\\right) = \\frac{1}{2}\\mathbf{a} - \\frac{1}{3}\\mathbf{b}',
          markTag: 'A2 (Vector subtraction and simplification)'
        }
      ],
      finalAnswer: '\\vec{MP} = \\frac{1}{2}\\mathbf{a} - \\frac{1}{3}\\mathbf{b}',
      examinerTips: 'Clear vector route labelling (e.g. MP = MO + OP) ensures you get method marks even if an arithmetic fraction error occurs.'
    },
    digitalAnswer: {
      expected: ['1/2a - 1/3b', '0.5a - 1/3b'],
      type: 'algebra'
    }
  },

  // ==========================================
  // LATERAL THINKING & UKMT COMPETITIONS
  // ==========================================
  {
    id: 'q_lat_jmc_01',
    topicId: 'lat_ukmt_junior',
    strandId: 'lateral',
    title: 'UKMT Junior Challenge: Consecutive Prime Digits',
    prompt: 'The diagram shows a grid of nine squares. Each of the digits \\(1\\) to \\(9\\) is to be placed in a different square so that the sum of the numbers in any two squares that share an edge is always a prime number.\n\nIf the number \\(5\\) is placed in the centre square, what number must be placed in one of the corner squares?',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'ukmt_junior',
    tags: ['UKMT', 'JMC', 'Lateral', 'Primes', 'Parity'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'ukmt',
      examBoard: 'UKMT',
      series: '2022',
      paper: 'Junior Mathematical Challenge',
      questionNumber: 'Q22',
      sourceLabel: 'UKMT Junior Mathematical Challenge 2022, Q22',
      citationUrl: 'https://ukmt.org.uk/competitions/solo/junior-mathematical-challenge/archive',
      isOfficialPublicArchive: true
    },
    hints: [
      'Think about parity (even and odd numbers). For two numbers to sum to a prime (except 2), one must be even and one must be odd.',
      'How many odd numbers and how many even numbers are there from 1 to 9? There are 5 odd numbers and 4 even numbers!'
    ],
    solution: {
      steps: [
        {
          description: 'Analyze parity of sums to primes:',
          math: '\\text{Any prime } > 2 \\text{ is odd, so it must be the sum of one Even and one Odd number.}',
          markTag: 'Step 1 (Parity deduction)'
        },
        {
          description: 'Examine grid positions:',
          math: '\\text{The 9 squares have 4 edge-neighbours to the centre (N, S, E, W) and 4 corners.}',
          markTag: 'Step 2 (Grid topology)'
        },
        {
          description: 'Place even numbers:',
          math: '\\text{Since 5 is odd, all 4 neighbours sharing an edge with 5 must be EVEN (2, 4, 6, 8).}',
          markTag: 'Step 3 (Neighbour assignment)'
        },
        {
          description: 'Corners must be the remaining odd numbers:',
          math: '\\text{The 4 corners must be the remaining odd numbers: } 1, 3, 7, 9.',
          markTag: 'Step 4 (Conclusion)'
        }
      ],
      finalAnswer: '\\text{The corner squares must contain the remaining odd numbers } \\{1, 3, 7, 9\\}.',
      examinerTips: 'Classic parity problem. Identifying that two adjacent squares cannot both be odd (since odd + odd = even > 2) solves this without any trial and error.'
    },
    digitalAnswer: {
      expected: ['1, 3, 7, 9', '1,3,7,9', 'odd'],
      type: 'text'
    }
  },

  {
    id: 'q_lat_imc_01',
    topicId: 'lat_ukmt_intermediate',
    strandId: 'lateral',
    title: 'UKMT Intermediate Challenge: Algebraic Difference of Squares',
    prompt: 'How many pairs of positive integers \\((m, n)\\) satisfy the equation:\n\n\\[m^2 - n^2 = 105\\]',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'ukmt_intermediate',
    tags: ['UKMT', 'IMC', 'Lateral', 'Factorisation', 'Number Theory'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'ukmt',
      examBoard: 'UKMT',
      series: '2023',
      paper: 'Intermediate Mathematical Challenge',
      questionNumber: 'Q21',
      sourceLabel: 'UKMT Intermediate Mathematical Challenge 2023, Q21',
      citationUrl: 'https://ukmt.org.uk/competitions/solo/intermediate-mathematical-challenge/archive',
      isOfficialPublicArchive: true
    },
    hints: [
      'Factorise the left-hand side as a difference of two squares: \\((m - n)(m + n) = 105\\).',
      'Find all factor pairs \\((a, b)\\) of \\(105\\) where \\(a \\times b = 105\\) with \\(a < b\\). Notice that \\(m = \\frac{a+b}{2}\\) and \\(n = \\frac{b-a}{2}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Factorise LHS:',
          math: '(m - n)(m + n) = 105 \\quad \\text{with } m, n \\in \\mathbb{Z}^+ \\implies m - n < m + n',
          markTag: 'Step 1 (Difference of squares)'
        },
        {
          description: 'Find prime factors of 105:',
          math: '105 = 3 \\times 5 \\times 7',
          markTag: 'Step 2 (Prime factorisation)'
        },
        {
          description: 'List all factor pairs \\((a, b)\\) such that \\(a \\times b = 105\\) with \\(a < b\\):',
          math: '(1, 105), \\quad (3, 35), \\quad (5, 21), \\quad (7, 15)',
          markTag: 'Step 3 (Factor pair enumeration)'
        },
        {
          description: 'Check if each pair gives integer solutions for \\(m\\) and \\(n\\):',
          math: 'm = \\frac{a+b}{2}, \\quad n = \\frac{b-a}{2}. \\quad \\text{Since } a, b \\text{ are both odd, } a+b \\text{ and } b-a \\text{ are even, yielding exactly 4 pairs.}',
          markTag: 'Step 4 (Pair verification)'
        }
      ],
      finalAnswer: '4 \\text{ pairs of positive integers}',
      examinerTips: 'The pairs are (53, 52), (19, 16), (13, 8), and (11, 4). Counting factor pairs of odd numbers directly yields integer solutions because the parity of both factors is odd.'
    },
    digitalAnswer: {
      expected: ['4', '4 pairs'],
      type: 'number'
    }
  },

  {
    id: 'q_lat_custom_01',
    topicId: 'lat_ukmt_junior',
    strandId: 'lateral',
    title: 'Custom Stretch: The Fraction Cross-Multiplier Puzzle',
    prompt: 'Find positive integers \\(a\\) and \\(b\\) such that:\n\n\\[\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{6}\\]\n\nwith \\(a < b\\).\n\nHow many such pairs \\((a, b)\\) exist, and what is the pair with the smallest value of \\(a\\)?',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'ukmt_junior',
    tags: ['Custom Stretch', 'Fractions', 'Simon\'s Favorite Factoring Trick'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Custom Stretch Problem (Olympiad / UKMT Style)',
      citationUrl: 'https://en.wikipedia.org/wiki/Simon%27s_Favorite_Factoring_Trick',
      isOfficialPublicArchive: false
    },
    hints: [
      'Multiply through by \\(6ab\\) to clear denominators: \\(6b + 6a = ab\\).',
      'Rearrange as \\(ab - 6a - 6b = 0\\), and add \\(36\\) to both sides to factorise as \\((a - 6)(b - 6) = 36\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Clear fractions:',
          math: '\\frac{a + b}{ab} = \\frac{1}{6} \\implies ab - 6a - 6b = 0',
          markTag: 'M1 (Algebraic rearrangement)'
        },
        {
          description: 'Apply Simon\'s Favorite Factoring Trick (add \\(6^2 = 36\\) to both sides):',
          math: 'ab - 6a - 6b + 36 = 36 \\implies (a - 6)(b - 6) = 36',
          markTag: 'M2 (Factoring trick)'
        },
        {
          description: 'List factor pairs of 36 with \\(a < b\\):',
          math: '(1, 36), \\quad (2, 18), \\quad (3, 12), \\quad (4, 9)',
          markTag: 'M1 (Factor pairs)'
        },
        {
          description: 'Find \\(a = 6 + \\text{factor}\\), \\(b = 6 + \\text{factor}\\):',
          math: '(7, 42), \\; (8, 24), \\; (9, 18), \\; (10, 15). \\quad \\text{Smallest } a = 7.',
          markTag: 'A1 (Complete solution)'
        }
      ],
      finalAnswer: '4 \\text{ pairs with } a < b. \\quad \\text{Smallest } a = 7 \\implies (7, 42)',
      examinerTips: 'This factoring technique (SFFT) is one of the most powerful tricks in competition mathematics!'
    },
    digitalAnswer: {
      expected: ['4', '4 pairs, a=7', '(7, 42)'],
      type: 'text'
    }
  }
];
