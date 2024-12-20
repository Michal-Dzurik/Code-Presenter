import * as React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

interface Props {
    cardId?: string;
    editorVersion?: boolean;
    handleDelete: (id: string) => void;
}

export const CardControls = (props: Props): React.ReactElement => {
    const { editorVersion, handleDelete, cardId } = props;

    const beforeDelete = (cardId: string) => {
        if (window.confirm('Are you sure you want to delete this card?'))
            handleDelete(cardId);
    };

    return (
        <>
            {cardId ? (
                <>
                    {editorVersion ? (
                        <>
                            <div className={'ml-4'}>
                                <a
                                    href="#"
                                    onClick={() => beforeDelete(cardId)}
                                    className="card-delete-button btn btn-error text-white btn"
                                >
                                    Delete
                                </a>
                            </div>
                            <Link
                                target="_blank"
                                to={`/cards/${cardId}`}
                                className="card-view-button btn btn-primary text-white ml-2 text-sm"
                            >
                                View
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className={'mt-4'}>
                                <Link
                                    to={`/editor/${cardId}`}
                                    className="card-edit-button btn-block btn-sm btn btn-primary text-white mr-6 text-sm"
                                >
                                    Edit
                                </Link>
                                <a
                                    href="#"
                                    onClick={() => beforeDelete(cardId)}
                                    className="card-delete-button btn btn-error btn-sm text-white btn-block mt-2"
                                >
                                    Delete
                                </a>
                            </div>
                        </>
                    )}
                </>
            ) : (
                ''
            )}
        </>
    );
};
