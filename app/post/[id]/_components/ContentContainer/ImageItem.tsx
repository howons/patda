import Image from "next/image";

import supabaseLoader from "#lib/utils/supabase/loader.js";

interface ImageItemProps {
  imagePath: string;
  name: string;
}

export default function ImageItem({ imagePath, name }: ImageItemProps) {
  return (
    <Image
      src={`${imagePath}/${name}`}
      alt={name}
      width={350}
      height={700}
      loader={supabaseLoader}
      className="rounded-md border-2"
    />
  );
}
