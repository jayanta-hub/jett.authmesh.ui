import { OptionType } from '../types/multi-select-dropdown/MultiSelectDropdown';
import { Policy } from '../types/policy-listing/PolicyListing';

export const mockPolicyData: Policy[] = [
    {
        id: '123',
        policyName: 'OW Def PP',
        dateOfCreation: '2024-03-24',
        createdBy: 'Tom John',
        updatedBy: 'Tom John',
        journeyType: 'One-Way',
        sector: 'Domestic',
        supplier: 'All',
        airline: '60 Selections',
        class: 'All',
        fareType: 'All',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['Domestic'],
        airlineSelections: [
            'Air India', 'IndiGo', 'SpiceJet', 'Emirates',
            'Qatar Airways', 'Etihad Airways', 'Singapore Airlines',
            'Thai Airways', 'Malaysia Airlines', 'Air Asia'
        ]
    },
    {
        id: '124',
        policyName: 'OW Int PP 2',
        dateOfCreation: '2024-03-24',
        createdBy: 'Tom John',
        updatedBy: '-',
        journeyType: 'One-Way',
        sector: 'International',
        supplier: 'All',
        airline: '7 Selections',
        class: 'All',
        fareType: 'All',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: ['Emirates', 'Qatar Airways', 'Etihad Airways', 'Singapore Airlines', 'Thai Airways', 'Malaysia Airlines', 'Air Asia']
    },
    {
        id: '125',
        policyName: 'OW nav dom',
        dateOfCreation: '2024-03-24',
        createdBy: 'Tom John',
        updatedBy: 'Tom John',
        journeyType: 'One-Way',
        sector: '2 Selections',
        supplier: 'All',
        airline: '2 Selections',
        class: 'Business',
        fareType: 'All',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['Domestic', 'International'],
        airlineSelections: ['IndiGo', 'Emirates']
    },
    {
        id: '126',
        policyName: 'RT Premium Policy',
        dateOfCreation: '2024-03-25',
        createdBy: 'Sarah Smith',
        updatedBy: 'Sarah Smith',
        journeyType: 'Round-Trip',
        sector: 'International',
        supplier: 'Amadeus',
        airline: 'Emirates',
        class: 'First',
        fareType: 'Premium',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: ['Emirates']
    },
    {
        id: '127',
        policyName: 'MC Business Travel',
        dateOfCreation: '2024-03-25',
        createdBy: 'Mike Brown',
        updatedBy: '-',
        journeyType: 'Multi-City',
        sector: 'International',
        supplier: 'Sabre',
        airline: '12 Selections',
        class: 'Business',
        fareType: 'Corporate',
        status: 'Inactive',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: [
            'Air India', 'IndiGo', 'SpiceJet', 'Emirates',
            'Qatar Airways', 'Etihad Airways', 'Singapore Airlines',
            'Thai Airways', 'Malaysia Airlines', 'Air Asia'
        ]
    },
    {
        id: '128',
        policyName: 'DOM Economy Plus',
        dateOfCreation: '2024-03-26',
        createdBy: 'Alex Johnson',
        updatedBy: 'Tom John',
        journeyType: 'Round-Trip',
        sector: 'Domestic',
        supplier: 'Navitaire API',
        airline: 'Air India',
        class: 'Economy',
        fareType: 'Regular',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['Domestic'],
        airlineSelections: ['Air India']
    },
    {
        id: '129',
        policyName: 'APAC Special',
        dateOfCreation: '2024-03-26',
        createdBy: 'Lisa Wong',
        updatedBy: '-',
        journeyType: 'Multi-City',
        sector: 'International',
        supplier: 'Travelport',
        airline: '15 Selections',
        class: 'Mixed',
        fareType: 'Special',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: [
            'Air India', 'IndiGo', 'SpiceJet', 'Emirates',
            'Qatar Airways', 'Etihad Airways', 'Singapore Airlines',
            'Thai Airways', 'Malaysia Airlines', 'Air Asia'
        ]
    },
    {
        id: '130',
        policyName: 'EU Business Express',
        dateOfCreation: '2024-03-26',
        createdBy: 'John Doe',
        updatedBy: 'Sarah Smith',
        journeyType: 'One-Way',
        sector: 'International',
        supplier: 'Amadeus',
        airline: 'Lufthansa',
        class: 'Business',
        fareType: 'Express',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: ['Lufthansa']
    },
    {
        id: '131',
        policyName: 'Gulf Connect',
        dateOfCreation: '2024-03-27',
        createdBy: 'Ahmed Hassan',
        updatedBy: '-',
        journeyType: 'Round-Trip',
        sector: 'International',
        supplier: 'Sabre',
        airline: 'Qatar Airways',
        class: 'Mixed',
        fareType: 'Regular',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['International'],
        airlineSelections: ['Qatar Airways']
    },
    {
        id: '132',
        policyName: 'Student Special',
        dateOfCreation: '2024-03-27',
        createdBy: 'Tom John',
        updatedBy: 'Mike Brown',
        journeyType: 'One-Way',
        sector: 'Domestic',
        supplier: 'All',
        airline: '5 Selections',
        class: 'Economy',
        fareType: 'Student',
        status: 'Active',
        isSelected: false,
        sectorSelections: ['Domestic'],
        airlineSelections: ['Air India']
    }
];

export const allJourneyTypes: OptionType[] = [
    { id: '1', name: 'One-Way' },
    { id: '2', name: 'Round-Trip' },
    { id: '3', name: 'Multi-City' },
    { id: '4', name: 'Open-Jaw' },
    { id: '5', name: 'Circle-Trip' }
].sort((a, b) => a.name.localeCompare(b.name));

export const allSections: OptionType[] = [
    { id: '1', name: 'Domestic' },
    { id: '2', name: 'International' },
    { id: '3', name: 'Regional' },
    { id: '4', name: 'Intercontinental' }
].sort((a, b) => a.name.localeCompare(b.name));

export const allSuppliers: OptionType[] = [
    { id: '1', name: 'Novataire Air Asia R' },
    { id: '2', name: 'Acceleron Airways' },
    { id: '3', name: 'SkyJet' },
    { id: '4', name: 'BlueWings' }
];
export const allAirlines: OptionType[] = [
    { id: '1', name: 'Air India' },
    { id: '2', name: 'IndiGo' },
    { id: '3', name: 'SpiceJet' },
    { id: '4', name: 'Vistara' }
];

// Sample data for Class
export const allClasses: OptionType[] = [
    { id: '1', name: 'Accelerate Air Arabia IN' },
    { id: '2', name: 'Amadeus Musafir IN' },
    { id: '3', name: 'Neo Indigo IN/ACC Brazil (DM123)' },
    { id: '4', name: 'Novataire Air Asia IN' },
    { id: '5', name: 'Other Class' }
];