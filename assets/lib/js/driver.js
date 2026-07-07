$("#start-tour").on("click", function () {
  const driver = window.driver.js.driver;

  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showProgress: true,
    showButtons: ["next", "previous"],
    steps: [
      {
        popover: {
          title: "Welcome",
          description: "Welcome! Let me give you a quick tour of my portfolio.",
        },
      },
      {
        element: "#about-me",
        popover: {
          title: "About Me",
          description: "Hi, I'm Mifta. Here's a brief introduction about me.",
        },
      },
      {
        element: "#avatar",
        popover: {
          title: "Profile Photo",
          description: "This is what I look like.",
        },
      },
      {
        element: "#education-section",
        popover: {
          title: "Education",
          description:
            "Here's my educational background. I graduated with a Bachelor's degree in Informatics and a GPA of 3.55.",
        },
      },
      {
        element: "#work-exp",
        popover: {
          title: "Work Experience",
          description:
            "Explore my professional experience. Click any item to view more details.",
        },
      },
      {
        element: "#skills",
        popover: {
          title: "Skills",
          description:
            "These are the technical skills I've developed throughout my career.",
        },
      },
      {
        element: "#certificates",
        popover: {
          title: "Certificates",
          description:
            "Here are the certifications I've earned to support my professional development.",
        },
      },
      {
        element: "#project",
        popover: {
          title: "Projects",
          description: "Take a look at some of the projects I've worked on.",
        },
      },
      {
        element: "#list-contact",
        popover: {
          title: "Contact Me",
          description:
            "Feel free to reach out through any of these contact methods.",
        },
      },
      {
        element: "#form-input-contact-me",
        popover: {
          title: "Contact Form",
          description:
            "You can also send me a message directly using this contact form.",
        },
      },
      {
        element: "#footer-job-position",
        popover: {
          title: "Career Interests",
          description:
            "These are the roles and positions I'm currently interested in.",
        },
      },
      {
        element: "#footer-social-media",
        popover: {
          title: "Social Media",
          description:
            "Let's connect! You can find me on these social platforms.",
        },
      },
      {
        element: "#footer-website",
        popover: {
          title: "Domains",
          description: "These are the domains and websites I own and manage.",
        },
      },
      {
        element: "#powerby",
        popover: {
          title: "Built With",
          description:
            "This portfolio was built using these technologies and tools.",
        },
      },
      {
        element: "#visit-count-section",
        popover: {
          title: "Visitor Statistics",
          description:
            "Track the number of visits today, this week, this month, and this year.",
        },
      },
      {
        element: "#download-cv-btn-1",
        popover: {
          title: "Download My Resume",
          description:
            "Download my resume here, or simply press <span class='badge text-bg-danger'>Ctrl + P</span>.",
        },
      },
    ],
  });

  driverObj.drive();
});
