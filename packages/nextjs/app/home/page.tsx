"use client";

import React, { useState } from "react";
import ProposalCard from "~~/components/ProposalCard";
import Spinner from "~~/components/Spinner";

const HomePage: React.FC = () => {
  const [IsLoading] = useState<boolean>(false);

  return IsLoading ? (
    <Spinner />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white py-6">
        <h1 className="text-center text-2xl font-bold">A Platform to Combat Procrastination</h1>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProposalCard
            id="00"
            date="00"
            userAddress="00"
            title="Task Submission and Approval"
            description="Users submit tasks with a proposed deadline, which are reviewed and approved by the community."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
