import * as React from "react";
import "../index.css";
import {Confetti} from "../components/Confetti";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GiftCard} from "../components/cards/GiftCard";
import {database} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {CardDataResponse} from "../interfaces/CardDataResponse";
import {CardData} from "../interfaces/CardData";

interface Props{
}

export const ShowCard = (props: Props): React.ReactElement => {
    const { paramId } = useParams<string>();
    const [card, setCard] = useState<CardData>({
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
        uid: null,
    })

    const setId = (id: string): void => {
        setCard((prev:CardData) => ({ ...prev, id }));
    };

    useEffect(() => {
        const fetchDocument = async () => {
            if (!paramId) {
                console.error("Document ID is undefined");
                return;
            }

            setId(paramId);

            try {
                const docRef: any = doc(database, "cards", paramId);
                const response = await getDoc(docRef);

                if (response.exists()) {
                    const data: CardDataResponse = response.data() as CardDataResponse;
                    setCard(data);
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: " + paramId);
            }
        };

        fetchDocument();
    },[])

    return (
        <>
            <Confetti />
            <div className="flex justify-center items-center h-screen w-screen">
                { card ? (
                    <GiftCard passedCard={card} onDelete={ (id: string)=> {}} />
                ) : ''}

            </div>
        </>
    );
}
