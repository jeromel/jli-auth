import { Group } from './group';

export class User {
    public Id: number;
    public Firstname: string;
    public Lastname: string;
    public Email: string;
    public Groups: Array<Group>;
}