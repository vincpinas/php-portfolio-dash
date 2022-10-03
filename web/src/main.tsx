import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter basename='/portfolio-dashboard'>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode >
);
