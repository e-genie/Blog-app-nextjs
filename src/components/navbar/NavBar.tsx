import Link from "next/link";
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

type Props = {};

function NavBar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="p-5">
        <div className="flex justify-between">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars size={30} />
          </div>
          <Link href="/" className="text-xl font-semibold">
            Blog App
          </Link>
          <div>
            <BiSearch size={30} />
          </div>
        </div>
      </div>
      <div>
        {isMenuOpen && (
          <Menu className="px-10 bg-gray-500 text-white" width={500}>
            <Link
              href="/"
              className="py-5"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <hr className="w-3/4 bg-white" />
            <Link
              href="/about"
              className="py-5"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <hr className="w-3/4 bg-white" />
            <Link
              href="/contact"
              className="py-5"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <hr className="w-3/4 bg-white" />
            <Link
              href="/login"
              className="py-5"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <hr className="w-3/4 bg-white" />
          </Menu>
        )}
      </div>
    </div>
  );
}

export default NavBar;
