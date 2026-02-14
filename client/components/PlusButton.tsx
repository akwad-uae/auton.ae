import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PlusButtonProps {
  to: string;
  label?: string;
  className?: string;
}

export default function PlusButton({
  to,
  label = "GET STARTED",
  className,
}: PlusButtonProps) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={cn(
        "group inline-flex items-center rounded-full transition-all duration-300 overflow-hidden",
        className,
      )}
    >
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-sm tracking-[0.15em] uppercase font-light transition-all duration-300 text-white",
          "max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:mr-3 group-hover:ml-6",
        )}
      >
        {label}
      </span>
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:border-white/50 transition-all duration-300">
        <span className="text-black text-2xl font-light">+</span>
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
