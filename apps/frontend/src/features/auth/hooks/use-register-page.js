import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterUser } from "../queries/use-register-user";
import {
  saveVerificationEmail,
  saveVerificationOtpExpiry,
} from "../services/auth-storage";
import { registerSchema } from "../validations/register-schema";
import { showError, showSuccess } from "@/shared/utils/toast";
import { getZodErrors } from "@/shared/utils/zod";

const initialRegisterValues = {
  fullName: "",
  email: "",
  password: "",
};

// Handles register form state and verification-email flow.
export const useRegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();

  const [formData, setFormData] = useState(initialRegisterValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldName = name;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    try {
      setErrors({});

      const response = await registerMutation.mutateAsync(result.data);

      saveVerificationEmail(response.data.email);
      if (response.data.expiresIn) {
        saveVerificationOtpExpiry(response.data.expiresIn);
      }
      showSuccess(response.message);
      navigate("/auth/verify-otp");
    } catch (error) {
      const apiError = error;
      showError(apiError.response?.data?.message || "Registration failed");
    }
  };

  return {
    formData,
    errors,
    isSubmitting: registerMutation.isPending,
    handleChange,
    handleSubmit,
  };
};
