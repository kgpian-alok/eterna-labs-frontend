export const SkeletonRow = () => (
  <tr className="border-b border-white/5 animate-pulse">
    {[...Array(8)].map((_, i) => (
      <td key={i} className="py-4 px-4 lg:px-6">
        <div className="h-4 bg-white/10 rounded w-full"></div>
      </td>
    ))}
  </tr>
);
