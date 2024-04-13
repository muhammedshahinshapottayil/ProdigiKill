import Link from "next/link";

const Landing = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Crush Procrastination with Deadline Driven</h1>
          <p className="text-xl">A Platform to Overcome Procrastination and Achieve Your Goals</p>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <div className="max-w-md rounded-lg shadow-lg overflow-hidden flex-1">
            <img src="./banner.png" alt="Deadline Driven Platform" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-md ml-16 flex-1">
            <h2 className="text-3xl font-bold mb-6">How it Works</h2>
            <ol className="list-decimal pl-6 space-y-6">
              <li>
                <h3 className="font-bold text-xl mb-2">Set Deadlines</h3>
                <p>
                  Submit your tasks and set reasonable deadlines for completion. Our community will review and approve
                  the tasks and timelines.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-xl mb-2">Commit with Collateral</h3>
                <p>
                  To ensure you stay accountable, you'll need to deposit a small collateral of 0.5 ETH. This acts as
                  skin in the game.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-xl mb-2">Earn Rewards</h3>
                <p>
                  Complete your task on time and you'll get your collateral back, plus earn extra ETH as a reward. The
                  faster you finish, the more you earn!
                </p>
              </li>
              <li>
                <h3 className="font-bold text-xl mb-2">Renew if Needed</h3>
                <p>
                  If you need more time, you can renew your deadline for a small fee. But miss the deadline and you'll
                  forfeit the collateral.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-xl mb-2">Collaborate & Get Inspired</h3>
                <p>
                  Connect with our supportive community, share ideas, and get inspired by the best project concepts
                  rewarded monthly.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why Deadline Driven Works</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="font-bold text-xl mb-2">Harness the Power of Pressure</h3>
              <p>
                The looming deadline and collateral at stake create a sense of urgency, motivating you to take action.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl mb-2">Enjoy Meaningful Rewards</h3>
              <p>Earn ETH for your hard work, providing a tangible incentive to overcome procrastination.</p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl mb-2">Foster Accountability</h3>
              <p>The community-driven approval and monitoring process keeps you accountable to your goals.</p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl mb-2">Discover Innovative Ideas</h3>
              <p>Get inspired by the creativity of our community and your own innovative project submissions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join the Movement Against Procrastination</h2>
          <p className="mb-8">
            Stop making excuses and start crushing your goals with Deadline Driven. Sign up now and take the first step
            towards a more productive and fulfilled life.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-800 font-bold py-4 px-8 rounded-md hover:bg-blue-800 hover:text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
