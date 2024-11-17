import * as React from 'react';
import '../index.css';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    setApplicableAt,
    setCode,
    setDiscount,
    setHeading,
} from '../redux/features/card';
import { TextInput } from './form/TextInput';

interface Props {
    saveCard: () => void;
}

export const CardEditor = (props: Props): React.ReactElement => {
    const dispatch = useDispatch();
    const { saveCard } = props;

    const card = useSelector((state: RootState) => state.card.card);

    const isSubmitValid = () => {
        if (!card.heading || card.heading.trim() === '') return false;
        if (!card.discount || card.discount.trim() === '') return false;
        if (!card.code || card.code.trim() === '') return false;
        if (!card.applicableAt || card.applicableAt.trim() === '') return false;

        return true;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!isSubmitValid()) {
            alert('Form is not valid');
            return;
        }

        saveCard();
    };

    const handleHeadingChange = useCallback(
        (val: string) => {
            dispatch(setHeading(val));
        },
        [dispatch]
    );

    const handleCodeChange = useCallback(
        (val: string) => {
            dispatch(setCode(val));
        },
        [dispatch]
    );

    const handleApplicableAtChange = useCallback(
        (val: string) => {
            dispatch(setApplicableAt(val));
        },
        [dispatch]
    );

    const handleDiscountChange = useCallback(
        (val: string) => {
            dispatch(setDiscount(val));
        },
        [dispatch]
    );

    return (
        <form
            className="relative w-72 rounded-xl flex flex-col items-center p-4 ml-4"
            onSubmit={handleSubmit}
        >
            <TextInput
                label="Heading"
                value={card.heading || ''}
                handleChange={handleHeadingChange}
                placeholder="Love you"
                maxLength={150}
            />

            <TextInput
                label="Code"
                value={card.code || ''}
                handleChange={handleCodeChange}
                placeholder="123-456-789"
                maxLength={20}
            />

            <TextInput
                label="Applicable at"
                value={card.applicableAt || ''}
                handleChange={handleApplicableAtChange}
                placeholder="Steam"
                maxLength={20}
            />

            <TextInput
                label="Discount"
                value={card.discount || ''}
                handleChange={handleDiscountChange}
                placeholder="-10%"
                maxLength={6}
            />

            <button className="btn btn-primary mt-6" type="submit">
                Submit
            </button>
        </form>
    );
};
