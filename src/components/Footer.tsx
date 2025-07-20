import gitHubLogo from "/assets/images/github-logo.svg";

const Footer = () => {
  return (
    <footer className="md:px-4 pb-0 max-w-[1100px] mt-8 mx-auto">
      <div className="p-4 md:px-6 shadow-card md:rounded-2xl md:rounded-b-none border-[rgba(13,122,72,0.01)]">
        <div className="flex max-md:flex-col-reverse justify-between md:items-center gap-2">
          <div>
            <p className="md:leading-none leading-tight">
              Thanks for checking out this project! See more of my work in{" "}
              <a
                href="https://iabhi.dev/?utm_source=icalc&utm_medium=footer&utm_campaign=projects"
                className="py-2 inline-block text-primary font-semibold underline leading-none underline-offset-2"
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
          </div>
          <a
            href="https://github.com/thegreatcodebender/investment-calculator"
            target="_blank"
            className="p-1.5 grow-0 w-max"
            title="Visit GitHub repository"
            aria-label="Visit GitHub repository"
          >
            <img
              src={gitHubLogo}
              alt="GitHub logo"
              className="w-7 h-auto"
              aria-hidden
            />
          </a>
        </div>
        <hr className="my-2 text-gray-300" />
        <p className="text-gray-600">
          {`© ${new Date().getFullYear()} Abhijith A S. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
