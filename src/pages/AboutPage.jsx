import React, { useEffect, useRef, useState } from 'react';
import MemberCard from '../component/MemberCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/about.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [isAnyCardWrapped, setIsAnyCardWrapped] = useState(false);
  const membersRef = useRef(null);

  useEffect(() => {
    const checkWrapping = () => {
      const skillsLists = membersRef.current.querySelectorAll('.skills ul');
      let wrapped = false;

      skillsLists.forEach(list => {
        const items = list.querySelectorAll('li');
        if (items.length > 0) {
          const firstItemTop = items[0].offsetTop;
          if (Array.from(items).some(item => item.offsetTop > firstItemTop)) {
            wrapped = true;
          }
        }
      });

      setIsAnyCardWrapped(wrapped);
    };

    const timer = setTimeout(() => {
      const allCards = document.querySelectorAll('.card');
      ScrollTrigger.refresh();
      allCards.forEach((card) => {
        gsap.from(card,
          {
            opacity: 0,
            y: 100,
            duration: 1.5,
            scrollTrigger: {
              trigger: card,
              scroller: "body",
              start: "top 75%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      checkWrapping();
    }, 100);

    window.addEventListener('resize', checkWrapping);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', checkWrapping);
    };
  }, []);

  const members = [
    { info: { name: "Abhilash chowdhury", role: "Leader" }, skills: ["Graphics Designer","Video Editor"], img: "abhilash.jpg", linkedin: "https://www.linkedin.com/in/abhilash-chowdhury/", gmail: "mailto:abhilashchowdhury449@gmail.com", github: " https://github.com/AbhilashChowdhury" },
    { info: { name: "Md. Mehedi Hassan", role: "Member" }, skills: ["Frontend Developer","ML Enthusiast"], img: "mehedi.jpg", linkedin: "https://www.linkedin.com/in/hassanmehedi/", gmail: "mailto:mdhassan20.bd@gmail.com", github: "https://github.com/MdMehedi-Hassan" },
    { info: { name: "Talha", role: "Member" }, skills: ["MERN Developer", "Full Stack Developer"], img: "talha.jpg", linkedin: "https://www.linkedin.com/in/talha-7642a1264/", gmail: "mailto:talhabinnasar7@gmail.com", github: "https://github.com/Talhanasar" },
    { info: { name: "Pritom Gupta", role: "Member" }, skills: ["Graphics Designer","Web Developer"], img: "pritom.jpg", linkedin: "https://www.linkedin.com/in/pritom-g-9b1b43265/", gmail: "mailto:trailblazerpritom@gmail.com", github: "https://github.com/P-r-i-t-o-m" },
    { info: { name: "Tazrian Binte Mahfuz", role: "Member" }, skills: ["Researcher"], img: "tazrian.jpg", linkedin: "https://www.linkedin.com/in/tazrian-binte-mahfuz-734bb8326/", gmail: "mailto:tazrian.binte786@gmail.com", github: "https://github.com/TazrianBinteMahfuz" },
    {info:{name:"Mahir Faisal",role:"Member"},skills:["3D Modeling & Rendering","Motion Graphics"],img:"mahir.jpg",linkedin:"https://www.linkedin.com/in/mahir-faisal-095166288/",gmail:"mailto:mahirfaisalarian@gmail.com",github:""}
  ];

  return (
    <div className='page'>
      <div className="top">
        <h1>Our Team</h1>
      </div>
      <ul className="members" ref={membersRef}>
        {members.map((member, index) => (
          <li key={index}> 
            <MemberCard 
              info={member.info}
              skills={member.skills}
              img={member.img}
              linkedin={member.linkedin}
              gmail={member.gmail}
              github={member.github}
              isWrapped={isAnyCardWrapped}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
