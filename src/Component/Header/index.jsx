import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message } from "antd";
import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import { useNavigate } from "react-router";
import { UserLogout } from "../../redux/account/account.slice";
const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(UserLogout());
    navigate("/");
    message.success("Đăng xuất thành công!");
  };

  const moveToDashboard = () => {
    navigate("/admin");
  };
  const items = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "account",
    },

    user?.role === "ADMIN" && {
      label: <label>Trang quản trị</label>,
      key: "dashboard",
      onClick: moveToDashboard,
    },

    {
      label: <label>Đăng xuất</label>,
      key: "logout",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="header-container" style={{ marginBottom: "30px" }}>
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo">
                <FaReact className="rotate icon-react" /> Hỏi Dân IT
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <div>
            <nav className="page-header__bottom">
              <ul id="navigation" className="navigation">
                <li className="navigation__item">
                  <Badge count={5} size={"small"}>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </li>
                <li className="navigation__item mobile">
                  <Divider type="vertical" />
                </li>
                <li className="navigation__item mobile">
                  {!isAuthenticated ? (
                    <span onClick={() => navigate("/login")}> Tài Khoản</span>
                  ) : (
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar
                            src={
                              <img
                                src={`http://localhost:8080/images/avatar/${user?.avatar}`}
                                alt="avatar"
                              />
                            }
                          />
                          {user?.fullName}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <Divider></Divider>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p onClick={handleLogout}>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
