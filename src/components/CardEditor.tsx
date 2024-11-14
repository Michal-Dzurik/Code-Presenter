import * as React from 'react';
import '../index.css';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    setApplicableAt,
    setCode,
    setDiscount,
    setHeading,
} from './redux/features/card';

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

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (!isSubmitValid()) {
            alert('Form is not valid');
            return;
        }

        saveCard();
    };

    return (
        <form
            className="relative w-72 rounded-xl flex flex-col items-center p-4 ml-4"
            onSubmit={onSubmit}
        >
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Heading</span>
                </div>
                <input
                    type="text"
                    placeholder="Love you"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setHeading(event.target.value))
                    }
                    value={card.heading || ''}
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Code</span>
                </div>
                <input
                    type="text"
                    placeholder="123-456-789"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setCode(event.target.value))
                    }
                    value={card.code || ''}
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Applicable at</span>
                </div>
                <input
                    type="text"
                    placeholder="Steam"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setApplicableAt(event.target.value))
                    }
                    value={card.applicableAt || ''}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Discount</span>
                </div>
                <input
                    type="text"
                    placeholder="-10%"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        dispatch(setDiscount(event.target.value))
                    }
                    value={card.discount || ''}
                />
            </label>

            <button className="btn btn-primary mt-6" type="submit">
                Submit
            </button>
        </form>
    );
};
