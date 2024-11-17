import * as React from 'react';
import '../index.css';
import { useAuth } from '../providers/AuthProvider';
import { CardData } from '../interfaces/CardData';
import { CardType } from '../constants/CardTypes';
import { HangingDiscountCard } from './cards/HangingDiscountCard';
import { DiscountCard } from './cards/DiscountCard';

interface Props {
    controlsOff?: boolean;
    smallVersion?: boolean;
    handleDelete: (id: string) => void;
    card: CardData;
}

export const Card = (props: Props): React.ReactElement => {
    const { smallVersion, controlsOff, handleDelete, card } = props;
    const { isLoggedIn } = useAuth();

    const hasControls = (): boolean => {
        return (isLoggedIn() && card.id && controlsOff) as boolean;
    };

    const renderCardType = () => {
        switch (card.type) {
            case CardType.HangingDiscount:
                return (
                    <HangingDiscountCard
                        smallVersion={smallVersion}
                        useControls={hasControls()}
                        handleDelete={handleDelete}
                        card={card}
                    />
                );
            case CardType.Discount:
                return (
                    <DiscountCard
                        smallVersion={smallVersion}
                        useControls={hasControls()}
                        handleDelete={handleDelete}
                        card={card}
                    />
                );
        }
    };

    return <>{renderCardType()}</>;
};
