import { useParams } from "react-router";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { validatePassword } from "../../utils/formValidation";
import MetaArgs from "../../components/MetaArgs";
import { useState } from "react";
import handleError from "../../utils/handleError";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {
  const [RevealPassword, setRevealPassword] = useState(false);
  const { userId, passwordToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
   const navigate = useNavigate();

   
  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const formSubmit = async (data) => {
    if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password do not match",{
      id: "Resetpassword",
        });
        return;
    }
    try {
        const res = await resetPassword(userId, passwordToken,data);
        if(res.status === 200) {
            toast.success(res.data.message);
            Navigate("/auth/login");
        }
    } catch (error) {
        handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Reset your InstaShot password"
        content="Reset password page"
      />
      <div className="w-[90vw] md:w-[350px] border rounded-md border-[#A1A1A1] py-[40px] px-[28px]">
        <div className="text-center mb-4">
          <h2 className="text-2xl text-[#827D7D]">Reset Password</h2>
        </div>

        <p className="text-[#A8A6A6]">
          When you fill in your registered email address, we'll send you an
          instruction on how to reset your Password
        </p>

        <form
          className="md:max-w-[350px] mx-auto mt-10"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="mb-4">
            <div className="relative">
              <label className="floating-label">
                <span> New Password</span>
                <input
                  type={RevealPassword ? "password" : "text"}
                  placeholder="New password"
                  className="input input-lg w-full"
                  id="newPassword"
                  {...register("newPassword", {
                    validate: (value) => validatePassword(value, "New password is required"),
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
            {errors.newPassword && (
              <span className="text-sm text-red-600">
            {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <label className="floating-label">
                <span> Confirm Password</span>
                <input
                  type={RevealPassword ? "password" : "text"}
                  placeholder="Confirm password"
                  className="input input-lg w-full"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: (value) => validatePassword(value, "Confirm password is required"),
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
            {errors.confirmPassword && (
              <span className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            className="btn w-full text-white bg-[#8D0D76] hover:bg-[#8d0d76cb]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Recover"
            )}
          </button>
        </form>
      </div>
      <div className="w-[90vw] md:w-[350px] border rounded-md border-[#A1A1A1] py-[10px] px-[8px] mt-5 text-center">
        <div className="mb-3">
          <span>Already have an account? </span>
          <Link
            to="/auth/login"
            className="cursor-pointer text-[#8D0D76] font-bold"
          >
            Login
          </Link>
        </div>
        <div>
          <span>New user? </span>
          <Link
            to="/auth/register"
            className="cursor-pointer text-[#8D0D76] font-bold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
