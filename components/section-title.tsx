import { BlurReveal } from "@/components/spell/blur-reveal";

export function SectionTitle({
  title,
  index,
  eyebrow,
  description,
  className = "",
}: {
  title: string;
  index?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`}>
      {(index || eyebrow) && (
        <p className="eyebrow">
          <span>{index}</span>
          {eyebrow}
        </p>
      )}
      <div className="section-heading-row">
        <BlurReveal as="h2" inView className="section-title">
          {title}
        </BlurReveal>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}
