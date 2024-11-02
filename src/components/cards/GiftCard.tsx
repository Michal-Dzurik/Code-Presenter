import * as React from "react";
import "../../index.css";
import {CardEditorData} from "../../interfaces/CardEditorData";
import {CardData} from "../../interfaces/CardData";
import {CodeView} from "../CodeView";

interface Props{
    cardEditorData?: CardEditorData,
    cardData: CardData
}

export const GiftCard = (props :Props): React.ReactElement => {
    const {heading, code, applicableAt} = props.cardData;

    return (
        <>
            <div className="relative w-72 h-[500px] bg-white rounded-xl shadow-lg flex flex-col items-center p-4">
                <div
                    className="w-3 h-3 bg-gray-800 rounded-full absolute top-3 left-1/2 transform -translate-x-1/2"></div>
                <div
                    className="w-12 h-4 bg-gray-800 rounded-lg absolute top-4 left-1/2 transform -translate-x-1/2"></div>

                <p className='mt-2 text-xs text-slate-500 text-center absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4'>Applicable
                    on { applicableAt || 'Steam'}</p>

                <div className="flex-grow flex items-center justify-center flex-col mt-8 w-3/4">
                    <p className='text-9xl'> 🎁</p>
                    <h3 className='text-black text-center mt-4 '>{ heading || 'Love you 🩷'}</h3>
                </div>

                <CodeView code={code} />
            </div>


        </>


    );
}
