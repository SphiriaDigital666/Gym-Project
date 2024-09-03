const Login = () => {
  return (
    <section className="flex min-h-[100svh] items-center bg-[url('./assets/images/Login/bg.png')] bg-cover bg-top px-[10vw]">
      <div className="bg-black/70 text-center">
        <h2 className="pt-[1em] text-[22px] font-bold">FitCore</h2>
        <h3>Please enter your details</h3>
        <menu className="flex items-center pb-[38%] pt-[20%]">
          <form className="flex w-1/2 flex-col items-center gap-y-3 px-2">
            <h4 className="font-semibold text-primary underline">Sign in</h4>
            <input
              type="email"
              className="px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-gray-500"
              placeholder="Email"
            />
            <input
              type="password"
              className="px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-gray-500"
              placeholder="Password"
            />
            <button className="bg-primary px-[0.6em] py-[0.3em] text-[12px] font-semibold capitalize text-black">
              Sign in
            </button>
            <button className="px-[0.6em] py-[0.3em] text-[12px] font-semibold leading-[0] text-primary">
              Cancel
            </button>
            <p className="text-[10px]">Forgot your password?</p>
          </form>
          <div className="flex w-1/2 flex-col items-center gap-y-3 px-2">
            <h4 className="font-semibold">Start strong</h4>
            <p className="text-left text-[10px]">
              Share your details and take the first step towards your fitness
              goals
            </p>
            <button className="border-2 border-primary px-[0.6em] py-[0.3em] text-[12px] font-semibold capitalize text-primary">
              Sign up
            </button>
          </div>
        </menu>
      </div>
    </section>
  );
};

export default Login;
