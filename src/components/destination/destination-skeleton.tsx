
const DestinationSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-80 bg-gray-200 rounded mb-6"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 mx-auto"></div>
      </div>
    </div>
  );
};

export default DestinationSkeleton;
