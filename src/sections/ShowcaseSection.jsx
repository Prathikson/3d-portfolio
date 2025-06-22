import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import ViewLiveSite from "../components/ViewLiveSite";


gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);


  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full ">
        <div className="mb-20">
        <TitleHeader title="Recent Projects" sub="💻 Featured Works"/>
        </div>
      
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
              <h2>
                On-Demand Mp4 to Mp3 converter
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with Next Js & TailwindCSS and Express Js for a fast,
                user-friendly experience.
              </p>
              <ViewLiveSite
              href="https://mp4-to-mp3-frontend.vercel.app/"
              />
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#003934]">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>The Meeting Notes taker AI</h2>
              <div className="mt-5">
              <ViewLiveSite
              href="https://notez-ai-frontend.vercel.app/"
              />
              </div>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#e4e4e4]">
                <img src="/images/project3.png" alt="YC Directory App" />
              </div>
              <h2>Mock Interview - Practice AI</h2>
              <div className="mt-5">
              <ViewLiveSite
              href="https://interview-ai-dun.vercel.app/sign-in"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;