import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <header>
      <div className="flex items-center justify-start px-6 pt-12 pb-5 sm:px-8 md:px-12">
        <Logo />
      </div>
    </header>
  );
}
