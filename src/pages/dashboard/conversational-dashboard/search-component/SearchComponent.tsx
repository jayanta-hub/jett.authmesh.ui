import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, InputAdornment, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    setSearchData,
    updateDestinationInfo,
} from "../../../../store/slice/FlightSearchSlice";
import { theme } from "../../../../theme";
import {
    FormValues,
} from "../../../../utility/types/flights/flight-search/FlightSearch";
import getFlightSuggestions from "../auto-suggestion/flightAutoSuggestions";
import { conversationalDateHandler } from "../../../../utility/dateTimeHandler";
import { useChatbotSearch } from '../../../../utility/hooks/useChatbotSearch';

const CONVERSATION_EXPIRY = 20 * 1000;

interface Message {
    sender: 'user' | 'bot';
    text: string;
}


export default function SearchComponent() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [mode, setMode] = useState("search");
    const [messages, setMessages] = useState<Message[]>([]);
    console.log('usermessages', messages);
    const [sessionId] = useState(uuidv4());
    const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
    const [payload, setPayload] = useState({
        currency: "INR",
        language: "EN",
        pax: {
            adult: 0,
            child: 0,
            infant: 0,
        },
        returnDate: "",
        filters: {
            cabinPreference: ["A"],
            stopOver: [0, 1, 2, 3, 4, 5],
            airlines: [""],
            discountCodes: [
                {
                    tmcId: "",
                    organizationId: "",
                    supplierCode: "",
                },
            ],
            recommendedFlights: [],
        },
        destinationInfo: [
            {
                from: "",
                to: "",
                departureDate: "",
                originCityName: "",
                destinationCityName: "",
                originData: [],
                destinationData: [],
            }
        ],
        tripType: "",
    });
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        const storedData = localStorage.getItem("chatConversation");
        if (storedData) {
            const { messages: storedMessages, timestamp } = JSON.parse(storedData);
            const currentTime = Date.now();
            if (currentTime - timestamp < CONVERSATION_EXPIRY) {
                setMessages(storedMessages);
                setMode("chat");
            } else {
                setMessages([]);
                setMode("search")
                localStorage.removeItem("chatConversation");
            }
        }
    }, [sessionId]);

    useEffect(() => {
        if (messages.length > 0) {
            const conversationData = {
                messages,
                timestamp: Date.now(),
            };
            localStorage.setItem("chatConversation", JSON.stringify(conversationData));
        }
    }, [messages]);

    useEffect(() => {
        if (messageContainerRef.current) {
            const container = messageContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);


    const filteredSuggestions = mode === "search" ? getFlightSuggestions(query) : [];


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter" && query.trim() !== "") {
            const userMessage = query.trim();

            // Add user's message to chat
            setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
            setQuery("");

            if (mode === "search") {
                setMode("chat");
            }

            try {
                // New API integration
                const response = await fetch("http://192.168.10.81:5008/flightbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        language: "en",
                        session_id: sessionId,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch response from FlightBot");
                }

                const data = await response.json();

                // If response is a string, show as bot message
                if (typeof data.response === "string") {
                    setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
                    return;
                }

                // If response is an object (flight search), handle accordingly
                if (data.redirect == true) {
                    const flightData = data;
                    console.log(data, 'save  data----')
                    console.log(flightData.DestinationInfo, "flight data destination info")

                    // Map API response to your payload structure
                    const updatedPayload = {
                        ...payload,
                        tripType: (flightData.TripType || "").toLowerCase(),
                        currency: flightData.Currency || "INR",
                        language: flightData.Language || "EN",
                        pax: {
                            adult: flightData.Pax?.Adult ?? 0,
                            child: flightData.Pax?.Child ?? 0,
                            infant: flightData.Pax?.Infant ?? 0,
                        },
                        returnDate: "", // Not provided in response
                        filters: {
                            ...payload.filters,
                            cabinPreference: [flightData.Filters?.CabinPreference || "A"],
                            stopOver: flightData.Filters?.StopOver || [0, 1, 2, 3, 4, 5],
                            airlines: flightData.Filters?.Airlines || [""],
                            recommendedFlights: flightData.Filters?.RecommendedFlights || [],
                        },
                        destinationInfo: (flightData.DestinationInfo || []).map((segment) => (
                            console.log(conversationalDateHandler(segment.DepartureDate)), {

                                from: segment.OriginCode || "",
                                to: segment.DestinationCode || "",
                                departureDate: conversationalDateHandler(segment.DepartureDate) || "",
                                originCityName: segment.OriginCity || "",
                                destinationCityName: segment.DestinationCity || "",
                                originData: [],
                                destinationData: [],
                            })),
                    };

                    try {
                        console.log(updatedPayload, "hellor updated payload")
                        setPayload(updatedPayload);
                        localStorage.setItem("chatbotSearch", JSON.stringify(updatedPayload));
                        window.dispatchEvent(new Event("chat-bot-search"));
                        dispatch(updateDestinationInfo(updatedPayload.destinationInfo));
                        dispatch(setSearchData(updatedPayload));
                    } catch (dispatchError) {
                        console.error("Error during payload update or dispatch:", dispatchError);
                        throw dispatchError;
                    }

                    // Navigate to results page
                    const formValues: FormValues = {
                        tripType: updatedPayload.tripType,
                        multiCitySegments: updatedPayload.destinationInfo.map(segment => ({
                            from: segment.from,
                            to: segment.to,
                            departureDate: segment.departureDate,
                            originCityName: segment.originCityName,
                            destinationCityName: segment.destinationCityName,
                            originData: segment.originData,
                            destinationData: segment.destinationData,
                        })),
                        returnDate: updatedPayload.returnDate,
                        pax: updatedPayload.pax,
                        cabinClass: updatedPayload.filters.cabinPreference[0] || "Any",
                        airlines: updatedPayload.filters.airlines[0] || "",
                    };
                    console.log("Form Values:", formValues);
                    return;
                }

                // Fallback for unexpected response
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "Oops, something went wrong!" },
                ]);
            } catch (error) {
                console.error("Error calling FlightBot:", error);
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "Oops, something went wrong!" },
                ]);
            }
        }
    };
    const chatPayload = useChatbotSearch();

    return (<>
        {chatPayload ? (
            <Box sx={{ maxWidth: 1280, m: 'auto', position: 'sticky', bottom: '1vh' }}>
                <Box sx={{ maxWidth: isMobileView ? '90%' : 576, mx: 'auto', my: 'auto' }}>
                    <Box
                        sx={{
                            mt: 4,
                            [theme.breakpoints.only("xs")]: {
                                display: "flex",
                                flexDirection: "column-reverse",
                                gap: "20px",
                            },
                        }}
                        className="search-container-conversational"
                    >
                        {mode === "chat" && isFocused && (

                            <Box
                                ref={messageContainerRef}
                                sx={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    px: 1,
                                }}
                            >
                                {messages.map((msg, index) => (
                                    <Paper
                                        key={index}
                                        sx={{
                                            p: 1.2,
                                            backgroundColor:
                                                msg.sender === "user" ? '#e0f7fa' : '#f3e5f5',
                                            alignSelf:
                                                msg.sender === "user" ? "flex-end" : "flex-start",
                                            borderRadius: "12px",
                                            maxWidth: "70%",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: "12px",
                                                color: msg.sender === "user" ? "#00796b" : "#6a1b9a",
                                                mb: 0.5,
                                            }}
                                        >
                                            {msg.sender === "user" ? "You" : "Bot"}
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: "14px", color: "#000", marginBottom: "2px" }}
                                            variant="body2"
                                        >
                                            {msg.text.split('\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>

                        )}

                        <Box className="search-textfield-container" sx={{ mt: 2 }}>
                            <TextField
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                fullWidth
                                variant="outlined"
                                placeholder={
                                    mode === "search"
                                        ? "Please mention where you want to fly"
                                        : "Type your message..."
                                }
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "20px",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        height: "40px",
                                    },
                                }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Box className="search-icon-container">
                                                    <MicIcon className="search-icon" />
                                                    <SearchIcon className="search-icon" />
                                                </Box>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>


                    </Box></Box>
            </Box>
        ) : (<Box sx={{ maxWidth: isMobileView ? '90%' : 576, mx: 'auto', my: 'auto' }}>
            <Box
                sx={{
                    mt: 4,
                    [theme.breakpoints.only("xs")]: {
                        display: "flex",
                        flexDirection: "column-reverse",
                        gap: "20px",
                    },
                }}
                className="search-container-conversational"
            >
                {mode === "chat" && (

                    <Box
                        ref={messageContainerRef}
                        sx={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            px: 1,
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    p: 1.2,
                                    backgroundColor:
                                        msg.sender === "user" ? '#e0f7fa' : '#f3e5f5',
                                    alignSelf:
                                        msg.sender === "user" ? "flex-end" : "flex-start",
                                    borderRadius: "12px",
                                    maxWidth: "70%",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        color: msg.sender === "user" ? "#00796b" : "#6a1b9a",
                                        mb: 0.5,
                                    }}
                                >
                                    {msg.sender === "user" ? "You" : "Bot"}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "14px", color: "#000", marginBottom: "2px" }}
                                    variant="body2"
                                >
                                    {msg.text.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>

                )}

                <Box className="search-textfield-container" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={
                            mode === "search"
                                ? "Please mention where you want to fly"
                                : "Type your message..."
                        }
                        sx={{
                            backgroundColor: "#f5f5f5",
                            borderRadius: "20px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "20px",
                                fontSize: "14px",
                                height: "40px",
                            },
                        }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box className="search-icon-container">
                                            <MicIcon className="search-icon" />
                                            <SearchIcon className="search-icon" />
                                        </Box>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                {mode === "search" && (
                    <Box sx={{ maxWidth: "600px", mt: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                        {filteredSuggestions.map((suggestion, index) => (
                            <Chip
                                key={index}
                                label={suggestion}
                                variant="outlined"
                                sx={{
                                    color: "#000000",
                                    borderColor: "#7134FF",
                                    fontSize: "12px",
                                    height: "32px",
                                    borderRadius: "16px",
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#f0e7ff" },
                                }}
                                onClick={() => setQuery(suggestion)}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>)}



    </>
    );
}