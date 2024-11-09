import * as React from 'react';
import '../../index.css';
import { CodeView } from '../CodeView';
import { CardControls } from '../CardControls';
import { useAuth } from '../../providers/AuthProvider';
import { CardData } from '../../interfaces/CardData';

interface Props {
    controlsOff?: boolean;
    smallVersion?: boolean;
    onDelete: (id: string) => void;
    card: CardData;
}

export const GiftCard = (props: Props): React.ReactElement => {
    const { smallVersion, controlsOff, onDelete, card } = props;
    const { isLoggedIn, ready } = useAuth();

    const canCardUseControls = () => {
        return ready && isLoggedIn() && card.id && controlsOff;
    };

    return (
        <>
            {smallVersion ? (
                <div className="flex items-center justify-center flex-col w-44 h-[250px]">
                    <div className="relative w-44 h-[250px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                        <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div className="w-9 h-2 bg-gray-800 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <div className="flex-grow flex items-center justify-center flex-col mb-4 w-3/4">
                            <h3 className="text-black text-center mt-4 ">
                                {card.heading || 'Love you 🩷'}
                            </h3>
                        </div>

                        <p className="mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
                            {canCardUseControls() ? (
                                <CardControls
                                    onDelete={onDelete}
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
                        <div className="w-3 h-3 bg-gray-800 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                        <div className="w-12 h-4 bg-gray-800 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                        <p className="mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
                            Applicable on {card.applicableAt || 'Steam'}
                        </p>

                        <div className="flex-grow flex items-center justify-center flex-col mt-8 w-3/4">
                            <p className="text-9xl"> 🎁</p>
                            <h3 className="text-black text-center mt-4 ">
                                {card.heading || 'Love you 🩷'}
                            </h3>
                        </div>

                        <CodeView code={card.code} />
                    </div>
                    {canCardUseControls() ? (
                        <CardControls
                            editorVersion={true}
                            onDelete={onDelete}
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
