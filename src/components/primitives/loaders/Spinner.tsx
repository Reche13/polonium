import { Loader } from "lucide-react";

export default function Spinner({ size = 24, className = "" }) {
  return <Loader className={`animate-spin ${className}`} size={size} />;
}
