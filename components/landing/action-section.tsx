import Badge from '../common/badge';

const ActionSection = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Badge */}
      <Badge>
        <span className="w-2 h-2 rounded-full animate-pulse bg-primary"></span>
        <span className="text-xs md:text-sm">AI-Powered Dental Assistant</span>
      </Badge>
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Your dental <span className="text-primary">questions</span> answered instantly
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
        Chat with our AI dental assistant for instant advice, book smart appointments, and get
        personalized care recommendations. Available 24/7, no waiting required.
      </p>
    </div>
  );
};

export default ActionSection;
