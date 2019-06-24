import { Group } from './group';

export class User {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Groups: Array<Group>;
}