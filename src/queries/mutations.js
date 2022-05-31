import { useMutation } from 'react-query';
import { submitCheckIn, submitCheckOut } from '../services';

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