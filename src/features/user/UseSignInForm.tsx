import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IUserLogin } from "model/User.model";
import { useCallback, useMemo } from "react";
import { userLoginAsync } from "./userSlice";
import { useDispatch } from "react-redux";

const UseSignInForm = () => {
  const dispatch = useDispatch();
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email().required("Email is required."),
        password: yup.string().required("Password is required."),
      }),
    []
  );
  const { register, handleSubmit, errors } = useForm<IUserLogin>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = useCallback(
    (formValues: IUserLogin) => {
      dispatch(userLoginAsync(formValues));
    },
    [dispatch]
  );

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default UseSignInForm;
