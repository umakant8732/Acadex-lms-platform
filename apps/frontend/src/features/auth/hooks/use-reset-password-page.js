import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useResetPassword } from "../queries/use-forgot-reset-password";
import {
  clearVerificationEmail,
  getVerificationEmail,
} from "../services/auth-storage";
import { resetPasswordSchema } from "../validations/reset-password-schema";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { getZodErrors } from "../../../shared/utils/zod";

const initialFormValues = {
  otp: "",
  newPassword: "",
  confirmPassword: "",
};

// Handles Reset Password form state, validation, and submission
export const useResetPasswordPage = () => {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  const [formData, setFormData] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const email = getVerificationEmail();

  useEffect(() => {
    if (!email && !resetPasswordMutation.isSuccess) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate, resetPasswordMutation.isSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldName = name;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = resetPasswordSchema.safeParse({
      email,
      ...formData,
    });

    if (!validationResult.success) {
      setErrors(getZodErrors(validationResult.error));
      return;
    }

    try {
      setErrors({});

      const response = await resetPasswordMutation.mutateAsync({
        email: email,
        otp: validationResult.data.otp,
        newPassword: validationResult.data.newPassword,
      });

      clearVerificationEmail();
      showSuccess(response.message || "Password reset successfully");
      navigate("/auth");
    } catch (error) {
      const apiError = error;
      showError(apiError.response?.data?.message || "Failed to reset password");
    }
  };

  return {
    formData,
    errors,
    isSubmitting: resetPasswordMutation.isPending,
    handleChange,
    handleSubmit,
  };
};
