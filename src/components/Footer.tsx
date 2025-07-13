const Footer = () => {
  return (
    <footer className="p-4 pb-0 max-w-[1100px] mt-8 mx-auto">
      <div className="py-4 px-6 shadow-card rounded-2xl rounded-b-none border-[rgba(13,122,72,0.01)]">
        <p className="leading-none">
          Thanks for checking out this project! See more of my work in{" "}
          <a
            href="https://iabhi.dev/?utm_source=icalc&utm_medium=footer&utm_campaign=projects"
            className="py-2 inline-block text-primary font-semibold underline underline-offset-2"
          >
            portfolio
          </a>
          .
        </p>
        <p className="text-sm text-gray-600">
          Logo icon credit:{" "}
          <a
            href="https://www.flaticon.com/free-icons/investment"
            title="investment icons"
            className="font-medium underline underline-offset-2"
          >
            Investment icons created by Freepik - Flaticon
          </a>
        </p>
        <hr className="mt-1 mb-1.5 text-gray-300" />
        <p className="text-gray-600">
          {`© ${new Date().getFullYear()} Abhijith A S. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
