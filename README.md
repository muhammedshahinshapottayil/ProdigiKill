**Procrastination Combat Platform Build By Using Scaffold-ETH 2**

---

### Grants Achieved

This project received grants from [BuidlGuidl](https://buidlguidl.com/). If you haven't heard about BuidlGuidl, it's a vibrant curated group of Ethereum builders creating products, prototypes, and tutorials to enrich the web3 ecosystem.

### Working Demo Video

[Click on this to view the working demo video](https://www.youtube.com/watch?v=b53b4dTBJNw&t=3s)

### Overview

The Procrastination Combat Platform is a decentralized application (DApp) built to help users overcome procrastination by leveraging pressure and incentives. It allows users to set deadlines for their tasks, provide collateral as commitment, earn rewards for timely completion, and face consequences for failure. Additionally, the platform fosters creativity and collaboration by providing a space for idea-sharing and rewarding the best ideas monthly.

### Features

1. **Task Submission and Approval:**

   - Users submit tasks with deadlines.
   - Community members review and approve tasks to ensure feasibility.

2. **Collateral Requirement:**

   - Users deposit 0.5 ETH as collateral to commit to completing the task.

3. **Task Completion:**

   - Successful completion within the deadline earns back the collateral and extra ETH as a reward.

4. **Renewal and Extension:**

   - Users can extend deadlines by paying a fee to renew the task.

5. **Community-driven Support:**

   - Community members provide encouragement, support, and oversight throughout the task completion journey.

6. **Idea Submission and Reward:**
   - Users submit project ideas for rewards in ETH monthly.
   - The best idea, chosen by community likes and platform evaluation, receives the reward.

### Technologies Used

- **Frontend:** Next.js (TypeScript)
- **Smart Contracts:** Solidity
- **Graph:** The Graph

### Getting Started

1. **Clone the Repository:**

   ```
   git clone https://github.com/muhammedshahinshapottayil/ProdigiKill.git
   ```

2. **Install Dependencies:**

   ```
   cd ProdigiKill
   yarn install
   ```

3. **Start the Frontend:**

   -configure scaffold.config.ts to the desired network

   ```
   yarn start
   ```

4. **Deploy Smart Contracts:**

   - Deploy the Solidity contracts to your desired Ethereum network by configuring hardhat.config.ts.

   ```
   yarn chain
   yarn deploy
   ```

5. **Setup Graph:**

   - Initialize docker and configure mandatory changes in yaml file and start working with the graph locally.

   ```
   yarn run-node
   yarn local-create
   yarn local-ship

   ```

### Deployment

- **Frontend:** Deploy the Next.js app to your preferred hosting service.
- **Smart Contracts:** Deploy the Solidity contracts to an Ethereum network.
- **Graph:** Deploy the subgraph to The Graph's hosted service or a compatible hosting solution.

### License

This project is licensed under the [MIT License](LICENSE).

### Contact

Feel free to connect , [muhammedshahinshapottayil@gmail.com](mailto:muhammedshahinshapottayil@gmail.com).

---
