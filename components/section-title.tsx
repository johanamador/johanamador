interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex items-baseline gap-4 w-full ${className}`}>
      <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl shrink-0">
        {title}
      </h2>
      <div className="flex-1 overflow-hidden">
        <span
          className="text-primary text-3xl md:text-4xl font-bold tracking-tighter whitespace-nowrap select-none"
          aria-hidden="true"
        >
          {"/".repeat(50)}
        </span>
      </div>
    </div>
  );
}
