import { User } from "./User";

export class Meeting {
    constructor(
      public id?: any,
      public sujet?: Subject[],
      public dateHeure?: Date,
      public titre?: string,
      public organizer?: User,
      public participants?: User[]
    ) {}
  }
  export interface Meeting {
    id?: any;
    sujet?: Subject[];
    dateHeure?: Date;
    titre?: string;
    organizer?: User;
    participants?: User[];
  }
  export interface Subject {
    id: number;
    title: string;
  }