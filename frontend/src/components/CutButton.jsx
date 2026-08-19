export default function CutButton({
  children,
  as: Tag = "a",
  href = "#",
  variant = "solid",
  size = "md",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition duration-200";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-sm",
  };

  const variants = {
    solid: "btn-cut bg-ink text-paper hover:bg-ink2",
    "solid-accent":
      "btn-cut bg-accent text-white hover:brightness-110 shadow-lg shadow-accent/20",
    outline: "btn-cut-border text-ink",
    "outline-dark": "btn-cut-border on-dark text-paper",
  };

  const useWrapper = variant === "outline" || variant === "outline-dark";

  return (
    <Tag
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {useWrapper ? <span>{children}</span> : children}
    </Tag>
  );
}
