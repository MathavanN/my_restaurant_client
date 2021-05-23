import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ISignIn } from '../../model/User.model';
import { PAGE_HOME } from '../../utils/constants';
import { signInAsync } from './signInSlice';

const UseSignInForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Email is required.'),
        password: yup.string().required('Password is required.'),
      }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = useCallback(
    (formValues: ISignIn) => {
      dispatch(signInAsync(formValues));
      history.push(PAGE_HOME.path);
    },
    [dispatch, history]
  );

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};

export default UseSignInForm;
