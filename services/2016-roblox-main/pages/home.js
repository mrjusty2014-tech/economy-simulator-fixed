import React, { useEffect } from 'react';
import MyDashboard from '../components/myDashboard';
import DashboardStore from '../components/myDashboard/stores/dashboardStore';
import Theme2016 from '../components/theme2016';
import AuthenticationStore from '../stores/authentication';

export default function AuthenticatedHomePage() {
  const auth = AuthenticationStore.useContainer();

  useEffect(() => {
    if (!auth.isPending && !auth.isAuthenticated) {
      window.location.replace('/login');
    }
  }, [auth.isPending, auth.isAuthenticated]);

  if (auth.isPending || !auth.isAuthenticated) return null;

  return <Theme2016>
    <DashboardStore.Provider>
      <MyDashboard></MyDashboard>
    </DashboardStore.Provider>
  </Theme2016>
}

export const getStaticProps = () => {
  return {
    props: {
      title: 'Home - ROBLOX',
    },
  }
}