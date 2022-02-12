import { QueryClient } from 'react-query';

// Create a react-query client

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
