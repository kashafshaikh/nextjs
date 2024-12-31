
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="text-center text-[#ADB7BE] bg-[#121212] mt-32 border-t-[4px] border-primary py-[40px] sm:py-[50px] md:py-[60px]">
      
      <p className="text-[16px] sm:text-[18px] md:text-[20px]">
        Stay Connected with My Work:
      </p>

      <div className="flex justify-center mx-auto py-4 sm:py-5 space-x-6 sm:space-x-8 text-[20px]">
        {/* Email */}
        <a href="mailto:billushaikhshaikh@gmail.com">
          <AiOutlineMail className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-primary cursor-pointer transition-transform transform hover:scale-110 hover:bg-gray-900 rounded-full p-1" />
        Email</a>

        {/* GitHub */}
        <a
          href="https://github.com/kashafshaikh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-primary cursor-pointer transition-transform transform hover:scale-110 hover:bg-gray-900 rounded-full p-1" />
        Github</a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/kashaf-zeeshan-5756022b5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-primary cursor-pointer transition-transform transform hover:scale-110 hover:bg-gray-900 rounded-full p-1" />
        Linkedin</a>
      </div>

      <p className="text-center text-xs sm:text-sm md:text-base mt-[30px] sm:mt-[40px]">
        © 2024 Latest Blog. All Rights Reserved.
      </p>
    </div>
  );
}

