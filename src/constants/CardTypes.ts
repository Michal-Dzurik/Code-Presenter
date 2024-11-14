export enum CardType {
    HangingDiscount = 1,
    Discount = 2,
}

// A Map to associate each CardType with a user-friendly label
export const cardTypeMap = new Map<CardType, string>([
    [CardType.HangingDiscount, 'Hanging Discount'],
    [CardType.Discount, 'Discount Ticket'],
]);
