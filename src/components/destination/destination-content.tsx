
interface DestinationContentProps {
  description: string;
  longDescription?: string;
  highlights?: string[];
  attractions?: string[];
}

const DestinationContent = ({
  description,
  longDescription,
  highlights,
  attractions
}: DestinationContentProps) => {
  return (
    <div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="mb-4">{description}</p>
        
        {longDescription && (
          <div dangerouslySetInnerHTML={{ __html: longDescription }} />
        )}
      </div>
      
      {highlights && highlights.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Top Highlights</h2>
          <ul className="space-y-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {attractions && attractions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Top Attractions</h2>
          <ul className="space-y-2">
            {attractions.map((attraction, idx) => (
              <li key={idx} className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>{attraction}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DestinationContent;
