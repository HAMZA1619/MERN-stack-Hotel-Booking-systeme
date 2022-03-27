import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <>
      <CDBSidebar textColor="#fff" className="h-auto bg-dark">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu>
            <NavLink to="/" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            {role === "client" ? (
              <NavLink to="/reserve" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="check">
                  Reservations
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <>
                {role === "admin" && (
                  <NavLink to="/tables" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="table">Users</CDBSidebarMenuItem>
                  </NavLink>
                )}
                <NavLink to="/hotels" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="hotel">Hotels</CDBSidebarMenuItem>
                </NavLink>

                <NavLink to="/rooms" activeclassname="activeClicked">
                  <CDBSidebarMenuItem icon="bed">Rooms</CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/reserve" activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="check">
                  Reservations
                </CDBSidebarMenuItem>
              </NavLink>
              </>
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </>
  );
};

export default Sidebar;
