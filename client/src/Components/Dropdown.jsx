"use client";
import { Dropdown, Avatar } from "flowbite-react";

export function UserDropdown({ logoutHandler }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const name = userInfo?.name || "User";

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <div className="flex items-center space-x-2">
          <Avatar rounded />
          <span className="text-gray-800 font-medium">{name}</span>
        </div>
      }
    >
      <Dropdown.Item onClick={logoutHandler}>
        Sign out
        <svg
          className="w-5 h-5 ml-2 inline-block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"
          ></path>
        </svg>
      </Dropdown.Item>
    </Dropdown>
  );
}
