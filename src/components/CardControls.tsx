import * as React from "react";
import "../index.css";
import {Link} from "react-router-dom";
import {CardData} from "../interfaces/CardData";

interface Props{
    cardId?: string,
    smallVersion?: boolean,
    deleteOnly?: boolean,
    onDelete: (id: string) => void,
}

export const CardControls = (props: Props): React.ReactElement => {
    const {cardId, smallVersion, deleteOnly, onDelete} = props;

    const beforeDelete = (cardId: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) onDelete(cardId);
    }

    return (
        <>
            { cardId ? (
                <div className={!deleteOnly ? 'mt-4' : 'ml-4'}>
                    { !deleteOnly ? (
                        <Link to={`/editor/${cardId}`} className={ smallVersion ? 'btn-block btn-sm btn btn-primary text-white mr-6 text-sm' : 'btn-block btn btn-sm text-white btn-primary mr-6'}>Edit</Link>
                    ) : ''}
                    <a href='#' onClick={ () => beforeDelete(cardId)} className={ smallVersion ? 'btn btn-error btn-sm text-white btn-block mt-2' : ' btn btn-error text-white btn'}>Delete</a>
                </div>
            ) : ''}
        </>
    );
}
