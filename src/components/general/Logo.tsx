import { twMerge } from "tailwind-merge";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <div className="aspect-square h-8 w-8 rounded-full bg-cas-grey-100"></div>
      <span className="font-fira_code text-2xl leading-none">Gaze</span>
    </div>
  );
}
