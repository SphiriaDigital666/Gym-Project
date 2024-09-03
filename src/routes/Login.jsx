import { Link } from "react-router-dom";

const Login = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-[url('./assets/images/Login/bg.png')] bg-cover bg-top px-[10vw]">
      <div className="w-full max-w-screen-lg bg-black/60 text-center">
        <h2 className="pt-[1em] text-[22px] font-bold sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px]">
          FitCore
        </h2>
        <h3 className="sm:text-[18px] md:text-[21px] lg:text-[23px] xl:text-[25px]">
          Please enter your details
        </h3>
        <menu className="flex items-center pb-[30%] pt-[16%] sm:pb-[15%] sm:pt-[8%]">
          {/* <form
            onSubmit={handleFormSubmit}
            className="flex w-1/2 flex-col items-center gap-y-3 px-2 sm:px-[5%]"
          >
            <h4 className="font-semibold text-primary underline sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px]">
              Sign in
            </h4>
            <input
              type="email"
              className="w-full px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-primary px-[0.6em] py-[0.3em] text-[11px] font-semibold capitalize text-black sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
            >
              Sign in
            </button>
            <button
              type="reset"
              className="px-[0.6em] py-[0.3em] text-[11px] font-semibold leading-[0] text-primary sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
            >
              Cancel
            </button>
            <Link
              to="/"
              className="text-[7px] underline sm:self-end sm:text-right sm:text-[9px] xl:text-[10px]"
            >
              Forgot your password?
            </Link>
          </form> */}
          <div className="flex w-1/2 flex-col items-center gap-y-3 px-2 sm:px-[5%]">
            <h4 className="font-semibold sm:text-[18px] md:text-[21px] lg:text-[23px] xl:text-[25px]">
              Welcome <br /> back!
            </h4>
            <p className="text-[10px] sm:w-[30ch] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[20px]">
              Login to continue your journey
            </p>
            <button className="mt-[0.7em] border-2 border-primary px-[0.6em] py-[0.3em] text-[11px] font-semibold capitalize text-primary sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]">
              Sign up
            </button>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex w-1/2 flex-col items-center gap-y-3 px-2 sm:px-[5%]"
          >
            <h4 className="font-semibold text-primary underline sm:text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px]">
              Sign up
            </h4>
            <div className="flex w-full flex-col gap-y-3 sm:flex-row sm:gap-x-[5%]">
              <input
                type="text"
                className="px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:w-1/2 sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
                placeholder="First name"
                required
              />
              <input
                type="text"
                className="px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:w-1/2 sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
                placeholder="Last name"
                required
              />
            </div>
            <input
              type="email"
              className="w-full px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
              placeholder="Password"
              required
            />
            <input
              type="password"
              className="w-full px-[1ch] py-[0.5ch] text-[10px] text-black outline-none placeholder:text-[#B3B3B3] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
              placeholder="Confirm password"
              required
            />
            <button
              type="submit"
              className="bg-primary px-[0.6em] py-[0.3em] text-[11px] font-semibold capitalize text-black sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
            >
              Sign up
            </button>
            <button
              type="reset"
              className="px-[0.6em] py-[0.3em] text-[11px] font-semibold leading-[0] text-primary sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]"
            >
              Cancel
            </button>
          </form>
          {/* <div className="flex w-1/2 flex-col items-center gap-y-3 px-2 sm:px-[5%]">
            <h4 className="font-semibold sm:text-[18px] md:text-[21px] lg:text-[23px] xl:text-[25px]">
              Start strong
            </h4>
            <p className="text-[10px] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[20px]">
              Share your details and take the first step towards your fitness
              goals
            </p>
            <button className="border-2 border-primary px-[0.6em] py-[0.3em] text-[11px] font-semibold capitalize text-primary sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]">
              Sign up
            </button>
          </div> */}
        </menu>
      </div>
    </section>
  );
};

export default Login;
