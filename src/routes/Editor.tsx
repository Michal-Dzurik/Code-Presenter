import * as React from 'react';
import '../index.css';
import { Card } from '../components/Card';
import { useCallback, useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { CardControls } from '../components/CardControls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCard, setType } from '../redux/features/card';
import { CardData } from '../interfaces/CardData';
import { cardTypeMap } from '../constants/CardTypes';
import { Select } from '../components/form/Select';
import { AuthOnly } from '../components/protection/AuthOnly';

export const Editor = (): React.ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { paramId } = useParams<string>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const { user } = useAuth();

    const card = useSelector((state: RootState) => state.card.card);
    const [id, setId] = useState<string>(paramId || '');

    const fetchDocument = async () => {
        try {
            const docRef: any = doc(database, 'cards', id);
            const response = await getDoc(docRef);

            if (response.exists()) {
                const data: CardData = response.data() as CardData;

                if (data.uid === user?.uid) {
                    dispatch(setCard(data));
                } else navigate('/404');
            } else {
                navigate('/404');
            }
        } catch (error) {
            navigate('/404');
        }
    };

    useEffect(() => {
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
    }, [editMode, id]);

    useEffect(() => {
        if (location.pathname === '/editor/') {
            setId('');
            setEditMode(false);
        }
    }, [location]);

    const deleteCard = useCallback(
        async (id: string) => {
            try {
                const docRef = doc(database, 'cards', id);
                await deleteDoc(docRef);

                setId('');
                setEditMode(false);
            } catch (error) {}
        },
        [database, id]
    );

    const saveCard = useCallback(async () => {
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
    }, [editMode, database, card, user, id]);

    const wasCardTypeChosen = () => {
        return card.type !== 0;
    };

    const handleSelectChange = (val: string) => {
        dispatch(setType(parseInt(val, 10)));
    };

    return (
        <AuthOnly>
            <div className="flex justify-center items-center h-screen w-screen flex-col">
                <div className="flex justify-center items-center content-center flex-row mb-8">
                    <Select
                        id='card-type-select'
                        value={card.type}
                        options={cardTypeMap}
                        handleChange={handleSelectChange}
                        defaultOptionText={'What type of code are you sharing?'}
                        isDefaultDisabled={true}
                    />

                    {editMode ? (
                        <CardControls
                            handleDelete={deleteCard}
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
                                handleDelete={deleteCard}
                            />
                            <CardEditor saveCard={saveCard} />
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </AuthOnly>
    );
};
