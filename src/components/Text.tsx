import { RxHamburgerMenu } from "react-icons/rx";

export default function DebugNav() {
  return (
    <nav className="flex h-16 bg-background/50 sticky top-0 border-b px-8 backdrop-blur items-center justify-between z-20">
      <div className="flex items-center md:hidden">
        <RxHamburgerMenu className="text-2xl" />
      </div>
    </nav>
  );
}