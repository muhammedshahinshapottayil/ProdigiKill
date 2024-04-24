import { useState } from "react";

function CustomCheckBox({
  status,
  onChange,
  value,
}: {
  status: boolean;
  onChange: (status: boolean, value: string) => void;
  value: string;
}) {
  const [checkStatus, setCheckStatus] = useState<boolean>(status);
  const handleStatusChange = (changed: boolean) => {
    setCheckStatus(changed);
    onChange(changed, value);
  };
  return (
    <input
      checked={checkStatus}
      type="checkbox"
      onChange={e => handleStatusChange(e.target.checked)}
      id="my-checkbox"
      className="custom-checkbox"
    />
  );
}

export default CustomCheckBox;
