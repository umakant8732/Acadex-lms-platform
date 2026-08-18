import React, { useState } from "react";

import { useAuthLogout } from "../../../../features/auth/hooks/use-auth-logout";
import DropdownPanel from "@/shared/ui/app-shell/dropdown-panel";

const menuItemClasses = `
  block
  w-full
  px-4
  py-3
  text-left
  text-sm
  transition
  hover:bg-black
  hover:text-white
`;

const TeacherProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const { handleLogout, isPending } = useAuthLogout();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-11 h-11 bg-black text-sm font-semibold text-white flex items-center justify-center"
      >
        TU
      </button>

      {open && (
        <DropdownPanel>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className={menuItemClasses}
          >
            Logout
          </button>
        </DropdownPanel>
      )}
    </div>
  );
};

export default TeacherProfileDropdown;
