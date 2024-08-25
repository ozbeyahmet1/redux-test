/**
 * Renders a skeleton card component.
 *
 * @returns The skeleton card component.
 */
function SkeletonCard() {
  return (
    <div className="w-full bg-white shadow-xl p-2 rounded-md flex flex-col h-64">
      <div className="w-full  bg-gray-300 h-full animate-pulse rounded-sm"></div>
      <div className="flex flex-col gap-3 pt-4 h-full items-start w-full">
        <p className="bg-gray-300 w-20 h-6 animate-pulse rounded-sm"></p>
        <div className="flex items-start justify-between flex-col h-full w-full">
          <p className="bg-gray-300 w-full h-6 animate-pulse rounded-sm"></p>
          <button className="bg-gray-300 w-full h-6 animate-pulse rounded-sm"></button>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
