import React from "react";
import MyDashboard from "../components/myDashboard";
import DashboardStore from "../components/myDashboard/stores/dashboardStore";
import Theme2016 from "../components/theme2016";
import AuthenticationStore from "../stores/authentication"

const LoadingHome = () => <Theme2016>
  <main className="container mt-5 mb-5">
    <p>Loading games...</p>
    <a href="/auth/application">Sign Up</a>
  </main>
</Theme2016>;

const IndexPage = () => {
  const auth = AuthenticationStore.useContainer();

  if (auth.isPending) return <LoadingHome />;

  if (!auth.isAuthenticated) return <Theme2016>
    <DashboardStore.Provider>
      <MyDashboard guestMode />
    </DashboardStore.Provider>
  </Theme2016>;

  return <Theme2016>
    <DashboardStore.Provider>
      <MyDashboard />
    </DashboardStore.Provider>
  </Theme2016>;
}

export default IndexPage;