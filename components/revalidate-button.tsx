"use client";
import { PropsWithChildren, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  onClick: () => Promise<void>;
};

const RevalidateButton = ({ children, onClick }: PropsWithChildren<Props>) => {
  const [loading, setLoading] = useState(false);
  const handleOnClick = async () => {
    setLoading(true);
    await onClick();
    window.location.reload();
    setLoading(false);
  };
  return (
    <Button
      className="cursor-pointer"
      disabled={loading}
      onClick={handleOnClick}
    >
      {children}
    </Button>
  );
};

export default RevalidateButton;
