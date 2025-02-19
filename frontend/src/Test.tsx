import { useState } from "react";

interface MyButtonProps {
  title: string;
  disabled: boolean;
}

function Button({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

type Status = "idle" | "loading" | "success" | "error";

const [enabled, setEnabled] = useState<Status>("idle");

export default function Test() {
  return <Button title="Click me" disabled={true}></Button>;
}
