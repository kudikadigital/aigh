import Image from "next/image";

const partners = [
  "/partners/logo1.png",
  "/partners/logo2.png",
  "/partners/logo3.png",
  "/partners/logo4.png",
  "/partners/inapem.png",
];

export default function Partners() {
  return (
    <section className="w-full py-12 bg-black flex flex-col items-center">
      {/* Headline */}
      <h2 className="text-white text-2xl font-bold mb-6">Parceiros</h2>

      {/* Container do carrossel */}
      <div className="relative w-full max-w-4xl overflow-hidden">
        {/* Máscara / Fade longo */}
        <div
          className="
            pointer-events-none absolute inset-0
            [mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)]
            [mask-repeat:no-repeat] [mask-size:100%_100%]
            [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]
          "
        />

        {/* Carrossel */}
        <div className="flex animate-slide">
          {[...partners, ...partners].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 mx-4 flex items-center justify-center"
            >
              <Image
                src={src}
                alt={`Parceiro ${i}`}
                width={100}
                height={50}
                className="object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
