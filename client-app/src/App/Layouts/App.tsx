import React, { useEffect, Fragment, useContext } from "react";
import "../Layouts/styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/Navigation/NavBar";
import ActivitiesDashboard from "../../Features/Activities/ActivitiesDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../Layouts/stores/activityStore';
import {observer} from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);
 
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial) {
    return <LoadingComponent loadingContent="Loading Activities..." />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
