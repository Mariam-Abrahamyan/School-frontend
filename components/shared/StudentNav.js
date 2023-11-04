import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Navbar } from "react-bootstrap";
import SideNav, {
  NavItem,
  NavIcon,
} from "@trendmicro/react-sidenav";
import {
  Link,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";


class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    return (
      <SideNav expanded={this.state.isVisible}>
        <SideNav.Toggle
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <Link to="/student/tests" className="text-white nav-item">
              Tests
            </Link>
          </NavItem>
          <NavItem eventKey="logout">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <button
              onClick={this.props.handleLogout}
              className="text-white nav-link"
            >
              Logout
            </button>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

class HeaderBar extends React.Component {
  render() {
    return (
      <div className="topnav">
        <Navbar
          fixed="top"
          expand="lg"
          bg="dark"
          variant="dark"
          className="topnav"
        >
          <Navbar.Brand href="/admin" className="mx-3">
            School{" "}
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

const StudentNav = () => {
  const { account, handleLogout } = useOutletContext();

  return account && account.type != "student" ? (
    <Navigate to="/" />
  ) : !account ? (
    <p>Please wait...</p>
  ) : (
    <>
      :<HeaderBar></HeaderBar>
      <SideNavBar handleLogout={handleLogout}></SideNavBar>
      <div className="container" style={{ marginLeft: 300, marginTop: 100 }}>
        <Outlet context={account} />
      </div>
    </>
  );
};

export default StudentNav;
