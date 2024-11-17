import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CardData } from '../../interfaces/CardData';

export interface CounterState {
    card: CardData;
    id: string;
}

const initialState: CounterState = {
    card: {
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
        uid: null,
    },
    id: '',
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>): void => {
            state.id = action.payload;
        },
        setHeading: (state, action: PayloadAction<string>): void => {
            state.card.heading = action.payload;
        },
        setCode: (state, action: PayloadAction<string>): void => {
            state.card.code = action.payload;
        },
        setApplicableAt: (state, action: PayloadAction<string>): void => {
            state.card.applicableAt = action.payload;
        },
        setType: (state, action: PayloadAction<number>): void => {
            state.card.type = action.payload;
        },
        setUid: (state, action: PayloadAction<string>): void => {
            state.card.uid = action.payload;
        },
        setDiscount: (state, action: PayloadAction<string>): void => {
            state.card.discount = action.payload;
        },
        setCard: (state, action: PayloadAction<CardData>): void => {
            state.card = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setId,
    setHeading,
    setType,
    setUid,
    setCode,
    setApplicableAt,
    setDiscount,
    setCard,
} = cardSlice.actions;

export default cardSlice.reducer;
