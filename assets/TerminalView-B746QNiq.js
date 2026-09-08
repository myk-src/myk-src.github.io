const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./AboutContent-C8IMK-eQ.js","./index-C3wYrIpP.js","./index-Bw83MX4E.css","./AboutContent-BcccbM9a.css","./ResumeContent-BMxwmWy_.js","./ResumeContent-DgJ_z41I.css","./SkillsContent-Cu0-HxVi.js","./SkillsContent-CfN22y8m.css","./ContactContent-egwZRIbR.js","./ContactContent-DJD_wp5u.css","./ProjectsContent-81Jfs58M.js","./ProjectsContent-DzBk8NMc.css"])))=>i.map(i=>d[i]);
import{d as Z,f as W,_ as ee,o,c as r,a as n,F as G,r as R,t as p,b as M,e as x,l as T,m as oe,x as q,y as X,s as E,z as ie,A as se,p as re,B as le,u,C as O,h as K,n as ce,w as ue,v as te,D as de,E as me,G as pe,j as N,k as J,H as ge}from"./index-C3wYrIpP.js";const he=Z({name:"HelpTable",props:{commands:{type:Map,required:!0}},setup(g){const d=W(()=>Array.from(g.commands.entries()).sort(([m],[v])=>m.localeCompare(v)));return{commandRows:W(()=>{const m=[];for(let l=0;l<d.value.length;l+=3)m.push(d.value.slice(l,l+3).map(([i,y])=>({name:i,desc:y})));return m})}}});function fe(g,d,f,m,v,l){return o(),r("table",null,[n("tbody",null,[(o(!0),r(G,null,R(g.commandRows,(i,y)=>(o(),r("tr",{key:y},[(o(!0),r(G,null,R(i,(b,F)=>(o(),r("td",{key:F},[n("strong",null,p(b.name),1)]))),128))]))),128))])])}const ye=ee(he,[["render",fe],["__scopeId","data-v-b4a2c93b"]]),ve=Z({name:"ManualPage",props:{command:{type:Object,required:!0}}}),be={key:0},we={key:0},ke={key:2},Ce={key:4};function De(g,d,f,m,v,l){return o(),r("div",null,[d[0]||(d[0]=n("h1",null,"NAME",-1)),n("code",null,p(g.command.name),1),M(" - "+p(g.command.desc)+" ",1),d[1]||(d[1]=n("h1",null,"SYNTAX",-1)),n("code",null,p(g.command.syntax),1),d[2]||(d[2]=n("h1",null,"USAGE",-1)),n("code",null,p(g.command.usage),1),g.command.aliases.length>0?(o(),r("h1",be,"ALIASES")):x("",!0),g.command.aliases.length>0?(o(!0),r(G,{key:1},R(g.command.aliases,(i,y)=>(o(),r("span",{key:y},[n("code",null,p(i),1),y<g.command.aliases.length-1?(o(),r("span",we,", ")):x("",!0)]))),128)):x("",!0),g.command.arguments.length>0?(o(),r("h1",ke,"ARGUMENTS")):x("",!0),g.command.arguments.length>0?(o(!0),r(G,{key:3},R(g.command.arguments,i=>(o(),r("span",{key:i.arg},[n("code",null,p(i.arg),1),n("p",null,p(i.desc),1)]))),128)):x("",!0),g.command.options.length>0?(o(),r("h1",Ce,"OPTIONS")):x("",!0),(o(!0),r(G,null,R(g.command.options,i=>(o(),r("span",{key:i.opt},[n("code",null,p(i.opt),1),n("p",null,p(i.desc),1)]))),128))])}const Se=ee(ve,[["render",De],["__scopeId","data-v-9da99843"]]),Ae={type:"directory",children:{home:{type:"directory",children:{"myk-src":{type:"directory",children:{about:{type:"file",content:`
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
              `},contact:{type:"file",content:`
                Email MichaelYYim@gmail.com
                GitHub myk-src
                LinkedIn Michael Yim-Olmos
                LeetCode Mikey091303
                CodePen myk-src
                HackerRank MichaelYYim
                Stack Overflow Michael Yoosung Yim-Olmos
                Medium MichaelYYim
              `},projects:{type:"file",content:`
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
              `},skills:{type:"file",content:`
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
              `},resume:{type:"file",content:`
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
              `},portfolio:{type:"file",content:`
                Just go through the website and you'll see everything you need to know about me.
              `}}}}},bin:{type:"directory",children:{ls:{type:"file",content:`
            // ls.c
            ...
            // end of ls.c
          `},pwd:{type:"file",content:`
            // pwd.c
            ...
            // end of pwd.c
          `},cd:{type:"file",content:`
            // cd.c
            ...
            // end of cd.c
          `},mkdir:{type:"file",content:`
            // mkdir.c
            ...
            // end of mkdir.c
          `},mv:{type:"file",content:`
            // mv.c
            ...
            // end of mv.c
          `},cp:{type:"file",content:`
            // cp.c
            ...
            // end of cp.c
          `},rm:{type:"file",content:`
            // rm.c
            ...
            // end of rm.c
          `},touch:{type:"file",content:`
            // touch.c
            ...
            // end of touch.c
          `},cat:{type:"file",content:`
            // cat.c
            ...
            // end of cat.c
          `},echo:{type:"file",content:`
            // echo.c
            ...
            // end of echo.c
          `},less:{type:"file",content:`
            // less.c
            ...
            // end of less.c
          `},man:{type:"file",content:`
            // man.c
            ...
            // end of man.c
          `},uname:{type:"file",content:`
            // uname.c
            ...
            // end of uname.c
          `},whoami:{type:"file",content:`
            // whoami.c
            ...
            // end of whoami.c
          `},head:{type:"file",content:`
            // head.c
            ...
            // end of head.c
          `},tail:{type:"file",content:`
            // tail.c
            ...
            // end of tail.c
          `},wc:{type:"file",content:`
            // wc.c
            ...
            // end of wc.c
          `},ssh:{type:"file",content:`
            // ssh.c
            ...
            // end of ssh.c
          `},alias:{type:"file",content:`
            // alias.c
            ...
            // end of alias.c
          `},sudo:{type:"file",content:`
            // sudo.c
            ...
            // end of sudo.c
          `},chmod:{type:"file",content:`
            // chmod.c
            ...
            // end of chmod.c
          `},chown:{type:"file",content:`
            // chown.c
            ...
            // end of chown.c
          `},theme:{type:"file",content:`
            // theme.c
            ...
            // end of theme.c
          `},clear:{type:"file",content:`
            // clear.c
            ...
            // end of clear.c
          `},exit:{type:"file",content:`
            // exit.c
            ...
            // end of exit.c
          `}}}}};function Me(){const g=T("/"),d=T("/");function f(l=g.value){const i=l.split("/").filter(Boolean);let y=Ae;for(const b of i)if(y.type==="directory"&&y.children&&y.children[b])y=y.children[b];else return null;return y}function m(l){if(l.startsWith("/"))return l;const i=g.value.split("/").concat(l.split("/")).filter(Boolean),y=[];for(const b of i)b===".."?y.pop():b!=="."&&y.push(b);return"/"+y.join("/")}function v(l,i){return i==="directory"?`<span style="color: var(--header-color);">📁 ${l}</span>`:`📄 ${l}`}return{currentPath:g,previousPath:d,getCurrentDirectory:f,resolvePath:m,getStyledName:v}}let j=new Map([["portfolio",{name:"portfolio",desc:"Display information about the creator's portfolio",syntax:"portfolio",usage:"portfolio",aliases:[],arguments:[],options:[]}],["theme",{name:"theme",desc:"Change/List the terminal theme",syntax:"theme OR theme <theme_name> OR theme -l",usage:"theme OR theme terminal OR theme -l",aliases:[],arguments:[{arg:"theme_name",desc:"(Optional) The name of the theme to switch to"}],options:[{opt:"-l",desc:"(Optional) List available themes"}]}],["man",{name:"man",desc:"Display information about available commands",syntax:"man [<command_name>]",usage:"man ls",aliases:["?","h","help"],arguments:[{arg:"command_name",desc:"The command to display help for"}],options:[]}],["about",{name:"about",desc:"Display information about the creator",syntax:"about",usage:"about",aliases:[],arguments:[],options:[]}],["contact",{name:"contact",desc:"Display contact information of the creator",syntax:"contact",usage:"contact",aliases:[],arguments:[],options:[]}],["projects",{name:"projects",desc:"Display information about projects made by the creator",syntax:"projects",usage:"projects",aliases:[],arguments:[],options:[]}],["skills",{name:"skills",desc:"Display information about the skills of the creator",syntax:"skills",usage:"skills",aliases:[],arguments:[],options:[]}],["resume",{name:"resume",desc:"Display the resume of the creator",syntax:"resume",usage:"resume",aliases:[],arguments:[],options:[]}],["exit",{name:"exit",desc:"Exit the terminal",syntax:"exit",usage:"exit",aliases:[],arguments:[],options:[]}],["ls",{name:"ls",desc:"List files and directories",syntax:"ls [directory]",usage:"ls",aliases:[],arguments:[{arg:"directory",desc:"The directory to list files and directories in"}],options:[]}],["pwd",{name:"pwd",desc:"Print the current working directory",syntax:"pwd",usage:"pwd",aliases:[],arguments:[],options:[]}],["cd",{name:"cd",desc:"Change the current working directory",syntax:"cd <directory>",usage:"cd Documents",aliases:[],arguments:[{arg:"directory",desc:"The directory to change to"}],options:[]}],["mkdir",{name:"mkdir",desc:"Create a new directory",syntax:"mkdir <directory>",usage:"mkdir new_directory",aliases:[],arguments:[{arg:"directory",desc:"The name of the new directory"}],options:[]}],["mv",{name:"mv",desc:"Move files or directories",syntax:"mv <source> <destination>",usage:"mv file.txt new_directory",aliases:[],arguments:[{arg:"source",desc:"The file or directory to move"},{arg:"destination",desc:"The destination directory"}],options:[]}],["cp",{name:"cp",desc:"Copy files or directories",syntax:"cp <source> <destination>",usage:"cp file.txt new_directory",aliases:[],arguments:[{arg:"source",desc:"The file or directory to copy"},{arg:"destination",desc:"The destination directory"}],options:[]}],["rm",{name:"rm",desc:"Remove files or directories",syntax:"rm <file>",usage:"rm file.txt",aliases:[],arguments:[{arg:"file",desc:"The file or directory to remove"}],options:[]}],["touch",{name:"touch",desc:"Create an empty file",syntax:"touch <file>",usage:"touch new_file.txt",aliases:[],arguments:[{arg:"file",desc:"The name of the new file"}],options:[]}],["clear",{name:"clear",desc:"Clear the terminal screen",syntax:"clear",usage:"clear",aliases:[],arguments:[],options:[]}],["cat",{name:"cat",desc:"Display the contents of a file",syntax:"cat <file>",usage:"cat file.txt",aliases:[],arguments:[{arg:"file",desc:"The file to display"}],options:[]}],["echo",{name:"echo",desc:"Display a line of text",syntax:"echo <text>",usage:"echo Hello, World!",aliases:[],arguments:[{arg:"text",desc:"The text to display"}],options:[]}],["less",{name:"less",desc:"View the contents of a file one page at a time",syntax:"less <file>",usage:"less file.txt",aliases:[],arguments:[{arg:"file",desc:"The file to view"}],options:[]}],["uname",{name:"uname",desc:"Print system information",syntax:"uname",usage:"uname",aliases:[],arguments:[],options:[]}],["whoami",{name:"whoami",desc:"Print the current user",syntax:"whoami",usage:"whoami",aliases:[],arguments:[],options:[]}],["head",{name:"head",desc:"Display the beginning of a file",syntax:"head <file>",usage:"head file.txt",aliases:[],arguments:[{arg:"file",desc:"The file to display"}],options:[]}],["tail",{name:"tail",desc:"Display the end of a file",syntax:"tail <file>",usage:"tail file.txt",aliases:[],arguments:[{arg:"file",desc:"The file to display"}],options:[]}],["wc",{name:"wc",desc:"Count lines, words, and characters in a file",syntax:"wc <file>",usage:"wc file.txt",aliases:[],arguments:[{arg:"file",desc:"The file to count"}],options:[]}],["ssh",{name:"ssh",desc:"Connect to a remote server",syntax:"ssh <user>",usage:"ssh user@host",aliases:[],arguments:[{arg:"user@host",desc:"The user and host to connect to"}],options:[]}],["alias",{name:"alias",desc:"Create an alias for a command",syntax:'alias <name>="<command>"',usage:'alias ll="ls -l"',aliases:[],arguments:[{arg:"name",desc:"The name of the alias"},{arg:"command",desc:"The command to alias"}],options:[]}],["sudo",{name:"sudo",desc:"Run a command with elevated privileges",syntax:"sudo <command>",usage:"sudo rm file.txt",aliases:[],arguments:[{arg:"command",desc:"The command to run with elevated privileges"}],options:[]}],["chmod",{name:"chmod",desc:"Change file permissions",syntax:"chmod <mode> <file>",usage:"chmod 755 file.txt",aliases:[],arguments:[{arg:"mode",desc:"The permissions to set"},{arg:"file",desc:"The file to change permissions for"}],options:[]}],["chown",{name:"chown",desc:"Change file owner and group",syntax:"chown <user:group> <file>",usage:"chown user:group file.txt",aliases:[],arguments:[{arg:"user:group",desc:"The user and group to set as owner"},{arg:"file",desc:"The file to change owner and group for"}],options:[]}],["neofetch",{name:"neofetch",desc:"Fetch system details",syntax:"neofetch",usage:"neofetch",aliases:["fastfetch","fetch"],arguments:[],options:[]}]]);function xe(g){const d=T(""),f=T(null),m=T(0),v=T([]),l=T(-1),i=T(""),y=W(()=>`${m.value}ch`),b=W(()=>{if(d.value.trim()==="")return"";if(!d.value.includes(" ")){const k=Array.from(j.keys()).filter(S=>S.startsWith(d.value));return k.length===1?k[0]:""}const h=d.value.split(" ");if(h.length===2){const k=h[0],S=h[1];if(k==="theme"){const D=Array.from(q.keys()).filter($=>$.startsWith(S));return D.length===1?`${k} ${D[0]}`:""}if(["cd","cat","less","ls","head","tail","wc"].includes(k)&&g){const D=S.lastIndexOf("/");let $=g.currentPath.value,B=S;if(D!==-1){const a=S.substring(0,D)||"/";$=g.resolvePath(a),B=S.substring(D+1)}const e=g.getCurrentDirectory($);if(e&&e.type==="directory"&&e.children){const a=Object.keys(e.children).filter(c=>c.startsWith(B));if(a.length===1){const c=D!==-1?S.substring(0,D+1):"";return`${k} ${c}${a[0]}`}}}}return""});oe(d,()=>{i.value=b.value,m.value>d.value.length&&(m.value=d.value.length)});function F(){if(!f.value){m.value=d.value.length;return}const h=f.value.selectionStart??d.value.length,k=f.value.selectionEnd??h;m.value=Math.min(h,k,d.value.length)}function I(h){h.key==="ArrowUp"?(h.preventDefault(),v.value.length>0&&(l.value===-1?l.value=v.value.length-1:l.value>0&&l.value--,d.value=v.value[l.value],m.value=d.value.length,i.value="",X(()=>{f.value&&(f.value.selectionStart=m.value,f.value.selectionEnd=m.value)}))):h.key==="ArrowDown"?(h.preventDefault(),v.value.length>0&&l.value!==-1&&(l.value<v.value.length-1?(l.value++,d.value=v.value[l.value]):(l.value=-1,d.value=""),m.value=d.value.length,i.value="",X(()=>{f.value&&(f.value.selectionStart=m.value,f.value.selectionEnd=m.value)}))):h.key==="ArrowLeft"?(h.preventDefault(),m.value=Math.max(0,m.value-1),f.value&&(f.value.selectionStart=m.value,f.value.selectionEnd=m.value)):h.key==="ArrowRight"?(h.preventDefault(),m.value=Math.min(d.value.length,m.value+1),f.value&&(f.value.selectionStart=m.value,f.value.selectionEnd=m.value)):h.key==="Tab"?(h.preventDefault(),i.value&&(d.value=i.value,m.value=d.value.length,i.value="")):i.value=""}function P(){const h=window.getSelection();h&&h.toString().length>0||f.value&&f.value.focus()}return{input:d,inputField:f,commandHistory:v,currentCommandIndex:l,suggestion:i,caretOffset:y,syncCursorPosition:F,handleKeyDown:I,focusInput:P}}function Pe(g,d,f,m,v){const{currentPath:l,previousPath:i,getCurrentDirectory:y,resolvePath:b,getStyledName:F}=m,I=(e,a)=>e.length===0?(g.value=a,a):`Invalid number of parameters for ${a} command
Expected: 0 | Actual: ${e.length}
Usage: ${a} [options]`,P=()=>"Must be logged in to use this command",h=(e,a,c)=>`Invalid number of parameters for ${e} command
Expected: ${a} | Actual: ${c}
Usage: ${e} [options]`,k=(e,a,c)=>{if(e.length!==1)return h(a,"1",e.length);const w=b(e[0]),C=y(w);if(C)if(C.type==="file"){const L=e[0].split("/").pop()||e[0];return c(C.content,L)}else return`${a}: ${e[0]}: Is a directory`;return`${a}: ${e[0]}: No such file or directory`},S={portfolio:e=>I(e,"portfolio"),about:e=>I(e,"about"),contact:e=>I(e,"contact"),projects:e=>I(e,"projects"),resume:e=>I(e,"resume"),skills:e=>I(e,"skills"),alias:P,chmod:P,chown:P,cp:P,mkdir:P,mv:P,rm:P,ssh:P,touch:P,sudo:()=>`Stop trying to sudo! You are not ${E.get("owner")}!`,exit:()=>"Exiting the terminal... Wait for it... Ran into an error: You can never leave!",clear:()=>{f.value=[]},theme:e=>e.length===0?"theme":e.length>1?h("theme","<= 1",e.length):e[0]==="-l"?`Available themes:
`+Array.from(q.keys()).join(", "):q.has(e[0])?(d.value=e[0],`Theme changed to ${e[0]}`):`Theme not found: ${e[0]}`,cd:e=>{if(e.length===0)return i.value=l.value,l.value="/","";if(e.length>1)return`cd: too many arguments
Usage: cd [directory]`;if(e[0]===".."&&l.value==="/")return"cd: cannot move up from root directory";const a=b(e[0]),c=y(a);return c&&c.type==="directory"?(i.value=l.value,l.value=a,""):`cd: ${e[0]}: No such file or directory`},ls:e=>{if(e.length>1)return h("ls","0 or 1",e.length);const a=e.length===1?b(e[0]):l.value,c=y(a);if(c){if(c.type==="directory"&&c.children){const w=Object.keys(c.children).map(C=>F(C,c.children[C].type)).join(`
`);return e.length===1?`${e[0]}:
${w}`:w}else if(c.type==="file"){const w=e[0].split("/").pop()||e[0];return F(w,"file")}}return`ls: cannot access '${e.length===1?e[0]:a}': No such file or directory`},pwd:e=>e.length===0?l.value:h("pwd","0",e.length),cat:e=>k(e,"cat",a=>a),less:e=>k(e,"less",a=>a),head:e=>k(e,"head",a=>a.split(`
`)[1]||""),tail:e=>k(e,"tail",a=>{const c=a.split(`
`);return c[c.length-2]||""}),wc:e=>k(e,"wc",(a,c)=>`${a.split(`
`).length} ${a.split(/\s+/).length} ${a.length} ${c}`),echo:e=>e.length===0?"echo":e.join(" "),uname:e=>e.length===0?v.split("@")[1]:h("uname","0",e.length),whoami:e=>e.length===0?v.split("@")[0]:h("whoami","0",e.length),neofetch:e=>{var a;return e.length>0?h("neofetch","0",e.length):`
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; margin: 1rem 0; color: var(--text-color);">
  <pre style="color: var(--user-color); margin: 0; line-height: 1.15; text-shadow: 0 0 8px color-mix(in srgb, var(--user-color) 40%, transparent);">
███╗   ███╗██╗   ██╗██╗  ██╗
████╗ ████║╚██╗ ██╔╝██║ ██╔╝
██╔████╔██║ ╚████╔╝ █████╔╝ 
██║╚██╔╝██║  ╚██╔╝  ██╔═██╗ 
██║ ╚═╝ ██║   ██║   ██║  ██╗
╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝
  </pre>

  <div style="display: flex; flex-direction: column; gap: 0;">
    <div><span style="color: var(--user-color); font-weight: bold;">${v.split("@")[0]}</span>@<span style="color: var(--path-color); font-weight: bold;">${v.split("@")[1]}</span></div>
    <div>-----------------------</div>
    <div><span style="color: var(--user-color); font-weight: bold;">OS</span>: ${E.get("os")} ${E.get("version")} (web_x86_64)</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Host</span>: ${E.get("host")}</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Kernel</span>: ${E.get("kernel")}</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Uptime</span>: ${_(E.get("version")||"Forever")}</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Packages</span>: ${((a=E.get("version"))==null?void 0:a.replace("v",""))||"Unknown"} (npm)</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Shell</span>: bash 5.1.16</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Resolution</span>: 1920x1080</div>
    <div><span style="color: var(--user-color); font-weight: bold;">DE</span>: Vue 3</div>
    <div><span style="color: var(--user-color); font-weight: bold;">WM</span>: CSS Flexbox / Waybar</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Terminal</span>: vue-term</div>
    <div><span style="color: var(--user-color); font-weight: bold;">CPU</span>: ${E.get("cpu")}</div>
    <div><span style="color: var(--user-color); font-weight: bold;">Memory</span>: ${D()}MiB / 16384MiB</div>
    <div style="display: flex; gap: 0; margin-top: 1rem;">
      <span style="background: #333333; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FF5C57; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #27C93F; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FFBD2E; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #57C7FF; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #FF6AC1; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: #5AF78E; width: 1.5rem; height: 1rem; display: inline-block;"></span>
      <span style="background: var(--text-color); width: 1.5rem; height: 1rem; display: inline-block;"></span>
    </div>
  </div>
</div>`}};function _(e){const a=e.replace("v","").split(".");if(a.length!==3)return"0 days, 0 hours, 0 mins";const c=parseInt(a[0],10),w=parseInt(a[1],10)-1,C=parseInt(a[2],10),L=new Date(c,w,C);let A=new Date().getTime()-L.getTime();A<0&&(A=0);const V=1e3*60,H=V*60,z=H*24,Y=Math.floor(A/z),Q=Math.floor(A%z/H),t=Math.floor(A%H/V);return`${Y} days, ${Q} hours, ${t} mins`}function D(e=0,a=16384){const c=(e+a)/2,w=(a-e)/6;let C=Math.random(),L=Math.random();C===0&&(C=1e-11);const U=Math.sqrt(-2*Math.log(C))*Math.cos(2*Math.PI*L),A=Math.round(U*w+c);return A<e||A>a?D(e,a):A}function $(e){for(const[a,c]of j.entries())if(c.aliases.includes(e))return a}function B(e,a){let c="";const w=(j.has(e)?e:$(e))||e;if(["man","?","h","help"].includes(w))if(a.length===0)c="man";else if(a.length===1){const C=j.has(a[0])?a[0]:$(a[0]);c=C?`man ${C}`:"Manual page not found"}else c="Invalid number of parameters for help command";else if(w==="")c="",e=" ";else if(w==="q"&&g.value!=="console"){g.value="console";return}else S[w]?c=S[w](a)||"":c=`Command not found: ${e}`;if(w!=="clear"&&(g.value==="console"||["resume","about","contact","projects","skills","portfolio"].includes(w))){const C=w==="cd"&&a.length<=1&&c==="";f.value.push({id:f.value.length+1,command:e,parameters:a,path:C?i.value:l.value,output:c})}}return{runCommand:B}}const Ee={class:"navbar"},Te={class:"title"},Ie=["href"],$e={key:0,id:"headers"},Le={key:1},Fe={key:2},Be={key:3},Ge={key:4},Oe={key:5},Re={id:"user"},je={id:"machine"},_e={id:"path"},He={class:"code"},Ve={key:2},ze={id:"headers"},Ke={key:3,class:"error"},Ne={key:4},Je={key:5},Ue={key:6,id:"headers"},Qe={key:7},We={key:8},Ye={key:9},qe={key:10,id:"headers"},Xe=["innerHTML"],Ze={key:1,class:"content"},et={class:"secondary-header"},tt={id:"headers"},nt={key:2,class:"content"},at={key:0},ot={id:"user"},it={id:"machine"},st={id:"path"},rt={key:1},lt={ref:"bottomRef"},ct=Z({__name:"TerminalView",setup(g){const d=N(()=>J(()=>import("./AboutContent-C8IMK-eQ.js"),__vite__mapDeps([0,1,2,3]),import.meta.url)),f=N(()=>J(()=>import("./ResumeContent-BMxwmWy_.js"),__vite__mapDeps([4,1,2,5]),import.meta.url)),m=N(()=>J(()=>import("./SkillsContent-Cu0-HxVi.js"),__vite__mapDeps([6,1,2,7]),import.meta.url)),v=N(()=>J(()=>import("./ContactContent-egwZRIbR.js"),__vite__mapDeps([8,1,2,9]),import.meta.url)),l=N(()=>J(()=>import("./ProjectsContent-81Jfs58M.js"),__vite__mapDeps([10,1,2,11]),import.meta.url)),i=T("console"),y=ie("theme"),b=E.get("user")+"@"+window.location.toString().split("/")[2],F=E.get("os"),I=E.get("osAbbr"),P=E.get("version"),h=T([]),k=T(null),S=ge([]),_=T(!1),D=T(!1),$=T(!1),B=Me(),{currentPath:e}=B,{input:a,inputField:c,commandHistory:w,currentCommandIndex:C,suggestion:L,caretOffset:U,syncCursorPosition:A,handleKeyDown:V,focusInput:H}=xe(B),{runCommand:z}=Pe(i,y,h,B,b);function Y(){if(a.value.trim()!==""){w.value.push(a.value),C.value=-1;const[Q,...t]=a.value.split(" ");z(Q,t)}else a.value=" ",z("",[]);a.value="",L.value="",i.value==="console"&&X(()=>{k.value&&k.value.scrollTo({top:k.value.scrollHeight,behavior:"smooth"})})}return se("resumes",S),re(()=>{S.value=le,_.value=!0,setTimeout(()=>{D.value=!0,setTimeout(()=>{S.value&&S.value.length>0&&($.value=!0)},500)},1e3)}),(Q,t)=>(o(),r("main",null,[n("span",Ee,[t[7]||(t[7]=n("span",{class:"buttons"},[n("button",{class:"button close"}),n("button",{class:"button minimize"}),n("button",{class:"button maximize"})],-1)),n("span",Te,[t[6]||(t[6]=n("svg",{version:"1.0",xmlns:"http://www.w3.org/2000/svg",width:"1rem",height:"1rem",viewBox:"0 0 512.000000 512.000000",preserveAspectRatio:"xMidYMid meet"},[n("g",{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#ffffff",stroke:"none"},[n("path",{d:`M2360 5049 c-154 -11 -357 -47 -516 -93 -902 -259 -1603 -1017 -1790
          -1934 -136 -669 -8 -1355 354 -1908 255 -390 580 -686 968 -886 141 -73 341
          -154 403 -164 58 -9 109 19 133 73 18 40 18 60 12 286 l-7 243 -86 -14 c-97
          -15 -256 -9 -386 13 -105 19 -211 71 -278 139 -53 53 -67 76 -136 229 -63 139
          -135 231 -232 297 -66 46 -121 106 -117 128 6 30 48 43 121 38 141 -10 288
          -113 393 -274 72 -110 143 -179 230 -222 62 -31 79 -35 169 -38 103 -4 207 12
          291 44 41 16 43 18 58 85 19 86 56 164 106 228 l39 49 -82 11 c-264 38 -452
          102 -627 215 -229 148 -365 379 -431 731 -20 109 -23 389 -5 492 29 167 98
          319 200 445 l45 55 -20 62 c-52 168 -42 372 28 574 18 50 22 52 103 48 118 -6
          371 -108 543 -218 l71 -46 56 11 c30 6 87 18 127 27 271 58 655 58 926 0 40
          -9 97 -21 127 -27 l55 -10 95 58 c226 137 484 230 575 206 26 -7 33 -17 53
          -75 43 -125 55 -210 50 -351 -4 -95 -11 -148 -26 -195 l-21 -64 44 -54 c89
          -109 155 -244 192 -389 22 -89 25 -417 4 -544 -32 -198 -114 -406 -210 -532
          -165 -217 -464 -366 -843 -418 l-87 -12 39 -49 c47 -60 85 -137 106 -221 14
          -52 17 -137 20 -503 5 -490 5 -489 72 -521 46 -21 83 -15 229 42 738 284 1320
          932 1533 1703 141 513 111 1108 -80 1601 -172 440 -475 842 -848 1122 -405
          303 -865 474 -1367 507 -175 12 -192 12 -375 0z`})])],-1)),n("a",{href:`https://github.com/${u(E).get("owner")}`,target:"_blank",rel:"noopener noreferrer",style:{"text-decoration":"none",color:"inherit"}}," github.com/"+p(u(E).get("owner")),9,Ie)]),t[8]||(t[8]=n("span",{class:"blank"},null,-1))]),n("div",{class:"body",ref_key:"bodyRef",ref:k,onClick:t[5]||(t[5]=(...s)=>u(H)&&u(H)(...s))},[i.value==="console"?(o(),r(G,{key:0},[_.value?(o(),r("span",$e,p(u(F))+" ("+p(u(I))+") "+p(u(P)),1)):x("",!0),_.value?(o(),r("br",Le)):x("",!0),n("pre",null,`  ███╗   ███╗██╗   ██╗██╗  ██╗     ██████╗    ███████╗   
  ████╗ ████║╚██╗ ██╔╝██║ ██╔╝    ██╔═══██╗   ██╔════╝   
  ██╔████╔██║ ╚████╔╝ █████╔╝     ██║   ██║   ███████╗   
  ██║╚██╔╝██║  ╚██╔╝  ██╔═██╗     ██║   ██║   ╚════██║   
  ██║ ╚═╝ ██║   ██║   ██║  ██╗    ╚██████╔╝██╗███████║██╗
  ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚═╝╚══════╝╚═╝ `+p(u(P)),1),D.value?(o(),r("span",Fe,[...t[9]||(t[9]=[M("Type `",-1),n("code",null,"man",-1),M("` for a list of commands.",-1)])])):x("",!0),D.value?(o(),r("br",Be)):x("",!0),D.value?(o(),r("span",Ge,[...t[10]||(t[10]=[M("Type `",-1),n("code",null,"portfolio",-1),M("` to view full portfolio.",-1)])])):x("",!0),D.value?(o(),r("br",Oe)):x("",!0),(o(!0),r(G,null,R(h.value,s=>(o(),r("div",{key:s.id},[n("span",Re,p(b.split("@")[0]),1),t[22]||(t[22]=n("span",{id:"ampersand"},"@",-1)),n("span",je,p(b.split("@")[1]),1),t[23]||(t[23]=n("span",null,":",-1)),n("span",_e,p(s.path.length===1?"~":"~/"+s.path.slice(1)),1),t[24]||(t[24]=M("$ ",-1)),n("span",He,p(s.command+" "),1),(o(!0),r(G,null,R(s.parameters,(ne,ae)=>(o(),r("span",{class:"code",key:ae},p(ne+" "),1))),128)),t[25]||(t[25]=n("br",null,null,-1)),s.output=="man"?(o(),O(ye,{key:0,commands:u(j)},null,8,["commands"])):s.output.startsWith("man")&&s.output.split(" ").length>1&&u(j).get(s.output.split(" ")[1])?(o(),O(Se,{key:1,command:u(j).get(s.output.split(" ")[1])},null,8,["command"])):s.output==="theme"?(o(),r("span",Ve,[t[11]||(t[11]=M(" Current theme: ",-1)),n("span",ze,p(u(y)),1),t[12]||(t[12]=n("br",null,null,-1)),t[13]||(t[13]=M(" For list of themes, run ",-1)),t[14]||(t[14]=n("code",null,"theme -l",-1)),t[15]||(t[15]=M(".",-1)),t[16]||(t[16]=n("br",null,null,-1)),t[17]||(t[17]=M(" To change themes, run ",-1)),t[18]||(t[18]=n("code",null,"theme <theme_name>",-1)),t[19]||(t[19]=M(".",-1)),t[20]||(t[20]=n("br",null,null,-1))])):s.command==="theme"&&s.parameters.length===1&&s.output.includes("not found")?(o(),r("pre",Ke,p(s.output),1)):s.command==="theme"&&s.parameters.length===1?(o(),r("pre",Ne,p(s.output),1)):["resume","about","projects","contact","skills","portfolio"].includes(s.command)&&s.parameters.length<1?(o(),r("pre",Je)):["uname","whoami"].includes(s.command)&&s.parameters.length<1?(o(),r("pre",Ue,p(s.output),1)):s.command==="echo"&&s.parameters.length>0?(o(),r("pre",Qe,p(s.output),1)):s.command==="echo"&&s.parameters.length===0?(o(),r("span",We,[...t[21]||(t[21]=[n("span",null,"echo",-1),M(),n("span",{style:{"font-size":"75%"}},"echo",-1),M(),n("span",{style:{"font-size":"50%"}},"echo",-1),M(),n("span",{style:{"font-size":"25%"}},"echo",-1),M(),n("br",null,null,-1)])])):["cat","less","wc"].includes(s.command)&&!s.output.includes("directory")&&!s.output.includes("Invalid")?(o(),r("pre",Ye,p(s.output),1)):s.command==="pwd"&&s.parameters.length<1?(o(),r("pre",qe,p(s.output),1)):(o(),r("pre",{key:11,class:"error",innerHTML:s.output},null,8,Xe))]))),128))],64)):i.value!=="console"&&i.value!=="portfolio"?(o(),r("div",Ze,[n("div",et,[n("span",null,p(i.value)+"(1)",1),n("span",tt,p(i.value.charAt(0).toUpperCase()+i.value.slice(1)),1),n("span",null,p(i.value)+"(1)",1)]),t[26]||(t[26]=n("br",null,null,-1)),i.value==="about"?(o(),O(u(d),{key:0})):i.value==="resume"?(o(),O(u(f),{key:1})):i.value==="projects"?(o(),O(u(l),{key:2})):i.value==="skills"?(o(),O(u(m),{key:3})):i.value==="contact"?(o(),O(u(v),{key:4})):x("",!0)])):i.value==="portfolio"?(o(),r("div",nt,[t[27]||(t[27]=n("div",{class:"secondary-header"},[n("span",null,"portfolio(1)"),n("span",{id:"headers"},"Portfolio"),n("span",null,"portfolio(1)")],-1)),t[28]||(t[28]=n("br",null,null,-1)),t[29]||(t[29]=n("div",{id:"headers",style:{"text-align":"center"}},"About Me",-1)),K(u(d)),t[30]||(t[30]=n("br",null,null,-1)),t[31]||(t[31]=n("div",{id:"headers",style:{"text-align":"center"}},"My Skills",-1)),K(u(m)),t[32]||(t[32]=n("br",null,null,-1)),t[33]||(t[33]=n("div",{id:"headers",style:{"text-align":"center"}},"Projects Experience",-1)),K(u(l)),t[34]||(t[34]=n("br",null,null,-1)),t[35]||(t[35]=n("div",{id:"headers",style:{"text-align":"center"}},"My Resume",-1)),K(u(f)),t[36]||(t[36]=n("br",null,null,-1)),t[37]||(t[37]=n("div",{id:"headers",style:{"text-align":"center"}},"Contact Me",-1)),K(u(v))])):x("",!0),$.value?(o(),r("div",{key:3,class:ce(i.value==="console"?"command-line-container":"input-line-container")},[i.value==="console"?(o(),r("span",at,[n("span",ot,p(b.split("@")[0]),1),t[38]||(t[38]=n("span",{id:"ampersand"},"@",-1)),n("span",it,p(b.split("@")[1]),1),t[39]||(t[39]=n("span",null,":",-1)),n("span",st,p(u(e).length===1?"~":"~/"+u(e).slice(1)),1),t[40]||(t[40]=M("$  ",-1))])):(o(),r("span",rt,":")),n("form",{onSubmit:ue(Y,["prevent"]),class:"input-form"},[n("span",{class:"blinking-cursor",style:te({left:u(U)})},null,4),de(n("input",{ref_key:"inputField",ref:c,"onUpdate:modelValue":t[0]||(t[0]=s=>pe(a)?a.value=s:null),type:"text",class:"input-text",onKeydown:t[1]||(t[1]=(...s)=>u(V)&&u(V)(...s)),onKeyup:t[2]||(t[2]=(...s)=>u(A)&&u(A)(...s)),onClick:t[3]||(t[3]=(...s)=>u(A)&&u(A)(...s)),onInput:t[4]||(t[4]=(...s)=>u(A)&&u(A)(...s))},null,544),[[me,u(a)]]),u(L)?(o(),r("span",{key:0,class:"suggestion",style:te({left:u(a).length+"ch"})},p(u(L).replace(u(a),"")),5)):x("",!0)],32)],2)):x("",!0),n("div",lt,null,512)],512)]))}}),dt=ee(ct,[["__scopeId","data-v-64ee7a01"]]);export{dt as default};
