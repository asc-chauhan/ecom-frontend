const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor={id}
                className="font-medium text-sm text-slate-700 dark:text-slate-300"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`px-4 py-3 border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition ${
                    errors[id]?.message ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-700"
                }`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: `Minimum ${min} characters required` }
                        : null,
                    pattern:
                        type === "email"
                            ? {
                                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                  message: "Invalid email",
                              }
                            : type === "url"
                            ? {
                                  value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                  message: "Please enter a valid URL",
                              }
                            : null,
                })}
            />
            {errors[id]?.message && (
                <p className="text-xs font-medium text-red-500 mt-0.5">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
