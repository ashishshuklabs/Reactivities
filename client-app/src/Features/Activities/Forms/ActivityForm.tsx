import React, { useState, FormEvent, useContext } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../Models/IActivity";
import {v4 as uuid} from 'uuid';
import { observer } from "mobx-react-lite";
import ActivityStore from '../../../App/Layouts/stores/activityStore';
interface IProps {
  initialActivity: IActivity;
}
const ActivityForm: React.FC<IProps> = ({
  initialActivity
}) => {
  const activityStore = useContext(ActivityStore);
  const {createActivity:addActivity, editActivity, submitting, closeForm} = activityStore;
  const initialState = () => {
    if (initialActivity) {
      return initialActivity;
    } else {
      //create empty object
      return {
        id: "",
        title: "",
        category: "",
        city: "",
        date: "",
        description: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState(initialState);
  //** Form Entry logic @param: formevent */
  const formEntry = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({...activity,[name] : value});
    //Add this activity to the activity list
  };
  //** form submit logic */
  const submit = () => {
    if(activity.id.length !== 0){
      editActivity(activity);
      return;
    }
    addActivity({
      id: uuid(),
      category:activity.category,
      venue: activity.venue,
      description: activity.description,
      title: activity.title,
      city: activity.city,
      date: activity.date
    });

  }
  return (
    <Segment clearing>
      <Form onSubmit={submit}>
        <Form.Input
          onChange={formEntry}
          name="title"
          value={activity.title}
          placeholder='Title'
        />
        <Form.TextArea
          onChange={formEntry}
          name="description"
          rows={2}
          value={activity.description}
          placeholder='Description'
        />
        <Form.Input
          onChange={formEntry}
          name="category"
          value={activity.category}
          placeholder='Category'
        />
        <Form.Input
          onChange={formEntry}
          name="date"
          type="datetime-Local"
          value={activity.date}
          placeholder="Date"
        />
        <Form.Input
          onChange={formEntry}
          name="city"
          value={activity.city}
          placeholder='City'
        />
        <Form.Input
          onChange={formEntry}
          name="venue"
          value={activity.venue}
          placeholder='Venue'
        />
        <Button
          loading={submitting}
          positive
          content="Save"
          color="blue"
          type="submit"
          floated="right"
        />
        <Button
          content="Cancel"
          color="grey"
          type="button"
          floated="right"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
