export default interface Project {
    id: number;
    name: string;
    alias: string;
    description: string;
    leader: number;
    users: number[];
    createdAt: string;
}