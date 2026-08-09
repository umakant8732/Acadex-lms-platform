import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPasswordSchema } from "../validations/forgot-password-schema";
import { useForgotPassword } from "../queries/use-forgot-reset-password";
import { saveVerificationEmail } from "../services/auth-storage";
import { showError, showSuccess } from "@/shared/utils/toast";
import { getZodErrors } from "@/shared/utils/zod";

// Keeps forgot-password form state and local validation.
export const useForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    try {
      setErrors({});

      const response = await forgotPasswordMutation.mutateAsync(result.data);

      // Save email for reset password screen
      saveVerificationEmail(email);
      showSuccess(response.message);
      navigate("/auth/reset-password");
    } catch (error) {
      const apiError = error;
      showError(
        apiError.response?.data?.message || "Failed to send reset code",
      );
    }
  };

  return {
    email,
    errors,
    isSubmitting: forgotPasswordMutation.isPending,
    handleEmailChange,
    handleSubmit,
  };
};
