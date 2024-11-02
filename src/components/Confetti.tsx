import * as React from "react";
import "../index.css";

export const Confetti = (): React.ReactElement => {
    return (
        <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
                <div key={i} className={`confetti confetti-${i % 4}`}/>
            ))}
        </div>
    );
}
