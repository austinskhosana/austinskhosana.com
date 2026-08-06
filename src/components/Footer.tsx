const socials = [
  { href: "https://github.com/austinskhosana", label: "GitHub" },
  { href: "https://www.linkedin.com/in/austinskhosana/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Austin Skhosana</p>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
