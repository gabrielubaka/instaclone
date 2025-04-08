import { useNavigate, useParams } from "react-router";
import { verifyEmailAccount } from "../../api/auth";
import { useEffect, useState } from "react";
import handleError from "../../utils/handleError";
import { useAuth } from "../../store";
import { toast } from "sonner";
import MetaArgs from "../../components/MetaArgs";

export default function VerifyAccount() {
  const [isSucess, setIsSuccess] = useState();
  const { userId, verificationToken } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmailAccount(
          userId,
          verificationToken,
          accessToken
        );
        if (res.status === 200) {
          setIsSuccess(res.data.success);
          toast.success(res.data.message, { id: "verifySuccss" });
        }
      } catch (error) {
        handleError(error);
      }
    };
    verify();
  }, [accessToken, userId, verificationToken]);

  return (
    <>
      <MetaArgs
        title="Verify your email Account"
        content="Verify your email Account"
      />
      <div className="flex justify-center flex-col items-center min-h-screen gap-4">
        {isSucess ? (
          <>
            <h1 className="text-2xl">
              You have successfully verified your account
            </h1>
            <button
              className="btn bg-[#8d0d76] w-[250px] text-white"
              onClick={() => navigate("/")}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4">
              There was a problem verifying your account
            </h1>
            <button
              className="btn bg-[#8D0D76] w-[250px] text-white"
              onClick={() => navigate("/verify-email")}
            >
              Go back
            </button>
          </>
        )}
      </div>
    </>
  );
}
