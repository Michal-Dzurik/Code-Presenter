import {CardData} from "./CardData";

export interface CardEditorData {
    setApplicableAt: (applicableAt: string) => void,
    setHeading: (heading: string) => void,
    setCode: (code: string) => void,
}
