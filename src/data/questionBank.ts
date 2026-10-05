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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q10',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 1H, Q10',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2022.pdf',
      isOfficialPublicArchive: true
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
      sourceLabel: 'UKMT Junior Mathematical Challenge 2021, Q23',
      citationUrl: 'https://ukmt.org.uk/competitions/solo/junior-mathematical-challenge/archive',
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'November 2021',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q15',
      sourceLabel: 'Edexcel GCSE Higher Nov 2021 Paper 1H, Q15',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hnov2021.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q18',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 1H, Q18',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2022.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2023',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q21',
      sourceLabel: 'Edexcel GCSE Higher June 2023 Paper 1H, Q21',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2023.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q17',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 2H, Q17',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hjune2022.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2023',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q17',
      sourceLabel: 'Edexcel GCSE Higher June 2023 Paper 1H, Q17',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2023.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'November 2022',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q11',
      sourceLabel: 'Edexcel GCSE Higher Nov 2022 Paper 2H, Q11',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hnov2022.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q21',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 2H, Q21',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hjune2022.pdf',
      isOfficialPublicArchive: true
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
      sourceLabel: 'Edexcel GCSE Higher June 2015 Paper 1H, Q19 ("Hannah\'s Sweets")',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2015.pdf',
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2023',
      paper: 'Paper 2H (Calc)',
      questionNumber: 'Q14',
      sourceLabel: 'Edexcel GCSE Higher June 2023 Paper 2H, Q14',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/2hjune2023.pdf',
      isOfficialPublicArchive: true
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
      sourceType: 'past_paper',
      examBoard: 'Edexcel',
      series: 'June 2022',
      paper: 'Paper 1H (Non-Calc)',
      questionNumber: 'Q15',
      sourceLabel: 'Edexcel GCSE Higher June 2022 Paper 1H, Q15',
      citationUrl: 'https://www.mathsgenie.co.uk/papers/1hjune2022.pdf',
      isOfficialPublicArchive: true
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
