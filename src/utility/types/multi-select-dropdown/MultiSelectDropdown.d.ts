export interface OptionType {
    id: string;
    name: string;
}

export interface MultiSelectDropdownProps {
    label: string;
    options: OptionType[];
    selectedValues: OptionType[];
    onChange: (selectedValues: OptionType[]) => void;
    placeholder?: string;
    width?: string | number;
}
