const baseFlightSuggestions = [
    "Flight to Bengaluru",
    "Flight from New Delhi",
    "Book a flight",
    "Flight to Mumbai",
    "Flight from Chennai",
];

const cities = [
    "Bengaluru",
    "New Delhi",
    "Mumbai",
    "Dubai",
    "Chennai",
];

function getFlightSuggestions(query) {
    const trimmedQuery = query.trim().toLowerCase();
    const words = trimmedQuery.split(" ");
    const lastWord = words[words.length - 1];
    const secondLastWord = words[words.length - 2];

    if (!trimmedQuery) {
        return baseFlightSuggestions;
    }

    if (lastWord === "flight" || lastWord === "fly") {
        return [
            `${trimmedQuery} to`,
            `${trimmedQuery} from`,
            `${trimmedQuery} booking`,
        ];
    }

    if (lastWord === "to") {
        return cities.slice(0, 4).map(city => `${trimmedQuery} ${city}`);
    }

    if (lastWord === "from") {
        return cities.slice(0, 4).map(city => `${trimmedQuery} ${city}`);
    }


    if (secondLastWord === "to" && lastWord) {
        const matchingCities = cities
            .filter(city => city.toLowerCase().startsWith(lastWord))
            .map(city => `${words.slice(0, -1).join(" ")} ${city}`);
        return matchingCities.length > 0 ? matchingCities : [`${trimmedQuery} (no matches)`];
    }

    if (secondLastWord === "from" && lastWord) {
        const matchingCities = cities
            .filter(city => city.toLowerCase().startsWith(lastWord))
            .map(city => `${words.slice(0, -1).join(" ")} ${city}`);
        return matchingCities.length > 0 ? matchingCities : [`${trimmedQuery} (no matches)`];
    }

    if (lastWord === "book") {
        return [
            `${trimmedQuery} a flight`,
            `${trimmedQuery} a flight to New Delhi`,
            `${trimmedQuery} flight from Dubai`,
        ];
    }

    const filtered = baseFlightSuggestions.filter(s => s.toLowerCase().includes(trimmedQuery));
    if (filtered.length > 0) {
        return filtered;
    } else {
        return [
            `Flight to ${cities[0]}`,
            `Flight from ${cities[1]}`,
            "Book a flight",
        ];
    }


}

export default getFlightSuggestions;