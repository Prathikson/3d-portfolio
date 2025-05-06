import { useState } from "react";
import TermsModal from "../components/TermsModal";
import { socialImgs } from "../constants";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer className="bg-[#0B0B0F] text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Terms Link */}
          <div>
            <p
              role="button"
              tabIndex={0}
              onClick={() => setShowModal(true)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setShowModal(true)
              }
              className="cursor-pointer text-sm text-white-50 underline hover:text-white/60 transition focus:outline-none"
            >
              Terms & Conditions
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            {socialImgs.map((socialImg, index) => (
              <div
                key={index}
                className="hover:scale-110 transition-transform duration-200"
              >
                <img
                  src={socialImg.imgPath}
                  alt="social icon"
                  className="w-6 h-6 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div>
            <p className="text-sm text-center md:text-end">
              © {new Date().getFullYear()} Prathikson Jeyakumar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Triggered */}
      {showModal && <TermsModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Footer;
