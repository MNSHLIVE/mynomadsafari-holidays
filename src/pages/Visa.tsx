
const Visa = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Visa Services</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Visa Services</h2>
          <p className="mb-4">
            My Nomadsafari Holidays offers comprehensive visa assistance for travelers planning international trips.
            We understand that visa applications can be complex and time-consuming, which is why our team of experts
            is here to guide you through every step of the process.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Why Choose Our Visa Services?</h3>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Expert guidance on visa requirements for different countries</li>
            <li>Assistance with documentation and application forms</li>
            <li>Regular updates on application status</li>
            <li>Support for tourist, business, and other visa categories</li>
            <li>Streamlined process to save your time and effort</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Countries We Cover</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {["Singapore", "Thailand", "Malaysia", "Dubai", "Bali", "Vietnam", "Australia", "Europe"].map((country) => (
              <div key={country} className="bg-muted p-3 rounded text-center">
                {country}
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Our Process</h3>
          <ol className="list-decimal pl-5 space-y-3 mb-6">
            <li>Initial consultation to understand your travel plans</li>
            <li>Detailed guidance on required documentation</li>
            <li>Document verification and application preparation</li>
            <li>Submission of application to respective embassies/consulates</li>
            <li>Regular follow-ups until visa approval</li>
            <li>Delivery of visa and travel documents</li>
          </ol>
          
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <h4 className="font-semibold text-lg mb-2">Contact Us for Visa Assistance</h4>
            <p>
              For detailed information about visa requirements for your destination or to avail our visa services,
              please contact us at <a href="tel:+919968682200" className="text-primary font-semibold">+91 9968682200</a> or
              email us at <a href="mailto:info@mynomadsafariholidays.in" className="text-primary font-semibold">info@mynomadsafariholidays.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visa;
