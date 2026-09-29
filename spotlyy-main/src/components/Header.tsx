import Link from "next/link";
import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
  return (
    <div className="bg-amber-300 text-black w-full  p-6 flex justify-between items-center">
      <ul className="flex gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/@john321">@john321</Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </div>
  );
};

export default Header;
