import React from "react";
import ProposalCard from "~~/components/ProposalCard";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-900 text-white py-6">
        <h1 className="text-center text-2xl font-bold">A Platform to Combat Procrastination</h1>
      </header>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProposalCard
            title="Task Submission and Approval"
            description="Users submit tasks with a proposed deadline, which are reviewed and approved by the community."
          />
          <ProposalCard
            title="Collateral Requirement"
            description="Users must deposit 0.5 ETH as collateral to commit to completing the task within the deadline."
          />
          <ProposalCard
            title="Task Completion"
            description="Successful completion within the deadline earns the user their collateral back plus a reward in ETH."
          />
          <ProposalCard
            title="Renewal and Extension"
            description="Users can pay a fee to renew and extend the deadline, providing flexibility while maintaining accountability."
          />
          <ProposalCard
            title="Community-driven Support"
            description="The community plays a role in approving tasks, providing encouragement, and ensuring fairness."
          />
          <ProposalCard
            title="Idea Submission and Reward"
            description="Users can submit ideas for personal or open-source projects, with the best idea rewarded in ETH monthly."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
