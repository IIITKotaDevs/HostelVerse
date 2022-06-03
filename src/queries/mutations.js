import { useMutation } from 'react-query';
import { signUp, verifyEmail, resendOTP, login, submitCheckIn, submitCheckOut, submitLeaveApplication, submitRoomIssue } from '../services';

export const useMutateSignUp = ({ onSuccess, onError }) => {
  return useMutation((data) => signUp(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
};

export const useMutateVerifyEmail = ({ onSuccess, onError }) => {
  return useMutation((data) => verifyEmail(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
};

export const useMutateLogin = ({ onSuccess, onError }) => {
  return useMutation((data) => login(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
};

export const useMutateCheckIn = ({ onSuccess, onError }) => {
  return useMutation((data) => submitCheckIn(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
};

export const useMutateCheckOut = ({ onSuccess, onError }) => {
  return useMutation((data) => submitCheckOut(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
}

export const useMutateLeaveApplication = ({ onSuccess, onError }) => {
  return useMutation((data) => submitLeaveApplication(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
}

export const useMutateRoomIssue = ({ onSuccess, onError }) => {
  return useMutation((data) => submitRoomIssue(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
  });
}