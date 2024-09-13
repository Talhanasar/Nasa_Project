import React from 'react'
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import "../../css/member-card.css"

const MemberCard = ({ info, img, linkedin, fb, insta, skills }) => {
    return (
        <div className="card">
            <img src={`/assets/${img}`} alt="Profile Image" className="card-image" />
            <p className="card-role">{info.role}</p>
            <h3 className="card-name">{info.name}</h3>
            <p className="card-description">Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum</p>
            <div className="skills">
                <h3>Skills:</h3>
                <ul>
                    {skills.map((skill, index) => {
                        return (<li key={index}>{skill}</li>)
                    })}
                </ul>
            </div>
            <div className="follow">
                <h3>Social Media:</h3>
                <div className="links">
                    {insta &&
                        <a
                            href={insta}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="insta"
                        >
                            <FaInstagram size={24} /> {/* React icon with size */}
                        </a>
                    }
                    {fb &&
                        <a
                            href={fb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fb"
                        >
                            <FaFacebookF size={24} /> {/* React icon with size */}
                        </a>
                    }
                    {linkedin &&
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin"
                        >
                            <FaLinkedinIn size={24} /> {/* React icon with size */}
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}

export default MemberCard
