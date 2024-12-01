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

export const DiscountCard = (props: Props): React.ReactElement => {
    const { smallVersion, controlsOff, handleDelete, card, useControls } =
        props;

    return (
        <>
            {smallVersion ? (
                <div className="flex items-center justify-center flex-col w-44 h-[250px] bg-[#33673b] rounded-md relative">
                    <div className="w-8 h-8 bg-base-100 rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"></div>
                    <div className="w-8 h-8 bg-base-100 rounded-full absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex-grow flex items-center justify-center flex-col w-3/4">
                        <h3 className="card-heading text-[#ddd] text-center text-lg ">
                            {card.heading || 'Love you'}
                        </h3>
                    </div>
                    <div className="mb-4">
                        {!controlsOff ? (
                            <CardControls
                                handleDelete={handleDelete}
                                cardId={card.id}
                                editorVersion={!smallVersion}
                            ></CardControls>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative w-72 h-[400px] bg-[#33673b] rounded-xl shadow-lg flex flex-col items-center content-start p-4">
                        <div className="w-8 h-8 bg-base-100 rounded-full absolute top-2/3 left-0 transform -translate-y-1/2 -translate-x-1/2"></div>
                        <div className="w-8 h-8 bg-base-100 rounded-full absolute top-2/3 right-0 transform -translate-y-1/2 translate-x-1/2"></div>

                        <div className="w-3/4 h-0 absolute top-2/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border border-dashed border-1 border-[#c58e4c] mr-1/8 ml-1/8"></div>

                        <p className="mt-2 text-xs text-[#ddd] text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4">
                            Applicable on{' '}
                            <span className="card-applicable-at">
                                {card.applicableAt || 'Steam'}
                            </span>
                        </p>

                        <div className="flex-grow flex items-center justify-center flex-col w-3/4">
                            <h2 className="card-discount text-[#c58e4c] text-center text-6xl font-bold">
                                {card.discount || '-10%'}
                            </h2>
                            <h3 className="card-heading text-[#ddd] text-center text-lg">
                                {card.heading || 'Love you'}
                            </h3>
                        </div>

                        <CodeView
                            code={card.code}
                            className="card-code bg-[#c58e4c] text-[#ddd] hover:bg-[#ac7431]"
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
