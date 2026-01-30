import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8"
    >
      {/* Mapping 30 fields - only the specific input renders when you type */}
      {[...Array(30)].map((_, i) => {
        const fieldName = `field${i}`;
        return (
          <div key={i} className="flex flex-col space-y-1">
            <label className="font-semibold text-sm">Input Label {i + 1}</label>
            <input
              {...register(fieldName)}
              placeholder={`Enter data for ${fieldName}...`}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        );
      })}

      <div className="col-span-full mt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow-md">
          Save Large Form
        </button>
      </div>
    </form>
  );
}