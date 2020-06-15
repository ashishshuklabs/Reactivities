import React, { useState, useEffect, Fragment } from "react";
import "../Layouts/styles.css";
import axios from "axios";
import { IActivity } from "../../Models/IActivity";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/Navigation/NavBar";
import ActivitiesDashboard from "../../Features/Activities/ActivitiesDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const selectActivityHandler = (id: string) => {
    setSelectedActivity(() => activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };
  const setEditModeHandler = (editmode:boolean) =>{
    setEditMode(editmode);
  }
  const openActivityFormHandler = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }
  const addActivityHandler = (activity: IActivity) => {
    setActivities([...activities, activity]);
  }
  const editActivityHandler = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
  }
  const deleteActivityHandler = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        const newActivities: IActivity[] = [];
        response.data.forEach(
          a => {
            a.date = a.date.split('.')[0];
            newActivities.push(a);
          });
        setActivities(newActivities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openActivityFormHandler={openActivityFormHandler} />

      <Container style={{ marginTop: "7em" }}>
        <ActivitiesDashboard
          activities={activities}
          selectActivity={selectActivityHandler}
          activity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditModeHandler}
          setSelectedActivity = {setSelectedActivity}
          addActivity = {addActivityHandler}
          editActivity = {editActivityHandler}
          deleteActivity = {deleteActivityHandler}
        />
      </Container>
    </Fragment>
  );
};

export default App;
