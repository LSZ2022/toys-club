import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">About ToysClub</h1>
        <div className="prose max-w-none">
          <p>
            ToysClub was founded in 2010 with a mission to provide high-quality, safe, and educational toys for children of all ages. 
            We believe that play is an essential part of childhood development, and we carefully select each product to ensure it 
            meets our strict standards for safety, durability, and fun.
          </p>
          <h2 className="text-2xl mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Safety first - all products meet international safety standards</li>
            <li>Educational value - toys that help children learn while playing</li>
            <li>Durability - products designed to withstand active play</li>
            <li>Innovation - staying up-to-date with the latest toy trends and technologies</li>
          </ul>
          <h2 className="text-2xl mt-8 mb-4">Our Team</h2>
          <p>
            Our team consists of toy experts, child development specialists, and parents who are passionate about creating 
            the best possible play experiences for children. We work closely with manufacturers to ensure every product 
            in our store meets our high standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;