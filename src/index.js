import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'fomantic-ui-css/semantic.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast } from 'react-toastify';

const root = createRoot(document.getElementById('root'));
const queryClient = new QueryClient({

  defaultOptions: {
      queries: {
          retry: 0,
          refetchOnMount: true,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          useErrorBoundary: false,
          onError: (e) => {
              const err = e;
              if (err.code === 403) {
                  toast.error("권한이 없습니다. :(");
              } else {
                  toast.error("문제가 생겼어요. 관리자에 문의해주세요. :( ")
              }
          }
      }
  }
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
