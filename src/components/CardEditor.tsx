import * as React from "react";
import "../index.css";
import {ChangeEvent, useState} from "react";
import {CardData} from "../interfaces/CardData";
import {CardEditorData} from "../interfaces/CardEditorData";

interface Props{
    saveCard: () => void,
    cardEditorData: CardEditorData,
    cardData: CardData,
}

export const CardEditor = (props: Props): React.ReactElement => {
    const {setHeading, setCode, setApplicableAt} = props.cardEditorData;
    const cardData = props.cardData;
    const {saveCard} = props;

    const isSubmitValid = () => {
        if (!cardData.heading || cardData.heading.trim() === '') return false;
        if (!cardData.code || cardData.code.trim() === '') return false;
        if (!cardData.applicableAt || cardData.applicableAt.trim() === '') return false;

        return true;
    }

    const onSubmit = () => {
        if (!isSubmitValid()) {
            alert('Form is not valid')
            return;
        }


        if(saveCard) saveCard();
    }

    return (
        <div className="relative w-72 rounded-xl flex flex-col items-center p-4 ml-4">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Heading</span>
                </div>
                <input type="text" placeholder="Love you 🩷" className="input input-bordered w-full max-w-xs"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setHeading(event.target.value)} value={cardData.heading || ''} />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Code</span>
                </div>
                <input type="text" placeholder="123-456-789" className="input input-bordered w-full max-w-xs"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setCode(event.target.value)} value={cardData.code || ''}/>
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Applicable at</span>
                </div>
                <input type="text" placeholder="Steam" className="input input-bordered w-full max-w-xs"
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setApplicableAt(event.target.value)} value={cardData.applicableAt || ''}/>
            </label>

            <button className="btn btn-primary mt-6" onClick={onSubmit}>Primary</button>
        </div>
    );
}
