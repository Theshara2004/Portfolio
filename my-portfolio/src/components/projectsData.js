export const projects = [
  {
    id: 'project-1',
    title: 'Whispering Forest',
    description:
      "A tense first-person horror game built for my Game Engine Architecture coursework. The player must navigate a landmark-based forest to find a randomized exit while surviving 'Whispering Angels'—AI enemies that relentlessly pursue the player when out of sight but freeze instantly when looked at.",
    techStack: ['Unreal Engine 5', 'Blueprints'],
    coverImage: 'Images/Whispering-Forest-CoverPhoto.png',
    videoEmbed: 'https://www.youtube.com/embed/b-wU6507Tkc?si=HYFpPlBgvjkHQYss',
    contributions: [
      'Procedural Forest Generation: Utilized the UE5 PCG framework to generate a dense, scalable forest environment with optimized foliage placement.',
      '"Weeping Angel" AI: Engineered a custom line-of-sight mechanic that stops enemy movement instantly when rendered within the player\'s camera frustum.',
      'Environmental Navigation: Designed distinct landmarks—including graveyards, abandoned houses, and burning cars—to provide non-intrusive player guidance and atmospheric storytelling.',
      'Dynamic Exit System: Programmed a randomized escape logic that selects one of four possible exits per session, ensuring high replayability.',
      'Flashlight & Resource Logic: Developed a torch system integrated with a battery pickup mechanic, forcing players to manage limited resources under pressure.',
      'Stamina & Movement: Implemented a responsive sprinting system with calculated depletion and regeneration curves to balance player pacing.',
    ],
    codeShowcase: {
      label: 'Blueprint for the PCG Forest:',
      image: 'Images/PCG-Blueprints.png',
      alt: 'Blueprint for the PCG Forest',
    },
    blueprintEmbed: 'https://blueprintue.com/render/a4kwkil2/',
    links: [
      {
        label: 'Play Now',
        url: 'https://studentsiitac-my.sharepoint.com/personal/theshara_20240689_iit_ac_lk/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ftheshara%5F20240689%5Fiit%5Fac%5Flk%2FDocuments%2FGame%20Engine%20Architecture&ga=1',
      },
    ],
  },
  {
    id: 'project-2',
    title: 'WanderVerse',
    description:
      "A gamified mobile learning platform designed to pivot children's digital engagement toward academic success. WanderVerse integrates the Sri Lankan Grade 3 Mathematics syllabus into an interactive virtual world, transforming traditional curriculum into a series of engaging, high-stakes mini-games.",
    techStack: ['Unity', 'C#'],
    coverImage: 'Images/WanderVerse-cover.png',
    contributionTitle: 'My Contributions',
    contributions: [
      'Lead Development & Integration: Served as the technical lead for the project, architecting the core framework and managing the seamless integration of multiple modules into a single, cohesive Unity build.',
      'Multi-Game Systems: Designed and programmed three distinct mini-games, each featuring scalable difficulty levels specifically mapped to 1st-term mathematical learning outcomes.',
      'Dynamic Screen Scaling: Engineered a robust, responsive UI system to ensure consistent layout and gameplay performance across a wide variety of mobile aspect ratios and resolutions.',
    ],
    gallery: [
      { src: 'Images/WanderVerse-gif.gif', alt: 'Gif of Minigame Treasure Packer' },
      { src: 'Images/Bakery.png', alt: 'Image of Minigame Bakery' },
      { src: 'Images/Hungry Golem.png', alt: 'Image of Minigame Hungry Golem' },
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/WanderVerse-Team/WanderVerse' },
      { label: 'View Website', url: 'https://wanderverse.wuaze.com/' },
    ],
  },
  {
    id: 'project-3',
    title: 'Vector-Based Motion & Orbital Mechanics Simulation',
    description:
      "A technical demonstration of core physics principles and vector mathematics within Unity made for the 'Maths and Physics for Games' module. This project involved building custom motion engines without the use of built-in physics for specific tasks, followed by a fully realized space themed game leveraging rigidbodies, joints, and collision systems.",
    techStack: ['Unity', 'C#'],
    coverImage: 'Images/Physics-Cover.png',
    contributions: [
      "Custom 3D Trajectory Engine (Task 1): Engineered a projectile motion simulation from scratch using only Transform and Vector3 logic—bypassing Unity's Rigidbody system. Implemented a variable coefficient of restitution to realistically simulate kinetic energy loss during surface bounces.",
      'Mathematical Path Following (Task 2): Developed an "Ease-In, Ease-Out" waypoint navigation system using vector mathematics to ensure smooth, continuous motion between dynamic targets. Designed the system to allow real-time waypoint manipulation without breaking path-finding logic.',
      'Physics-Based Space Cargo System (Task 3): Built a space-themed game utilizing Unity\'s full physics suite, including Hinge and Fixed Joints to create a flexible cargo tether. Programmed custom rocket thruster logic, fuel consumption curves, and collision penalties to create a high-stakes balancing act.',
    ],
    gallery: [
      { src: 'Images/task1-gif.gif', alt: 'Gif of First Task' },
      { src: 'Images/task2-gif.gif', alt: 'Gif of Second Task' },
      { src: 'Images/task3-gif (online-video-cutter.com).gif', alt: 'Gif of Third Task' },
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/WanderVerse-Team/WanderVerse' },
    ],
  },
];
