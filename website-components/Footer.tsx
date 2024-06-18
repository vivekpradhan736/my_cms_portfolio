import React from "react";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon
} from "@radix-ui/react-icons";
import { config } from "@/constant";
import Link from "next/link";

function ContactForm() {
  return (
    <div className="flex flex-rpw md:flex-row md:justify-between justify-center gap-6 pb-6">
      <div>
        <p className="text-sm md:text-base text-gray-500">{config.footer.leftContent}</p>
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-500">{config.footer.centerContent}</p>
      </div>
      <div className="flex md:gap-5 gap-2">
        <Link href="https://www.linkedin.com/in/vivek-pradhan-b3ba9922b/" className="group border border-green-500 h-9 p-2 rounded-full hover:scale-105 hover:bg-green-600 delay-75 transition-transform group"><LinkedInLogoIcon  width={18} height={18} className="text-green-500 group-hover:text-white"/></Link>
        <Link href="https://github.com/vivekpradhan736" className="group border border-green-500 h-9 p-2 rounded-full hover:scale-105 hover:bg-green-600 delay-75 transition-transform group"><GitHubLogoIcon width={18} height={18} className="text-green-500 group-hover:text-white"/></Link>
        <Link href="https://www.instagram.com/developer.vivek02/" className="group border border-green-500 h-9 p-2 rounded-full hover:scale-105 hover:bg-green-600 delay-75 transition-transform group"><InstagramLogoIcon width={18} height={18} className="text-green-500 group-hover:text-white"/></Link>
      </div>
    </div>
  );
}

export default ContactForm;