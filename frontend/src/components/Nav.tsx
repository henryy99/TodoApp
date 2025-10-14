import { useUser } from "@/context/UserContext";

import LogoutDialog from "./LogoutDialog";

const Nav = () => {
  const { state, logout } = useUser();
  const photoLink = state.user?.photo;

  return (
    <nav className="w-full   flex justify-center items-center flex-col gap-2">
      <div className="items-center gap-3 flex ">
        <img src={photoLink} alt="photo img" className="w-10 rounded-full" />
        <span className="tracking-wider font-bold">{state.user?.name}</span>
      </div>
      <LogoutDialog handleLogOut={logout} />
    </nav>
  );
};

export default Nav;
