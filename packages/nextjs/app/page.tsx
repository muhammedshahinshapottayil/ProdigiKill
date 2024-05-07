import Image from "next/image";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 text-center md:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 md:text-4xl">Crush Procrastination with Deadline Driven</h1>
          <p className="text-lg md:text-xl">A Platform to Overcome Procrastination and Achieve Your Goals</p>
        </div>
      </header>

      <section className="py-12 px-4 md:py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-md mb-8 md:mb-0 md:mr-16 rounded-lg shadow-lg overflow-hidden flex-1">
            <Image
              width={100}
              height={100}
              src="/banner.png"
              alt="Deadline Driven Platform"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-md flex-1">
            <h2 className="text-2xl font-bold mb-6 md:text-3xl">How it Works</h2>
            <ol className="list-decimal pl-6 space-y-6">
              <li>
                <h3 className="font-bold text-lg mb-2 md:text-xl">Set Deadlines</h3>
                <p>
                  Submit your tasks and set reasonable deadlines for completion. Our community will review and approve
                  the tasks and timelines.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg mb-2 md:text-xl">Commit with Collateral</h3>
                <p>
                  To ensure you stay accountable, you will need to deposit a small collateral of 0.5 ETH. This acts as
                  skin in the game.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg mb-2 md:text-xl">Earn Rewards</h3>
                <p>
                  Complete your task on time and you will get your collateral back, plus earn extra ETH as a reward. The
                  faster you finish, the more you earn!
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg mb-2 md:text-xl">Renew if Needed</h3>
                <p>
                  If you need more time, you can renew your deadline for a small fee. But miss the deadline and you will
                  forfeit the collateral.
                </p>
              </li>
              <li>
                <h3 className="font-bold text-lg mb-2 md:text-xl">Collaborate & Get Inspired</h3>
                <p>
                  Connect with our supportive community, share ideas, and get inspired by the best project concepts
                  rewarded monthly.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-4 text-center md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 md:text-3xl">Why Deadline Driven Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2 md:text-xl">Harness the Power of Pressure</h3>
              <p>
                The looming deadline and collateral at stake create a sense of urgency, motivating you to take action.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2 md:text-xl">Enjoy Meaningful Rewards</h3>
              <p>Earn ETH for your hard work, providing a tangible incentive to overcome procrastination.</p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2 md:text-xl">Foster Accountability</h3>
              <p>The community-driven approval and monitoring process keeps you accountable to your goals.</p>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg mb-2 md:text-xl">Discover Innovative Ideas</h3>
              <p>Get inspired by the creativity of our community and your own innovative project submissions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 text-center md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 md:text-3xl">Join the Movement Against Procrastination</h2>
          <p className="mb-8">
            Stop making excuses and start crushing your goals with Deadline Driven. Sign up now and take the first step
            towards a more productive and fulfilled life.
          </p>
          <Link
            href="/home"
            className="inline-block bg-white text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-blue-800 hover:text-white transition-colors md:py-4 md:px-8"
          >
            Get Started
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
