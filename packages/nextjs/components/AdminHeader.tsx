"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  { label: "Home", href: "/admin" },
  { label: "Debug Contracts", href: "/debug", icon: <BugAntIcon className="h-5 w-5" /> },
  { label: "Subgraph", href: "/subgraph", icon: <MagnifyingGlassIcon className="h-5 w-5" /> },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-4">
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
                isActive ? "bg-gray-100 font-medium text-gray-800" : ""
              }`}
            >
              {icon && <div className="text-gray-500">{icon}</div>}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

/* Site header */
export const AdminHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="lg:hidden">
            <button
              type="button"
              className="bg-gray-100 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setIsDrawerOpen(prevIsOpenState => !prevIsOpenState)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {isDrawerOpen && (
              <div
                ref={burgerMenuRef}
                className="absolute top-16 left-4 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4"
              >
                <HeaderMenuLinks />
              </div>
            )}
          </div>
          <Link href="/" passHref className="hidden lg:flex items-center gap-2">
            <div className="relative w-32 h-12">
              <Image alt="Prodigikill logo" className="cursor-pointer" fill src="/logo.png" />
            </div>
            {/* <div className="flex flex-col">
              <span className="font-bold text-gray-800 leading-tight">Scaffold-ETH</span>
              <span className="text-sm text-gray-500">Ethereum dev stack</span>
            </div> */}
          </Link>
          <nav className="hidden lg:flex items-center">
            <HeaderMenuLinks />
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </header>
  );
};
