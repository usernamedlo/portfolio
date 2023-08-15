import React from "react";
import CurrentTime from "../js/CurrentTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
  faYoutube,
  faEthereum,
} from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  const socialLinks = [
    {
      icon: faInstagram,
      link: "https://www.instagram.com/usernamedlo.jpg/?hl=fr",
    },
    { icon: faLinkedin, link: "https://www.linkedin.com/in/loic-ghijselings/" },
    { icon: faGithub, link: "https://github.com/usernamedlo" },
    {
      icon: faYoutube,
      link: "https://www.youtube.com/channel/UCp5h2GbEPG7ZCn2TSX3SlWQ",
    },
    { icon: faEthereum, link: "https://opensea.io/0xdlo" },
  ];

  return (
    <nav className="bg-[#333333] h-12 w-full flex items-center justify-between px-4">
      <a
        href=""
        rel="noopener noreferrer"
      >
        <div className="flex items-center">
          <img
            src="../../apple_logo.png"
            alt="Apple Logo"
            className="h-7 mr-4"
          />
          <strong className="text-white text-xl">
            <h3>usernamedlo</h3>
          </strong>
        </div>
      </a>
      <div className="flex items-center text-lg">
        <div className="space-x-3 mr-5">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={social.icon}
                className="h-7 hover:text-gray-400 cursor-pointer"
              />
            </a>
          ))}
        </div>
        <CurrentTime />
      </div>
    </nav>
  );
};

export default NavBar;
