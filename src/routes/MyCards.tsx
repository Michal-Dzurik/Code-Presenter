import * as React from "react";
import "../index.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CardData} from "../interfaces/CardData";
import {GiftCard} from "../components/cards/GiftCard";
import {database} from "../firebase-config";
import {collection, deleteDoc, doc, getDocs, limit, query, where} from "firebase/firestore";
import {useAuth} from "../providers/AuthProvider";

interface Props{
}

export const MyCards = (props: Props): React.ReactElement => {
    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const {user, isLoggedIn, ready} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocument = async () => {
            if (!isLoggedIn()) navigate('/login');
            try {
                const cards = query(
                    collection(database,"cards"),
                    where('uid','==',user?.uid),
                    limit(20)
                )
                const response = await getDocs(cards);
                const cardsList: CardData[] = response.docs.map(doc => ({
                    id: doc.id,
                    heading: doc.data().heading || null,
                    applicableAt: doc.data().applicableAt,
                    code: doc.data().code,
                    uid: doc.data().uid || null,
                    type: doc.data().type,
                } as CardData));


                setCardsData(cardsList);
            } catch (error) {
                console.error("Error fetching document: " + error);
            }
        };

        if (ready) fetchDocument();
    },[ready])

    const deleteCard = async (id: string) => {
        try {
            const docRef = doc(database, 'cards', id);
            await deleteDoc(docRef);
            navigate('/my-codes');
        }catch(error) {
            console.error("Error deleting card: " + id);
        }
    }

    return (
        <div className="flex justify-center items-center m-auto h-screen max-w-[600px] flex-col">
            <div className=' w-full flex justify-center items-center flex-row flex-wrap'>
                <div className='w-full my-6'>
                    <h3 className='text-center text-2xl text-white'>My codes</h3>
                </div>
                { cardsData.map(card => (
                    <div className='mb-4 mx-2'>
                        <GiftCard onDelete={deleteCard} off={true} smallVersion={true} cardData={card} key={card.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
