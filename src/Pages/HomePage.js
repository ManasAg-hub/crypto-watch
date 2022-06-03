import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner/Banner";
import ErrorFallback from "../components/ErrorBoundary";
const CoinsList = React.lazy(() => import("../components/CoinsList"));
const HomePage = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
