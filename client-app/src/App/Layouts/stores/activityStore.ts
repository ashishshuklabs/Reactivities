import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../../../Models/IActivity";
import agent from "../API/agent";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable activitiesMapper = new Map<string, IActivity>();
  @observable target = '';
  
  @computed get dateSortedActivities(){
      return Array.from(this.activitiesMapper.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activitiesMapper.set(activity.id, activity);
      this.editMode = false;
      this.activity = activity;
    } catch (error) {
      console.log(error);
    
    } finally {
      this.submitting = false;
    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activitiesMapper.set(activity.id, activity);
      this.editMode = false;
      this.activity = activity;
    } catch (error) {
      console.log(error);
    } finally {
      this.submitting = false;
    }
  };
  
  @action openNewActivityForm = () => {
    this.activity = undefined;
    this.editMode = true;
  };
  @action selectActivity = (id: string) => {
    this.activity = this.activitiesMapper.get(id);
    this.editMode = false;
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities: IActivity[] = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activitiesMapper.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingInitial = false;
    }
  };

  @action deleteActivity = async(e: SyntheticEvent<HTMLButtonElement>, id: string) =>{
    this.submitting = true;
    this.target = e.currentTarget.name;
    try{
    await agent.Activities.delete(id);

    this.activitiesMapper.delete(id);
    this.activity = undefined;
    } catch(error){

    } finally{
      this.submitting = false;
    }
   
    
  }

@action openEditForm = (id: string) => {
  this.activity = this.activitiesMapper.get(id);
  this.editMode = true;
}  
@action cancelSelectedActivity = () =>{
  this.activity = undefined;
}
@action closeForm = () =>{
  this.editMode = false;
}
  
}
export default createContext(new ActivityStore());
