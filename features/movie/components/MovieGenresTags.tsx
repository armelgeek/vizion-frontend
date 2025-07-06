"use client";

export function MovieGenresTags({ genres }: { genres: { id: number; name: string }[] }) {
  if (!genres?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
