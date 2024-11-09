import * as React from 'react';
import '../index.css';
import { GiftCard } from '../components/cards/GiftCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { startCase } from 'lodash';
import { CardEditor } from '../components/CardEditor';
import { database } from '../firebase-config';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { CardControls } from '../components/CardControls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCard, setId, setType } from '../components/redux/features/card';
import { CardData } from '../interfaces/CardData';

export const Editor = (): React.ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { paramId } = useParams<string>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const { user, isLoggedIn, ready } = useAuth();

    const card = useSelector((state: RootState) => state.card.card);
    const id = useSelector((state: RootState) => state.card.id);

    useEffect(() => {
        const fetchDocument = async () => {
            if (ready) {
                if (paramId) {
                    dispatch(setId(paramId));
                    setEditMode(true);
                } else if (id !== '') {
                    setEditMode(true);
                    dispatch(setId(id));
                }

                if (editMode) {
                    try {
                        const docRef: any = doc(database, 'cards', id);
                        const response = await getDoc(docRef);

                        if (response.exists()) {
                            const data: CardData = response.data() as CardData;

                            if (isLoggedIn() && data.uid === user?.uid) {
                                dispatch(setCard(data));
                            } else navigate('/404');
                        } else {
                            console.error('No such document!');
                            navigate('/404');
                        }
                    } catch (error) {
                        console.error('Error fetching document: ' + id);
                        navigate('/404');
                    }
                }
            }
        };

        fetchDocument();
    }, [ready, editMode]);

    const deleteCard = async (id: string) => {
        try {
            const docRef = doc(database, 'cards', id);
            await deleteDoc(docRef);

            dispatch(setId(''));
            dispatch(
                setCard({
                    heading: '',
                    code: '',
                    applicableAt: '',
                    type: 0,
                    uid: null,
                })
            );
        } catch (error) {
            console.error('Error deleting card: ' + id);
        }
    };

    const cardTypes = {
        1: (
            <GiftCard
                card={{ ...card, id }}
                onDelete={(id: string) => deleteCard(id)}
            />
        ),
    };

    const optionTitle = (str: string) => startCase(str);

    const saveCard = async () => {
        if (!editMode) {
            const documentReference = await addDoc(
                collection(database, 'cards'),
                {
                    ...card,
                    uid: user?.uid,
                }
            );
            dispatch(setId(documentReference.id));
            setEditMode(true);

            return;
        }

        await setDoc(
            doc(database, 'cards', id || ''),
            { ...card, uid: user?.uid },
            {
                merge: true,
            }
        );

        dispatch(setId(id || ''));
    };

    const wasCardTypeChosen = () => {
        return card.type !== 0;
    };

    return (
        <>
            {ready ? (
                <div className="flex justify-center items-center h-screen w-screen flex-col">
                    <div className="flex justify-center items-center content-center flex-row mb-8">
                        <select
                            value={card.type}
                            className="select select-bordered w-full max-w-xs"
                            onChange={(
                                event: ChangeEvent<HTMLSelectElement>
                            ) => {
                                dispatch(
                                    setType(parseInt(event.target.value, 10))
                                );
                            }}
                        >
                            <option value="0" disabled>
                                What type of code are you sharing
                            </option>
                            {Object.entries(cardTypes).map(
                                ([key, Component]) => (
                                    <option key={key} value={key}>
                                        {optionTitle(Component.type.name)}
                                    </option>
                                )
                            )}
                        </select>
                        {editMode ? (
                            <CardControls
                                onDelete={(id: string) => deleteCard(id)}
                                editorVersion={true}
                                cardId={id}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex justify-center items-center flex-row">
                        {wasCardTypeChosen() ? (
                            <>
                                <GiftCard
                                    card={{ ...card, id }}
                                    onDelete={(id: string) => deleteCard(id)}
                                />
                                <CardEditor saveCard={saveCard} />
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};
