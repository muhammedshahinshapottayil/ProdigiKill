import { RiseLoader } from "react-spinners";

function Spinner({ isCenter = true }: { isCenter?: boolean }) {
  return (
    <div className={`flex justify-center items-center ${isCenter && "h-screen"}`}>
      <RiseLoader color="#36d7b7" />
    </div>
  );
}

export default Spinner;
