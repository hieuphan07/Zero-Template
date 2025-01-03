"use client";

import ZeroLink from "../../Atoms/Link/ZeroLink";

const Footer = () => {
  return (
    <footer className="bg-background fixed bottom-0 w-[90vw] ml-[5vw]">
      <div className="flex justify-center items-center h-[5vh] py-4 gap-5 text-sm">
        <ZeroLink href="/" target="_blank" rel="noopener noreferrer" color="warning">
          Next Zero Foundation
        </ZeroLink>
        <p className="text-primary font-extrabold">|</p>
        <ZeroLink href="/" target="_blank" rel="noopener noreferrer" color="success">
          Pasona Tech Da Nang
        </ZeroLink>
        <p className="text-primary font-extrabold">|</p>
        <ZeroLink href="/" target="_blank" rel="noopener noreferrer" color="info">
          Privacy Policy
        </ZeroLink>
        <p className="text-primary font-extrabold">|</p>
        <ZeroLink href="/" target="_blank" rel="noopener noreferrer" color="danger">
          Terms of Service
        </ZeroLink>
      </div>
    </footer>
  );
};

export default Footer;
