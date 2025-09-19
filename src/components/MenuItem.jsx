import Link from "next/link";

export default function MenuItem({ href, children }) {
  return (
    <Link
      href={href}
      className="
        relative px-3 py-1 rounded-full
        text-white transition-colors duration-300
        hover:text-[#FF6D0B]
        overflow-hidden
        group
      "
    >
      {children}

      {/* Efeito faísca */}
      <span
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          translate-x-[-100%]
          group-hover:translate-x-[100%]
          transition-transform duration-700 ease-out
          pointer-events-none
        "
      />
    </Link>
  );
}
