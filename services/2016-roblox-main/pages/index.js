import React from "react";
import MyDashboard from "../components/myDashboard";
import DashboardStore from "../components/myDashboard/stores/dashboardStore";
import Theme2016 from "../components/theme2016";
import AuthenticationStore from "../stores/authentication"

const WelcomeHome = () => <Theme2016>
  <main className="container pt-5 pb-5">
    <section className="row align-items-center border-bottom pb-5 mb-5">
      <div className="col-12 col-md-8">
        <p className="text-primary fw-bold mb-2">Welcome to Roblox</p>
        <h1 className="display-4 fw-bold">Play, create, and make friends.</h1>
        <p className="lead mt-3">Discover games made by the community, build your own experiences, and meet players along the way.</p>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <a className="btn btn-primary btn-lg" href="/auth/application">Sign Up</a>
          <a className="btn btn-outline-secondary btn-lg" href="/login">Log In</a>
        </div>
      </div>
      <div className="col-12 col-md-4 text-center mt-4 mt-md-0">
        <img src="/img/roblox_logo.svg" alt="Roblox" style={{ width: "100%", maxWidth: "260px", height: "auto" }} />
      </div>
    </section>
    <section className="row g-4">
      <div className="col-12 col-md-4">
        <h2 className="h4">Play</h2>
        <p>Browse popular games and find something new to try.</p>
        <a href="/games">Explore games</a>
      </div>
      <div className="col-12 col-md-4">
        <h2 className="h4">Create</h2>
        <p>Build and share your own games and creations.</p>
        <a href="/develop">Start creating</a>
      </div>
      <div className="col-12 col-md-4">
        <h2 className="h4">Connect</h2>
        <p>Find friends and keep up with the community.</p>
        <a href="/search/users">Find players</a>
      </div>
    </section>
  </main>
</Theme2016>;

const IndexPage = () => {
  const auth = AuthenticationStore.useContainer();

  if (auth.isPending) {
    return <main className="container mt-5">
      <p>Loading your account...</p>
      <a href="/auth/application">Sign Up</a>
    </main>;
  }

  if (!auth.isAuthenticated) return <WelcomeHome />;

  return <Theme2016>
    <DashboardStore.Provider>
      <MyDashboard />
    </DashboardStore.Provider>
  </Theme2016>;
}

export default IndexPage;