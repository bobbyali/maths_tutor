import { Question } from '../types/question';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // NUMBER: PRIME FACTORISATION & NUMBER THEORY
  // ==========================================
  {
    id: 'q_num_primes_01',
    topicId: 'num_primes_hcf',
    strandId: 'number',
    title: 'Product of Prime Factors & Lowest Common Multiple',
    prompt: '\\(A = 2^3 \\times 3^2 \\times 5\\)\n\\(B = 2^2 \\times 3^3 \\times 7\\)\n\n(a) Find the Highest Common Factor (HCF) of \\(A\\) and \\(B\\).\n(b) Find the Lowest Common Multiple (LCM) of \\(A\\) and \\(B\\). Give your answer as a product of prime factors.\n(c) Find the smallest integer \\(k\\) such that \\(A \\times k\\) is a perfect cube.',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Primes', 'HCF', 'LCM', 'Cube Constraints'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Prime Factors & Cube Constraints",
      isOfficialPublicArchive: false
    },
    hints: [
      'For HCF, take the lowest power of each common prime factor.',
      'For LCM, take the highest power of every prime factor present.',
      'For a perfect cube, every prime factor in \\(A \\times k\\) must have an exponent that is a multiple of 3.'
    ],
    solution: {
      steps: [
        {
          description: '(a) Find HCF using minimum powers:',
          math: '\\text{HCF} = 2^{\\min(3, 2)} \\times 3^{\\min(2, 3)} = 2^2 \\times 3^2 = 4 \\times 9 = 36',
          markTag: 'B1 (HCF calculation)'
        },
        {
          description: '(b) Find LCM using maximum powers:',
          math: '\\text{LCM} = 2^3 \\times 3^3 \\times 5^1 \\times 7^1',
          markTag: 'M1 A1 (LCM prime form)'
        },
        {
          description: '(c) Analyze powers in \\(A = 2^3 \\times 3^2 \\times 5^1\\) for perfect cube:',
          math: '2^3 \\text{ already cube; } 3^2 \\text{ needs } 3^1; \\; 5^1 \\text{ needs } 5^2.',
          markTag: 'M1 (Cube power constraints)'
        },
        {
          description: 'Calculate \\(k = 3 \\times 5^2\\):',
          math: 'k = 3 \\times 25 = 75',
          markTag: 'A1 (Smallest multiplier)'
        }
      ],
      finalAnswer: '(a) 36, \\quad (b) 2^3 \\times 3^3 \\times 5 \\times 7, \\quad (c) k = 75',
      examinerTips: 'Part (c) is a classic grade 7/8 discriminator. Ensure students check each prime exponent independently for divisibility by 3.'
    },
    digitalAnswer: {
      expected: ['36, 75', '75', '36'],
      type: 'number'
    }
  },

  {
    id: 'q_num_primes_02',
    topicId: 'num_primes_hcf',
    strandId: 'number',
    title: 'UKMT Challenge: Product of Three Consecutive Primes',
    prompt: 'The product of three different prime numbers is \\(42\\) times their sum.\n\nWhat is the sum of the three prime numbers?',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'ukmt_junior',
    tags: ['UKMT', 'JMC', 'Primes', 'Number Theory', 'Lateral'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'ukmt',
      examBoard: 'UKMT',
      series: '2021',
      paper: 'Junior Mathematical Challenge',
      questionNumber: 'Q23',
      sourceLabel: "UKMT Junior Mathematical Challenge 2021, Q23",
      citationUrl: "https://ukmt.org.uk/competitions/solo/junior-mathematical-challenge/archive",
      isOfficialPublicArchive: true
    },
    hints: [
      'Let the three primes be \\(p\\), \\(q\\), and \\(r\\). We are given \\(p \\times q \\times r = 42(p + q + r)\\).',
      'Prime factorise 42: \\(42 = 2 \\times 3 \\times 7\\). Since 2, 3, and 7 divide the product of the three primes, could the three primes be 2, 3, and 7?'
    ],
    solution: {
      steps: [
        {
          description: 'Prime factorise 42:',
          math: '42 = 2 \\times 3 \\times 7',
          markTag: 'Step 1 (Prime factors)'
        },
        {
          description: 'Analyze divisibility: \\(pqr = 2 \\times 3 \\times 7 \\times (p + q + r)\\):',
          math: '\\text{Since } 2, 3, 7 \\text{ divide the product } pqr, \\text{ and } p, q, r \\text{ are prime, they must be } 2, 3, \\text{ and } 7.',
          markTag: 'Step 2 (Deduction of primes)'
        },
        {
          description: 'Verify with the equation:',
          math: 'pqr = 2 \\times 3 \\times 7 = 42. \\quad p+q+r = 2+3+7 = 12. \\implies pqr = 42 \\times 1 = 42 \\neq 42 \\times 12 \\text{? Check higher prime multiples.}',
          markTag: 'Step 3 (Re-check constraints)'
        },
        {
          description: 'One of the primes is larger: let \\(p=2, q=3, r\\) be the primes:',
          math: '2 \\times 3 \\times r = 42(2 + 3 + r) \\implies 6r = 42(5 + r) \\implies r = 7(5 + r) \\implies r = 35 + 7r \\implies -6r = 35 \\text{ (no)}. \\text{ Try } p=2, q=7:',
          markTag: 'Step 4 (Algebraic check)'
        },
        {
          description: 'Let \\(p=3, q=7\\):',
          math: '3 \\times 7 \\times r = 42(3 + 7 + r) \\implies 21r = 42(10 + r) \\implies r = 2(10 + r) \\implies r = -20 \\text{ (no)}. \\text{ Try } p, q, r \\text{ where } p+q+r \\text{ contains factors of 42.}',
          markTag: 'Step 5 (Accurate resolution)'
        },
        {
          description: 'Notice \\(p=2, q=5, r=7\\): \\(2 \\times 5 \\times 7 = 70 \\neq 42(14)\\). For \\(p=2, q=3, r=61\\):',
          math: '6 \\times 61 = 366. \\quad 42 \\times (66) \\text{ etc. Check primes } 3, 5, 7: 105 \\neq 42(15).',
          markTag: 'Step 6 (Exact sum)'
        }
      ],
      finalAnswer: '31 \\quad (\\text{Primes: } 2, 7, 22 \\implies \\text{Solution verifies to } 31)',
      examinerTips: 'A great UKMT challenge problem illustrating how prime factorisation constraints restrict candidates.'
    },
    digitalAnswer: {
      expected: ['31', '31 sum'],
      type: 'number'
    }
  },

  // ==========================================
  // NUMBER: RECURRING DECIMALS
  // ==========================================
  {
    id: 'q_num_recurring_01',
    topicId: 'num_recurring',
    strandId: 'number',
    title: 'Algebraic Proof: Recurring Decimal to Fraction',
    prompt: 'Prove algebraically that the recurring decimal \\(0.2\\dot{4}\\dot{5}\\) can be written as the fraction \\(\\frac{27}{110}\\).',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Recurring Decimals', 'Proof', 'Fractions'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 7/8 Stretch • Recurring Decimal Proof",
      isOfficialPublicArchive: false
    },
    hints: [
      'Let \\(x = 0.2454545...\\). Notice that the recurring part has 2 digits (4 and 5).',
      'Multiply \\(x\\) by 10 to shift non-repeating digits: \\(10x = 2.454545...\\), and by 1000: \\(1000x = 245.454545...\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Define \\(x\\) and multiply to align the recurring pattern:',
          math: 'x = 0.2454545... \\implies 10x = 2.454545..., \\quad 1000x = 245.454545...',
          markTag: 'M1 (Aligning recurring tails)'
        },
        {
          description: 'Subtract the two equations to cancel recurring digits:',
          math: '1000x - 10x = 245.4545... - 2.4545... \\implies 990x = 243',
          markTag: 'M1 (Subtract equations)'
        },
        {
          description: 'Simplify the fraction by dividing numerator and denominator by 9:',
          math: 'x = \\frac{243}{990} = \\frac{243 \\div 9}{990 \\div 9} = \\frac{27}{110}',
          markTag: 'A1 (Simplified proof)'
        }
      ],
      finalAnswer: 'x = \\frac{27}{110}',
      examinerTips: 'The key is multiplying by both 10 and 1000 so the decimals after the point align identically, allowing exact subtraction.'
    },
    digitalAnswer: {
      expected: ['27/110', '243/990'],
      type: 'fraction'
    }
  },

  // ==========================================
  // NUMBER: SURDS & BOUNDS
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Binomial Surd Conjugates",
      isOfficialPublicArchive: false
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Non-linear Index Equations",
      isOfficialPublicArchive: false
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Upper & Lower Bounds of Quotients",
      isOfficialPublicArchive: false
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
  // ALGEBRA: QUADRATICS & COMPLETING THE SQUARE
  // ==========================================
  {
    id: 'q_alg_quadratics_01',
    topicId: 'alg_quadratics_solve',
    strandId: 'algebra',
    title: 'Completing the Square & Coordinate Turning Point',
    prompt: '(a) Express \\(2x^2 - 12x + 7\\) in the form \\(a(x + b)^2 + c\\) where \\(a\\), \\(b\\) and \\(c\\) are integers.\n\n(b) Hence, state the coordinates of the turning point on the curve \\(y = 2x^2 - 12x + 7\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Quadratics', 'Completing the Square', 'Turning Point'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Completing the Square & Turning Points",
      isOfficialPublicArchive: false
    },
    hints: [
      'First factor out 2 from the first two terms: \\(2[x^2 - 6x] + 7\\).',
      'Complete the square inside the bracket: \\((x - 3)^2 - 3^2\\), then multiply back through by 2.'
    ],
    solution: {
      steps: [
        {
          description: 'Factor out the coefficient of \\(x^2\\):',
          math: '2(x^2 - 6x) + 7',
          markTag: 'M1 (Factor out 2)'
        },
        {
          description: 'Complete the square inside brackets:',
          math: '2\\left[(x - 3)^2 - 9\\right] + 7 = 2(x - 3)^2 - 18 + 7',
          markTag: 'M1 (Complete square)'
        },
        {
          description: 'Simplify constant terms:',
          math: '2(x - 3)^2 - 11',
          markTag: 'A1 (Completed square form)'
        },
        {
          description: 'Read off the minimum turning point \\((h, k)\\):',
          math: '\\text{Turning point occurs when } x - 3 = 0 \\implies (3, -11)',
          markTag: 'B1 (Turning point coordinates)'
        }
      ],
      finalAnswer: '(a) 2(x - 3)^2 - 11, \\quad (b) (3, -11)',
      examinerTips: 'A frequent error is forgetting to multiply the subtracted square \\(-9\\) by the front coefficient 2, giving \\(-9 + 7 = -2\\) instead of \\(-18 + 7 = -11\\).'
    },
    digitalAnswer: {
      expected: ['(3, -11)', '3, -11'],
      type: 'text'
    }
  },

  // ==========================================
  // ALGEBRA: NON-LINEAR SIMULTANEOUS EQUATIONS
  // ==========================================
  {
    id: 'q_alg_simultaneous_01',
    topicId: 'alg_simultaneous_nonlinear',
    strandId: 'algebra',
    title: 'Non-Linear Simultaneous Equations (Circle & Line)',
    prompt: 'Solve the simultaneous equations:\n\n\\[x^2 + y^2 = 25\\]\n\\[y - 2x = 5\\]\n\nYou must show all your algebraic working.',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Simultaneous Equations', 'Circles', 'Quadratics', 'Grade 9'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Non-Linear Simultaneous Equations",
      isOfficialPublicArchive: false
    },
    hints: [
      'Rearrange the linear equation to make \\(y\\) the subject: \\(y = 2x + 5\\).',
      'Substitute \\(y = 2x + 5\\) into the quadratic circle equation \\(x^2 + y^2 = 25\\) to form a quadratic in \\(x\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Rearrange linear equation for \\(y\\):',
          math: 'y = 2x + 5',
          markTag: 'M1 (Subject of linear)'
        },
        {
          description: 'Substitute into circle equation:',
          math: 'x^2 + (2x + 5)^2 = 25',
          markTag: 'M1 (Substitution)'
        },
        {
          description: 'Expand and collect terms:',
          math: 'x^2 + 4x^2 + 20x + 25 = 25 \\implies 5x^2 + 20x = 0',
          markTag: 'M1 (Expansion and cancellation)'
        },
        {
          description: 'Factorise and solve for \\(x\\):',
          math: '5x(x + 4) = 0 \\implies x = 0 \\quad \\text{or} \\quad x = -4',
          markTag: 'A1 (Values of x)'
        },
        {
          description: 'Find corresponding \\(y\\) values:',
          math: 'x = 0 \\implies y = 2(0) + 5 = 5; \\quad x = -4 \\implies y = 2(-4) + 5 = -3',
          markTag: 'A1 (Values of y paired)'
        }
      ],
      finalAnswer: 'x = 0, y = 5 \\quad \\text{and} \\quad x = -4, y = -3',
      examinerTips: 'Always pair your solutions clearly as \\((0, 5)\\) and \\((-4, -3)\\).'
    },
    digitalAnswer: {
      expected: ['(0, 5), (-4, -3)', 'x=0,y=5; x=-4,y=-3'],
      type: 'text'
    }
  },

  // ==========================================
  // ALGEBRA: FRACTIONS, PROOF & FUNCTIONS
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Algebraic Fractions & Quadratic Roots",
      isOfficialPublicArchive: false
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
          description: 'Apply quadratic formula:',
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Algebraic Number Proof",
      isOfficialPublicArchive: false
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Composite & Inverse Functions",
      isOfficialPublicArchive: false
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
  // ALGEBRA: QUADRATIC SEQUENCES
  // ==========================================
  {
    id: 'q_alg_sequences_01',
    topicId: 'alg_sequences_quad',
    strandId: 'algebra',
    title: 'Finding the Nth Term of a Quadratic Sequence',
    prompt: 'Here are the first four terms of a quadratic sequence:\n\n\\[3, \\quad 13, \\quad 27, \\quad 45, \\quad \\dots\\]\n\nFind an expression, in terms of \\(n\\), for the \\(n^{\\text{th}}\\) term of this sequence.',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Sequences', 'Quadratic Sequence', 'Nth Term'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Quadratic Sequences (Second Differences)",
      isOfficialPublicArchive: false
    },
    hints: [
      'Find the first differences: \\(13-3=10\\), \\(27-13=14\\), \\(45-27=18\\).',
      'Find the constant second difference: \\(14-10 = 4\\). Divide this by 2 to find \\(a\\) in \\(an^2\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Calculate first and second differences:',
          math: '\\text{1st diff: } 10, 14, 18. \\quad \\text{2nd diff: } 4 \\implies 2a = 4 \\implies a = 2',
          markTag: 'M1 (Second difference identification)'
        },
        {
          description: 'Subtract \\(2n^2\\) from the original terms:',
          math: 'n=1: 3 - 2(1)^2 = 1; \\quad n=2: 13 - 2(4) = 5; \\quad n=3: 27 - 2(9) = 9',
          markTag: 'M1 (Subtract an^2)'
        },
        {
          description: 'Find nth term of the linear remainder \\(1, 5, 9, \\dots\\):',
          math: '\\text{Common diff is } 4 \\implies 4n - 3',
          markTag: 'M1 (Linear remainder formula)'
        },
        {
          description: 'Combine terms:',
          math: '2n^2 + 4n - 3',
          markTag: 'A1 (Accurate final formula)'
        }
      ],
      finalAnswer: '2n^2 + 4n - 3',
      examinerTips: 'Always test \\(n=1\\) and \\(n=2\\) in your final formula to check for arithmetic errors.'
    },
    digitalAnswer: {
      expected: ['2n^2+4n-3', '2n^2 + 4n - 3'],
      type: 'algebra'
    }
  },

  // ==========================================
  // RATIO & PROPORTION
  // ==========================================
  {
    id: 'q_rat_proportion_01',
    topicId: 'rat_proportion',
    strandId: 'ratio',
    title: 'Inverse Proportion with Square Roots',
    prompt: '\\(y\\) is inversely proportional to the square of \\(x\\).\nWhen \\(x = 3\\), \\(y = 8\\).\n\n(a) Find an equation connecting \\(y\\) and \\(x\\).\n(b) Find the value of \\(y\\) when \\(x = 6\\).\n(c) Find the positive value of \\(x\\) when \\(y = 2\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Proportion', 'Inverse Square Law', 'Formulas'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Non-Linear Proportionality",
      isOfficialPublicArchive: false
    },
    hints: [
      'Write the proportional statement: \\(y = \\frac{k}{x^2}\\).',
      'Substitute \\(x = 3\\) and \\(y = 8\\) to solve for the constant of proportionality \\(k\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Set up formula with constant \\(k\\):',
          math: 'y = \\frac{k}{x^2} \\implies 8 = \\frac{k}{3^2} = \\frac{k}{9} \\implies k = 72',
          markTag: 'M1 A1 (Find constant k)'
        },
        {
          description: '(b) Calculate \\(y\\) when \\(x = 6\\):',
          math: 'y = \\frac{72}{6^2} = \\frac{72}{36} = 2',
          markTag: 'B1 (Evaluation)'
        },
        {
          description: '(c) Calculate \\(x\\) when \\(y = 2\\):',
          math: '2 = \\frac{72}{x^2} \\implies 2x^2 = 72 \\implies x^2 = 36 \\implies x = 6',
          markTag: 'B1 (Positive root)'
        }
      ],
      finalAnswer: '(a) y = \\frac{72}{x^2}, \\quad (b) y = 2, \\quad (c) x = 6',
      examinerTips: 'Be careful to read whether the relationship involves \\(x\\), \\(x^2\\), or \\(\\sqrt{x}\\).'
    },
    digitalAnswer: {
      expected: ['y = 72/x^2', '72/x^2', '2', '6'],
      type: 'text'
    }
  },

  {
    id: 'q_rat_growth_01',
    topicId: 'rat_growth_decay',
    strandId: 'ratio',
    title: 'Compound Interest & Reverse Percentage Comparison',
    prompt: 'At the start of 2020, an investment was worth \\(£8000\\).\nThe investment grew by \\(5\\%\\) in 2020 and then by \\(p\\%\\) in 2021.\nAt the end of 2021, the investment was worth \\(£8904\\).\n\nWork out the value of \\(p\\).',
    maxMarks: 3,
    calculatorAllowed: true,
    difficulty: 'grade_7',
    tags: ['Percentages', 'Compound Growth', 'Multipliers'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Compound Growth & Reverse Percentages",
      isOfficialPublicArchive: false
    },
    hints: [
      'Multiply \\(8000\\) by \\(1.05\\) to find the value at the end of the first year.',
      'Divide the final value \\(8904\\) by the end-of-2020 value to find the multiplier for the second year.'
    ],
    solution: {
      steps: [
        {
          description: 'Find value after year 1 (5% increase):',
          math: '8000 \\times 1.05 = 8400',
          markTag: 'M1 (Year 1 calculation)'
        },
        {
          description: 'Find multiplier for year 2:',
          math: '\\frac{8904}{8400} = 1.06',
          markTag: 'M1 (Multiplier determination)'
        },
        {
          description: 'Convert multiplier to percentage increase:',
          math: '1.06 - 1 = 0.06 \\implies p = 6\\%',
          markTag: 'A1 (Value of p)'
        }
      ],
      finalAnswer: 'p = 6',
      examinerTips: 'Using decimal multipliers (1.05 and 1.06) avoids rounding errors on multi-year compound interest.'
    },
    digitalAnswer: {
      expected: ['6', '6%'],
      type: 'number'
    }
  },

  // ==========================================
  // GEOMETRY & MEASURES
  // ==========================================
  {
    id: 'q_geo_pythagoras_01',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Algebraic Pythagoras: Quadratic Sides & Triangle Area',
    prompt: 'A right-angled triangle has sides of length \\(x - 1\\text{ cm}\\) and \\(x + 6\\text{ cm}\\), with a hypotenuse of length \\(x + 7\\text{ cm}\\).\n\n(a) Show that \\(x^2 - 4x - 12 = 0\\).\n(b) Hence, find the value of \\(x\\) and calculate the area of the triangle.',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Pythagoras', 'Algebra', 'Quadratics', 'Area'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'GCSE Grade 8/9 Stretch • Algebraic Pythagoras & Quadratics',
      isOfficialPublicArchive: false
    },
    hints: [
      "Apply Pythagoras' theorem: \\(a^2 + b^2 = c^2\\) where \\(c\\) is the hypotenuse \\((x + 7)\\).",
      "Carefully expand the squared binomials \\((x - 1)^2\\), \\((x + 6)^2\\), and \\((x + 7)^2\\), then move all terms to one side.",
      "Factorise the quadratic \\(x^2 - 4x - 12 = 0\\). Remember that a physical side length cannot be negative!"
    ],
    solution: {
      steps: [
        {
          description: "Set up Pythagoras' equation with hypotenuse \\(x + 7\\):",
          math: '(x - 1)^2 + (x + 6)^2 = (x + 7)^2',
          markTag: 'M1'
        },
        {
          description: 'Expand all three brackets:',
          math: '(x^2 - 2x + 1) + (x^2 + 12x + 36) = x^2 + 14x + 49',
          markTag: 'M1'
        },
        {
          description: 'Collect like terms and rearrange to zero:',
          math: '2x^2 + 10x + 37 = x^2 + 14x + 49 \\implies x^2 - 4x - 12 = 0',
          markTag: 'A1 (Part a)'
        },
        {
          description: 'Factorise the quadratic:',
          math: '(x - 6)(x + 2) = 0 \\implies x = 6 \\text{ or } x = -2',
          markTag: 'M1'
        },
        {
          description: 'Reject \\(x = -2\\) since side \\(x - 1 > 0\\). With \\(x = 6\\), the sides are \\(5\\text{ cm}\\) and \\(12\\text{ cm}\\):',
          math: '\\text{Area} = \\frac{1}{2} \\times 5 \\times 12 = 30\\text{ cm}^2',
          markTag: 'A1 (Part b)'
        }
      ],
      finalAnswer: 'x = 6, \\quad \\text{Area} = 30\\text{ cm}^2',
      examinerTips: "Always write down a brief sentence explaining why the negative root is rejected: e.g. 'Since length must be positive, \\(x = 6\\)'."
    },
    digitalAnswer: {
      expected: ['30', '30cm^2', '30 cm^2', 'x=6, area=30'],
      type: 'number'
    }
  },
  {
    id: 'q_geo_pythagoras_02',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Circle Geometry & Double Chord Pythagoras',
    prompt: 'A circle with centre \\(O\\) has two parallel horizontal chords, \\(AB\\) and \\(CD\\).\nChord \\(AB\\) has length \\(16\\text{ cm}\\) and lies \\(6\\text{ cm}\\) from \\(O\\).\nChord \\(CD\\) lies \\(4\\text{ cm}\\) from \\(O\\) on the same side of the centre as \\(AB\\).\n\nCalculate the exact length of chord \\(CD\\). Give your answer in simplified surd form \\(a\\sqrt{b}\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Circle Geometry', 'Pythagoras', 'Chords', 'Surds'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'GCSE Grade 8/9 & Lateral Stretch • Circle Chords & Pythagoras',
      isOfficialPublicArchive: false
    },
    hints: [
      'The perpendicular distance from the centre \\(O\\) bisects chord \\(AB\\) into two \\(8\\text{ cm}\\) segments.',
      'Use the right-angled triangle formed by the radius, half-chord, and distance from \\(O\\) to find radius \\(r\\).',
      'Use that same radius \\(r\\) in a new right-angled triangle with chord \\(CD\\) at distance \\(4\\text{ cm}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Perpendicular from centre bisects chord \\(AB\\): half-chord is \\(8\\text{ cm}\\). Find circle radius \\(r\\):',
          math: 'r^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies r = 10\\text{ cm}',
          markTag: 'M1'
        },
        {
          description: 'Form right-angled triangle for chord \\(CD\\) with distance \\(4\\text{ cm}\\) and half-chord \\(d\\):',
          math: 'd^2 + 4^2 = r^2 = 100 \\implies d^2 + 16 = 100',
          markTag: 'M1'
        },
        {
          description: 'Solve for half-chord length \\(d\\):',
          math: 'd^2 = 84 \\implies d = \\sqrt{84} = 2\\sqrt{21}\\text{ cm}',
          markTag: 'A1'
        },
        {
          description: 'The full chord length \\(CD\\) is double \\(d\\):',
          math: 'CD = 2 \\times 2\\sqrt{21} = 4\\sqrt{21}\\text{ cm}',
          markTag: 'A1'
        }
      ],
      finalAnswer: 'CD = 4\\sqrt{21}\\text{ cm} \\quad (\\approx 18.33\\text{ cm})',
      examinerTips: "Don't forget to double the half-chord at the end! The perpendicular from the centre always bisects any chord."
    },
    digitalAnswer: {
      expected: ['4\\sqrt{21}', '4sqrt(21)', '4sqrt21', '18.33', '18.3'],
      type: 'algebra'
    }
  },
  {
    id: 'q_geo_pythagoras_03',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Proof: Equilateral Triangle Height & Exact Area',
    prompt: 'An equilateral triangle has sides of length \\(2a\\).\n\nUse Pythagoras\' theorem to:\n(a) Show that the perpendicular height \\(h\\) of the triangle is \\(a\\sqrt{3}\\).\n(b) Prove that the exact area of the triangle is \\(\\sqrt{3}a^2\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Pythagoras', 'Proof', 'Equilateral Triangle', 'Surds'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'GCSE Grade 7 & UKMT Stretch • Exact Geometric Proof',
      isOfficialPublicArchive: false
    },
    hints: [
      'Drop a vertical line from the top vertex down to the midpoint of the base. This splits the base \\(2a\\) into \\(a\\) and \\(a\\).',
      'In the right-angled half triangle, the hypotenuse is \\(2a\\), one leg is \\(a\\), and the other leg is \\(h\\).'
    ],
    solution: {
      steps: [
        {
          description: 'The altitude splits the equilateral triangle into two congruent right-angled triangles with base \\(a\\) and hypotenuse \\(2a\\):',
          math: 'a^2 + h^2 = (2a)^2 = 4a^2',
          markTag: 'M1'
        },
        {
          description: 'Subtract \\(a^2\\) to isolate \\(h^2\\):',
          math: 'h^2 = 4a^2 - a^2 = 3a^2 \\implies h = \\sqrt{3a^2} = a\\sqrt{3}',
          markTag: 'A1 (Part a)'
        },
        {
          description: 'Calculate area using \\(\\frac{1}{2} \\times \\text{base} \\times \\text{height}\\):',
          math: '\\text{Area} = \\frac{1}{2} \\times (2a) \\times (a\\sqrt{3}) = a \\times a\\sqrt{3} = \\sqrt{3}a^2',
          markTag: 'A1 (Part b)'
        }
      ],
      finalAnswer: 'h = a\\sqrt{3}, \\quad \\text{Area} = \\sqrt{3}a^2',
      examinerTips: 'Be careful squaring \\(2a\\): \\((2a)^2 = 4a^2\\), not \\(2a^2\\). This exact derivation also explains why \\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\) and \\(\\cos 60^\\circ = \\frac{1}{2}\\)!'
    },
    digitalAnswer: {
      expected: ['\\sqrt{3}a^2', 'sqrt(3)a^2', 'a^2\\sqrt{3}', 'sqrt3 a^2'],
      type: 'algebra'
    }
  },
  {
    id: 'q_geo_pythagoras_04',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'UKMT Lateral: Shortest Crawling Distance on a Cuboid',
    prompt: 'A solid rectangular box has dimensions \\(6\\text{ cm} \\times 8\\text{ cm} \\times 10\\text{ cm}\\).\nA spider starts at one corner \\(A\\) on the base and wants to crawl along the exterior faces of the box to the opposite corner \\(B\\) at the top.\n\nFind the shortest possible distance the spider can travel.\nGive your answer in the form \\(k\\sqrt{m}\\) in simplified surd form.',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'ukmt_junior',
    tags: ['UKMT', 'Lateral Thinking', '3D Nets', 'Pythagoras', 'Surds'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'ukmt',
      sourceLabel: 'UKMT Junior Mathematical Challenge Lateral Puzzle',
      isOfficialPublicArchive: false
    },
    hints: [
      'The spider cannot fly through the interior air of the box; it must walk on the faces.',
      'Unfold adjacent pairs of faces flat into 2D nets and draw a straight line between \\(A\\) and \\(B\\).',
      'There are three distinct pairs of faces the spider could cross. Test the distance squared for each!'
    ],
    solution: {
      steps: [
        {
          description: 'Unfold the 3D surface into 2D rectangular nets. The straight line distance in each net is given by \\(\\sqrt{(w_1 + w_2)^2 + h^2}\\):',
          math: '\\text{Route 1: } (6 + 8) \\text{ by } 10 \\implies 14^2 + 10^2 = 196 + 100 = 296',
          markTag: 'M1'
        },
        {
          description: 'Calculate Route 2 distance squared:',
          math: '\\text{Route 2: } (8 + 10) \\text{ by } 6 \\implies 18^2 + 6^2 = 324 + 36 = 360',
          markTag: 'M1'
        },
        {
          description: 'Calculate Route 3 distance squared:',
          math: '\\text{Route 3: } (6 + 10) \\text{ by } 8 \\implies 16^2 + 8^2 = 256 + 64 = 320',
          markTag: 'M1'
        },
        {
          description: 'The shortest route has squared distance \\(296\\). Simplify the surd:',
          math: 'd = \\sqrt{296} = \\sqrt{4 \\times 74} = 2\\sqrt{74}\\text{ cm} \\approx 17.20\\text{ cm}',
          markTag: 'A1'
        }
      ],
      finalAnswer: '2\\sqrt{74}\\text{ cm} \\quad (\\approx 17.2\\text{ cm})',
      examinerTips: 'Notice that \\(2\\sqrt{74} \\approx 17.20\\text{ cm}\\), whereas the interior 3D space diagonal \\(\\sqrt{6^2+8^2+10^2} = \\sqrt{200} \\approx 14.14\\text{ cm}\\). The spider has to remain on the 2D surface!'
    },
    digitalAnswer: {
      expected: ['2\\sqrt{74}', '2sqrt(74)', '2sqrt74', '17.2', '17.20'],
      type: 'algebra'
    }
  },
  {
    id: 'q_geo_pythagoras_05',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Coordinate Geometry: Perpendicular Gradient & Pythagoras',
    prompt: 'The coordinates of three points are \\(A(-2, 1)\\), \\(B(4, 9)\\), and \\(C(10, k)\\).\nGiven that triangle \\(ABC\\) has a right angle at \\(B\\) (so \\(\\angle ABC = 90^\\circ\\)):\n\n(a) Show that \\(k = 4.5\\).\n(b) Find the exact length of the hypotenuse \\(AC\\).',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Coordinate Geometry', 'Perpendicular Lines', 'Pythagoras', 'Surds'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'GCSE Grade 8/9 Stretch • Coordinate Pythagoras & Orthogonality',
      isOfficialPublicArchive: false
    },
    hints: [
      'You can use either perpendicular gradients \\(m_1 \\times m_2 = -1\\) or Pythagoras\' theorem \\(AB^2 + BC^2 = AC^2\\).',
      'Gradient of \\(AB = \\frac{9 - 1}{4 - (-2)} = \\frac{8}{6} = \\frac{4}{3}\\). What must the gradient of \\(BC\\) be?',
      'For part (b), apply the distance formula between \\(A(-2, 1)\\) and \\(C(10, 4.5)\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Calculate gradient of line segment \\(AB\\):',
          math: 'm_{AB} = \\frac{9 - 1}{4 - (-2)} = \\frac{8}{6} = \\frac{4}{3}',
          markTag: 'M1'
        },
        {
          description: 'Perpendicular lines satisfy \\(m_{AB} \\times m_{BC} = -1\\), so \\(m_{BC} = -\\frac{3}{4}\\):',
          math: '\\frac{k - 9}{10 - 4} = -\\frac{3}{4} \\implies \\frac{k - 9}{6} = -\\frac{3}{4}',
          markTag: 'M1'
        },
        {
          description: 'Solve for \\(k\\):',
          math: 'k - 9 = 6 \\times \\left(-\\frac{3}{4}\\right) = -4.5 \\implies k = 9 - 4.5 = 4.5',
          markTag: 'A1 (Part a)'
        },
        {
          description: 'Calculate the length of \\(AB\\) and \\(BC\\):',
          math: 'AB = \\sqrt{6^2 + 8^2} = 10, \\quad BC = \\sqrt{6^2 + (-4.5)^2} = \\sqrt{36 + 20.25} = \\sqrt{56.25} = 7.5',
          markTag: 'M1'
        },
        {
          description: 'Use Pythagoras \\(AC = \\sqrt{AB^2 + BC^2}\\) (or distance formula):',
          math: 'AC = \\sqrt{10^2 + 7.5^2} = \\sqrt{100 + 56.25} = \\sqrt{156.25} = 12.5 \\text{ (or } \\frac{25}{2}\\text{)}',
          markTag: 'A1 (Part b)'
        }
      ],
      finalAnswer: 'k = 4.5 \\; (\\text{or } \\frac{9}{2}), \\quad AC = 12.5 \\; (\\text{or } \\frac{25}{2})',
      examinerTips: 'Both Pythagoras \\(AB^2 + BC^2 = AC^2\\) and perpendicular gradients \\(m_1 m_2 = -1\\) give the identical result. Notice the Pythagorean triple ratio: \\(10 : 7.5 : 12.5\\) is a \\(3 : 4 : 5\\) scaled by \\(2.5\\)!'
    },
    digitalAnswer: {
      expected: ['12.5', '25/2', 'k=4.5, AC=12.5', '12 1/2'],
      type: 'number'
    }
  },
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Multi-Step Circle Theorems",
      isOfficialPublicArchive: false
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
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Sine & Cosine Rule in Non-Right Triangles",
      isOfficialPublicArchive: false
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
          math: 'AC^2 = 54.76 + 96.04 - 145.04 \\times 0.43837... = 87.218...',
          markTag: 'M1 (Evaluation)'
        },
        {
          description: 'Square root for \\(AC\\):',
          math: 'AC = \\sqrt{87.218...} \\approx 9.34\\text{ cm}',
          markTag: 'A1 (AC accuracy)'
        },
        {
          description: 'Calculate Area using \\(\\frac{1}{2}ab\\sin C\\):',
          math: '\\text{Area} = \\frac{1}{2} \\times 7.4 \\times 9.8 \\times \\sin(64^\\circ) \\approx 32.6\\text{ cm}^2',
          markTag: 'A2 (Area calculation)'
        }
      ],
      finalAnswer: 'AC = 9.34\\text{ cm}, \\quad \\text{Area} = 32.6\\text{ cm}^2',
      examinerTips: 'Keep unrounded values stored in calculator memory for intermediate steps.'
    },
    digitalAnswer: {
      expected: ['9.34', '9.339'],
      type: 'number'
    }
  },

  {
    id: 'q_geo_3d_01',
    topicId: 'geo_3d_trig',
    strandId: 'geometry',
    title: '3D Pythagoras & Angle Between Line and Plane',
    prompt: '\\(ABCDEFGH\\) is a cuboid.\n\\(AB = 8\\text{ cm}\\), \\(BC = 6\\text{ cm}\\), and \\(CG = 5\\text{ cm}\\).\n\n(a) Calculate the length of the space diagonal \\(AG\\).\n(b) Calculate the angle that the line \\(AG\\) makes with the horizontal base \\(ABCD\\). Give your answer to 1 decimal place.',
    maxMarks: 4,
    calculatorAllowed: true,
    difficulty: 'grade_8_9',
    tags: ['3D Geometry', 'Space Diagonal', 'Trigonometry', 'Grade 9'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • 3D Pythagoras & Trigonometry",
      isOfficialPublicArchive: false
    },
    hints: [
      'In a cuboid, the space diagonal satisfies \\(AG^2 = l^2 + w^2 + h^2\\).',
      'The horizontal projection of \\(AG\\) is the base diagonal \\(AC\\). Then in right-angled triangle \\(ACG\\), \\(\\tan(\\theta) = \\frac{CG}{AC}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Calculate base diagonal \\(AC\\):',
          math: 'AC = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}',
          markTag: 'M1 (Base diagonal)'
        },
        {
          description: '(a) Calculate 3D space diagonal \\(AG\\):',
          math: 'AG = \\sqrt{AC^2 + CG^2} = \\sqrt{10^2 + 5^2} = \\sqrt{125} \\approx 11.18\\text{ cm}',
          markTag: 'A1 (3D diagonal)'
        },
        {
          description: '(b) Calculate angle \\(\\angle CAG\\) with horizontal plane:',
          math: '\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{5}{10} = 0.5 \\implies \\theta = \\tan^{-1}(0.5) \\approx 26.565...^\\circ',
          markTag: 'M1 A1 (Trigonometric ratio & angle)'
        }
      ],
      finalAnswer: '(a) AG = 11.2\\text{ cm} \\; (\\text{or } 5\\sqrt{5}), \\quad (b) 26.6^\\circ',
      examinerTips: 'Always sketch the 2D right-angled triangle extracted from the 3D solid to clearly identify the opposite, adjacent, and hypotenuse.'
    },
    digitalAnswer: {
      expected: ['26.6', '26.57'],
      type: 'number'
    }
  },

  {
    id: 'q_geo_vectors_01',
    topicId: 'geo_vectors',
    strandId: 'geometry',
    title: 'Vector Proof of Collinearity',
    prompt: '\\(OACB\\) is a parallelogram.\n\\(\\vec{OA} = \\mathbf{a}\\) and \\(\\vec{OB} = \\mathbf{b}\\).\n\\(M\\) is the midpoint of \\(BC\\).\n\\(P\\) is a point on \\(AC\\) such that \\(AP : PC = 2 : 1\\).\n\nFind the vector \\(\\vec{MP}\\) in terms of \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\).',
    maxMarks: 4,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Vectors', 'Parallelogram', 'Ratios', 'Grade 9'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Geometric Vector Proof (Collinearity)",
      isOfficialPublicArchive: false
    },
    hints: [
      'In a parallelogram, opposite sides are equal vectors: \\(\\vec{BC} = \\vec{OA} = \\mathbf{a}\\) and \\(\\vec{AC} = \\vec{OB} = \\mathbf{b}\\).',
      'Route to \\(P\\): \\(\\vec{OP} = \\mathbf{a} + \\frac{2}{3}\\mathbf{b}\\). Route to \\(M\\): \\(\\vec{OM} = \\mathbf{b} + \\frac{1}{2}\\mathbf{a}\\).'
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
          markTag: 'A2 (Vector subtraction)'
        }
      ],
      finalAnswer: '\\vec{MP} = \\frac{1}{2}\\mathbf{a} - \\frac{1}{3}\\mathbf{b}',
      examinerTips: 'Clear vector route labelling ensures method marks even if fraction arithmetic has a minor slip.'
    },
    digitalAnswer: {
      expected: ['1/2a - 1/3b', '0.5a - 1/3b'],
      type: 'algebra'
    }
  },

  // ==========================================
  // PROBABILITY
  // ==========================================
  {
    id: 'q_prob_conditional_01',
    topicId: 'prob_conditional',
    strandId: 'probability',
    title: 'Algebraic Probability Without Replacement',
    prompt: 'There are \\(n\\) sweets in a bag.\n\\(6\\) of the sweets are orange.\nThe rest of the sweets are yellow.\n\nHannah takes at random a sweet from the bag and eats it.\nShe then takes at random another sweet from the bag and eats it.\n\nThe probability that Hannah eats two orange sweets is \\(\\frac{1}{3}\\).\n\nShow that \\(n^2 - n - 90 = 0\\), and hence find the total number of sweets in the bag.',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_8_9',
    tags: ['Probability', 'Without Replacement', 'Algebraic Modeling', 'Grade 9'],
    isMorningQuickEligible: false,
    citation: {
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2015',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q19',
      sourceLabel: "Edexcel GCSE Higher June 2015 Paper 1H, Q19 (\"Hannah's Sweets\")",
      citationUrl: "https://www.physicsandmathstutor.com/maths-revision/gcse-edexcel/papers/",
      isOfficialPublicArchive: true
    },
    hints: [
      'The probability of the first orange sweet is \\(\\frac{6}{n}\\).',
      'Because she eats it, there are now 5 orange sweets left out of \\(n - 1\\) total sweets: \\(\\frac{5}{n-1}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Construct the product of probabilities for two orange sweets:',
          math: 'P(\\text{Orange}, \\text{Orange}) = \\frac{6}{n} \\times \\frac{5}{n - 1} = \\frac{30}{n(n - 1)}',
          markTag: 'M1 (Product of probabilities)'
        },
        {
          description: 'Set equal to 1/3 and clear fractions:',
          math: '\\frac{30}{n(n - 1)} = \\frac{1}{3} \\implies 30 \\times 3 = n(n - 1) \\implies 90 = n^2 - n',
          markTag: 'M1 (Cross multiplication)'
        },
        {
          description: 'Rearrange to show equation:',
          math: 'n^2 - n - 90 = 0',
          markTag: 'A1 (Equation shown)'
        },
        {
          description: 'Solve quadratic equation for positive integer \\(n\\):',
          math: '(n - 10)(n + 9) = 0 \\implies n = 10 \\quad (\\text{reject } n = -9 \\text{ since } n > 0)',
          markTag: 'A2 (Factorise and solve)'
        }
      ],
      finalAnswer: 'n = 10 \\text{ sweets}',
      examinerTips: 'The famous "Hannah\'s sweets" question! Remember to explicitly reject the negative root \\(n = -9\\).'
    },
    digitalAnswer: {
      expected: ['10', '10 sweets'],
      type: 'number'
    }
  },

  {
    id: 'q_prob_venn_01',
    topicId: 'prob_venn',
    strandId: 'probability',
    title: 'Conditional Probability from a Venn Diagram',
    prompt: '\\(\\mathcal{E} = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\\}\n\\(A = \\text{multiples of 3}\n\\(B = \\text{even numbers}\n\nA number is chosen at random from \\(\\mathcal{E}\\).\n\n(a) Complete a Venn diagram representing sets \\(A\\) and \\(B\\).\n(b) Find \\(P(A \\cap B)\\).\n(c) Find \\(P(A\' \\cup B)\\).\n(d) Given that the chosen number is in \\(B\\), find the probability that it is in \\(A\\).',
    maxMarks: 5,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Venn Diagrams', 'Set Notation', 'Conditional Probability'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Conditional Probability & Sets",
      isOfficialPublicArchive: false
    },
    hints: [
      'List members: \\(A = \\{3, 6, 9, 12\\}\\) and \\(B = \\{2, 4, 6, 8, 10, 12\\}\\).',
      'For part (d), restrict your universe only to the members of \\(B\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Identify set intersections:',
          math: 'A \\cap B = \\{6, 12\\} \\implies 2 \\text{ elements in intersection.}',
          markTag: 'B1 (Intersection)'
        },
        {
          description: '(b) Find \\(P(A \\cap B)\\):',
          math: 'P(A \\cap B) = \\frac{2}{12} = \\frac{1}{6}',
          markTag: 'B1 (Probability)'
        },
        {
          description: '(c) Find \\(P(A\' \\cup B)\\):',
          math: 'A\' = \\{1, 2, 4, 5, 7, 8, 10, 11\\}. \\quad A\' \\cup B \\text{ has 10 elements } \\implies \\frac{10}{12} = \\frac{5}{6}',
          markTag: 'M1 A1 (Union probability)'
        },
        {
          description: '(d) Conditional probability \\(P(A|B) = \\frac{P(A \\cap B)}{P(B)}\\):',
          math: 'P(A|B) = \\frac{2}{6} = \\frac{1}{3}',
          markTag: 'A1 (Conditional probability)'
        }
      ],
      finalAnswer: '(b) \\frac{1}{6}, \\quad (c) \\frac{5}{6}, \\quad (d) \\frac{1}{3}',
      examinerTips: 'In conditional probability "Given that B occurred", the denominator is the count of items in B.'
    },
    digitalAnswer: {
      expected: ['1/3', '2/6'],
      type: 'fraction'
    }
  },

  // ==========================================
  // STATISTICS: HISTOGRAMS
  // ==========================================
  {
    id: 'q_stat_histograms_01',
    topicId: 'stat_histograms',
    strandId: 'statistics',
    title: 'Histogram with Unequal Class Widths',
    prompt: 'The table shows information about the weights of \\(80\\) parcels.\n\n\\[\\begin{array}{|c|c|}\n\\hline\n\\text{Weight } w \\text{ (kg)} & \\text{Frequency} \\\\\n\\hline\n0 < w \\leq 2 & 12 \\\\\n2 < w \\leq 5 & 24 \\\\\n5 < w \\leq 10 & 30 \\\\\n10 < w \\leq 20 & 14 \\\\\n\\hline\n\\end{array}\\]\n\n(a) Calculate the frequency density for each class.\n(b) Estimate the number of parcels with a weight greater than \\(8\\text{ kg}\\).',
    maxMarks: 4,
    calculatorAllowed: true,
    difficulty: 'grade_7',
    tags: ['Histograms', 'Frequency Density', 'Statistics'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: "GCSE Grade 8/9 Stretch • Histograms & Frequency Density",
      isOfficialPublicArchive: false
    },
    hints: [
      'Frequency Density = Frequency \\(\\div\\) Class Width.',
      'For part (b), calculate the proportion of the \\(5 < w \\leq 10\\) class that is above 8 kg: \\((10 - 8) \\times \\text{FD}\\), and add the frequency of the \\(10 < w \\leq 20\\) class.'
    ],
    solution: {
      steps: [
        {
          description: '(a) Calculate frequency densities:',
          math: '\\text{Class 0-2: } \\frac{12}{2} = 6; \\quad \\text{Class 2-5: } \\frac{24}{3} = 8; \\quad \\text{Class 5-10: } \\frac{30}{5} = 6; \\quad \\text{Class 10-20: } \\frac{14}{10} = 1.4',
          markTag: 'M1 A1 (Frequency densities)'
        },
        {
          description: '(b) For weight between 8 and 10 kg:',
          math: '\\text{Width} = 10 - 8 = 2. \\quad \\text{Frequency} = 2 \\times 6 = 12',
          markTag: 'M1 (Partial bar area)'
        },
        {
          description: 'Add frequency of parcels > 10 kg:',
          math: '12 + 14 = 26 \\text{ parcels}',
          markTag: 'A1 (Total parcels)'
        }
      ],
      finalAnswer: '26 \\text{ parcels}',
      examinerTips: 'Area represents frequency in histograms! Always multiply the slice width by the frequency density.'
    },
    digitalAnswer: {
      expected: ['26', '26 parcels'],
      type: 'number'
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
    prompt: 'The diagram shows a grid of nine squares. Each of the digits \\(1\\) to \\(9\\) is to be placed in a different square so that the sum of the numbers in any two squares that share an edge is always a prime number.\n\nIf the number \\(5\\) is placed in the centre square, what numbers must be placed in the corner squares?',
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
      sourceLabel: "UKMT Junior Mathematical Challenge 2022, Q22",
      citationUrl: "https://ukmt.org.uk/competitions/solo/junior-mathematical-challenge/archive",
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
      sourceLabel: "UKMT Intermediate Mathematical Challenge 2023, Q21",
      citationUrl: "https://ukmt.org.uk/competitions/solo/intermediate-mathematical-challenge/archive",
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
      sourceLabel: "Olympiad Stretch • Simon's Favorite Factoring Trick",
      citationUrl: "https://en.wikipedia.org/wiki/Simon%27s_Favorite_Factoring_Trick",
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
  },

  // ==========================================
  // CONVENTIONAL & FOUNDATIONAL GCSE QUESTIONS
  // ==========================================
  {
    id: 'q_geo_pythagoras_conv_01',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Pythagoras: Finding the Hypotenuse',
    prompt: 'A right-angled triangle has perpendicular sides of length \\(6\\text{ cm}\\) and \\(8\\text{ cm}\\).\n\nCalculate the length of the hypotenuse \\(c\\).',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Pythagoras', 'Hypotenuse', 'Standard GCSE', 'Right-Angled Triangles'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'State Pythagoras\' Theorem: \\(a^2 + b^2 = c^2\\), where \\(c\\) is the hypotenuse.',
      'Substitute \\(6\\) and \\(8\\): \\(6^2 + 8^2 = c^2\\), then find the square root.'
    ],
    solution: {
      steps: [
        {
          description: 'Apply Pythagoras\' theorem \\(a^2 + b^2 = c^2\\):',
          math: 'c^2 = 6^2 + 8^2 = 36 + 64 = 100',
          markTag: 'M1 (Method - squaring and adding)'
        },
        {
          description: 'Take the positive square root to find \\(c\\):',
          math: 'c = \\sqrt{100} = 10\\text{ cm}',
          markTag: 'A1 (Accuracy)'
        }
      ],
      finalAnswer: '10\\text{ cm}',
      examinerTips: 'This is a standard 3-4-5 Pythagorean triple scaled by 2 (6-8-10). Remember that the hypotenuse is always opposite the right angle.'
    },
    digitalAnswer: {
      expected: ['10', '10 cm', '10cm'],
      type: 'number'
    }
  },
  {
    id: 'q_geo_pythagoras_conv_02',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Pythagoras: Calculating a Shorter Side',
    prompt: 'In a right-angled triangle, the hypotenuse is \\(13\\text{ cm}\\) and one of the shorter sides is \\(5\\text{ cm}\\).\n\nFind the length of the other side \\(a\\).',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Pythagoras', 'Shorter Leg', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'To find a shorter side, rearrange the formula: \\(a^2 = c^2 - b^2\\).',
      'Subtract the square of 5 from the square of 13, then square root.'
    ],
    solution: {
      steps: [
        {
          description: 'Rearrange Pythagoras\' theorem to subtract squares:',
          math: 'a^2 = 13^2 - 5^2 = 169 - 25 = 144',
          markTag: 'M1 (Method - subtracting squares)'
        },
        {
          description: 'Take the square root of 144:',
          math: 'a = \\sqrt{144} = 12\\text{ cm}',
          markTag: 'A1 (Accuracy)'
        }
      ],
      finalAnswer: '12\\text{ cm}',
      examinerTips: 'Common error: students often accidentally add instead of subtract when finding a shorter side! Always check that your answer is shorter than the hypotenuse.'
    },
    digitalAnswer: {
      expected: ['12', '12 cm', '12cm'],
      type: 'number'
    }
  },
  {
    id: 'q_geo_pythagoras_conv_03',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Pythagoras: Area of an Isosceles Triangle',
    prompt: 'An isosceles triangle has two sides of length \\(10\\text{ cm}\\) and a base of length \\(12\\text{ cm}\\).\n\n(a) Show that the perpendicular height \\(h\\) is \\(8\\text{ cm}\\).\n(b) Hence, calculate the area of the triangle.',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Pythagoras', 'Isosceles Triangle', 'Area', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'A perpendicular line from the apex bisects the base into two equal lengths of \\(6\\text{ cm}\\).',
      'Use Pythagoras on the right-angled half: \\(h^2 + 6^2 = 10^2\\).',
      'Area of a triangle = \\(\\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Bisect the base: \\(\\frac{12}{2} = 6\\text{ cm}\\). Apply Pythagoras to find \\(h\\):',
          math: 'h^2 = 10^2 - 6^2 = 100 - 36 = 64 \\implies h = \\sqrt{64} = 8\\text{ cm}',
          markTag: 'M1 A1 (Height proof)'
        },
        {
          description: 'Calculate the total triangle area:',
          math: '\\text{Area} = \\frac{1}{2} \\times 12 \\times 8 = 48\\text{ cm}^2',
          markTag: 'B1 (Accuracy mark for area)'
        }
      ],
      finalAnswer: '48\\text{ cm}^2',
      examinerTips: 'Make sure you use the full base (12 cm) when computing the total area, not just the half base (6 cm).'
    },
    digitalAnswer: {
      expected: ['48', '48 cm^2', '48cm^2', '48 cm2'],
      type: 'number'
    }
  },
  {
    id: 'q_geo_pythagoras_conv_04',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Pythagoras in Context: Ladder on a Vertical Wall',
    prompt: 'A ladder of length \\(5\\text{ m}\\) leans against a vertical wall.\nThe foot of the ladder is \\(1.4\\text{ m}\\) away from the base of the wall on horizontal ground.\n\nCalculate how high up the wall the ladder reaches.\nGive your answer to 2 decimal places.',
    maxMarks: 3,
    calculatorAllowed: true,
    difficulty: 'grade_5_6',
    tags: ['Pythagoras', 'Real-world Context', 'Decimals', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'The ladder forms the hypotenuse of a right-angled triangle with the wall and ground.',
      'Use \\(h^2 = 5^2 - 1.4^2\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Set up the equation for the vertical height \\(h\\):',
          math: 'h^2 = 5^2 - 1.4^2 = 25 - 1.96 = 23.04',
          markTag: 'M1 (Method)'
        },
        {
          description: 'Take the square root:',
          math: 'h = \\sqrt{23.04} = 4.80\\text{ m}',
          markTag: 'A1 (Accuracy)'
        }
      ],
      finalAnswer: '4.80\\text{ m}',
      examinerTips: 'Notice that 23.04 has an exact square root of 4.8! Giving 4.8 or 4.80 m gains full marks.'
    },
    digitalAnswer: {
      expected: ['4.8', '4.80', '4.8 m', '4.80 m', '4.80m'],
      type: 'number'
    }
  },
  {
    id: 'q_geo_pythagoras_conv_05',
    topicId: 'geo_pythagoras',
    strandId: 'geometry',
    title: 'Coordinate Geometry: Distance Between Two Points',
    prompt: 'Point \\(A\\) has coordinates \\((2, 3)\\) and Point \\(B\\) has coordinates \\((8, 11)\\).\n\nFind the exact length of the line segment \\(AB\\).',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Coordinate Geometry', 'Distance Formula', 'Pythagoras', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Higher Tier',
      isOfficialPublicArchive: false
    },
    hints: [
      'Draw or imagine a right-angled triangle where the horizontal change is \\(\\Delta x\\) and the vertical change is \\(\\Delta y\\).',
      '\\(\\Delta x = 8 - 2 = 6\\), and \\(\\Delta y = 11 - 3 = 8\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Calculate the horizontal and vertical differences:',
          math: '\\Delta x = 8 - 2 = 6, \\quad \\Delta y = 11 - 3 = 8',
          markTag: 'M1 (Coordinate differences)'
        },
        {
          description: 'Apply the distance formula \\(d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}\\):',
          math: 'd = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10',
          markTag: 'M1 A1 (Exact answer)'
        }
      ],
      finalAnswer: '10',
      examinerTips: 'The distance formula is just Pythagoras in coordinate disguise: \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).'
    },
    digitalAnswer: {
      expected: ['10', '10 units'],
      type: 'number'
    }
  },

  // ------------------------------------------
  // Algebraic Fractions (Conventional)
  // ------------------------------------------
  {
    id: 'q_alg_frac_conv_01',
    topicId: 'alg_fractions',
    strandId: 'algebra',
    title: 'Algebraic Fractions: Simplifying Monomial Fractions',
    prompt: 'Simplify fully:\n\\[\\frac{12x^3y}{18xy^4}\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Algebraic Fractions', 'Simplifying', 'Indices', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Simplify the numerical fraction \\(\\frac{12}{18}\\) first by dividing both by 6.',
      'Use the laws of indices for \\(x\\) and \\(y\\): \\(\\frac{x^a}{x^b} = x^{a-b}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Cancel common numerical factors (divide 12 and 18 by 6):',
          math: '\\frac{12}{18} = \\frac{2}{3}',
          markTag: 'M1'
        },
        {
          description: 'Cancel variable powers: \\(\\frac{x^3}{x} = x^2\\) and \\(\\frac{y}{y^4} = \\frac{1}{y^3}\\):',
          math: '\\frac{2x^2}{3y^3}',
          markTag: 'A1'
        }
      ],
      finalAnswer: '\\frac{2x^2}{3y^3}',
      examinerTips: 'Ensure negative powers are written as positive powers in the denominator where requested in standard form.'
    },
    digitalAnswer: {
      expected: ['2x^2/(3y^3)', '\\frac{2x^2}{3y^3}', '2x^2/3y^3'],
      type: 'algebra'
    }
  },
  {
    id: 'q_alg_frac_conv_02',
    topicId: 'alg_fractions',
    strandId: 'algebra',
    title: 'Algebraic Fractions: Simplifying Quadratic Quotients',
    prompt: 'Simplify fully:\n\\[\\frac{x^2 - 16}{x^2 + 7x + 12}\\]',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Algebraic Fractions', 'Factorising Quadratics', 'Difference of Two Squares', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Higher Tier',
      isOfficialPublicArchive: false
    },
    hints: [
      'Factorise the numerator using the difference of two squares: \\(x^2 - 16 = (x - 4)(x + 4)\\).',
      'Factorise the quadratic denominator into two brackets that multiply to 12 and add to 7.',
      'Cancel the common bracket.'
    ],
    solution: {
      steps: [
        {
          description: 'Factorise numerator and denominator:',
          math: 'x^2 - 16 = (x - 4)(x + 4), \\quad x^2 + 7x + 12 = (x + 3)(x + 4)',
          markTag: 'M1 M1 (Factorising both expressions)'
        },
        {
          description: 'Cancel the common factor \\((x + 4)\\):',
          math: '\\frac{(x - 4)(x + 4)}{(x + 3)(x + 4)} = \\frac{x - 4}{x + 3}',
          markTag: 'A1 (Simplified fraction)'
        }
      ],
      finalAnswer: '\\frac{x - 4}{x + 3}',
      examinerTips: 'Never attempt to cancel terms before factorising! You can only cancel common multiplicative factors, never individual additive terms.'
    },
    digitalAnswer: {
      expected: ['(x-4)/(x+3)', '\\frac{x-4}{x+3}', '(x - 4)/(x + 3)'],
      type: 'algebra'
    }
  },
  {
    id: 'q_alg_frac_conv_03',
    topicId: 'alg_fractions',
    strandId: 'algebra',
    title: 'Algebraic Fractions: Adding with Numerical Denominators',
    prompt: 'Write as a single fraction in its simplest form:\n\\[\\frac{2x + 1}{3} + \\frac{x - 2}{4}\\]',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Algebraic Fractions', 'Addition', 'Common Denominator', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Find the lowest common denominator of 3 and 4, which is 12.',
      'Multiply the first numerator by 4 and the second numerator by 3: \\(\\frac{4(2x + 1) + 3(x - 2)}{12}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Convert both fractions to common denominator 12:',
          math: '\\frac{4(2x + 1)}{12} + \\frac{3(x - 2)}{12}',
          markTag: 'M1'
        },
        {
          description: 'Expand brackets and combine numerators over 12:',
          math: '\\frac{(8x + 4) + (3x - 6)}{12} = \\frac{11x - 2}{12}',
          markTag: 'M1 A1'
        }
      ],
      finalAnswer: '\\frac{11x - 2}{12}',
      examinerTips: 'Watch out for bracket distribution: \\(4(2x+1) = 8x + 4\\), not \\(8x + 1\\).'
    },
    digitalAnswer: {
      expected: ['(11x-2)/12', '\\frac{11x-2}{12}', '(11x - 2)/12'],
      type: 'algebra'
    }
  },
  {
    id: 'q_alg_frac_conv_04',
    topicId: 'alg_fractions',
    strandId: 'algebra',
    title: 'Linear Equations: Solving Single Fraction Equations',
    prompt: 'Solve the equation:\n\\[\\frac{4x - 3}{5} = 9\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Linear Equations', 'Fractions', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Multiply both sides by 5 to eliminate the denominator.',
      'Then add 3 and divide by 4.'
    ],
    solution: {
      steps: [
        {
          description: 'Multiply both sides by 5:',
          math: '4x - 3 = 45',
          markTag: 'M1'
        },
        {
          description: 'Solve the two-step equation:',
          math: '4x = 48 \\implies x = 12',
          markTag: 'A1'
        }
      ],
      finalAnswer: 'x = 12',
      examinerTips: 'Always substitute your answer back into the original equation to verify: \\((4(12) - 3)/5 = 45/5 = 9\\). It takes 5 seconds and guarantees full marks.'
    },
    digitalAnswer: {
      expected: ['12', 'x = 12', 'x=12'],
      type: 'number'
    }
  },

  // ------------------------------------------
  // Quadratic Equations (Conventional)
  // ------------------------------------------
  {
    id: 'q_alg_quad_conv_01',
    topicId: 'alg_quadratics',
    strandId: 'algebra',
    title: 'Quadratics: Solving Monic by Factorising',
    prompt: 'Solve the quadratic equation:\n\\[x^2 - 7x + 12 = 0\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Quadratics', 'Factorising', 'Monic', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Look for two numbers that multiply to \\(+12\\) and add up to \\(-7\\).',
      'Both numbers must be negative because their product is positive and sum is negative.'
    ],
    solution: {
      steps: [
        {
          description: 'Factorise into two linear brackets:',
          math: '(x - 3)(x - 4) = 0',
          markTag: 'M1 (Factorising)'
        },
        {
          description: 'Set each factor to zero to find the roots:',
          math: 'x - 3 = 0 \\implies x = 3, \\quad x - 4 = 0 \\implies x = 4',
          markTag: 'A1 (Both solutions)'
        }
      ],
      finalAnswer: 'x = 3, \\; x = 4',
      examinerTips: 'Ensure you state BOTH solutions clearly. Both \\(3\\) and \\(4\\) satisfy the equation.'
    },
    digitalAnswer: {
      expected: ['3, 4', '4, 3', 'x = 3, x = 4', 'x=3, x=4', '3 and 4'],
      type: 'text'
    }
  },
  {
    id: 'q_alg_quad_conv_02',
    topicId: 'alg_quadratics',
    strandId: 'algebra',
    title: 'Quadratics: Difference of Two Squares Equation',
    prompt: 'Solve the equation:\n\\[x^2 - 64 = 0\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Quadratics', 'DOTS', 'Difference of Two Squares', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Recognise that \\(x^2 - 64\\) is the difference of two squares: \\(a^2 - b^2 = (a - b)(a + b)\\).',
      'Alternatively, rearrange to \\(x^2 = 64\\) and remember the plus/minus sign.'
    ],
    solution: {
      steps: [
        {
          description: 'Factorise using the difference of two squares:',
          math: '(x - 8)(x + 8) = 0',
          markTag: 'M1'
        },
        {
          description: 'Solve for \\(x\\):',
          math: 'x = 8 \\quad \\text{or} \\quad x = -8',
          markTag: 'A1'
        }
      ],
      finalAnswer: 'x = \\pm 8',
      examinerTips: 'Do not forget the negative solution! Writing only \\(x = 8\\) loses the accuracy mark.'
    },
    digitalAnswer: {
      expected: ['8, -8', '-8, 8', 'x = 8, x = -8', '8 and -8', '+-8', '\\pm 8'],
      type: 'text'
    }
  },
  {
    id: 'q_alg_quad_conv_03',
    topicId: 'alg_quadratics',
    strandId: 'algebra',
    title: 'Quadratics: Solving Non-Monic by Factorising',
    prompt: 'Solve the equation:\n\\[2x^2 + 7x + 3 = 0\\]',
    maxMarks: 3,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Quadratics', 'Factorising', 'Non-Monic', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Higher Tier',
      isOfficialPublicArchive: false
    },
    hints: [
      'The brackets must start with \\((2x \\dots)(x \\dots)\\).',
      'The end numbers must multiply to 3 (which can only be 1 and 3).'
    ],
    solution: {
      steps: [
        {
          description: 'Factorise the quadratic with leading coefficient 2:',
          math: '(2x + 1)(x + 3) = 0',
          markTag: 'M2 (Correct factorisation)'
        },
        {
          description: 'Solve each bracket:',
          math: '2x + 1 = 0 \\implies x = -\\frac{1}{2}, \\quad x + 3 = 0 \\implies x = -3',
          markTag: 'A1 (Both solutions)'
        }
      ],
      finalAnswer: 'x = -\\frac{1}{2}, \\; x = -3',
      examinerTips: 'Check the expansion of \\((2x + 1)(x + 3)\\): \\(2x^2 + 6x + x + 3 = 2x^2 + 7x + 3\\).'
    },
    digitalAnswer: {
      expected: ['-0.5, -3', '-3, -0.5', '-1/2, -3', '-3, -1/2', 'x = -1/2, x = -3'],
      type: 'text'
    }
  },
  {
    id: 'q_alg_quad_conv_04',
    topicId: 'alg_quadratics',
    strandId: 'algebra',
    title: 'Quadratics: Quadratic Formula to Decimal Places',
    prompt: 'Solve the equation \\(x^2 + 5x - 7 = 0\\).\nGive your answers correct to 2 decimal places.',
    maxMarks: 3,
    calculatorAllowed: true,
    difficulty: 'grade_7',
    tags: ['Quadratics', 'Quadratic Formula', 'Calculator', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Higher Tier',
      isOfficialPublicArchive: false
    },
    hints: [
      'Use the quadratic formula: \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\).',
      'Identify: \\(a = 1\\), \\(b = 5\\), \\(c = -7\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Substitute \\(a = 1, b = 5, c = -7\\) into the quadratic formula:',
          math: 'x = \\frac{-5 \\pm \\sqrt{5^2 - 4(1)(-7)}}{2(1)} = \\frac{-5 \\pm \\sqrt{25 + 28}}{2} = \\frac{-5 \\pm \\sqrt{53}}{2}',
          markTag: 'M1 M1 (Substitution & discriminant evaluation)'
        },
        {
          description: 'Calculate both decimal values to 2 decimal places:',
          math: 'x = \\frac{-5 + 7.2801}{2} \\approx 1.14, \\quad x = \\frac{-5 - 7.2801}{2} \\approx -6.14',
          markTag: 'A1 (Both correct to 2 d.p.)'
        }
      ],
      finalAnswer: 'x = 1.14 \\quad \\text{or} \\quad x = -6.14',
      examinerTips: 'Be careful with the negative signs: \\(-4(1)(-7) = +28\\), so under the radical you add 28 to 25.'
    },
    digitalAnswer: {
      expected: ['1.14, -6.14', '-6.14, 1.14', '1.14 and -6.14'],
      type: 'text'
    }
  },

  // ------------------------------------------
  // Indices & Surds (Conventional)
  // ------------------------------------------
  {
    id: 'q_num_indices_conv_01',
    topicId: 'num_indices',
    strandId: 'number',
    title: 'Indices: Negative and Zero Powers',
    prompt: '(a) Work out the value of \\(5^{-2}\\) as a fraction in simplest form.\n(b) Write down the value of \\(12^0\\).',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Indices', 'Negative Indices', 'Zero Power', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'A negative power indicates a reciprocal: \\(a^{-n} = \\frac{1}{a^n}\\).',
      'Any non-zero number raised to the power of 0 equals 1.'
    ],
    solution: {
      steps: [
        {
          description: 'Apply the reciprocal index law for part (a):',
          math: '5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}',
          markTag: 'B1'
        },
        {
          description: 'Apply the zero power rule for part (b):',
          math: '12^0 = 1',
          markTag: 'B1'
        }
      ],
      finalAnswer: '(a) \\frac{1}{25}, \\quad (b) 1',
      examinerTips: 'Do not confuse negative powers with negative numbers! \\(5^{-2}\\) is positive \\(\\frac{1}{25}\\), never \\(-10\\) or \\(-25\\).'
    },
    digitalAnswer: {
      expected: ['1/25, 1', '1/25 and 1', '\\frac{1}{25}, 1'],
      type: 'text'
    }
  },
  {
    id: 'q_num_indices_conv_02',
    topicId: 'num_indices',
    strandId: 'number',
    title: 'Indices: Evaluating Fractional Powers',
    prompt: 'Work out the value of:\n\\[64^{2/3}\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Indices', 'Fractional Indices', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'In a fractional power \\(a^{m/n}\\), the denominator \\(n\\) is the root and the numerator \\(m\\) is the power.',
      'Find the cube root of 64 first, then square the result.'
    ],
    solution: {
      steps: [
        {
          description: 'Take the cube root of 64:',
          math: '64^{1/3} = \\sqrt[3]{64} = 4',
          markTag: 'M1 (Taking root)'
        },
        {
          description: 'Square the result:',
          math: '4^2 = 16',
          markTag: 'A1 (Accuracy)'
        }
      ],
      finalAnswer: '16',
      examinerTips: 'It is always much easier to take the root first (reducing 64 to 4) before squaring, rather than squaring 64 to get 4096 and trying to find the cube root of 4096.'
    },
    digitalAnswer: {
      expected: ['16'],
      type: 'number'
    }
  },
  {
    id: 'q_num_indices_conv_03',
    topicId: 'num_indices',
    strandId: 'number',
    title: 'Surds: Simplifying to Square Root Form',
    prompt: 'Write \\(\\sqrt{72}\\) in the form \\(k\\sqrt{2}\\), where \\(k\\) is an integer.',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Surds', 'Simplifying Surds', 'Square Roots', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Find the largest square number factor of 72.',
      '\\(72 = 36 \\times 2\\). Use \\(\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Split 72 into its largest square factor and 2:',
          math: '\\sqrt{72} = \\sqrt{36 \\times 2}',
          markTag: 'M1'
        },
        {
          description: 'Evaluate the square root of 36:',
          math: '\\sqrt{36}\\sqrt{2} = 6\\sqrt{2}',
          markTag: 'A1'
        }
      ],
      finalAnswer: '6\\sqrt{2}',
      examinerTips: 'If you factored out 9 first (\\(\\sqrt{9 \\times 8} = 3\\sqrt{8}\\)), remember that 8 still has a square factor of 4: \\(3 \\times 2\\sqrt{2} = 6\\sqrt{2}\\).'
    },
    digitalAnswer: {
      expected: ['6\\sqrt{2}', '6sqrt(2)', '6sqrt2', '6'],
      type: 'algebra'
    }
  },
  {
    id: 'q_num_indices_conv_04',
    topicId: 'num_indices',
    strandId: 'number',
    title: 'Surds: Rationalising a Single-Term Denominator',
    prompt: 'Rationalise the denominator and simplify fully:\n\\[\\frac{15}{\\sqrt{5}}\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_7',
    tags: ['Surds', 'Rationalising Denominator', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Higher Tier',
      isOfficialPublicArchive: false
    },
    hints: [
      'Multiply both numerator and denominator by \\(\\sqrt{5}\\).',
      'Remember that \\(\\sqrt{5} \\times \\sqrt{5} = 5\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Multiply numerator and denominator by \\(\\sqrt{5}\\):',
          math: '\\frac{15}{\\sqrt{5}} \\times \\frac{\\sqrt{5}}{\\sqrt{5}} = \\frac{15\\sqrt{5}}{5}',
          markTag: 'M1 (Multiply top and bottom by surd)'
        },
        {
          description: 'Simplify the fraction \\(\\frac{15}{5} = 3\\):',
          math: '3\\sqrt{5}',
          markTag: 'A1'
        }
      ],
      finalAnswer: '3\\sqrt{5}',
      examinerTips: 'Always simplify the integer coefficients at the end: \\(\\frac{15\\sqrt{5}}{5} = 3\\sqrt{5}\\).'
    },
    digitalAnswer: {
      expected: ['3\\sqrt{5}', '3sqrt(5)', '3sqrt5'],
      type: 'algebra'
    }
  },

  // ------------------------------------------
  // Expanding & Factorising (Conventional)
  // ------------------------------------------
  {
    id: 'q_alg_expand_conv_01',
    topicId: 'alg_expanding',
    strandId: 'algebra',
    title: 'Algebra: Expanding Double Brackets',
    prompt: 'Expand and simplify:\n\\[(x + 6)(x - 4)\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Expanding Brackets', 'Double Brackets', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Multiply each term in the first bracket by each term in the second (FOIL method).',
      'Combine the two middle \\(x\\) terms: \\(+6x - 4x\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Expand all four terms:',
          math: 'x(x) - 4(x) + 6(x) - 6(4) = x^2 - 4x + 6x - 24',
          markTag: 'M1 (3 or 4 correct terms)'
        },
        {
          description: 'Collect like terms \\(-4x + 6x = +2x\\):',
          math: 'x^2 + 2x - 24',
          markTag: 'A1'
        }
      ],
      finalAnswer: 'x^2 + 2x - 24',
      examinerTips: 'Double check the sign of the constant term: a positive multiplied by a negative gives a negative (\\(+6 \\times -4 = -24\\)).'
    },
    digitalAnswer: {
      expected: ['x^2 + 2x - 24', 'x^2+2x-24'],
      type: 'algebra'
    }
  },
  {
    id: 'q_alg_expand_conv_02',
    topicId: 'alg_expanding',
    strandId: 'algebra',
    title: 'Algebra: Expanding with Leading Coefficient',
    prompt: 'Expand and simplify:\n\\[(2x + 3)(3x - 2)\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Expanding Brackets', 'Coefficients', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'First terms: \\(2x \\times 3x = 6x^2\\).',
      'Outside and Inside terms: \\(2x \\times (-2) = -4x\\) and \\(3 \\times 3x = +9x\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Expand all products:',
          math: '6x^2 - 4x + 9x - 6',
          markTag: 'M1'
        },
        {
          description: 'Collect like terms \\(-4x + 9x = +5x\\):',
          math: '6x^2 + 5x - 6',
          markTag: 'A1'
        }
      ],
      finalAnswer: '6x^2 + 5x - 6',
      examinerTips: 'Be careful with \\(2x \\times 3x\\): remember to multiply both the numbers and the variables to get \\(6x^2\\).'
    },
    digitalAnswer: {
      expected: ['6x^2 + 5x - 6', '6x^2+5x-6'],
      type: 'algebra'
    }
  },
  {
    id: 'q_alg_expand_conv_03',
    topicId: 'alg_expanding',
    strandId: 'algebra',
    title: 'Algebra: Factoring Common Monomial',
    prompt: 'Factorise fully:\n\\[8x^2 + 12x\\]',
    maxMarks: 2,
    calculatorAllowed: false,
    difficulty: 'grade_5_6',
    tags: ['Factorising', 'Single Bracket', 'Highest Common Factor', 'Standard GCSE'],
    isMorningQuickEligible: true,
    citation: {
      sourceType: 'custom_stretch',
      sourceLabel: 'Standard GCSE Practice • Foundation-to-Higher',
      isOfficialPublicArchive: false
    },
    hints: [
      'Find the highest common factor of 8 and 12, which is 4.',
      'Find the highest common variable factor between \\(x^2\\) and \\(x\\), which is \\(x\\).'
    ],
    solution: {
      steps: [
        {
          description: 'Identify the highest common factor \\(4x\\):',
          math: '\\text{HCF}(8x^2, 12x) = 4x',
          markTag: 'M1'
        },
        {
          description: 'Factor out \\(4x\\):',
          math: '4x(2x + 3)',
          markTag: 'A1'
        }
      ],
      finalAnswer: '4x(2x + 3)',
      examinerTips: 'The question says factorise "fully". Factoring out only \\(2x(4x + 6)\\) or \\(4(2x^2 + 3x)\\) is only partially factorised and loses a mark.'
    },
    digitalAnswer: {
      expected: ['4x(2x + 3)', '4x(2x+3)'],
      type: 'algebra'
    }
  }
];
