export interface File {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: {
    [key: string]: Directory | File;
  };
}

export const file_structure: Directory = {
  type: 'directory',
  children: {
    'home': {
      type: 'directory',
      children: {
        'myk-src': {
          type: 'directory',
          children: {
            'about': {
              type: 'file',
              content: `
                Hello! My name is Michael Yim

                I'm a passionate and driven individual currently pursuing a Computer Engineering 
                major at Georgia Institute of Technology, 
                specializing in Distributed Software 
                and System Design and Signal and Information Processing. 
                With minors in Robotics for Automation, Perception, and Applications of 
                Artificial Intelligence and Machine Learning, 
                my academic journey is rich and diverse, encompassing topics 
                like computer vision, machine learning, digital system design, and more.

                My professional experience includes a software engineering internship at Home Depot, 
                where I showcased adaptability and innovation, and various roles at a local company, 
                where I honed my skills in system engineering and management. I have also 
                undertaken numerous projects, such as developing a Student Management Dashboard with 
                MongoDB, creating APIs for course and task management, and designing a NeoLoad API workflow 
                integrated with Google Cloud and BigQuery.

                BS CmpE @ GT      Intern end        Intern end        Intern end             ?
                  202▓.08           2023.08           2024.08           2025.08           ???????
                     ╚════════╦════════╩════════╦════════╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═┬═─═─═─═─╩─═─═─═─═ ⋯ →
                           2023.05           2024.05           2025.05           2026.05
                        Intern @ KNC     SWE intern @ THD   SWE intern @ ???   Graduate BS

                Beyond my academic and professional pursuits, I have a multitude of interests ranging 
                from high-fidelity audio, gaming, and space, to personal finance, fitness, and fashion. 
                My hobbies reflect my love for learning and creativity, with a particular fondness for 
                food and art.

                Balancing my professional aspirations with personal commitments, I am also a proud parent 
                to a wonderful ▓-year-old son, finding immense joy and accomplishment in parenthood. 
                As I aim for an MBA or MS in Machine Learning, AI, or Data Science, followed by a PhD, 
                my ultimate goal is to excel as an AI or Robotics Engineer, contributing to 
                advancements in technology while embracing the journey of continuous learning and growth.
              `
            },
            'contact': {
              type: 'file',
              content: `
                Email MichaelYYim@gmail.com
                GitHub myk-src
                LinkedIn Michael Yim-Olmos
                LeetCode Mikey091303
                CodePen myk-src
                HackerRank MichaelYYim
                Stack Overflow Michael Yoosung Yim-Olmos
                Medium MichaelYYim
              `
            },
            'projects': {
              type: 'file',
              content: `
                (Ongoing) High-Fidelity Audio Player Mobile Hardware
                < KiCAD|Digital Signal Processing|Circuit Design|Electrical Design|Systems Engineering >
                Designed a high-fidelity audio player circuit, compatible with custom headphone amplifiers and in-ear monitors. Currently developing an embedded system with a bespoke Hi-Fi music application for superior audio playback.
                
                (Ongoing) High-Fidelity Lossless Music System Embedded System
                < Systems Engineering|Software Engineering|C++ >
                Developing a high-resolution, lossless audio music playing operating system tailored for a custom audio player, aimed at delivering audiophile-grade sound quality and user satisfaction.
                
                (2024-07) Student Dashboard Web Application
                < JavaScript|MongoDB|Express|Node|React|Material UI|Software Engineering|Data Science|Framer Motion|Styled Components|Python|BeautifulSoup|Flask >
                Built a centralized academic tracking platform using MongoDB, Express.js, Node.js, React.js, and Bootstrap. This tool has improved students organizational efficiency by providing a comprehensive overview of their academic progress and deadlines.
                
                (2024-05) Asteroids Game Game Boy Advance Video Game
                < C >
                Created a clone of the classic Asteroids arcade game for the GameBoy Advanced, utilizing advanced C programming skills and a deep understanding of ARM processor architecture to replicate the games mechanics and performance.
                
                (2024-04) Wrap it Up Mobile Application
                < Java|Android Studio|Software Engineering >
                Developed an Android application leveraging the Spotify API, OpenAI API, and Firebase to provide year-round Spotify wrapped summaries. This tool allows users to track, share, and compare their top music with friends throughout the year.
                
                (2024-03) Headphone Amplifier with DAC Audio Hardware
                < Digital Signal Processing|Circuit Design|Electrical Design >
                Created a high-fidelity sound amplifier circuit featuring a detachable digital-to-analog converter (DAC), providing exceptional audio performance and versatility for audiophiles.
                
                (2024-03) In-Ear Monitors Audio Hardware
                < Digital Signal Processing|Circuit Design|Electrical Design >
                Engineered a circuit for custom in-ear monitors equipped with a microphone and active noise cancellation, significantly improving audio quality and user immersion.
                
                (2024-01) Ergonomic Orthodox Keyboard Keyboard
                < QMK|KiCAD|Circuit Design|Electrical Design >
                Designed and developed an ergonomic keyboard using KiCad, optimizing for user comfort and efficiency. Flashed the firmware with Quantum Mechanical Keyboard (QMK) to enhance customizability and user experience.
                
                (2024-01) Rogue-Like Game Video Game
                < Python|TCOD >
                Developed an ASCII styled roguelike game in Python, showcasing proficiency in advanced programming techniques, basic artificial intelligence, and creative problem-solving abilities in game design.
                
                (2023-09) Nutrition Tracker Desktop Application
                < Java|JavaFX|Software Engineering >
                Created a Java and JavaFX desktop application for tracking daily nutrition intake, enhancing user adherence to dietary goals with intuitive tracking features and personalized recommendations.
                
                (2023-05) Adventure Game Video Game
                < C++|SDL|OpenGL >
                Designed and programmed a graphical adventure game in C++ with SDL, demonstrating advanced skills in game development, including game logic, graphics rendering, and user interaction.
                
                (2023-05) Music Explorer Application Desktop Application
                < Java|JavaFX|Software Engineering >
                Integrated Spotify, LastFM, and iTunes APIs using Java and JavaFX to create a comprehensive music exploration tool, enabling seamless discovery and exploration of new music tracks and artists.
              `
            },
            'skills': {
              type: 'file',
              content: `
                Cloud:
                - 80% AWS
                - 85% GCP
                - 75% Azure
                Database:
                - 75% SQLite
                - 80% MySQL
                - 85% BigQuery
                - 80% MongoDB
                - 70% Prometheus
                - 75% Firebase
                Frameworks:
                - 80% Flask
                - 75% Django
                - 70% PyTorch
                - 70% TensorFlow
                - 75% Spring Boot
                - 80% React
                - 70% Vue
                - 80% Express
                - 65% Angular
                - 80% Node
                - 75% Bootstrap
                - 70% Tailwind
                - 70% Sass
                Languages:
                - 90% Java
                - 85% C
                - 85% C++
                - 70% R
                - 95% Python
                - 80% JavaScript
                - 75% TypeScript
                - 80% HTML
                - 75% CSS
                - 65% Kotlin
                - 60% Go
                - 85% SQL
                - 70% GraphQL
                - 80% Bash
                - 65% MATLAB
                Libraries:
                - 70% JavaFX
                - 65% OpenGL
                - 85% Pandas
                - 85% NumPy
                - 80% Matplotlib
                - 75% BeautifulSoup
                - 70% OpenCV
                - 70% jQuery
                - 65% Framer Motion
                - 100% Styled Components
                - 85% Material UI
                Operating systems:
                - 85% Linux
                - 80% Windows
                - 75% Mac
                Software:
                - 90% Microsoft Office Suite
                - 75% Adobe Suite
                - 95% VS Code
                - 75% Jupyter Notebooks
                - 85% JetBrains
                - 90% Android Studio
                - 65% Emacs
                - 70% Vim
                - 60% AutoCAD
                - 70% KiCAD
                - 70% QMK
                - 60% Unreal Engine
                - 65% Unity
                - 80% Figma
                Techniques:
                - 60% Circuit Design
                - 55% Electrical Design
                - 70% Automation
                - 70% Test Engineering
                - 75% Performance Engineering
                - 55% Cloud Computing
                - 80% Software Engineering
                - 60% Data Science
                - 45% System Engineering
                - 50% Distributed Computing
                - 45% Digital Signal Processing
                Tools:
                - 85% Git
                - 80% Docker
                - 75% Kubernetes
                - 70% Tableau
                - 70% PowerBI
                - 75% Grafana
                - 70% NeoLoad
                - 80% Postman
                - 60% 3D-Printing
                - 50% Oscilloscope
                - 55% Multimeter
                - 75% Soldering Iron
              `
            },
            'resume': {
              type: 'file',
              content: `
                Michael Y Yim
                MichaelYYim@gmail.com | (***) ***-**** | *****, GA | LinkedIn | GitHub | Portfolio
                
                SKILLS
                Hard Skills:
                Cloud: AWS, GCP, Azure
                Database: SQLite, MySQL, BigQuery, MongoDB, Prometheus, Firebase
                Frameworks: Flask, Django, PyTorch, TensorFlow, Spring Boot, React, Vue, Express, Angular, Node, Bootstrap, Tailwind, Sass
                Languages: Java, C, C++, R, Python, JavaScript, TypeScript, HTML, CSS, Kotlin, Go, SQL, GraphQL, Bash, MATLAB
                Libraries: JavaFX, OpenGL, Pandas, NumPy, Matplotlib, BeautifulSoup, OpenCV, jQuery, Framer Motion, Styled Components, Material UI
                Operating systems: Linux, Windows, Mac
                Software: Microsoft Office Suite, Adobe Suite, VS Code, Jupyter Notebooks, JetBrains, Android Studio, Emacs, Vim, AutoCAD, KiCAD, QMK, Unreal Engine, Unity, Figma
                Techniques: Circuit Design, Electrical Design, Automation, Test Engineering, Performance Engineering, Cloud Computing, Software Engineering, Data Science, System Engineering, Distributed Computing, Digital Signal Processing
                Tools: Git, Docker, Kubernetes, Tableau, PowerBI, Grafana, NeoLoad, Postman, 3D-Printing, Oscilloscope, Multimeter, Soldering Iron
                Soft Skills:
                Communication, Teamwork, Problem-solving, Project Planning, Project Management, Time Management, Adaptability
                
                EDUCATION
                Georgia Institute of Technology - Bachelor of Science in Computer Engineering
                Expected December 2026 Atlanta, GA
                - Concentrations: Distributed System & Software Design and Signal Information Processing
                - Minors: Robotics and Applications of Artificial Intelligence and Machine Learning
                - Cumulative GPA: 3.85
                - Relevant Coursework:
                  - Differential Equations
                  - Fundamentals of Machine Learning
                  - Architecture, Systems, Concurrency, and Energy
                  - Programming Hardware and Software Systems
                  - Digital Design Lab
                  - Introduction to Signal Processing
                  - Digital System Design
                  - Design and Analysis of Algorithms
                  - Introduction to Database Systems
                  - Multivariable Calculus
                  - Statistics and Probability with Applications
                  - Linear Algebra
                  - Objects and Design
                  - Data Structures and Algorithms
                  - Computer Organization and Programming
                  - Introduction to Object Oriented Programming
                  - Physics II: Electromagnetism
                  - Physics I: Kinematics
                  - Integral Calculus
                  - Differential Calculus
                  - Principles of Macroeconomics
                - Awards: Deans List x6, Highest Honors

                PROJECTS
                Ergonomic Orthodox Keyboard - Keyboard
                - Designed and developed an ergonomic keyboard using KiCad, optimizing for user comfort and efficiency. Flashed the firmware with Quantum Mechanical Keyboard (QMK) to enhance customizability and user experience.
                In-Ear Monitors - Audio Hardware
                - Engineered a circuit for custom in-ear monitors equipped with a microphone and active noise cancellation, significantly improving audio quality and user immersion.
                Headphone Amplifier with DAC - Audio Hardware
                - Created a high-fidelity sound amplifier circuit featuring a detachable digital-to-analog converter (DAC), providing exceptional audio performance and versatility for audiophiles.
                High-Fidelity Audio Player - Mobile Hardware
                - Designed a high-fidelity audio player circuit, compatible with custom headphone amplifiers and in-ear monitors. Currently developing an embedded system with a bespoke Hi-Fi music application for superior audio playback.
                High-Fidelity Lossless Music System - Embedded System
                - Developing a high-resolution, lossless audio music playing operating system tailored for a custom audio player, aimed at delivering audiophile-grade sound quality and user satisfaction.
                Music Explorer Application - Desktop Application
                - Integrated Spotify, LastFM, and iTunes APIs using Java and JavaFX to create a comprehensive music exploration tool, enabling seamless discovery and exploration of new music tracks and artists.
                Wrap it Up - Mobile Application
                - Developed an Android application leveraging the Spotify API, OpenAI API, and Firebase to provide year-round Spotify wrapped summaries. This tool allows users to track, share, and compare their top music with friends throughout the year.
                Nutrition Tracker - Desktop Application
                - Created a Java and JavaFX desktop application for tracking daily nutrition intake, enhancing user adherence to dietary goals with intuitive tracking features and personalized recommendations.
                Student Dashboard - Web Application
                - Built a centralized academic tracking platform using MongoDB, Express.js, Node.js, React.js, and Bootstrap. This tool has improved students organizational efficiency by providing a comprehensive overview of their academic progress and deadlines.
                Adventure Game - Video Game
                - Designed and programmed a graphical adventure game in C++ with SDL, demonstrating advanced skills in game development, including game logic, graphics rendering, and user interaction.
                Rogue-Like Game - Video Game
                - Developed an ASCII styled roguelike game in Python, showcasing proficiency in advanced programming techniques, basic artificial intelligence, and creative problem-solving abilities in game design.
                Asteroids Game - Game Boy Advance Video Game
                - Created a clone of the classic Asteroids arcade game for the GameBoy Advanced, utilizing advanced C programming skills and a deep understanding of ARM processor architecture to replicate the games mechanics and performance.

                EXPERIENCE
                The Home Depot - Software Engineer (Intern)
                May 2024 - July 2024 Atlanta, GA
                - Developed an Automated Utility: Created a Python script that extracts raw results from the NeoLoad Performance testing tool via the NeoLoad API. This script processes and refines the data into a CSV format.
                - Integrated with Google Cloud: Set up a Google Managed Prometheus (GMP) Pushgateway instance on a Kubernetes Engine cluster and a Google BigQuery dataset to receive metrics and data from the Python script.
                - Enhanced Visualization: Designed and configured Grafana dashboards to visualize performance metrics, providing a centralized tool for backend performance testing.
                - Streamlined CI/CD: Maintained continuous integration and deployment processes using GitHub Actions, ensuring seamless updates and improvements.
                - Comprehensive Documentation: Documented the utility and performance engineering processes, facilitating future use and enhancements by other developers.
                - Centralized Performance Testing Tool: Created a robust tool enabling software engineers to efficiently test backend performance from a unified platform, replacing the need for multiple disparate tools.
              `
            },
            'portfolio': {
              type: 'file',
              content: `
                Just go through the website and you'll see everything you need to know about me.
              `
            }
          }
        }
      }
    },
    'bin': {
      type: 'directory',
      children: {
        'ls': {
          type: 'file',
          content: `
            // ls.c
            ...
            // end of ls.c
          `
        },
        'pwd': {
          type: 'file',
          content: `
            // pwd.c
            ...
            // end of pwd.c
          `
        },
        'cd': {
          type: 'file',
          content: `
            // cd.c
            ...
            // end of cd.c
          `
        },
        'mkdir': {
          type: 'file',
          content: `
            // mkdir.c
            ...
            // end of mkdir.c
          `
        },
        'mv': {
          type: 'file',
          content: `
            // mv.c
            ...
            // end of mv.c
          `
        },
        'cp': {
          type: 'file',
          content: `
            // cp.c
            ...
            // end of cp.c
          `
        },
        'rm': {
          type: 'file',
          content: `
            // rm.c
            ...
            // end of rm.c
          `
        },
        'touch': {
          type: 'file',
          content: `
            // touch.c
            ...
            // end of touch.c
          `
        },
        'cat': {
          type: 'file',
          content: `
            // cat.c
            ...
            // end of cat.c
          `
        },
        'echo': {
          type: 'file',
          content: `
            // echo.c
            ...
            // end of echo.c
          `
        },
        'less': {
          type: 'file',
          content: `
            // less.c
            ...
            // end of less.c
          `
        },
        'man': {
          type: 'file',
          content: `
            // man.c
            ...
            // end of man.c
          `
        },
        'uname': {
          type: 'file',
          content: `
            // uname.c
            ...
            // end of uname.c
          `
        },
        'whoami': {
          type: 'file',
          content: `
            // whoami.c
            ...
            // end of whoami.c
          `
        },
        'head': {
          type: 'file',
          content: `
            // head.c
            ...
            // end of head.c
          `
        },
        'tail': {
          type: 'file',
          content: `
            // tail.c
            ...
            // end of tail.c
          `
        },
        'wc': {
          type: 'file',
          content: `
            // wc.c
            ...
            // end of wc.c
          `
        },
        'ssh': {
          type: 'file',
          content: `
            // ssh.c
            ...
            // end of ssh.c
          `
        },
        'alias': {
          type: 'file',
          content: `
            // alias.c
            ...
            // end of alias.c
          `
        },
        'sudo': {
          type: 'file',
          content: `
            // sudo.c
            ...
            // end of sudo.c
          `
        },
        'chmod': {
          type: 'file',
          content: `
            // chmod.c
            ...
            // end of chmod.c
          `
        },
        'chown': {
          type: 'file',
          content: `
            // chown.c
            ...
            // end of chown.c
          `
        },
        'theme': {
          type: 'file',
          content: `
            // theme.c
            ...
            // end of theme.c
          `
        },
        'clear': {
          type: 'file',
          content: `
            // clear.c
            ...
            // end of clear.c
          `
        },
        'exit': {
          type: 'file',
          content: `
            // exit.c
            ...
            // end of exit.c
          `
        }
      }
    }
  }
};