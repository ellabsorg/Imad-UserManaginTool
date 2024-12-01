export default function Input({
  name,
  value,
  type,
  handleInputChange,
  placeholder,
  isError,
  errorMessage,
  onBlur,
}) {
  return (
    <div class="flex items-center  justify-center ">
      <label htmlFor={name} class="first-letter:uppercase font-bold">
        {name}:
      </label>

      <div class="flex flex-col items-start justify-center">
        <input
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={onBlur}
          className={`p-2 border-b-2 ml-4 ${
            isError ? "border-[#ed921b]" : "border-[#1b1fed] "
          } outline-none focus:outline-none focus:ring-0`}
        />
        <div
          className={`text-red-800 ml-4`}
          style={{ height: isError ? "auto" : "24px" }}
        >
          {isError && errorMessage}
        </div>
      </div>
    </div>
  );
}
