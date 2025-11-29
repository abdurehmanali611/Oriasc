// components/SectionHeader.tsx
interface SectionHeaderProps {
  subtitle?: string;
  title?: string;
  description?: string | null;
  className?: string;
  maxWidth?: string;
}

export default function SectionHeader({ 
  subtitle = 'Section Subtitle',
  title = 'Section Title',
  description = null,
  className = '',
  maxWidth = '700px'
}: SectionHeaderProps) {
  return (
    <div 
      className={`text-center mx-auto mb-5 ${className}`}
      style={{ maxWidth }}
    >
      <p className="text-xl uppercase text-[#10b982] font-semibold">
        {subtitle}
      </p>
      <h1 className="text-5xl md:text-6xl font-bold font-sans my-5">
        {title}
      </h1>
      {description && (
        <p 
          className="mb-0"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
