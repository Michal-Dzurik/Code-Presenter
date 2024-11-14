export interface CardData {
    id?: string;
    heading: string | null;
    applicableAt: string;
    code: string;
    type: number;
    discount?: string;
    uid: string | null;
}
