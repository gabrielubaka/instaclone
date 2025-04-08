import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { validatePassword, validateUsername } from "../../utils/formValidation";
import { useState } from "react";
import MetaArgs from "../../components/MetaArgs";
import { loginUser } from "../../api/auth";
import handleError from "../../utils/handleError";
import { toast } from "sonner";
import { useAuth } from "../../store";
import { DataSpinner } from "../../components/Spinner";

export default function Login() {
  const [RevealPassword, setRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const onFormSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.status === 200) {
        toast.success(res.data.message);
        setAccessToken(res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Login to Instashots"
        content="Login to your InstaShots"
      />{" "}
      <div className="w-[90vw] md:w-[500px] border rounded-md border-[#A1A1A1] py-[40px] px-[28px]">
        <div className="flex justify-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <form
          className="md:max-w-[400px] mx-auto mt-10"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="mb-4">
            <label className="floating-label">
              <span>UserName</span>
              <input
                type="username"
                placeholder="username"
                className="input input-lg w-full"
                id="username"
                {...register("username", {
                  validate: (value) => validateUsername(value),
                })}
              />
            </label>
            {errors.username && (
              <span className="text-sm text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="floating-label">
              <span>Password</span>
              <input
                type={RevealPassword ? "password" : "text"}
                placeholder="password"
                className="input input-lg w-full"
                id="password"
                {...register("password", {
                  validate: (value) => validatePassword(value,"Password is required"),
                })}
              />
            </label>
            <button
              className="absolute inset-y-0 right-2"
              onClick={togglePassword}
              role="button"
            >
              {RevealPassword ? <span>show</span> : <span>hide</span>}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
          <button className=" mt-4 btn btn-secondary w-full" type="submit">
            {isSubmitting ? <DataSpinner /> : "log in"}
          </button>
          <div className="text-center mt-4">
            <Link to="/auth/forgotten-password" className="text-center mt-4">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
      <div className="w-[90vw] md:w-[500px] border rounded-md border-[#A1A1A1]  h-[80px] flex items-center justify-center mt-6 gap-2">
        <p>Dont have an account?</p>{" "}
        <Link to="/auth/register" className="text-[#8D0D76] ">
          Sign up
        </Link>
      </div>
    </>
  );
}
