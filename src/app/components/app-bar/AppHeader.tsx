"use client";

export default function AppHeader({}: {}) {
  return (
    <header
      className="
        fixed top-0 left-0 z-50
        flex h-20 w-full p-4
        items-center justify-between
        bg-white border-b-2 border-gray-200
      "
    >
      <h1 className="ml-3 title-large hidden md:block text-primary-400">
        Role Based Access Control System
      </h1>
      <h1 className="ml-3 title-large block md:hidden text-primary-400">
        RBAC
      </h1>
    </header>
  );
}
