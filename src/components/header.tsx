import LocaleSwitcher from "./localeSwitcher";
import ThemeToggle from "./themeToggle";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <ThemeToggle />
      <LocaleSwitcher />
    </div>
  );
};

export default Header;
