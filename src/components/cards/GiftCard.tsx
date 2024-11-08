import * as React from "react";
import "../../index.css";
import {CodeView} from "../CodeView";
import {CardControls} from "../CardControls";
import {useAuth} from "../../providers/AuthProvider";

import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {CardData} from "../../interfaces/CardData";

interface Props{
    off?: boolean
    smallVersion?: boolean,
    onDelete: (id: string) => void,
    passedCard?: CardData,
}

export const GiftCard = (props :Props): React.ReactElement => {
    const card = useSelector((state: RootState) => state.card.card)
    const id = useSelector((state: RootState) => state.card.id)

    const {smallVersion, off, onDelete, passedCard} = props;
    const { isLoggedIn, ready} = useAuth();

    return (
        <>
            { smallVersion ? (
                <div className='flex items-center justify-center flex-col w-44 h-[250px]'>
                    <div
                        className="relative w-44 h-[250px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                        <div
                            className="w-2 h-2 bg-gray-800 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div
                            className="w-9 h-2 bg-gray-800 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <div className="flex-grow flex items-center justify-center flex-col mb-4 w-3/4">
                            <h3 className='text-black text-center mt-4 '>{passedCard ? passedCard.heading : card.heading || 'Love you 🩷'}</h3>
                        </div>

                        <p className='mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4'>
                            {ready && isLoggedIn() && (passedCard ? passedCard.id : id ) ? (
                                <CardControls onDelete={onDelete} cardId={passedCard ? passedCard.id : id} editorVersion={!smallVersion}></CardControls>
                            ) : ''}
                        </p>

                    </div>


                </div>

            ) : (
                <>
                    <div
                        className="relative w-72 h-[500px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                    <div
                            className="w-3 h-3 bg-gray-800 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div
                            className="w-12 h-4 bg-gray-800 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <p className='mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4'>Applicable
                            on {passedCard ? passedCard.applicableAt : card.applicableAt || 'Steam'}</p>

                        <div className="flex-grow flex items-center justify-center flex-col mt-8 w-3/4">
                            <p className='text-9xl'> 🎁</p>
                            <h3 className='text-black text-center mt-4 '>{passedCard ? passedCard.heading :card.heading || 'Love you 🩷'}</h3>
                        </div>

                        <CodeView code={passedCard ? passedCard.code : card.code}/>
                    </div>
                    { off && ready && isLoggedIn() && (passedCard ? passedCard.id : id) ? (
                        <CardControls editorVersion={true} onDelete={onDelete} cardId={passedCard ? passedCard.id : id}/>
                    ) : '' }

                </>
            )}
        </>


    );
}
