export enum ProjectStatus {
  INCOMPLETE = "incomplete",
  SHOOTING = "shooting",
  EDITING = "editing",
  FEEDBACK = "feedback",
  COMPLETED = "completed",
}

export enum ProjectType {
  EDUCATIONAL = "educational",
  TESTIMONIAL = "testimonial",
  TRAINING = "training",
  RECREATIONAL = "recreational",
}

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  type: ProjectType;
  createdOn: string;
  archived: boolean;
};
