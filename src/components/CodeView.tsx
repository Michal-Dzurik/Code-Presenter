import * as React from "react";
import "../index.css";

interface Props {
    code: string;
}

export const CodeView = (props: Props): React.ReactElement => {
    const {code} = props;

    const onClick = (event: any) => {
        let text = event.target.innerText;
        navigator.clipboard.writeText(text);

        event.target.innerText = "Coppied!";

        setTimeout(() => {
            event.target.innerText = text;
        },500)
    }

    return (
        <div onClick={onClick}
             className="text-center mt-4 mb-8 cursor-pointer bg-gray-200 text-gray-800 p-2 rounded-md mt-2 font-mono text-lg tracking-widest transition-colors duration-200 hover:bg-gray-300">
            {code || '123-456-789'}

        </div>
    );
}
