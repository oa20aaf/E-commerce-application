"use client";
import {Dropdown} from "flowbite-react";

export function UserDropdown({LogoutHandler}) {
  return (
    <Dropdown label="User" dismissOnClick={false}>
        <Dropdown.Item>Profile</Dropdown.Item>    
        <Dropdown.Item onClick={LogoutHandler}>Sign out</Dropdown.Item>
      </Dropdown>
  );
}