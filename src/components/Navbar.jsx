import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, CloseCircleFilled } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleMenuClick = () => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link className="linkTitle" to="/">Crypto Dome Hub</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>{!activeMenu ? <MenuOutlined /> : <CloseCircleFilled />}</Button>
      </div>
      {activeMenu && (
      <Menu theme="dark">
        <Menu.Item onClick={handleMenuClick} icon={<HomeOutlined />}>
          <Link className="linkName" to="/">Home</Link>
        </Menu.Item>
        <Menu.Item onClick={handleMenuClick} icon={<FundOutlined />}>
          <Link className="linkName" to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item onClick={handleMenuClick} icon={<MoneyCollectOutlined />}>
          <Link className="linkName" to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item onClick={handleMenuClick} icon={<BulbOutlined />}>
          <Link className="linkName" to="/news">News</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
