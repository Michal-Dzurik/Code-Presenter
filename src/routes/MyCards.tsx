import * as React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CardData } from '../interfaces/CardData';
import { Card } from '../components/Card';
import { database } from '../firebase-config';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    query,
    where,
} from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';

interface Props {}

export const MyCards = (props: Props): React.ReactElement => {
    const navigate = useNavigate();

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [cardsFetched, setCardsFetched] = useState<boolean>(false);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchDocument = async () => {
            if (!isLoggedIn()) navigate('/login');
            try {
                const cards = query(
                    collection(database, 'cards'),
                    where('uid', '==', user?.uid),
                    limit(20)
                );
                const response = await getDocs(cards);
                const cardsList: CardData[] = response.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            heading: doc.data().heading || null,
                            applicableAt: doc.data().applicableAt,
                            code: doc.data().code,
                            uid: doc.data().uid || null,
                            type: doc.data().type,
                        }) as CardData
                );

                setCardsData(cardsList);
                setCardsFetched(true);
            } catch (error) {
                console.error('Error fetching document: ' + error);
                setCardsFetched(true);
            }
        };

        fetchDocument();
    }, []);

    const deleteCard = useCallback(
        async (id: string) => {
            try {
                const docRef = doc(database, 'cards', id);
                await deleteDoc(docRef);

                setCardsData(cardsData.filter((d) => d.id !== id));
                navigate('/my-codes');
            } catch (error) {
                console.error('Error deleting card: ' + id);
            }
        },
        [cardsData, database, cardsData]
    );

    return (
        <div className="flex justify-center items-center m-auto h-screen max-w-[600px] flex-col">
            <div className=" w-full flex justify-center items-center flex-row flex-wrap">
                <div className="w-full my-6">
                    <h3 className="text-center text-2xl text-white">
                        My codes
                    </h3>
                </div>
                {cardsFetched && cardsData.length !== 0 ? (
                    cardsData.map((card: CardData, index: number) => (
                        <div className="mb-4 mx-2" key={card.id}>
                            <Card
                                card={card}
                                handleDelete={deleteCard}
                                controlsOff={true}
                                smallVersion={true}
                            />
                        </div>
                    ))
                ) : cardsFetched ? (
                    <p>Nothing :\</p>
                ) : (
                    <span className="loading loading-spinner loading-lg"></span>
                )}
            </div>
        </div>
    );
};
