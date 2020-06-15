import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
interface IProps{
  openActivityFormHandler: () => void;
}
const NavBar: React.FC<IProps> = ({openActivityFormHandler}) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="assets/logo.png" style={{ marginRight: "10px" }} alt='logo'/>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openActivityFormHandler} positive content="Add Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
