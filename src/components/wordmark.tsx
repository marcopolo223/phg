export function Wordmark({
  className = "",
  size = "nav",
}: {
  className?: string;
  size?: "nav" | "footer" | "enter";
}) {
  const sizeClass =
    size === "enter"
      ? "text-[2.55rem] md:text-[3.15rem] lg:text-[3.55rem]"
      : size === "footer"
        ? "text-[1.7rem] md:text-[2.15rem] lg:text-[2.45rem]"
        : "text-[1.48rem] sm:text-[1.58rem] md:text-[1.78rem] lg:text-[1.95rem]";

  return (
    <span
      className={`inline-block text-center font-serif uppercase leading-[0.78] tracking-[-0.045em] ${sizeClass} ${className}`}
    >
      Prince
      <br />
      Hassan
      <br />
      Group
    </span>
  );
}
