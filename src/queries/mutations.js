import { useMutation } from 'react-query';
import {
  signUp,
  verifyEmail,
  login,
  submitCheckIn,
  submitCheckOut,
  submitLeaveApplication,
  submitRoomIssue,
  updateStudentDetails,
  updateWardenProfile,
  createAnnouncement,
  updateLeaveApplication,
  resolveRoomIssue,
  createWarden,
  deleteWarden,
  allotHostel
} from '../services';

export const useMutateSignUp = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => signUp(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
};

export const useMutateVerifyEmail = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => verifyEmail(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
};

export const useMutateLogin = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => login(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
};

export const useMutateCheckIn = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => submitCheckIn(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
};

export const useMutateCheckOut = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => submitCheckOut(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateLeaveApplication = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => submitLeaveApplication(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateRoomIssue = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => submitRoomIssue(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    }
  });
}

export const useMutateUpdateStudentDetails = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => updateStudentDetails(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateUpdateWardenProfile = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => updateWardenProfile(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateCreateAnnouncement = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => createAnnouncement(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateUpdateLeaveApplication = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => updateLeaveApplication(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateResolveRoomIssue = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => resolveRoomIssue(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateCreateWarden = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => createWarden(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateDeleteWarden = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => deleteWarden(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  });
}

export const useMutateAllotHostel = ({ onSuccess, onError, onMutate }) => {
  return useMutation((data) => allotHostel(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    }
  })
}