import React from "react";
import { Card, Image, Button, ButtonGroup } from "semantic-ui-react";
import { IActivity } from "../../../Models/IActivity";
interface IProps {
  selectedActivity: IActivity;
  setEditMode: (editMode:boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
const ActivityDetails: React.FC<IProps> = ({ selectedActivity, setEditMode, setSelectedActivity }) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.category}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup fluid>
          <Button onClick={() => setEditMode(true)} content="Edit" basic color="blue" />
          <Button onClick={() => setSelectedActivity(null)} content="Cancel" basic color="grey" />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
