import { useEffect, useState } from "react";
import { FlightSearchPayload } from "../../utility/types/flights/flight-search/FlightSearch";

/**
 * Parses the chatbot search payload from a localStorage string.
 */
const parseFlightSearch = (value: string | null): FlightSearchPayload | undefined => {
  if (!value || value === "undefined" || value === "null") return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

/**
 * useChatbotSearch Hook
 *
 * This hook tracks changes to the `chatbotSearch` key in localStorage.
 * It updates reactively when:
 * - The key is updated in localStorage
 * - A custom "chat-bot-search" event is dispatched
 */
export const useChatbotSearch = (): FlightSearchPayload | undefined => {
  const [chatPayload, setChatPayload] = useState<FlightSearchPayload | undefined>(() =>
    parseFlightSearch(localStorage.getItem("chatbotSearch"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const latest = parseFlightSearch(localStorage.getItem("chatbotSearch"));
      setChatPayload(prev =>
        JSON.stringify(prev) !== JSON.stringify(latest) ? latest : prev
      );
    };

    window.addEventListener("chat-bot-search", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "chatbotSearch") {
        handleStorageChange();
      }
    };

    return () => {
      window.removeEventListener("chat-bot-search", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);
  console.log("chatPayload", chatPayload);

  return chatPayload;
};
