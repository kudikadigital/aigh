"use client";

import Image from "next/image";

export default function PoweredBy({ absolute = false }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        absolute
          ? "absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <span className="text-white text-sm">Powered by</span>
      <Image
        src="/vd-zacarias.png"
        alt="VD Zacarias Logo"
        width={absolute ? 120 : 80} // menor no footer
        height={absolute ? 120 : 80}
        className="object-contain"
      />
    </div>
  );
}
