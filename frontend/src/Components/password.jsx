import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // install lucide-react or use other icons

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-4/5">
      <input
        type={showPassword ? "text" : "password"}
        className="border border-white/10 w-full h-12 placeholder-white/40 rounded-xl p-5 bg-white/40 pr-12"
        placeholder="Password"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
