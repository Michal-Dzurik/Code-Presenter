import * as React from 'react';
import '../../index.css';
import { CardData } from '../../interfaces/CardData';
import { CodeView } from '../CodeView';
import { CardControls } from '../CardControls';

interface Props {
    controlsOff?: boolean;
    smallVersion?: boolean;
    useControls: boolean;
    handleDelete: (id: string) => void;
    card: CardData;
}

export const HangingDiscountCard = (props: Props): React.ReactElement => {
    const { smallVersion, controlsOff, handleDelete, card, useControls } =
        props;

    return (
        <>
            {smallVersion ? (
                <div className="flex items-center justify-center flex-col w-44 h-[250px]">
                    <div className="relative w-44 h-[250px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                        <div className="w-2 h-2 bg-base-100 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div className="w-9 h-2 bg-base-100 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <div className="flex-grow flex items-center justify-center flex-col mb-4 w-3/4">
                            <h3 className="text-black text-center mt-4 ">
                                {card.heading || 'Love you 🩷'}
                            </h3>
                        </div>

                        <p className="mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
                            {!controlsOff ? (
                                <CardControls
                                    handleDelete={handleDelete}
                                    cardId={card.id}
                                    editorVersion={!smallVersion}
                                ></CardControls>
                            ) : (
                                ''
                            )}
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative w-72 h-[500px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                        <div className="w-3 h-3 bg-base-100 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div className="w-12 h-4 bg-base-100 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <p className="mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
                            Applicable on {card.applicableAt || 'Steam'}
                        </p>

                        <div className="flex-grow flex items-center justify-center flex-col mt-8 w-3/4">
                            <h2 className="text-black text-center text-6xl font-bold">
                                {card.discount || '-10%'}
                            </h2>
                            <h3 className="text-black text-center mt-4 ">
                                {card.heading || 'Love you 🩷'}
                            </h3>
                        </div>

                        <CodeView
                            code={card.code}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        />
                    </div>
                    {useControls ? (
                        <CardControls
                            editorVersion={true}
                            handleDelete={handleDelete}
                            cardId={card.id}
                        />
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
};
