import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import {observer} from 'mobx-react-lite';
import ActivityStore from '../../../App/Layouts/stores/activityStore';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {dateSortedActivities, selectActivity,deleteActivity,submitting, target} = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {dateSortedActivities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  color="blue"
                  content="View"
                />
                <Button
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  onClick={e => deleteActivity(e, activity.id)}
                  floated="right"
                  color="red"
                  content="Delete"
                />
                <Label attached="bottom left" content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
