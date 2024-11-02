import * as React from "react";
import "../index.css";
import { GiftCard } from "../components/cards/GiftCard";
import {ChangeEvent, useEffect, useState} from "react";
import {startCase} from "lodash";
import { CardData } from "../interfaces/CardData";
import { CardEditorData } from "../interfaces/CardEditorData";
import { CardEditor } from "../components/CardEditor";
import {auth, database} from "../firebase-config";
import {addDoc, collection, doc, getDoc, setDoc} from "firebase/firestore";
import {CardDataResponse} from "../interfaces/CardDataResponse";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider";

export const Editor = (): React.ReactElement => {
    const { id } = useParams<string>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const {user, isLoggedIn, ready} = useAuth();
    const navigate = useNavigate();

    const [cardHref, setCardHref] = useState<string|null>(null)
    const [cardData, setCardData] = useState<CardData>({
        heading: '',
        code: '',
        applicableAt: '',
        type: 0,
    });

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

            if (ready){
                try {
                    const docRef: any = doc(database, "cards", id);
                    const response = await getDoc(docRef);

                    if (response.exists()) {
                        const data: CardDataResponse = response.data() as CardDataResponse;

                        if (isLoggedIn() && data.uid === user?.uid) {
                            setCardData(data.data);
                            setLoaded(true);
                            return;
                        }
                        else navigate('/404')

                    } else {
                        console.error("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document: " + id);
                }
            }

        };

        fetchDocument();
    },[ready])

    const cardTypes = {
        1: <GiftCard cardData={cardData} cardEditorData={cardEditorData} />,
    };

    const optionTitle = (str: string) => startCase(str);

    const saveCard = async () => {
        if (!id){
            const documentReference = await addDoc(collection(database, 'cards'),{
                data: cardData,
                uid: auth.currentUser?.uid
            })
            setCardHref(documentReference.id);
            return;
        }
        await setDoc(doc(database, "cards", id), {
            data: cardData
        }, {
            merge: true
        });

        setCardHref(id);

    };

    return (
        <>
            { !id || loaded ? (
                <div className="flex justify-center items-center h-screen w-screen flex-col">
                    { !cardHref ? (
                        <select
                            value={cardData.type}
                            className="select select-bordered w-full max-w-xs mb-8"
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
                    ) : ''}
                    <div className="flex justify-center items-center flex-row">
                        <GiftCard cardEditorData={cardEditorData} cardData={cardData}/>
                        {cardData.type !== 0 && !cardHref ? (
                            <>
                                <CardEditor saveCard={saveCard} cardEditorData={cardEditorData} cardData={cardData}/>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                    {cardHref ? (
                        <div className='mt-4'>
                            <Link to={`/cards/${cardHref}`} className="link link-primary mr-6">View</Link>
                            <Link to={`/editor/${cardHref}`} className="btn btn-primary btn-sm">Edit</Link>
                        </div>
                    ) : ''}
                </div>
            ) : ''}

        </>
    );
};
