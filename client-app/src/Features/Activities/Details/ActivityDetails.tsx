import React, { useContext } from "react";
import { Card, Image, Button, ButtonGroup } from "semantic-ui-react";
import ActivityStore from '../../../App/Layouts/stores/activityStore';
import {observer} from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {activity: selectedActivity, openEditForm, cancelSelectedActivity} = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity!.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity!.category}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup fluid>
          <Button onClick={() => openEditForm(selectedActivity!.id)} content="Edit" basic color="blue" />
          <Button onClick={cancelSelectedActivity} content="Cancel" basic color="grey" />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
