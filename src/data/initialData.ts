import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: "L.S.Shabari",
    initials: "LS",
    tagline: "ECE Undergrad • VLSI, Embedded Systems, IIoT & Vibe Coding",
    taglineHighlight: "VLSI & IIoT innovations",
    domainTags: [
      "VLSI Design",
      "Embedded Systems",
      "Industrial IoT (IIoT)",
      "Communication Systems",
      "Electronics & Comm",
      "Vibe Coding",
      "Website Builder",
      "Content Creator",
      "Engineering Services",
    ],
    currentDegree: "Bachelor of Technology in Electronics and Communication Engineering",
    institution: "KCG College Of Technology",
    yearOfStudy: "2nd Year (3rd Semester)",
    expectedGraduation: "June 2028",
    bio: "Passionate Electronics and Communication Engineering undergraduate at KCG College of Technology. Dedicated to mastering VLSI chip design, embedded microcontrollers (STM32, ESP32, Arduino), Industrial IoT architectures, vibe coding, and delivering technology services.",
    netPortfolioSummary: "Driven ECE student building hardware-software integrated systems, smart sensor telemetry for IIoT, digital circuit simulations, and rapid web prototypes with vibe coding workflows.",
    socialLinks: {
      github: "https://github.com/shabari-vlsi-embedded-ml",
      linkedin: "https://linkedin.com",
      email: "shabariprojects12@gmail.com",
    },
  },

  skills: [
    { id: 'sk-1', name: 'Digital Electronics & Logic Design', category: 'Electronics', proficiency: 90, experience: '2 years' },
    { id: 'sk-2', name: 'Verilog HDL & FPGA Simulation', category: 'VLSI', proficiency: 85, experience: '1.5 years' },
    { id: 'sk-3', name: 'Embedded C / C++ & Microcontrollers', category: 'Embedded', proficiency: 88, experience: '2 years' },
    { id: 'sk-4', name: 'ESP32, STM32 & Arduino Prototyping', category: 'Embedded', proficiency: 92, experience: '2 years' },
    { id: 'sk-5', name: 'IIoT Protocols (MQTT, Modbus, HTTP)', category: 'IIoT', proficiency: 84, experience: '1.5 years' },
    { id: 'sk-6', name: 'Signals & Communication Systems', category: 'Communication', proficiency: 82, experience: '1.5 years' },
    { id: 'sk-7', name: 'PCB Design & Circuit Schematics (KiCad)', category: 'Electronics', proficiency: 80, experience: '1 year' },
    { id: 'sk-8', name: 'Vibe Coding & AI-Driven Toolchains', category: 'Vibe Coding', proficiency: 94, experience: '2 years' },
    { id: 'sk-9', name: 'Next.js, React & Website Building', category: 'Website Builder', proficiency: 86, experience: '1.5 years' },
    { id: 'sk-10', name: 'Technical Content & Documentation', category: 'Content Creator', proficiency: 88, experience: '2 years' },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Industrial IoT Telemetry Hub & Sensor Node',
      description: 'Engineered an edge IIoT gateway using ESP32 communicating via MQTT to monitor industrial machine vibration, temperature, and power fluctuations with real-time alerts.',
      techStack: ['ESP32', 'FreeRTOS', 'MQTT', 'Embedded C', 'InfluxDB', 'Next.js'],
      status: 'in_progress',
      category: 'IIoT',
      targetEndDate: 'Jan 15, 2027',
      progressPercent: 75,
      keyAchievements: [
        'Transmitted sensor telemetry with 99.8% packet reliability',
        'Built automated power-fail backup log to EEPROM memory',
      ],
    },
    {
      id: 'proj-2',
      title: '8-Bit RISC Processor Core in Verilog HDL',
      description: 'Designed, synthesized, and verified an 8-bit pipelined RISC architecture with customized ALU, register bank, and instruction decoder.',
      techStack: ['Verilog HDL', 'ModelSim', 'Xilinx Vivado', 'Digital Electronics'],
      status: 'completed',
      category: 'VLSI',
      progressPercent: 100,
      keyAchievements: [
        'Verified timing closure with 0 setup/hold violations',
        'Simulated 32-instruction benchmark test suite',
      ],
    },
    {
      id: 'proj-3',
      title: 'Smart Smart Home & Agriculture Automation System',
      description: 'Multi-node sensor network with LoRa long-range wireless communication for automated irrigation and soil moisture analysis.',
      techStack: ['LoRa SX1278', 'Arduino', 'C++', 'Sensors', 'Blynk Cloud'],
      status: 'completed',
      category: 'Embedded',
      progressPercent: 100,
      keyAchievements: [
        'Achieved 1.5km reliable wireless transmission range',
        'Reduced water consumption by 35% in field trial',
      ],
    },
  ],

  prizes: [
    {
      id: 'prize-1',
      title: 'Best Embedded Hardware Innovation',
      competition: 'Inter-Collegiate Tech Fest 2026',
      organizer: 'Engineering Society',
      position: '1st Place Winner',
      year: '2026',
      description: 'Recognized for designing a low-cost, ultra-reliable smart energy meter and automated circuit cutoff device.',
    },
  ],

  extracurriculars: [
    {
      id: 'ec-1',
      role: 'Active Member & Hardware Lead',
      organization: 'ECE Technical & Robotics Club, KCG College of Technology',
      period: '2025 - Present',
      description: 'Active contributor in micro-controller workshops, hands-on breadboard prototyping sessions, and collaborative technical projects.',
      highlights: [
        'Conducted beginner workshops on Arduino and circuit debugging',
        'Collaborated on autonomous line-follower robot design',
      ],
    },
  ],

  courses: [
    {
      id: 'crs-1',
      title: 'Digital Signal Processing & Microcontroller Interfacing',
      platform: 'NPTEL / University Curriculum',
      instructor: 'Professors of ECE',
      completedDate: 'November 2026',
      keyTopics: ['Z-Transforms', 'FIR/IIR Filters', 'ADC/DAC Interfacing', 'Interrupt Handlers'],
    },
  ],

  certificates: [
    {
      id: 'cert-1',
      title: 'VLSI Design & Digital Circuit Verification',
      issuer: 'Technical Certification Authority',
      issueDate: 'October 2026',
      badgeId: 'VLSI-ECE-2026',
    },
  ],

  monitor: {
    projectsToEnd: [
      {
        id: 'p-end-1',
        title: 'Industrial IoT Telemetry Hub & Sensor Node',
        targetEndDate: '2027-01-15',
        progress: 75,
        priority: 'High',
        pendingMilestones: [
          'Design 2-layer PCB in KiCad and order fabrication',
          'Integrate hardware watchdog timer for crash recovery',
          'Deploy web monitoring dashboard',
        ],
      },
    ],
    topicsToStudy: [
      {
        id: 'top-1',
        topic: 'CMOS Analog VLSI & Operational Transconductance Amplifiers (OTA)',
        category: 'VLSI Design',
        status: 'Learning',
        targetDate: '2026-12-30',
        notes: 'Studying Razavi analog CMOS circuits and cadence simulation techniques.',
      },
      {
        id: 'top-2',
        topic: 'RTOS Task Scheduling & Semaphores in FreeRTOS',
        category: 'Embedded Systems',
        status: 'To Learn',
        targetDate: '2027-01-20',
        notes: 'Practice mutexes, queue synchronization, and interrupt service routines on STM32.',
      },
    ],
    focusAreas: [
      {
        id: 'foc-1',
        title: 'VLSI Design & Hardware Description Languages (HDL)',
        timeframe: 'Current Semester Focus',
        concentrationWeight: 45,
        description: 'Focusing on digital logic synthesis, Verilog RTL modeling, and timing closure.',
        keyGoals: [
          'Complete FPGA UART transceiver implementation',
          'Score top grade in Digital Electronics and Linear Integrated Circuits',
        ],
      },
      {
        id: 'foc-2',
        title: 'Embedded Systems & Industrial IoT Hardware',
        timeframe: 'Secondary Focus',
        concentrationWeight: 35,
        description: 'Building connected devices with reliable microcontroller firmware and sensor drivers.',
        keyGoals: [
          'Assemble working PCB prototype for IIoT node',
          'Write comprehensive technical documentation and content',
        ],
      },
      {
        id: 'foc-3',
        title: 'Vibe Coding, Web Solutions & Content Services',
        timeframe: 'Applied Tech Track',
        concentrationWeight: 20,
        description: 'Using AI workflows and modern web stacks to build client solutions and publish content.',
        keyGoals: [
          'Deploy personal portfolio and service offering portal',
          'Publish monthly engineering breakdowns and videos',
        ],
      },
    ],
  },
};
