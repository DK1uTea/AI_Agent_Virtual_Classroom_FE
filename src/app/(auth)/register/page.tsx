import RegisterForm from "./register-form";

const RegisterPage = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center md:p-8">
      <div className="flex-grow md:flex-grow-0 w-full md:w-[450px] md:min-h-[550px] flex flex-col justify-center items-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-lg px-10 py-7 gap-6">
        <h1 className="text-2xl font-semibold">Register Page</h1>
        <RegisterForm />
      </div>
    </main>
  );
}

export default RegisterPage;