export default interface Ticket {
    id: number;
    title: string;
    description: string;
    state: number;
    user: number | null;
    createdAt: string;
}