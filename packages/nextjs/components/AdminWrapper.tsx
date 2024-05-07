import React from "react";

function AdminWrapper({
  address,
  children,
  isAdmin,
  ownerAddress,
  isRoot,
}: {
  address: string | undefined;
  ownerAddress: string | undefined;
  isAdmin: boolean;
  children: React.ReactNode;
  isRoot: boolean;
}) {
  if (isRoot) return children;

  if (!address)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-center">Connect your wallet</h1>
      </div>
    );

  if (!isAdmin) {
    return children;
  }

  if (isAdmin && !ownerAddress) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-center">Something went wrong</h1>
      </div>
    );
  }

  if (isAdmin && ownerAddress && address && address !== ownerAddress) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-center">Sorry you don&apos;t have access to this section</h1>
      </div>
    );
  }
  if (isAdmin && ownerAddress && address && address === ownerAddress) return children;
}
export default AdminWrapper;
