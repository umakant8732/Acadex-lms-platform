import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLoginUser } from "../queries/use-login-user";
import { saveVerificationEmail } from "../services/auth-storage";
import { setUser, useAppDispatch } from "../../../app/store";
import { loginSchema } from "../validations/login-schema";
import { getPostLoginRedirectPath } from "../../../shared/utils/auth-redirect";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { getZodErrors } from "../../../shared/utils/zod";

const initialLoginValues = {
  email: "",
  password: "",
};

// Handles login form state, validation, and redirect flow.
export const useLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useLoginUser();

  const [formData, setFormData] = useState(initialLoginValues);
  const [errors, setErrors] = useState({});

  const redirectPath = new URLSearchParams(location.search).get("redirect");

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

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    try {
      const response = await loginMutation.mutateAsync(result.data);

      dispatch(setUser(response.data));

      navigate(
        getPostLoginRedirectPath({
          role: response.data.role,
          redirectPath,
        }),
      );

      showSuccess(response.message);
    } catch (error) {
      const apiError = error;

      if (apiError.response?.status === 403) {
        // Save email so verify page knows which account OTP belongs to.
        saveVerificationEmail(result.data.email);
        navigate(`/auth/verify-otp${location.search}`);
        showError(
          apiError.response?.data?.message || "Please verify your email first",
        );
        return;
      }

      showError(apiError.response?.data?.message || "Login failed");
    }
  };

  return {
    formData,
    errors,
    isSubmitting: loginMutation.isPending,
    handleChange,
    handleSubmit,
  };
};
