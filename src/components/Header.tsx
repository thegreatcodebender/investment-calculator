import logo from "/assets/images/logo.svg";

const Header = () => {
  return (
    <header className="p-3 mx-4 bg-header rounded-b-[24px]">
      <div>
        <img
          src={logo}
          alt="Investment Calculator"
          className="h-[44px] max-md:h-[32px] mx-auto"
        />
      </div>
    </header>
  );
};

export default Header;
