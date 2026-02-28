interface SectionTitleProps {
  title: string;
  length?: number;
  className?: string;
}

export function SectionTitle({ title, length = 46, className = "" }: SectionTitleProps) {
  const slashes = "/".repeat(Math.max(0, length - title.length));

  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl shrink-0">
        {title}
      </h2>
      {slashes && (
        <span
          className="text-primary text-3xl md:text-4xl font-bold tracking-tighter select-none"
          aria-hidden="true"
        >
          {slashes}
        </span>
      )}
    </div>
  );
}
