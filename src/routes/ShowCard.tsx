import * as React from 'react';
import '../index.css';
import { Confetti } from '../components/Confetti';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiftCard } from '../components/cards/GiftCard';
import { database } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { CardData } from '../interfaces/CardData';

interface Props {}

export const ShowCard = (props: Props): React.ReactElement => {
    const { paramId } = useParams<string>();
    const navigate = useNavigate();
    const [card, setCard] = useState<CardData>({
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
        uid: null,
    });

    const setId = (id: string): void => {
        setCard((prev: CardData) => ({ ...prev, id }));
    };

    useEffect(() => {
        const fetchDocument = async () => {
            if (!paramId) {
                navigate('404');
                return;
            }

            setId(paramId);

            try {
                const docRef: any = doc(database, 'cards', paramId);
                const response = await getDoc(docRef);

                if (response.exists()) {
                    setCard(response.data() as CardData);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document: ' + paramId);
            }
        };

        fetchDocument();
    }, []);

    return (
        <>
            <Confetti />
            <div className="flex justify-center items-center h-screen w-screen">
                {card ? (
                    <GiftCard card={card} onDelete={(id: string) => {}} />
                ) : (
                    ''
                )}
            </div>
        </>
    );
};
