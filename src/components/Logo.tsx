import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-[15px] font-medium text-foreground"
    >
      <span aria-hidden className="text-lg leading-none">
        ✽
      </span>
      Austin Skhosana
    </Link>
  );
}
