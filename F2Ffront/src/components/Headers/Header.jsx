import React from "react";
import ff from "/assets/f2f.jpg";
import classes from "./Header.module.scss";
import Accounts from "../Accounts/Accounts";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ContainerAdmin from "../../commoncomponents/Container/ContainerAdmin";

const Header = ({ menuCollapse, setMenuCollapse }) => {
  return (
    <header className={`${classes.header}`}>
      <ContainerAdmin classname={`${classes.headerSeparate}`}>
        <div className={`${classes.logoDivide}`}>
          <img className={`${classes.mainlogos}`} alt="Logo" src={ff} />

          <div className='cursor-pointer' onClick={() => setMenuCollapse(!menuCollapse)}>
            {menuCollapse ? 
                <MenuUnfoldOutlined />
              : 
                <MenuFoldOutlined />
            }
          </div>
        </div>

        {/* <AdminTopMenu /> */}

        <div className={`${classes.rightSection}`}>
          {/* account details code */}
          <Accounts />
        </div>
      </ContainerAdmin>
    </header>
  );
};

export default Header;
