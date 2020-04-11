import React, { useState, useEffect } from "react";
import "../Layouts/styles.css";
import axios from "axios";
import { IActivity } from "../../Models/IActivity";
import { Header, Icon, List } from "semantic-ui-react";

const App = () => {
  let [activities, setActivity] = useState<IActivity[]>([]);
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivity(response.data);
      });
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header> 
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
