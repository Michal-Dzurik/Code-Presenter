import React from 'react';

interface Props {
    value: number;
    options: Map<number, string>;
    handleChange: (value: string) => void;
    defaultOptionText: string;
    isDefaultDisabled: boolean;
    id?: string;
    testId?: string;
}

export const Select = (props: Props): React.ReactElement => {
    const {
        value,
        options,
        handleChange,
        defaultOptionText,
        isDefaultDisabled,
        id,
        testId,
    } = props;

    return (
        <select
            data-testid={testId}
            id={id}
            value={value}
            className="select select-bordered w-full max-w-xs"
            onChange={(element) => {
                handleChange(element.target.value);
            }}
        >
            <option value="0" disabled={isDefaultDisabled}>
                {defaultOptionText}
            </option>
            {Array.from(options.entries()).map(([optionValue, label]) => (
                <option key={optionValue} value={optionValue}>
                    {label}
                </option>
            ))}
        </select>
    );
};
