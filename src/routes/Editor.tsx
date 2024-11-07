import * as React from "react";
import "../index.css";
import { GiftCard } from "../components/cards/GiftCard";
import {ChangeEvent, useEffect, useState} from "react";
import {startCase} from "lodash";
import { CardData } from "../interfaces/CardData";
import { CardEditorData } from "../interfaces/CardEditorData";
import { CardEditor } from "../components/CardEditor";
import { database} from "../firebase-config";
import {addDoc, collection, deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {CardDataResponse} from "../interfaces/CardDataResponse";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";
import {CardControls} from "../components/CardControls";

export const Editor = (): React.ReactElement => {
    const { id } = useParams<string>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const {user, isLoggedIn, ready} = useAuth();
    const navigate = useNavigate();

    const cardDataDefault: CardData = {
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
        uid: null,
    };

    const [syncId, setSyncId] = useState<string|null>(null)
    const [cardData, setCardData] = useState<CardData>(cardDataDefault);

    const setHeading = (heading: string): void => {
        setCardData((prev) => ({ ...prev, heading }));
    };

    const setApplicableAt = (applicableAt: string): void => {
        setCardData((prev) => ({ ...prev, applicableAt }));
    };

    const setCode = (code: string): void => {
        setCardData((prev) => ({ ...prev, code }));
    };

    const setType = (type: number): void => {
        setCardData((prev) => ({ ...prev, type }));
    };
    const setId = (id?: string): void => {
        setCardData((prev) => ({ ...prev, id: id }));
    };

    const [cardEditorData] = useState<CardEditorData>({
        setHeading: setHeading,
        setCode: setCode,
        setApplicableAt: setApplicableAt,
    });

    useEffect(() => {
        const fetchDocument = async () => {
            if (!id) {
                setLoaded(true);
                return;
            }

            setSyncId(id)
            setId(id)

            if (ready && cardData.id){
                try {
                    const docRef: any = doc(database, "cards", cardData.id || '');
                    const response = await getDoc(docRef);

                    if (response.exists()) {
                        const data: CardDataResponse = response.data() as CardDataResponse;

                        if (isLoggedIn() && data.uid === user?.uid) {
                            setCardData(data);
                            setLoaded(true);
                            return;
                        }
                        else navigate('/404');

                    } else {
                        console.error("No such document!");
                        navigate('/404')
                    }
                } catch (error) {
                    console.error("Error fetching document: " + cardData.id || '');
                    navigate('/404')
                }

            }

        };

        fetchDocument();
    },[ready, cardData.id])

    const deleteCard = async (id: string) => {
        try {
            const docRef = doc(database, 'cards', id);
            await deleteDoc(docRef);

            setSyncId(null)
            setId(undefined)
            setCardData(cardDataDefault)
        }catch(error) {
            console.error("Error deleting card: " + id);
        }
    }

    const cardTypes = {
        1: <GiftCard onDelete={(id: string) => deleteCard(id)} cardData={cardData} cardEditorData={cardEditorData} />,
    };


    const optionTitle = (str: string) => startCase(str);

    const saveCard = async () => {
        if (!id && !cardData.id){
            const documentReference = await addDoc(collection(database, 'cards'),{ ...cardData, uid: user?.uid })
            setSyncId(documentReference.id);
            setId(documentReference.id);
            return;
        }
        await setDoc(doc(database, "cards", cardData.id || ''), { ...cardData, uid: user?.uid }, {
            merge: true
        });

        setId(cardData.id || undefined)
        setSyncId(cardData.id || '' );
    };

    return (
        <>
            { !cardData.id || loaded ? (
                <div className="flex justify-center items-center h-screen w-screen flex-col">
                    <div className='flex justify-center items-center content-center flex-row mb-8'>
                        <select
                            value={cardData.type}
                            className="select select-bordered w-full max-w-xs"
                            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                                setType(parseInt(event.target.value, 10))
                            }
                        >
                            <option value="0" disabled>
                                What type of code are you sharing
                            </option>
                            {Object.entries(cardTypes).map(([key, Component]) => (
                                <option key={key} value={key}>
                                    {optionTitle(Component.type.name)}
                                </option>
                            ))}
                        </select>
                        {syncId ? (
                            <CardControls onDelete={(id: string) => deleteCard(id)} editorVersion={true} cardId={syncId}/>
                        ) : ''}
                    </div>
                    <div className="flex justify-center items-center flex-row">
                        { cardData.type !== 0 ? (
                            <GiftCard onDelete={(id: string) => deleteCard(id)} cardData={cardData} cardEditorData={cardEditorData} />
                        ) : '' }

                        {cardData.type !== 0 ? (
                            <>
                                <CardEditor saveCard={saveCard} cardEditorData={cardEditorData} cardData={cardData}/>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : ''}

        </>
    );
};
