export function Wordmark({
  className = "",
  size = "nav",
}: {
  className?: string;
  size?: "nav" | "footer";
}) {
  const sizeClass =
    size === "footer"
      ? "text-[1.7rem] md:text-[2.15rem] lg:text-[2.45rem]"
      : "text-[0.92rem] sm:text-[1.02rem] md:text-[1.18rem]";

  return (
    <span
      className={`font-serif uppercase leading-[0.78] tracking-[-0.045em] ${sizeClass} ${className}`}
    >
      Prince
      <br />
      Hassan
      <br />
      Group
    </span>
  );
}
