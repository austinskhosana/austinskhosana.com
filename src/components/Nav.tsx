import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <header>
      <div className="mx-auto flex max-w-2xl items-center justify-center px-6 py-5">
        <Logo />
      </div>
    </header>
  );
}
