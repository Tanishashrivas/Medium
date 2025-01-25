import { PenTool } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <PenTool className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl text-primary">BlogHub</span>
    </div>
  );
}
