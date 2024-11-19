import * as React from 'react';
import '../../index.css';
import { ChangeEvent } from 'react';

interface Props {
    label: string;
    value: string;
    handleChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    id?: string;
}

export const TextInput = (props: Props): React.ReactElement => {
    const { label, value, handleChange, placeholder, minLength, maxLength, id} =
        props;

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input id={id}
                type="text"
                placeholder={placeholder}
                className="input input-bordered w-full max-w-xs placeholder:text-gray-600"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event.target.value)
                }
                value={value || ''}
                minLength={minLength}
                maxLength={maxLength}
            />
        </label>
    );
};
