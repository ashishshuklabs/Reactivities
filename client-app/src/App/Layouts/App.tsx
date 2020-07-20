import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import "../Layouts/styles.css";
import { IActivity } from "../../Models/IActivity";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/Navigation/NavBar";
import ActivitiesDashboard from "../../Features/Activities/ActivitiesDashboard";
import agent from "./API/agent";
import LoadingComponent from "./LoadingComponent";
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  const selectActivityHandler = (id: string) => {
    agent.Activities.details(id).then(() => {
      setSelectedActivity(() => activities.filter((a) => a.id === id)[0]);
      setEditMode(false);
    });
  };
  const setEditModeHandler = (editmode: boolean) => {
    setEditMode(editmode);
  };
  const openActivityFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const addActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const editActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const deleteActivityHandler = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
      setSubmitting(true);
      setTarget(e.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
        setSelectedActivity(null);
      })
      .then(() => setSubmitting(false));
  };
  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        const newActivities: IActivity[] = [];
        response.forEach((a) => {
          a.date = a.date.split(".")[0];
          newActivities.push(a);
        });
        setActivities(newActivities);
      })
      .then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent loadingContent="Loading Activities..." />;
  }
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
          setSelectedActivity={setSelectedActivity}
          addActivity={addActivityHandler}
          editActivity={editActivityHandler}
          deleteActivity={deleteActivityHandler}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
