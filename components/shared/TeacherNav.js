import React, { useEffect, useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Navbar } from "react-bootstrap";
import SideNav, {
  
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
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
            <Link to="/teacher" className="text-white nav-item">
              Dashboard
            </Link>
          </NavItem>
          <NavItem eventKey="teachers">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <Link to="/teacher/tests" className="text-white nav-item">
              Tests
            </Link>
          </NavItem>
          <NavItem eventKey="students">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <Link to="/teacher/lessons" className="text-white nav-item">
              Lessons
            </Link>
          </NavItem>
          <NavItem eventKey="groups">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <Link to="/admin/groups" className="text-white nav-link">
              Groups
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

const TeacherNav = () => {
  const { account, handleLogout } = useOutletContext();
  

  return account && account.type != "teacher" ? (
    <Navigate to="/" />
  ) : !account ? (
    <p>Please wait...</p>
  ) : (
    <>
      :<HeaderBar></HeaderBar>
      <SideNavBar handleLogout={handleLogout}></SideNavBar>
      <div className="container" style={{ marginLeft: 300, marginTop: 100 }}>
        <Outlet context={{ account }} />
      </div>
    </>
  );
};

export default TeacherNav;
