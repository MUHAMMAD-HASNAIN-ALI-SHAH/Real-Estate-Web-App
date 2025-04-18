import { FaCompass } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Signup from "./Signup";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedSignin, signinHandler] = useDisclosure(false);
  const { isAuthenticated,logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <Signup onClose={close} />
      </Modal>

      <Modal
        opened={openedSignin}
        onClose={signinHandler.close}
        title="Authentication"
        centered
      >
        <Signin onClose={signinHandler.close} />
      </Modal>

      <div className="navbar bg-white border-b shadow-md sticky top-0 z-50 px-10">
        <div className="navbar-start">
          <div
            className="flex flex-row items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaCompass className="text-3xl text-red-500" />
            <span className="text-2xl text-red-500">airbnb</span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <h4 className="font-semibold pr-5 hover:cursor-pointer" onClick={()=> navigate("/")}>
            Airbnb Your Home
          </h4>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar flex items-center justify-center gap-2 px-4 py-1 rounded-full border border-gray-300"
            >
              <i className="ri-menu-line text-red-500"></i>
              <i className="ri-account-circle-fill text-3xl"></i>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {isAuthenticated ? (
                <>
                  <li>
                    <a onClick={()=>{navigate("/profile")}}>My Profile</a>
                  </li>
                  <li>
                    <a onClick={()=>{navigate("/dashboard")}}>Airbnb your Dasboard</a>
                  </li>
                  <li>
                    <a onClick={()=>{logout()}}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a onClick={open}>Signup</a>
                  </li>
                  <li>
                    <a onClick={signinHandler.open}>Login</a>
                  </li>
                </>
              )}

              <hr />
              <li>
                <a onClick={() => navigate("/")}>Airbnb your Home</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
