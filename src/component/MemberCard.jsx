import React from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import "../css/member-card.css"
import { BiLogoGmail } from 'react-icons/bi';

const MemberCard = ({ info, skills, img, linkedin, gmail, github, isWrapped }) => {
    return (
        <div className="card">
            <img src={`/images/${img}`} alt="Profile Image" className="card-image" />
            <p className="card-role">{info.role}</p>
            <h3 className="card-name">{info.name}</h3>
            <p className="card-description">Studying B.Sc. in Computer Science and Engineering.</p>
            <div className="skills">
                <h3>Skills</h3>
                <ul className={isWrapped ? 'wrapped' : ''}>
                    {skills.map((skill, index) => {
                        return (<li key={index}>{skill}</li>)
                    })}
                </ul>
            </div>
            <div className="follow">
                <h3>Social Media:</h3>
                <div className="links">
                    {gmail &&
                        <a
                            href={gmail}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gmail"
                        >
                            <BiLogoGmail size={24} />
                        </a>
                    }
                    {linkedin &&
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin"
                        >
                            <FaLinkedinIn size={24} />
                        </a>
                    }
                    {github && github.trim() !== "" &&
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github"
                        >
                            <FaGithub size={24} /> 
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default MemberCard
