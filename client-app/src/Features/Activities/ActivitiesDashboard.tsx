import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./Dashboard/ActivityList";
import ActivityDetails from "./Details/ActivityDetails";
import ActivityForm from "./Forms/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from '../../App/Layouts/stores/activityStore';

const ActivitiesDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {editMode, activity} = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {activity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm key={(activity && activity.id) || 0}
            initialActivity={activity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
