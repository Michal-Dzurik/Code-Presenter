import * as React from 'react';
import '../index.css';
import { Card } from '../components/Card';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
import { setCard, setType } from '../components/redux/features/card';
import { CardData } from '../interfaces/CardData';
import { cardTypeMap } from '../constants/CardTypes';

export const Editor = (): React.ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { paramId } = useParams<string>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const { user, isLoggedIn, ready } = useAuth();

    const card = useSelector((state: RootState) => state.card.card);
    const [id, setId] = useState<string>(paramId || '');

    const fetchDocument = async () => {
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
    };

    useEffect(() => {
        if (ready) {
            if (id === '') {
                setEditMode(false);
                dispatch(
                    setCard({
                        heading: '',
                        code: '',
                        applicableAt: '',
                        type: 0,
                        uid: null,
                    })
                );
            } else {
                setEditMode(true);
            }

            if (editMode && paramId) {
                fetchDocument();
            }
        }
    }, [ready, editMode, id]);

    const deleteCard = useCallback(async (id: string) => {
        try {
            const docRef = doc(database, 'cards', id);
            await deleteDoc(docRef);

            setId('');
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
    }, []);

    const saveCard = async () => {
        if (!editMode) {
            const documentReference = await addDoc(
                collection(database, 'cards'),
                {
                    ...card,
                    uid: user?.uid,
                }
            );
            setId(documentReference.id);
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

        setId(id || '');
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
                            {Array.from(cardTypeMap.entries()).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                        {editMode ? (
                            <CardControls
                                onDelete={deleteCard}
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
                                <Card
                                    card={{ ...card, id }}
                                    onDelete={deleteCard}
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
