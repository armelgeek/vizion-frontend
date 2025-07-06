"use client";
export function StarRating({ value }: { value: number }) {
  const fullStars = Math.floor(value / 2);
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-500">{value.toFixed(1)}/10</span>
    </span>
  );
}
