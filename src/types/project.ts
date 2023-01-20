export enum ProjectStatus {
  "INCOMPLETE" = "Form Incomplete",
  "SHOOTING" = "Shoot Scheduled",
  "EDITING" = "Video Editing",
  "FEEDBACK" = "Waiting for Feedback",
  "COMPLETED" = "Completed",
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
  type: string;
  createdOn: string;
  archived: boolean;
};
