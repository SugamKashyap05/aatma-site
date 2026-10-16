interface AssameseScriptProps {
  /** The Assamese text to render */
  text: string;
  /** Additional Tailwind classes to merge */
  className?: string;
}

/**
 * AssameseScript — renders Assamese script text in gold (mustard) with 0.7 opacity.
 * Uses the --font-assamese CSS variable and --color-mustard token.
 */
function AssameseScript({ text, className }: AssameseScriptProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-assamese)",
        color: "var(--color-mustard)",
        opacity: 0.7,
      }}
    >
      {text}
    </span>
  );
}

export { AssameseScript };
