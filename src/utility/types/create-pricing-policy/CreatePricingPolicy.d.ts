import { OptionType } from "../multi-select-dropdown/MultiSelectDropdown";
export interface ClassFareSectionProps {
    selectedClasses: OptionType[];
    allClasses: OptionType[];
    setSelectedClasses: (classes: OptionType[]) => void;
    fareType: string;
    setFareType: (fareType: string) => void;
}

export interface JourneySectorSectionProps {
    selectedJourneyTypes: OptionType[];
    allJourneyTypes: OptionType[];
    setSelectedJourneyTypes: (values: OptionType[]) => void;
    allSections: OptionType[];
    selectedSections: OptionType[];
    setSelectedSections: (values: OptionType[]) => void;
}
