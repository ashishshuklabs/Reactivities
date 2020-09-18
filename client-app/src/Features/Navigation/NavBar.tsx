import React, { useContext } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import ActivityStore from '../../App/Layouts/stores/activityStore';
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {openNewActivityForm} = activityStore;
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="assets/logo.png" style={{ marginRight: "10px" }} alt='logo'/>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openNewActivityForm} positive content="Add Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
