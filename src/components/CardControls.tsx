import * as React from "react";
import "../index.css";
import {Link} from "react-router-dom";
import {CardData} from "../interfaces/CardData";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface Props{
    cardId?: string,
    editorVersion?: boolean,
    onDelete: (id: string) => void,
}

export const CardControls = (props: Props): React.ReactElement => {
    const { editorVersion, onDelete, cardId} = props;
    const id = useSelector((state: RootState) => state.card.id)

    const beforeDelete = (cardId: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) onDelete(cardId);
    }

    return (
        <>
            { cardId || id ? (
                <>
                    {editorVersion ? (
                        <>
                            <div className={'ml-4'}>
                                <a href='#' onClick={ () => beforeDelete(cardId || id)} className=' btn btn-error text-white btn'>Delete</a>
                            </div>
                            <Link target='_blank' to={`/cards/${cardId || id}`} className='btn btn-primary text-white ml-2 text-sm'>View</Link>
                        </>
                    ) : (
                        <>
                            <div className={'mt-4'}>
                                <Link to={`/editor/${cardId || id}`} className='btn-block btn-sm btn btn-primary text-white mr-6 text-sm'>Edit</Link>
                                <a href='#' onClick={ () => beforeDelete(cardId || id)} className='btn btn-error btn-sm text-white btn-block mt-2'>Delete</a>

                            </div>
                        </>
                    )}
                </>
            ) : ''}
        </>
    );
}
