const Footer = () => {
  return (
    <footer className="py-4 max-w-[1100px] mt-8 mx-auto px-4">
      <p className="max-md:mb-2">
        Thanks for checking out this project! See more of my work in{" "}
        <a href="/" className="py-2 inline-block text-primary font-semibold">
          my portfolio
        </a>
        {"."}
      </p>
      <p>
        {`© ${new Date().getFullYear()} Abhijith A S. All rights reserved.`}
      </p>
    </footer>
  );
};

export default Footer;
