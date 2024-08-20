interface SupabaseLoader {
  src: string;
  width: number;
  quality?: number;
}

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseLoader) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/patda-images/${src}?w=${width}&q=${
    quality || 75
  }`;
}
