import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="py-20 bg-light text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-6xl font-bold text-primary mb-6">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
