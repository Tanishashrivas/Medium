import { ChangeEvent } from "react";

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabelledInput: React.FC<LabelledInputType> = ({
  label,
  placeholder,
  onChange,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-black font-semibold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
