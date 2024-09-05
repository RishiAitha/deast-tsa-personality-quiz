"use client";

import React, { useEffect, useState } from 'react';
import calculateMatches from '../../utils/calculateMatches';
import Event from '../components/Event';
import Graph from '../components/Graph'
import styles from '../globals.css';
import stylesRP from './ResultPage.module.css';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';

const events = [
  { id: 1, name: "Animatronics", variables: [4, 4, 2, 3, 5, 4, 2, 2, 1, 0], description: "To address the annual design challenge, participants exhibit and demonstrate their knowledge of mechanical and control systems by creating an animatronic device with a specific purpose (i.e., communicate an idea, entertain, demonstrate a concept, etc.) that includes sound, lights, and an appropriate surrounding environment (a display)." },
  { id: 2, name: "Architectural Design", variables: [4, 2, 4, 1, 4, 5, 2, 2, 1, 0], description: "In response to the annual design challenge, participants develop a set of architectural plans and related materials, and construct both a physical and computer-generated model to accurately depict their design. Semifinalists deliver a presentation and participate in an interview." },
  { id: 3, name: "Audio Podcasting", variables: [3, 2, 2, 1, 1, 3, 5, 1, 1, 0], description: "Participants use digital audio technology to create original content for a podcast piece that addresses the annual theme. The podcast must feature high level storytelling techniques, voice acting, and folly sound effects; the full entry must include documentation of the podcast development process and elements. Semifinalists participate in an interview." },
  { id: 4, name: "Biotechnology Design", variables: [3, 1, 4, 1, 2, 3, 2, 5, 1, 0], description: "Participants select a contemporary biotechnology problem that addresses the annual theme and demonstrates understanding of the topic through documented research, the development of a solution, a display (including an optional model or prototype), and an effective multimedia presentation. Semifinalists deliver a presentation and participate in an interview." },
  { id: 5, name: "Board Game Design", variables: [2, 2, 4, 1, 2, 5, 2, 1, 1, 0], description: "Participants develop, build, and package a board game that focuses on a subject of their choice. Creative packaging, and the instructions, pieces, and cards associated with the pilot game will be evaluated. Semifinalists set up the game, demonstrate how the game is played, explain the game’s features, and discuss the design process." },
  { id: 6, name: "Chapter Team", variables: [3, 1, 4, 1, 1, 1, 1, 1, 1, 0], description: "Participants take a parliamentary procedure written test to qualify for the semifinal round of competition. Semifinalists conduct an opening ceremony, items of business, parliamentary actions, and a closing ceremony." },
  { id: 7, name: "Children's Stories", variables: [3, 2, 4, 1, 1, 5, 2, 1, 1, 0], description: "In response to the annual theme, participants create an illustrated children’s story of artistic, instructional, and social value, and submit documentation related to the development of the physical storybook. Semifinalists read their story aloud and participate in an interview." },
  { id: 8, name: "Coding", variables: [4, 1, 5, 5, 2, 1, 1, 2, 1, 0], description: "Participants take a written test, which concentrates on aspects of coding, to qualify for the semifinal round of competition. Semifinalists develop a software program – in a designated amount of time – that accurately addresses an onsite problem." },
  { id: 9, name: "Computer-Aided Design (CAD), Architecture", variables: [4, 2, 3, 2, 4, 3, 3, 1, 1, 0], description: "Participants use complex computer graphic skills, tools, and processes to respond to a design challenge in which they develop representations of architectural subjects, such as foundation and/or floor plans, and/or elevation drawings, and/or details of architectural ornamentation or cabinetry. The solution to the design challenge and participant answers in an interview are evaluated." },
  { id: 10, name: "Computer-Aided Design (CAD), Engineering", variables: [4, 2, 4, 2, 5, 2, 2, 1, 1, 0], description: "Participants use complex computer graphic skills, tools, and processes to respond to a design challenge in which they develop three-dimensional representations of engineering subjects, such as a machine part, tool, device, or manufactured product. The solution to the design challenge and participant answers in an interview are evaluated." },
  { id: 11, name: "Data Science and Analytics", variables: [4, 1, 4, 3, 2, 2, 3, 5, 1, 0], description: "Participants identify a societal issue, collect or compile data from various sources about the issue, and then produce documentation and a digital scientific poster about their findings. Semifinalists create a synopsis and digital visual representation of a data set provided in an onsite challenge." },
  { id: 12, name: "Debating Technological Issues", variables: [3, 1, 3, 1, 1, 1, 2, 3, 1, 0], description: "Participants research the annual topic and subtopics and prepare for a debate against a team from another chapter. Teams are instructed to take either the pro or con side of a selected subtopic, submit a summary of references, and use their research to support their assigned position. The quality of a team’s debate determines semifinalists and finalists." },
  { id: 13, name: "Digital Video Production", variables: [2, 3, 3, 1, 1, 4, 5, 2, 1, 0], description: "Participants develop and submit a digital video and a documentation portfolio (including such items as a storyboard, script, summary of references and sources, and equipment list) that reflects the annual theme. Semifinalists participate in an interview." },
  { id: 14, name: "Dragster Design", variables: [4, 3, 5, 1, 5, 3, 1, 2, 5, 0], description: "Participants design, draw, and construct a CO2-powered dragster that adheres to specifications, design and documentation requirements, and the annual theme. Semifinalists compete in a double-elimination race and participate in an interview." },
  { id: 15, name: "Drone Challenge (UAV)", variables: [4, 5, 4, 2, 5, 2, 1, 2, 5, 0], description: "Participants design, build, assemble, document, and test fly an open-source Unmanned Arial Vehicle (UAV) according to the stated annual theme/problem specifications. The required documentation portfolio must include elements such as a photographic log, wiring schematics, and a description of the programming software used. Semifinalists participate in an interview." },
  { id: 16, name: "Engineering Design", variables: [4, 3, 3, 3, 5, 3, 3, 4, 1, 0], description: "Participants develop a solution to an annual theme that is based on a specific challenge noted by the National Academy of Engineering (NAE) in its compilation of the grand challenges for engineering in the 21st century. The solution will include a documentation portfolio, a display, and a model/prototype. Semifinalists deliver a presentation and participate in an interview." },
  { id: 17, name: "Essays on Technology", variables: [2, 1, 2, 1, 1, 2, 2, 5, 1, 0], description: "Participants are given two hours to write a research-based essay - with citations - using an essay prompt and two (2) or more sources provided onsite. The essay must include insightful thoughts about the current technological topic presented in the prompt." },
  { id: 18, name: "Extemporaneous Speech", variables: [2, 1, 3, 1, 1, 1, 2, 3, 1, 0], description: "Participants select a technology-related or TSA topic from among three topic cards and prepare and give a three-to-five-minute speech that communicates their knowledge of the chosen topic. The quality of the speech determines advancement to the semifinalist level of competition, for which an identical competition procedure is followed to determine finalists." },
  { id: 19, name: "Fashion Design and Technology", variables: [4, 3, 2, 1, 2, 5, 2, 2, 1, 0], description: "To address the annual theme, participants demonstrate expertise in fashion design principles by creating a wearable garment, garment patterns, and a documentation portfolio. Semifinalist teams present their garment designs (worn by team models), discuss the design process with evaluators, and respond to interview questions." },
  { id: 20, name: "Flight Endurance", variables: [4, 2, 3, 1, 5, 2, 1, 2, 4, 0], description: "Participants design, build, fly, and adjust (trim) a rubber-band powered model aircraft to make long endurance flights inside a contained airspace. Documentation (including elements such as attributes of the model design, drawings, and an analysis of the trim modifications), an inspection of the model and the required model flight box, and official times for two flights are aspects of the evaluation." },
  { id: 21, name: "Forensic Science", variables: [2, 1, 3, 1, 2, 1, 2, 5, 1, 0], description: "Participants take a written test of basic forensic science to qualify for the semifinal round of competition. Semifinalists examine a mock crime scene and demonstrate their knowledge of forensic science through crime scene analysis, with the findings synthesized in a written report/analysis." },
  { id: 22, name: "Future Technology Teacher", variables: [2, 2, 2, 2, 2, 2, 3, 4, 1, 0], description: "Participants research a developing technology, prepare a video showing an application of the technology in the classroom, and create a lesson plan/activity that features the application and connects to the Standards for Technological and Engineering Literacy (STEL), as well as STEM initiatives and integration. Semifinalists demonstrate the lesson plan and answer questions about their presentation." },
  { id: 23, name: "Geospatial Technology", variables: [3, 1, 3, 1, 2, 3, 2, 5, 1, 0], description: "To address the issue presented in an annual theme, participants interpret geospatial data and develop a digital portfolio containing maps, data, and pertinent documentation. Semifinalists defend their projections and visual infographic during a presentation/interview." },
  { id: 24, name: "Manufacturing Prototype", variables: [3, 4, 3, 2, 5, 4, 2, 2, 1, 0], description: "To address the issue presented in an annual theme, participants interpret geospatial data and develop a digital portfolio containing maps, data, and pertinent documentation. Semifinalists defend their projections and visual infographic during a presentation/interview." },
  { id: 25, name: "Music Production", variables: [3, 3, 2, 1, 1, 4, 5, 2, 1, 0], description: "Participants produce an original musical piece designed to be played during the closing session of the national TSA conference. The quality of the musical piece and required documentation (including elements such as a plan of work, self-evaluation, and a list of hardware, software, and instruments used) determines advancement to the semifinal level of competition, during which semifinalist participants are interviewed." },
  { id: 26, name: "On Demand Video", variables: [3, 3, 3, 1, 1, 3, 5, 1, 1, 0], description: "Once participants receive the challenge details (required criteria, such as props and a line of dialogue) at the national TSA conference, they have 36 hours to produce a 60-second film that showcases video skills, tools, and communication processes. The quality of the completed video production determines the finalists." },
  { id: 27, name: "Photographic Technology", variables: [3, 4, 2, 1, 1, 5, 5, 2, 1, 0], description: "Participants produce a photographic portfolio - demonstrating expertise in photo and imaging technology processes - to convey a message based on the annual theme. Semifinalists have 24 hours to complete a portfolio of photos (with required documentation) taken onsite at the national TSA conference. Finalists are determined based on the quality of the semifinal portfolio, the portfolio presentation, and interview responses." },
  { id: 28, name: "Prepared Presentation", variables: [3, 1, 3, 1, 1, 1, 3, 3, 1, 0], description: "Participants deliver a three-to-five-minute oral presentation related to the current national TSA conference theme. Both semifinalists and finalists are determined based on the quality of the presentation and the appropriate use and content of the accompanying required slide deck." },
  { id: 29, name: "Promotional Design", variables: [2, 1, 2, 1, 1, 4, 4, 1, 1, 0], description: "Participants use computerized graphic communications layout and design skills to produce a promotional resource packet. The resource must address the annual theme/problem and include at least four printed publication items and required documentation. Semifinalists demonstrate publishing competency in an onsite technical design challenge." },
  { id: 30, name: "Senior Solar Sprint", variables: [4, 3, 4, 2, 5, 3, 1, 2, 5, 0], description: "The Senior Solar Sprint (SSS) competition is funded by the Army Educational Outreach Program (AEOP) and managed by TSA. Students apply scientific understanding, creativity, experimentation, and teamwork to design, build, and race a model solar vehicle that carries a payload; documentation of the process is required. Students must register on Cvent to participate and begin the SSS journey." },
  { id: 31, name: "Software Development", variables: [4, 2, 5, 5, 2, 3, 3, 2, 1, 0], description: "Participants use their knowledge of cutting-edge technologies, algorithm design, problem-solving principles, effective communication, and collaboration to design, implement, test, document, and present a software development project of educational or social value. Both semifinalists and finalists are determined based on the quality of the presentation and project." },
  { id: 32, name: "Structural Design and Engineering", variables: [3, 3, 2, 1, 5, 3, 1, 3, 1, 0], description: "Participants apply the principles of structural engineering to design and construct a structure that complies with the annual challenge. An assessment of the required documentation and the destructive testing of the structure (to determine its design efficiency) determine both semifinalists and finalists." },
  { id: 33, name: "System Control Technology", variables: [4, 3, 2, 4, 4, 2, 1, 2, 1, 0], description: "Participants develop a solution to a problem (typically one from an industrial setting) presented onsite at the conference. They analyze the problem, build a computer-controlled mechanical model, program the model, demonstrate the programming and mechanical features of the model-solution in an interview, and provide instructions for evaluators to operate the model." },
  { id: 34, name: "Technology Bowl", variables: [2, 1, 4, 2, 2, 2, 2, 3, 1, 0], description: "Participants demonstrate their knowledge of TSA and concepts addressed in technology content standards by completing a written, objective test. Semifinalist teams participate in a question/response, head-to-head, team competition." },
  { id: 35, name: "Technology Problem Solving", variables: [2, 1, 3, 2, 4, 1, 1, 2, 1, 0], description: "Participants use problem-solving skills to design and construct a finite solution to a challenge provided onsite at the conference. Solutions are evaluated at the end of 90 minutes using measures appropriate to the challenge, such as elapsed time, horizontal or vertical distance, and/or strength." },
  { id: 36, name: "Transportation Modeling", variables: [3, 2, 2, 2, 4, 3, 2, 2, 1, 0], description: "Participants research, design, and produce a scale model of a vehicle that complies with the annual design problem. A display for the model and a documentation portfolio – containing elements such as a description of the vehicle, photographs and commentary detailing the vehicle production, and technical illustrations – are required. Semifinalists participate in an interview." },
  { id: 37, name: "VEX Robotics Competition", variables: [4, 4, 4, 4, 5, 2, 2, 2, 3, 0], description: "Participants collaborate on a robotics project in which they build a robot that incorporates the relationship among STEM fields; the competition culminates in a head-to-head game that assesses the efficiency and productivity of the robot." },
  { id: 38, name: "Video Game Design", variables: [4, 2, 4, 5, 1, 4, 3, 3, 1, 0], description: "Participants design, build, and launch an E-rated online video game – with accompanying required documentation - that addresses the annual theme. Semifinalists participate in an interview to demonstrate the knowledge and expertise they gained during the development of the game." },
  { id: 39, name: "Virtual Reality Visualization (VR)", variables: [4, 4, 2, 5, 2, 4, 3, 2, 1, 0], description: "Participants use video and 3D computer graphics tools and design processes to create a two-to-three-minute VR visualization (accompanied by supporting documentation) that addresses the annual theme. Semifinalists deliver a presentation about their visualization and participate in an interview." },
  { id: 40, name: "Webmaster", variables: [4, 1, 4, 5, 2, 3, 4, 1, 1, 0], description: "Participants design, build, and launch a website that addresses the annual challenge. Semifinalists participate in an interview to demonstrate the knowledge and expertise gained during the development of the website." },
  { id: 41, name: "PA ONLY - Cybersecurity", variables: [3, 1, 2, 5, 3, 1, 1, 4, 1, 1], description: "Applying leadership and 21st-century skills, participants respond to a cybersecurity challenge by identifying a breach in computer security via \"Capture the Flag\" games. Areas of challenge might include exploit development, digital puzzles, cryptography, reverse engineering, binary analysis, mobile security, etc. Participants must accurately address a series of on-site problems within a specified, limited amount of time." },
  { id: 42, name: "PA ONLY - Logo Design", variables: [2, 2, 2, 1, 1, 5, 4, 1, 1, 1], description: "Screen-printing utilizes an area of screen mesh blocked off with a non-permeable material to form a stencil creating a negative of the image to be printed; that is, the open spaces are where the ink will appear when printed. Transfers and Direct to Garment (DTG) printing IS NOT PERMITTED. This contest requires the student to create promotional logo designs to be utilized for the next year's PA-TSA T-shirt, PA-TSA State Conference program, and the PA-TSA website banner. The Middle School or High School winner will be chosen to have the designs appear on all PA- TSA State Conference publications (website, mailings, programs, etc.).\nThe State Conference PA-TSA Logo Design contest is designed to demonstrate design, layout, production, and presentation skills of Visual Communications with a primary focus on the screen-printing process." },
  { id: 43, name: "PA ONLY - Materials Process", variables: [1, 3, 2, 1, 4, 3, 2, 2, 1, 1], description: "TSA contestants entering the Materials Processes contest are required to submit drawings and photographs of a project that they have constructed during the school year. The purpose of the Materials Processes contest is to provide a means for TSA members to demonstrate their ability to fabricate a project or product." },
  { id: 44, name: "PA ONLY - Pin Design", variables: [2, 1, 2, 1, 1, 5, 4, 1, 1, 1], description: "The PA-TSA Pin Design contest is intended for competitors to design a visually captivating and communicative pin that embodies the spirit and values of PA-TSA. Participants will have the chance to explore the world of visual communication, where symbols, colors, and design play a pivotal role in conveying a message. The purpose of the PA-TSA pin is to raise funds for the American Cancer Society, promote PA-TSA at Pin Trading at the National Conference, and boost PA-TSA pride." },
  { id: 45, name: "PA ONLY - R/C Off-Road Racing", variables: [2, 3, 2, 2, 4, 2, 1, 1, 4, 1], description: "The R/C Off-Road Racing competition is designed to promote teamwork and problem-solving among students as they acquire the technical skills to adapt, operate, race, and maintain a radio-controlled off-road racing vehicle that will also perform a task while racing around the track. Points earned for the portfolio contents, the appearance of the vehicle body and piece for the task, drawing(s) for the task, and racing results will determine each team's evaluation. The task will change from year to year. The task and the specifications will be included in a separate document each year." },
  { id: 46, name: "PA ONLY - Robotics", variables: [4, 3, 3, 4, 5, 2, 1, 2, 3, 1], description: "Students will design, build, test, and demonstrate a remote-controlled robot and necessary accessories in order to carry out a specific challenge. This event is not platform-specific." },
  { id: 47, name: "PA ONLY - Safety Illustration", variables: [2, 1, 2, 1, 1, 4, 3, 3, 1, 1], description: "The Safety Illustration event is designed to encourage members' attention to the promotion of safety and safety practices when using any form of technology. The purpose of the Safety Illustration event is to provide a means for TSA members to demonstrate their ability to recognize safety needs and safety practices when using all forms of technology, traditional or high-tech." }
];

const ResultPage = () => {
  const [matches, setMatches] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [displayProfile, setDisplayProfile] = useState([]);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    setDisplayProfile(userProfile);
    if (userProfile) {
      const sortedMatches = calculateMatches(userProfile, events);
      setMatches(sortedMatches);
    }
  }, [setMatches, setDisplayProfile]);

  const handleRetakeQuiz = () => {
    setTimeout(() => {
      localStorage.removeItem('userProfile');
      window.location.href = '/';
    }, 500);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const displayedMatches = showAll ? matches : matches.slice(0, 5);

  return (
    <div className={stylesRP.container}>
      <h1 className={`${stylesRP.title} ${ubuntu_mono.className} antialiased`}>Your Top 5 Best Matches</h1>
      {displayProfile ? (
        <Graph
        profile={displayProfile}
        />
      ) : (
        <div></div>
      )}
      {displayedMatches.length > 0 ? (
        displayedMatches.map(event => (
          <Event key={event.id} event={event} />
        ))
      ) : (
        <p className={`${stylesRP.results} ${josefin_sans.className} antialiased`}>No matches found. Please complete the quiz first.</p>
      )}
      {!showAll && matches.length > 5 && (
        <div className={stylesRP.showAllButtonContainer}>
          <button onClick={handleShowAll} className={`${stylesRP.showAllButton} ${josefin_sans.className} antialiased`}>
            Show ranking for all other events
          </button>
        </div>
      )}
      <div className={stylesRP.stickyButtonContainer}>
        <button onClick={handleRetakeQuiz} className={`${stylesRP.stickyButton} ${josefin_sans.className} antialiased`}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
