import { NavLink } from "react-router-dom";
import { showInfo } from "@/shared/utils/toast";

const navItems = [
  {
    label: "Courses",
    to: "/student",
    end: true,
    disabled: false,
  },
  {
    label: "My Learning",
    to: "/student/my-learning",
    disabled: false,
  },
  {
    label: "Wishlist",
    to: "/student/wishlist",
    disabled: false,
  },
];

const NavLinks = ({ mobile = false, className = "" }) => {
  const wrapperClasses = mobile
    ? "flex flex-col gap-4"
    : "hidden items-center gap-8 lg:flex xl:gap-12";

  return (
    <nav className={[wrapperClasses, className].filter(Boolean).join(" ")}>
      {navItems.map((item) => {
        if (item.disabled) {
          return (
            <button
              key={item.label}
              onClick={() =>
                showInfo(
                  `Coming Soon: ${item.label} module is under development!`,
                )
              }
              className={
                mobile
                  ? "text-left text-sm font-medium text-black/35 hover:text-black transition"
                  : "text-sm font-medium text-black/35 hover:text-black transition"
              }
            >
              {item.label}
            </button>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.to || ""}
            end={item.end}
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? "text-black" : "text-black/50 hover:text-black"
              }`
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavLinks;
