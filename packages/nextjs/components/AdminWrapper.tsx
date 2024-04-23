import React from "react";

function AdminWrapper({
  address,
  children,
  isAdmin,
  ownerAddress,
}: {
  address: string | undefined;
  ownerAddress: string | undefined;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  if (!isAdmin) return children;

  if (isAdmin && !address) {
    return (
      <div className="grid place-content-center">
        <h1 className="font-bold text-center">Connect your wallet</h1>
      </div>
    );
  }

  if (isAdmin && !ownerAddress) {
    return (
      <div className="grid place-content-center">
        <h1 className="font-bold text-center">Something went wrong</h1>
      </div>
    );
  }

  if (isAdmin && ownerAddress && address && address !== ownerAddress) {
    return (
      <div className="grid place-content-center">
        <h1 className="font-bold text-center">Sorry you don&apos;t have access to this section</h1>
      </div>
    );
  }
  if (isAdmin && ownerAddress && address && address === ownerAddress) return children;
}
export default AdminWrapper;