import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const firstName =
    userName.split("@")[0].charAt(0).toUpperCase() +
    userName.split("@")[0].slice(1);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-sm z-50 border-b">
      <div className="container mx-auto flex items-center justify-center px-4 sm:px-6 h-16 relative">
        <h1 className="text-lg font-semibold text-center tracking-tight text-foreground font-[Georgia] md:hidden">
          Welcome, {firstName}!
        </h1>
        <h1 className="hidden md:block text-xl font-semibold text-center tracking-tight text-foreground font-[Georgia] italic">
          Hey, {firstName}! Welcome to your To-Do list — let’s make the day
          productive.
        </h1>
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
