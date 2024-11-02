import * as React from "react";
import "../index.css";
import {Confetti} from "../components/Confetti";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CardData} from "../interfaces/CardData";
import {GiftCard} from "../components/cards/GiftCard";
import {CardEditorData} from "../interfaces/CardEditorData";
import {database} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {CardDataResponse} from "../interfaces/CardDataResponse";

interface Props{
}

export const ShowCard = (props: Props): React.ReactElement => {
    const { id } = useParams<string>();
    const [cardData, setCardData] = useState<CardData>({
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
    });


    const [cardEditorData] = useState<CardEditorData>({
        setHeading: () => {},
        setCode: () => {},
        setApplicableAt: () => {},
    });

    useEffect(() => {
        const fetchDocument = async () => {
            if (!id) {
                console.error("Document ID is undefined");
                return;
            }

            try {
                const docRef: any = doc(database, "cards", id);
                const response = await getDoc(docRef);

                if (response.exists()) {
                    const data: CardDataResponse = response.data() as CardDataResponse;
                    setCardData(data.data);
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: " + id);
            }
        };

        fetchDocument();
    },[])

    return (
        <>
            <Confetti />
            <div className="flex justify-center items-center h-screen w-screen">
                { cardData.type !== 0 ? (
                    <GiftCard cardData={cardData} cardEditorData={cardEditorData} />
                ) : ''}

            </div>
        </>
    );
}
