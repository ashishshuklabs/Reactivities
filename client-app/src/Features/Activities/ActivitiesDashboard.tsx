import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../Models/IActivity";
import ActivityList from "./Dashboard/ActivityList";
import ActivityDetails from "./Details/ActivityDetails";
import AddActivityForm from "./Forms/AddActivityForm";
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  activity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  addActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
}
const ActivitiesDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  activity,
  editMode,
  setEditMode,
  setSelectedActivity,
  addActivity: addActivity,
  editActivity: editActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity = {deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {activity && !editMode && (
          <ActivityDetails
            selectedActivity={activity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <AddActivityForm key={(activity && activity.id) || 0}
            setEditMode={setEditMode}
            initialActivity={activity!}
            addActivity = {addActivity}
            editActivity = {editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivitiesDashboard;
