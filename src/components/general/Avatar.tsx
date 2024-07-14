import isAbsoluteUrl from "@/lib/utils/isAbsoluteUrl"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

export default function Avatar({
  src,
  firstName,
  imageClassName,
  size,
}: {
  src: string | null
  firstName: string
  size?: number
  imageClassName?: string
}) {
  if (src && isAbsoluteUrl(src))
    return (
      <Image
        width={size ?? 40}
        height={size ?? 40}
        src={src}
        alt="src"
        className={twMerge(
          `aspect-square w-10 rounded-full object-cover object-top`,
          imageClassName
        )}
      />
    )
  else
    return (
      <div
        style={size ? { width: size, height: size } : {}}
        className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-aza-grey-foreground text-lg font-bold text-white"
      >
        {firstName && firstName?.charAt(0).toUpperCase()}
      </div>
    )
}
