import { useState, type ReactNode } from "react";
import { HeartPulse, Landmark, ShoppingCart, GraduationCap, Building2, Truck, Plane, Factory, Clapperboard, Cloud, type LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";

/** Real brand logo with graceful fallback to a monogram if the image fails to load. */
export function LogoImg({ src, name, className }: { src: string; name: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) return <span className={cn("grid place-items-center rounded-md grad-bg text-sm font-black text-white", className)}>{name[0]}</span>;
  return <img src={src} alt={`${name} logo`} loading="lazy" decoding="async" onError={() => setErr(true)} className={cn("object-contain", className)} />;
}

/** Round person photo with initials fallback. */
export function Avatar({ src, name, className }: { src: string; name: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) return <div className={cn("grid place-items-center rounded-full grad-bg font-bold text-white", className)}>{name.split(" ").map((x) => x[0]).join("")}</div>;
  return <img src={src} alt={`${name} — client testimonial`} loading="lazy" decoding="async" onError={() => setErr(true)} className={cn("rounded-full object-cover ring-2 ring-brand/40", className)} />;
}

/** Exact 16:9 image frame used by blogs and case studies. */
export function MediaImage({ src, alt, className, children }: { src: string; alt: string; className?: string; children?: ReactNode }) {
  const [err, setErr] = useState(false);
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-surface2", className)}>
      {err ? <div className="absolute inset-0 grad-bg" /> : (
        <img src={src} alt={alt} width={1200} height={675} loading="lazy" decoding="async" onError={() => setErr(true)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      )}
      {children}
    </div>
  );
}

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "Healthcare": HeartPulse,
  "FinTech & Banking": Landmark,
  "eCommerce & Retail": ShoppingCart,
  "EdTech": GraduationCap,
  "Real Estate": Building2,
  "Logistics": Truck,
  "Travel & Hospitality": Plane,
  "Manufacturing": Factory,
  "Media & Entertainment": Clapperboard,
  "SaaS & Startups": Cloud,
};

export function IndustryIcon({ name, className }: { name: string; className?: string }) {
  const I = INDUSTRY_ICONS[name] || Building2;
  return <I className={className} />;
}
