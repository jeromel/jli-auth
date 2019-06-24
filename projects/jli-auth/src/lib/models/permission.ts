export class Permission {
    public Id: number;
    public Name: string;
    public DisplayName: string;

    constructor(name: string)
    {
        this.Name = name;

        this.Id = -1;
        this.DisplayName = this.Name;
    }
}