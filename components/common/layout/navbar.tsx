import { Affix, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useWindowResize } from "../../../hooks/window-resize";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { width } = useWindowResize();

  useEffect(() => {
    if (width > 768) setShowDrawer(false);
  }, [width]);

  return (
    <>
      <Affix offsetTop={0} className="mb-2">
        <nav className="w-full flex items-center justify-around py-4 mx-auto bg-white shadow-lg">
          <div className="p-2">
            <h3 className="text-2xl m-0 p-0 font-medium text-teal-400">
              Bangla OCR
            </h3>
            <h5 className="text-sm text-teal-700">
              An Optical character recognition tool for Bangla language
            </h5>
          </div>

          <div className="space-x-8 text-teal-700 hidden md:flex">
            <a href="" className="text-teal-700">
              Home
            </a>
            <a href="" className="text-teal-700">
              About
            </a>
            <a href="" className="text-teal-700">
              Blogs
            </a>
            <a href="" className="text-teal-700">
              Our Team
            </a>
            <a href="" className="text-teal-700">
              Contact Us
            </a>
          </div>

          <div
            className="flex md:hidden p-2"
            onClick={() => setShowDrawer(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </nav>
      </Affix>
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(!showDrawer)}
        width={250}
      >
        <div className="text-teal-800">
          <a href="" className="text-teal-800">
            Home
          </a>
          <a href="" className="text-teal-800">
            About
          </a>
          <a href="" className="text-teal-800">
            Blogs
          </a>
          <a href="" className="text-teal-800">
            Our Team
          </a>
          <a href="" className="text-teal-800">
            Contact Us
          </a>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
