import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  validateEmail,
  validatePassword,
  validatefullname,
  validateUsername,
} from "../../utils/formValidation";
import { useState } from "react";
import MetaArgs from "../../components/MetaArgs";
import { registerUser } from "../../api/auth";
import { toast } from "sonner";
import { useAuth} from "../../store";
import handleError from "../../utils/handleError";

export default function Register() {
  const [RevealPassword, setRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const onFormSubmit = async (data) => {
    try {
      const res = await registerUser(data);
    
      if (res.status === 201) {
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
        title="Sign up to Instashots"
        content="Get access to InstaShots"
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
              <span>Email</span>
              <input
                type="text"
                placeholder="email"
                className="input input-lg w-full"
                id="email"
                {...register("email", {
                  validate: (value) => validateEmail(value),
                })}
              />
            </label>
            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Full Name</span>
              <input
                type="text"
                placeholder="full name"
                className="input input-lg w-full"
                id="fullname"
                {...register("fullname", {
                  validate: (value) => validatefullname(value),
                })}
              />
            </label>
            {errors.fullname && (
              <span className="text-sm text-red-600">
                {errors.fullname.message}
              </span>
            )}
          </div>
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
                  validate: (value) => validatePassword(value),
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
          <button
            className=" mt-4 btn btn-secondary w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Continue"}
          </button>
        </form>
      </div>
      <div className="w-[90vw] md:w-[500px] border rounded-md border-[#A1A1A1]  h-[80px] flex items-center justify-center mt-6 gap-2">
        <p>Already have an account?</p>{" "}
        <Link to="/auth/login" className="text-[]">
          Log in
        </Link>
      </div>
    </>
  );
}
