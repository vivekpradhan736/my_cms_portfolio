import { SketchLogoIcon, Pencil2Icon, ImageIcon } from "@radix-ui/react-icons";

interface SkillItemProps {
  width: number;
  height: number;
  className: string
}

const config = {
  header: {
    leftMenu: [
      {
        name: "Home",
        id: '/#home'
      },
      {
        name: "Skills",
        id: '/#skills'
      },
      {
        name: "Portfolio",
        id: '/#portfolio'
      },
      {
        name: "Blogs",
        id: '/#blogs'
      },
      {
        name: "Contact",
        id: '/#contact'
      },
    ],
    rightMenu: [
      {
        name: "Resume",
      },
    ],
  },
  // skill
  skills : [
  {
    image: "/images/html.svg",
    name: "HTML",
  },
  {
    image: "/images/css.svg",
    name: "CSS",
  },
  {
    image: "/images/javascript.svg",
    name: "JavaScript",
  },
  {
    image: "/images/reactjs.svg",
    name: "React.js",
  },
  {
    image: "/images/nextjs.svg",
    name: "Next.js",
  },
  {
    image: "/images/nodejs.svg",
    name: "Node.js",
  },
  {
    image: "/images/git.svg",
    name: "Git",
  },
  {
    image: "/images/figma.svg",
    name: "Figma",
  },
  {
    image: "/images/bootstrap.svg",
    name: "Bootstrap",
  },
  {
    image: "/images/mongodb.svg",
    name: "MongoDB",
  },
  {
    image: "/images/typescript.svg",
    name: "TypeScript",
  },
  {
    image: "/images/github.svg",
    name: "GitHub",
  },
  {
    image: "/images/express.svg",
    name: "Express.js",
  },
  {
    image: "/images/tailwindcss.svg",
    name: "Tailwind CSS",
  },
  {
    image: "/images/c++.svg",
    name: "C++",
  },
  {
    image: "/images/python.svg",
    name: "Python",
  },
],
  banner: {
    title: "Welcome",
    heading: "I have Creative Design Experience",
    subTitle:
      "I'm Vivek, a creative Product Designer. I've been helping businesses to solve their problems with my design for 2 years.",
    actionButton: [
      {
        name: "Contact Me",
      },
      {
        name: "View portfolio",
      },
    ],
  },
  info: {
    data: [
      {
        title: "02+",
        subTitle: "Satisfied clients",
      },
      {
        title: "04+",
        subTitle: "Projects completed",
      },
      {
        title: "10+",
        subTitle: "Reviews given",
      },
    ],
  },
  mySkills: {
    title: "My Skills",
    subTitle: "Why Hire Me For Your Next Project?",
    content:
      "I'm specialist in UI/UX Designe. My passion is designing & solving problems through user experience and research.",
    actionButton: {
      name: "Hire Me",
    },
    skills: [
      {
        icon: (props: SkillItemProps) => {
          return <SketchLogoIcon {...props}/>
        },
        title: "Visual Design",
        subTitle: "Create user interface design with unique & modern ideas",
      },
      {
        icon: (props: SkillItemProps) => {
          return <Pencil2Icon {...props}/>
        },
        title: "UX Research",
        subTitle: "Create digital user products with updated ideas",
      },
      {
        icon: (props: SkillItemProps) => {
          return <ImageIcon {...props}/>
        },
        title: "Design Prototype",
        subTitle: "Create advance design prototype with Figma apps.",
      },
    ],
  },
  technologies: {
    title: "Technologies",
    subTitle:
      "I have selected and mentioned here some of i worked projects technologies here",
    technologies: [
      {
        name: "HTML",
      },
      {
        name: "CSS/SCSS",
      },
      {
        name: "JavaScript",
      },
      {
        name: "TypeScript",
      },
      {
        name: "NodeJS",
      },
      {
        name: "React.js",
      },
      {
        name: "Next.js",
      },
    ],
  },
  portfolio: {
    title: "Portfolio",
    subTitle: "My Creative Works Latest Projects",
    content:
      "I have selected and mentioned here some of my latest projects to share with you.",
  },
  blogs: {
    title: "Blogs",
    subTitle: "My latest articles",
    content:
      "I have selected and mentioned here some of my latest blogs to share with you.",
    actionButton: "View All Blogs",
  },
  contact: {
    title: "Contact",
    subTitle: "Let's Discuss Your Project",
    content:
      "Let's make something new, different and more meaningful or make thing more visual or conceptual",
    fields: [
      {
        fieldName: "Full name",
      },
      {
        fieldName: "Your email",
      },
      {
        fieldName: "Phone number",
      },
      {
        fieldName: "Budget",
      },
      {
        fieldName: "Message",
      },
    ],
  },
  contactInfo: {
    call:{
      fieldName: "Call me",
      value: "+91 6203046018",
    },
    email:{
      fieldName: "Email me",
      value: "vivekpradhan736@gmail.com",
    },
    address:{
      fieldName: "Address",
      value: "Tatanagar, India",
    }
  },
  footer: {
    leftContent: "@ 2023. All Rights Reserved",
    centerContent: "Designed by Vivek Pradhan",
  },
};

export { config };