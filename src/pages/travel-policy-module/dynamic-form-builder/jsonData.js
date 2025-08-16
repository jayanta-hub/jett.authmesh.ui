export const bookingDays = {
    "ConstraintId": "680b56fb9b84da052961926e",
    "ConstraintName": "Booking Days (List of days of the week)",
    "BucketName": "Booking",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "680b52a19b84da0529619268",
                "RuleName": "Days",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Monday",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "CHECKBOX",
                    "SelectionMode": "MULTIPLE",
                    "InputValues": [
                        {
                            "Name": "ALL",
                            "DisplayName": "All Days",
                            "Hint": "Select All to choose every day of the week",
                            "ValidationKey": "ALL_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "WEEKDAYS",
                            "DisplayName": "Weekdays",
                            "Hint": "Select Weekdays to choose Monday to Friday",
                            "ValidationKey": "WEEKDAYS_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "WEEKENDS",
                            "DisplayName": "Weekends",
                            "Hint": "Select Weekends to choose Saturday and Sunday",
                            "ValidationKey": "WEEKENDS_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "MONDAY",
                            "DisplayName": "Monday",
                            "Hint": "Select Monday for the start of the workweek",
                            "ValidationKey": "MONDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "TUESDAY",
                            "DisplayName": "Tuesday",
                            "Hint": "Select Tuesday for the second day of the week",
                            "ValidationKey": "TUESDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "WEDNESDAY",
                            "DisplayName": "Wednesday",
                            "Hint": "Select Wednesday for the midweek day",
                            "ValidationKey": "WEDNESDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "THURSDAY",
                            "DisplayName": "Thursday",
                            "Hint": "Select Thursday for the day before Friday",
                            "ValidationKey": "THURSDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "FRIDAY",
                            "DisplayName": "Friday",
                            "Hint": "Select Friday for the start of the weekend",
                            "ValidationKey": "FRIDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "SATURDAY",
                            "DisplayName": "Saturday",
                            "Hint": "Select Saturday for the weekend",
                            "ValidationKey": "SATURDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "SUNDAY",
                            "DisplayName": "Sunday",
                            "Hint": "Select Sunday for the end of the week",
                            "ValidationKey": "SUNDAY_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "ALL",
                                    "WEEKDAYS",
                                    "WEEKENDS",
                                    "MONDAY",
                                    "TUESDAY",
                                    "WEDNESDAY",
                                    "THURSDAY",
                                    "FRIDAY",
                                    "SATURDAY",
                                    "SUNDAY"
                                ],
                                "Message": "All days selected",
                                "Comment": "Must select all options"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "ALL_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "MONDAY",
                                    "TUESDAY",
                                    "WEDNESDAY",
                                    "THURSDAY",
                                    "FRIDAY",
                                    "SATURDAY",
                                    "SUNDAY"
                                ],
                                "Message": "Weekdays selected",
                                "Comment": "Must select Monday to Friday"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "WEEKDAYS_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "MONDAY",
                                    "TUESDAY",
                                    "WEDNESDAY",
                                    "THURSDAY",
                                    "FRIDAY"
                                ],
                                "Message": "Weekdays selected",
                                "Comment": "Must select Monday to Friday"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "WEEKENDS_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "SATURDAY",
                                    "SUNDAY"
                                ],
                                "Message": "Weekends selected",
                                "Comment": "Must select Saturday and Sunday"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "MONDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "MONDAY"
                                ],
                                "Message": "Monday selected",
                                "Comment": "Only Monday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "TUESDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "TUESDAY"
                                ],
                                "Message": "Tuesday selected",
                                "Comment": "Only Tuesday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "WEDNESDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "WEDNESDAY"
                                ],
                                "Message": "Wednesday selected",
                                "Comment": "Only Wednesday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "THURSDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "THURSDAY"
                                ],
                                "Message": "Thursday selected",
                                "Comment": "Only Thursday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "FRIDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "FRIDAY"
                                ],
                                "Message": "Friday selected",
                                "Comment": "Only Friday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "SATURDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "SATURDAY"
                                ],
                                "Message": "Saturday selected",
                                "Comment": "Only Saturday is selected"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "SUNDAY_VALIDATE",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "SUNDAY"
                                ],
                                "Message": "Sunday selected",
                                "Comment": "Only Sunday is selected"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const bookingDate = {
    "ConstraintId": "680743ca75f7d22ea4e3fe90",
    "ConstraintName": "Booking Date (DDMMYY)",
    "BucketName": "Booking",
    "ConstraintRules": [
        {
            "RuleDisplayName": "Start Date",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "6807456c75f7d22ea4e3fe94",
                "RuleName": "Date",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. 25/12/26",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. 25/12/26",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. 25",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. 25",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. 25",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. 25",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. 26",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. 26",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^25/.*",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "DATE",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "CHAR_LIMIT",
                    "RuleValues": [
                        "200"
                    ],
                    "Message": "Limit Exceeded",
                    "Comment": "Max 200 characters allowed"
                },
                "Validations": [
                    {
                        "InputValidationKey": "EXACTLY_MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must not match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must contain a valid number"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_CONTAIN_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must not contain a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "BEGINS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must not start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "ENDS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_END_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must not end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    ""
                                ],
                                "Message": "Must be a valid regular expression",
                                "Comment": "Allows any input (user-defined regex expected)"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "End Date",
            "RuleDisplayOrder": 1,
            "Required": true,
            "Rule": {
                "RuleId": "6807456c75f7d22ea4e3fe94",
                "RuleName": "Date",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. 25/12/26",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. 25/12/26",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. 25",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. 25",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. 25",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. 25",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. 26",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. 26",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^25/.*",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "DATE",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "CHAR_LIMIT",
                    "RuleValues": [
                        "200"
                    ],
                    "Message": "Limit Exceeded",
                    "Comment": "Max 200 characters allowed"
                },
                "Validations": [
                    {
                        "InputValidationKey": "EXACTLY_MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must not match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must contain a valid number"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_CONTAIN_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must not contain a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "BEGINS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must not start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "ENDS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_END_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must not end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    ""
                                ],
                                "Message": "Must be a valid regular expression",
                                "Comment": "Allows any input (user-defined regex expected)"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}
export const flightFare = {
    "ConstraintId": "6807f49ad20d161ce5dc82da",
    "ConstraintName": "Flight Fare",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "Minimum Fare",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "6807e3d9d20d161ce5dc82d3",
                "RuleName": "Fare",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "greater than",
                            "Hint": "greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "less than",
                            "Hint": "less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "equals to",
                            "Hint": "equals to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "greater than or equals to",
                            "Hint": "greater than or equals to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "less than or equals to",
                            "Hint": "less than or equals to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "CURRENCY",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                    ],
                    "Message": "Invalid number format",
                    "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "Maximum Fare",
            "RuleDisplayOrder": 1,
            "Required": true,
            "Rule": {
                "RuleId": "6807e3d9d20d161ce5dc82d3",
                "RuleName": "Fare",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "greater than",
                            "Hint": "greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "less than",
                            "Hint": "less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "equals to",
                            "Hint": "equals to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "greater than or equals to",
                            "Hint": "greater than or equals to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "less than or equals to",
                            "Hint": "less than or equals to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "CURRENCY",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                    ],
                    "Message": "Invalid number format",
                    "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "Cheapest Options",
            "RuleDisplayOrder": 2,
            "Required": true,
            "Rule": {
                "RuleId": "6807ea4dd20d161ce5dc82d5",
                "RuleName": "CheapestOptions",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Books Any",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "RADIO",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "BOOKS_ANY",
                            "DisplayName": "Books Any",
                            "Hint": "No flexibility preference",
                            "ValidationKey": "BOOKS_ANY",
                            "ValuePlaceholder": "Select if any option works",
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_CHEAPEST_ANY",
                            "DisplayName": "Books Cheapest Any",
                            "Hint": "Only the cheapest option allowed",
                            "ValidationKey": "BOOK_CHEAPEST_ONLY",
                            "ValuePlaceholder": "Select for cheapest only",
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "DisplayName": "Books Flexible above the Cheapest",
                            "Hint": "Flexible options above the cheapest",
                            "ValidationKey": "BOOKS_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "ValuePlaceholder": "Select for flexibility above cheapest",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "Select Flexibility Options",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "6807f04ad20d161ce5dc82d8",
                                        "RuleName": "FlexibilityOptions",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "exactly matches e.g. Percentage above the Cheapest",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "",
                                            "ElementType": "CHECKBOX",
                                            "SelectionMode": "MULTIPLE",
                                            "InputValues": [
                                                {
                                                    "Name": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Percentage above the Cheapest",
                                                    "Hint": "e.g. 10.5",
                                                    "ValidationKey": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter percentage above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e496a780332d77d7ab093",
                                                                "RuleName": "PercentageAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 20",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "PERCENTAGE",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(100(\\.0{1,2})?|([1-9]\\d?)(\\.\\d{1,2})?|0?\\.\\d*[1-9]\\d?)$"
                                                                    ],
                                                                    "Message": "Enter a valid percentage (whole or decimal)",
                                                                    "Comment": "Please Enter valid percentage"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                },
                                                {
                                                    "Name": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Amount above the Cheapest",
                                                    "Hint": "e.g. 2000",
                                                    "ValidationKey": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter amount above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e4c8f780332d77d7ab094",
                                                                "RuleName": "AmountAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 2000",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "CURRENCY",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                                                    ],
                                                                    "Message": "Enter a valid amount (whole or decimal)",
                                                                    "Comment": "Please Enter valid amount"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                }
                                            ]
                                        },
                                        "CommonValidation": {
                                            "RuleType": "CONTAINS",
                                            "RuleValues": [
                                                "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                "AMOUNT_ABOVE_THE_CHEAPEST"
                                            ],
                                            "Message": "Invalid option selected",
                                            "Comment": "Value must be one of the predefined options"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }

                            ],
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_MINIMUM_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "DisplayName": "Books Minimum Flexible above the Cheapest",
                            "Hint": "Minimum flexibility beyond the cheapest",
                            "ValidationKey": "BOOKS_MINIMUM_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "ValuePlaceholder": "Select for minimum flexibility",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "Select Flexibility Options",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "6807f04ad20d161ce5dc82d8",
                                        "RuleName": "FlexibilityOptions",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "exactly matches e.g. Percentage above the Cheapest",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "",
                                            "ElementType": "CHECKBOX",
                                            "SelectionMode": "MULTIPLE",
                                            "InputValues": [
                                                {
                                                    "Name": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Percentage above the Cheapest",
                                                    "Hint": "e.g. 10.5",
                                                    "ValidationKey": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter percentage above cheapest",
                                                    "SubRules": [{
                                                        "RuleDisplayName": "",
                                                        "RuleDisplayOrder": 1,
                                                        "Required": true,
                                                        "Rule": {
                                                            "RuleId": "686e496a780332d77d7ab093",
                                                            "RuleName": "PercentageAboveCheapestValue",
                                                            "MatchType": {
                                                                "Label": "",
                                                                "Visibility": "HIDDEN",
                                                                "ElementType": "SELECT",
                                                                "SelectionMode": "SINGLE",
                                                                "InputValues": [
                                                                    {
                                                                        "Name": "EXACTLY_MATCHES",
                                                                        "DisplayName": "exactly matches",
                                                                        "Hint": "exactly matches e.g. 20",
                                                                        "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                        "ValuePlaceholder": "Enter the Value",
                                                                        "Selected": true
                                                                    }
                                                                ]
                                                            },
                                                            "ValueType": {
                                                                "Label": "",
                                                                "ElementType": "PERCENTAGE",
                                                                "SelectionMode": "SINGLE",
                                                                "InputValues": []
                                                            },
                                                            "CommonValidation": {
                                                                "RuleType": "REGEX",
                                                                "RuleValues": [
                                                                    "^(100(\\.0{1,2})?|([1-9]\\d?)(\\.\\d{1,2})?|0?\\.\\d*[1-9]\\d?)$"
                                                                ],
                                                                "Message": "Enter a valid percentage (whole or decimal)",
                                                                "Comment": "Please Enter valid percentage"
                                                            },
                                                            "Validations": [],
                                                            "Tracking": {
                                                                "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                "CreatedIp": "192.0.1.96",
                                                                "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                "ModifiedIp": "192.0.1.96"
                                                            }
                                                        }
                                                    }
                                                    ],
                                                    "Selected": false
                                                },
                                                {
                                                    "Name": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Amount above the Cheapest",
                                                    "Hint": "e.g. 2000",
                                                    "ValidationKey": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter amount above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "Select Flexibility Options",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e4c8f780332d77d7ab094",
                                                                "RuleName": "AmountAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 2000",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "CURRENCY",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                                                    ],
                                                                    "Message": "Enter a valid amount (whole or decimal)",
                                                                    "Comment": "Please Enter valid amount"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                }
                                            ]
                                        },
                                        "CommonValidation": {
                                            "RuleType": "CONTAINS",
                                            "RuleValues": [
                                                "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                "AMOUNT_ABOVE_THE_CHEAPEST"
                                            ],
                                            "Message": "Invalid option selected",
                                            "Comment": "Value must be one of the predefined options"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }
                            ],
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "Conditions": [
                            {
                                "RuleType": "EXACTLY_MATCHES",
                                "RuleValues": [
                                    "6807e08bd20d161ce5dc82cf"
                                ],
                                "Message": "Please provide flexibility details above the cheapest option.",
                                "Comment": "Ensure that flexibility details are provided when selecting an option above the cheapest"
                            }
                        ]
                    },
                    {
                        "Conditions": [
                            {
                                "RuleType": "EXACTLY_MATCHES",
                                "RuleValues": [
                                    "6807f04ad20d161ce5dc82d7"
                                ],
                                "Message": "Please provide minimum flexibility details above the cheapest option.",
                                "Comment": "Ensure that minimum flexibility details are provided when selecting an option above the cheapest"
                            }
                        ]
                    }
                ]
            }
        }
    ]
}
export const FlightAncillariesBaggageAllowed = {
    "ConstraintId": "6830488c0643734aad3cb093",
    "ConstraintName": "Flight Ancillaries - Baggage Allowed",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "686e149f780332d77d7ab08d",
                "RuleName": "FlightAncillariesBaggage",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Allowed",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "RADIO",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "ALLOWED",
                            "DisplayName": "Allowed",
                            "Hint": "Action or option is permitted without restrictions.",
                            "ValidationKey": "ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "686e1c52780332d77d7ab08e",
                                        "RuleName": "WeightLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 20",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to Weight",
                                            "ElementType": "WEIGHT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^[1-9]\\d{0,4}(\\.\\d{1,5})?$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                },
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "686e1c60780332d77d7ab08f",
                                        "RuleName": "PiecesLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 20",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to pieces",
                                            "ElementType": "WEIGHT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^[1-9]\\d{0,4}$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 20)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                },
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "682d94ed4ca012f140853d59",
                                        "RuleName": "AmountLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 200",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to amount",
                                            "ElementType": "CURRENCY",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }

                            ],
                            "Selected": true
                        },
                        {
                            "Name": "NOT_ALLOWED",
                            "DisplayName": "Not Allowed",
                            "Hint": "Action or option is restricted or disallowed.",
                            "ValidationKey": "NOT_ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "ALLOWED",
                                    "NOT_ALLOWED"
                                ],
                                "Message": "Select any option",
                                "Comment": "Select any option"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const FlightAncillariesMeals = {
    "ConstraintId": "68304e2d0643734aad3cb096",
    "ConstraintName": "Flight Ancillaries - Meals",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "Meals Selection",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "682d9f234ca012f140853d61",
                "RuleName": "FlightAncillaries",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Allowed",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "RADIO",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "ALLOWED",
                            "DisplayName": "Allowed",
                            "Hint": "Action or option is permitted without restrictions.",
                            "ValidationKey": "ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "682d94ed4ca012f140853d59",
                                        "RuleName": "AmountLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 200",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to amount",
                                            "ElementType": "CURRENCY",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }

                            ],
                            "Selected": true
                        },
                        {
                            "Name": "NOT_ALLOWED",
                            "DisplayName": "Not Allowed",
                            "Hint": "Action or option is restricted or disallowed.",
                            "ValidationKey": "NOT_ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "ALLOWED",
                                    "NOT_ALLOWED"
                                ],
                                "Message": "Selected value must be exactly either ALLOWED or NOT_ALLOWED",
                                "Comment": "Selected value must be exactly either ALLOWED or NOT_ALLOWED"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const NumberofFlightBookings = {
    "ConstraintId": "686215c4a2abf12a911ac555",
    "ConstraintName": "Number of Flight Bookings allowed in a month",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "683051b80643734aad3cb098",
                "RuleName": "AllowedNumber",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "Greater Than",
                            "Hint": "Greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "Less Than",
                            "Hint": "Less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "Equal To",
                            "Hint": "Equal to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "Greater Than or Equal To",
                            "Hint": "Greater than or equal to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "Less Than or Equal To",
                            "Hint": "Less than or equal to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "TEXT",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^[1-9]\\d{0,2}$"
                    ],
                    "Message": "Enter a valid positive integer (e.g., 20)",
                    "Comment": "Must be a valid positive integer with no leading zero"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}
export const allowedAirline = {
    "ConstraintId": "682b6f6b78dd02dc382e1785",
    "ConstraintName": "Allowed Airlines",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "686e04d8780332d77d7ab088",
                "RuleName": "Airlines",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Emirates",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. Emirates",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Airline for Emirates",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. Air for Emirates",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. Em for Emirates",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. Ab for Emirates",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. es for Emirates",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. rt for Emirates",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^Emi.*tes$ for Emirates",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "AUTOCOMPLETE",
                    "SelectionMode": "MULTIPLE",
                    "Url": "/api/v1/flight/meta/airlines",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "VALID_OPTION_FROM_API",
                    "RuleValues": [
                        "/api/v1/flight/meta/airlines"
                    ],
                    "Message": "Select a valid airline from the dropdown",
                    "Comment": "Value should match one of the airlines fetched via the API"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}
export const allowedAirport = {
    "ConstraintId": "686228f7a2abf12a911ac574",
    "ConstraintName": "Arrival Airport",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "68621e2aa2abf12a911ac564",
                "RuleName": "Airports",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Dubai International Airport",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. Dubai International Airport",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Airport for Dubai International Airport",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. Pun for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. Dubai for Dubai International Airport",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. Punia for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. Airport for Dubai International Airport",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. Aircraft for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^D.*Airport$ for Dubai International Airport",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "AUTOCOMPLETE",
                    "SelectionMode": "MULTIPLE",
                    "Url": "/api/v1/meta/grapghql/search",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "VALID_OPTION_FROM_API",
                    "RuleValues": [
                        "/api/v1/meta/grapghql/search"
                    ],
                    "Message": "Select a valid airports from the dropdown",
                    "Comment": "Value should match one of the airports fetched via the API"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const tripDuration = {
    "ConstraintId": "68305a360643734aad3cb09e",
    "ConstraintName": "Trip Duration (Number of Days)",
    "BucketName": "Trip",
    "ConstraintRules": [
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "6890e1b29b494e7a5cb650b8",
                "RuleName": "NumberOfDays",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "Placeholder": "Number of days",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "Greater Than",
                            "Hint": "Greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "Less Than",
                            "Hint": "Less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "Equal To",
                            "Hint": "Equal to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "Greater Than or Equal To",
                            "Hint": "Greater than or equal to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "Less Than or Equal To",
                            "Hint": "Less than or equal to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "TEXT",
                    "Placeholder": "Number of days",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^[1-9]\\d{0,9}$"
                    ],
                    "Message": "Enter a valid positive integer (e.g., 20)",
                    "Comment": "Must be a valid positive integer with no leading zero"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const autocompleteData = [
    {
        "__typename": "AirportResponse",
        "Code": "DVX",
        "Name": "Delaware Airpark",
        "CityName": "Dover",
        "CountryName": "United States"
    },
    {
        "__typename": "AirportResponse",
        "Code": "ESC",
        "Name": "Delta County",
        "CityName": "Escanaba",
        "CountryName": "United States"
    },
    {
        "__typename": "AirportResponse",
        "Code": "DEL",
        "Name": "Delhi Indira Gandhi International",
        "CityName": "Delhi",
        "CountryName": "India"
    },
    {
        "__typename": "AirportResponse",
        "Code": "STB",
        "Name": "Las Delicias Airport",
        "CityName": "Santa Barbara",
        "CountryName": "Venezuela"
    },
    {
        "__typename": "AirportResponse",
        "Code": "DDN",
        "Name": "Delta Downs Airport",
        "CityName": "Delta Downs",
        "CountryName": "Australia"
    },
    {
        "__typename": "AirportResponse",
        "Code": "AJA",
        "Name": "Campo Dell Oro Airport",
        "CityName": "Ajaccio",
        "CountryName": "France"
    },
    {
        "__typename": "AirportResponse",
        "Code": "XZZ",
        "Name": "Zaragoza-Delicias Railway Station",
        "CityName": "Zaragoza",
        "CountryName": "Spain"
    },
    {
        "__typename": "AirportResponse",
        "Code": "PMV",
        "Name": "Delcaribe Gen S Marino Airport",
        "CityName": "Porlamar",
        "CountryName": "Venezuela"
    },
    {
        "__typename": "AirportResponse",
        "Code": "ZSE",
        "Name": "St Pierre Dela Reunion Airport",
        "CityName": "St Pierre Dela Reunion",
        "CountryName": "Reunion"
    },
    {
        "__typename": "AirportResponse",
        "Code": "BJX",
        "Name": "Del Bajio Airport",
        "CityName": "Leon",
        "CountryName": "Mexico"
    },
    {
        "__typename": "AirportResponse",
        "Code": "DRT",
        "Name": "International Del Rio",
        "CityName": "Del Rio",
        "CountryName": "United States"
    },
    {
        "__typename": "AirportResponse",
        "Code": "NTR",
        "Name": "Aeropuerto Del Norte",
        "CityName": "Monterrey",
        "CountryName": "Mexico"
    },
    {
        "__typename": "AirportResponse",
        "Code": "BOC",
        "Name": "Bocas Del Toro Airport",
        "CityName": "Bocas Del Toro",
        "CountryName": "Panama"
    },
    {
        "__typename": "AirportResponse",
        "Code": "CME",
        "Name": "Ciudad Del Carmen Airport",
        "CityName": "Ciudad Del Carmen",
        "CountryName": "Mexico"
    },
    {
        "__typename": "AirportResponse",
        "Code": "KIC",
        "Name": "Mesa Del Rey Airport",
        "CityName": "King City",
        "CountryName": "United States"
    },
    {
        "__typename": "AirportResponse",
        "Code": "KNA",
        "Name": "Vina Del Mar Airport",
        "CityName": "Vina Del Mar",
        "CountryName": "Chile"
    },
    {
        "__typename": "AirportResponse",
        "Code": "MDQ",
        "Name": "Mar Del Plata Airport",
        "CityName": "Mar Del Plata",
        "CountryName": "Argentina"
    },
    {
        "__typename": "AirportResponse",
        "Code": "PCM",
        "Name": "Playa Del Carmen Airport",
        "CityName": "Riviera Maya / Playa del Carmen",
        "CountryName": "Mexico"
    },
    {
        "__typename": "AirportResponse",
        "Code": "CYO",
        "Name": "Cayo Largo Del Sur Airport",
        "CityName": "Cayo Largo Del Sur",
        "CountryName": "Cuba"
    },
    {
        "__typename": "AirportResponse",
        "Code": "RER",
        "Name": "Base Aerea Del Sur Airport",
        "CityName": "Retalhuleu",
        "CountryName": "Guatemala"
    },
    {
        "__typename": "AirportResponse",
        "Code": "AGT",
        "Name": "Alejo Garcia Airport",
        "CityName": "Ciudad Del Este",
        "CountryName": "Paraguay"
    },
    {
        "__typename": "AirportResponse",
        "Code": "PDP",
        "Name": "Cap Curbelo Airport",
        "CityName": "Punta Del Este",
        "CountryName": "Uruguay"
    },
    {
        "__typename": "AirportResponse",
        "Code": "SDE",
        "Name": "Santiago Des Estero Airport",
        "CityName": "Santiago Del Estero",
        "CountryName": "Argentina"
    }
]

export const airlineData = [
    {
        "Code": "GB",
        "Name": "ABX Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GB.png"
    },
    {
        "Code": "9B",
        "Name": "AccesRail",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9B.png"
    },
    {
        "Code": "X7",
        "Name": "ACE Belgium Freighters",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/X7.png"
    },
    {
        "Code": "JP",
        "Name": "Adria Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JP.png"
    },
    {
        "Code": "AN",
        "Name": "Advanced Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AN.png"
    },
    {
        "Code": "A3",
        "Name": "Aegean Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A3.png"
    },
    {
        "Code": "EI",
        "Name": "Aer Lingus",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EI.png"
    },
    {
        "Code": "JK",
        "Name": "AerCaribe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JK.png"
    },
    {
        "Code": "M0",
        "Name": "Aero Mongolia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M0.png"
    },
    {
        "Code": "4A",
        "Name": "Aerodynamics",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4A.png"
    },
    {
        "Code": "SU",
        "Name": "Aeroflot",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SU.png"
    },
    {
        "Code": "XZ",
        "Name": "Aeroitalia Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XZ.png"
    },
    {
        "Code": "AR",
        "Name": "Aerolineas Argentinas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AR.png"
    },
    {
        "Code": "2K",
        "Name": "Aerolineas Galapagos",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2K.png"
    },
    {
        "Code": "N3",
        "Name": "Aerolineas MAS",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N3.png"
    },
    {
        "Code": "VW",
        "Name": "Aeromar Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VW.png"
    },
    {
        "Code": "5D",
        "Name": "Aeromexico",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5D.png"
    },
    {
        "Code": "AM",
        "Name": "Aeromexico",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AM.png"
    },
    {
        "Code": "OT",
        "Name": "Aeropelican",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OT.png"
    },
    {
        "Code": "5L",
        "Name": "Aerosur",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5L.png"
    },
    {
        "Code": "VV",
        "Name": "Aerosvit",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VV.png"
    },
    {
        "Code": "L8",
        "Name": "Afric Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L8.png"
    },
    {
        "Code": "AW",
        "Name": "Africa World Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AW.png"
    },
    {
        "Code": "XU",
        "Name": "African Express Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XU.png"
    },
    {
        "Code": "J7",
        "Name": "Afrijet Business Services",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J7.png"
    },
    {
        "Code": "8U",
        "Name": "Afriqiyah Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8U.png"
    },
    {
        "Code": "ZI",
        "Name": "Aigle Azur",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZI.png"
    },
    {
        "Code": "ZB",
        "Name": "Air Albania",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZB.png"
    },
    {
        "Code": "AH",
        "Name": "Air Algerie",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AH.png"
    },
    {
        "Code": "A6",
        "Name": "Air Alps Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A6.png"
    },
    {
        "Code": "6I",
        "Name": "Air Alsie",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6I.png"
    },
    {
        "Code": "3S",
        "Name": "Air Antilles Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3S.png"
    },
    {
        "Code": "G9",
        "Name": "Air Arabia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G9.png"
    },
    {
        "Code": "3L",
        "Name": "Air Arabia Abu Dhabi",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3L.png"
    },
    {
        "Code": "E5",
        "Name": "Air Arabia Egypt",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E5.png"
    },
    {
        "Code": "3O",
        "Name": "Air Arabia Maroc",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3O.png"
    },
    {
        "Code": "KC",
        "Name": "Air Astana",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KC.png"
    },
    {
        "Code": "CC",
        "Name": "Air Atlanta Icelandic",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CC.png"
    },
    {
        "Code": "UU",
        "Name": "Air Austral",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UU.png"
    },
    {
        "Code": "W9",
        "Name": "Air Bagan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W9.png"
    },
    {
        "Code": "BT",
        "Name": "Air Baltic",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BT.png"
    },
    {
        "Code": "KF",
        "Name": "Air Belgium",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KF.png"
    },
    {
        "Code": "AB",
        "Name": "Air Berlin",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AB.png"
    },
    {
        "Code": "BP",
        "Name": "Air Botswana",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BP.png"
    },
    {
        "Code": "RU",
        "Name": "Air Bridge Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RU.png"
    },
    {
        "Code": "2J",
        "Name": "Air Burkina",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2J.png"
    },
    {
        "Code": "BX",
        "Name": "Air Busan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BX.png"
    },
    {
        "Code": "SM",
        "Name": "Air Cairo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SM.png"
    },
    {
        "Code": "TY",
        "Name": "Air Caledonie",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TY.png"
    },
    {
        "Code": "AC",
        "Name": "Air Canada",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AC.png"
    },
    {
        "Code": "RV",
        "Name": "Air Canada Rouge",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RV.png"
    },
    {
        "Code": "TX",
        "Name": "Air Caraibes",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TX.png"
    },
    {
        "Code": "2Q",
        "Name": "Air Cargo Carriers",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2Q.png"
    },
    {
        "Code": "CW",
        "Name": "Air Cargo Global",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CW.png"
    },
    {
        "Code": "UY",
        "Name": "Air Caucasus",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UY.png"
    },
    {
        "Code": "Y2",
        "Name": "Air Century",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y2.png"
    },
    {
        "Code": "9H",
        "Name": "Air Changan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9H.png"
    },
    {
        "Code": "3C",
        "Name": "Air Chathams",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3C.png"
    },
    {
        "Code": "CA",
        "Name": "Air China",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CA.png"
    },
    {
        "Code": "3E",
        "Name": "Air Choice One",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3E.png"
    },
    {
        "Code": "XK",
        "Name": "Air Corsica",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XK.png"
    },
    {
        "Code": "HF",
        "Name": "Air Cote d'Ivoire",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HF.png"
    },
    {
        "Code": "YN",
        "Name": "Air Creebec",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YN.png"
    },
    {
        "Code": "HD",
        "Name": "Air Do",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HD.png"
    },
    {
        "Code": "EN",
        "Name": "Air Dolomiti",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EN.png"
    },
    {
        "Code": "UX",
        "Name": "Air Europa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UX.png"
    },
    {
        "Code": "PC*",
        "Name": "Air Fiji",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "F4",
        "Name": "Air Flamenco",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F4.png"
    },
    {
        "Code": "AF",
        "Name": "Air France",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AF.png"
    },
    {
        "Code": "ZX",
        "Name": "Air Georgian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZX.png"
    },
    {
        "Code": "GL",
        "Name": "Air Greenland",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GL.png"
    },
    {
        "Code": "GT",
        "Name": "Air Guilin",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GT.png"
    },
    {
        "Code": "LD",
        "Name": "Air Hong Kong",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LD.png"
    },
    {
        "Code": "NY",
        "Name": "Air Iceland",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NY.png"
    },
    {
        "Code": "KJ",
        "Name": "Air Incheon",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KJ.png"
    },
    {
        "Code": "AI",
        "Name": "Air India",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AI.png"
    },
    {
        "Code": "I5",
        "Name": "Air India Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I5.png"
    },
    {
        "Code": "IX",
        "Name": "Air India Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IX.png"
    },
    {
        "Code": "I6",
        "Name": "Air Indus",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I6.png"
    },
    {
        "Code": "3H",
        "Name": "Air Inuit",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3H.png"
    },
    {
        "Code": "I9",
        "Name": "Air Italy",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I9.png"
    },
    {
        "Code": "IG",
        "Name": "Air Italy",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IG.png"
    },
    {
        "Code": "VU",
        "Name": "Air Ivoire",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VU.png"
    },
    {
        "Code": "NQ",
        "Name": "Air Japan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NQ.png"
    },
    {
        "Code": "K7",
        "Name": "Air KBZ",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K7.png"
    },
    {
        "Code": "IK",
        "Name": "Air Kiribati",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IK.png"
    },
    {
        "Code": "JS",
        "Name": "Air Koryo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JS.png"
    },
    {
        "Code": "WJ",
        "Name": "Air Labrador",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WJ.png"
    },
    {
        "Code": "AL",
        "Name": "Air Leisure",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AL.png"
    },
    {
        "Code": "NX",
        "Name": "Air Macau",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NX.png"
    },
    {
        "Code": "MD",
        "Name": "Air Madagascar",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MD.png"
    },
    {
        "Code": "KM",
        "Name": "Air Malta",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KM.png"
    },
    {
        "Code": "ZM",
        "Name": "Air Manas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZM.png"
    },
    {
        "Code": "MK",
        "Name": "Air Mauritius",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MK.png"
    },
    {
        "Code": "MV",
        "Name": "Air Mediterranean",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MV.png"
    },
    {
        "Code": "ML",
        "Name": "Air Mediterranee",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ML.png"
    },
    {
        "Code": "9U",
        "Name": "Air Moldova",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9U.png"
    },
    {
        "Code": "SW",
        "Name": "Air Namibia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SW.png"
    },
    {
        "Code": "NZ",
        "Name": "Air New Zealand",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NZ.png"
    },
    {
        "Code": "PX",
        "Name": "Air Niugini",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PX.png"
    },
    {
        "Code": "4N",
        "Name": "Air North",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4N.png"
    },
    {
        "Code": "YW",
        "Name": "Air Nostrum",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YW.png"
    },
    {
        "Code": "7P",
        "Name": "Air Panama",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7P.png"
    },
    {
        "Code": "P4",
        "Name": "Air Peace",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P4.png"
    },
    {
        "Code": "2P",
        "Name": "Air Philippines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2P.png"
    },
    {
        "Code": "GZ",
        "Name": "Air Rarotonga",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GZ.png"
    },
    {
        "Code": "PJ",
        "Name": "Air Saint-Pierre",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PJ.png"
    },
    {
        "Code": "RS",
        "Name": "Air Seoul",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RS.png"
    },
    {
        "Code": "JU",
        "Name": "Air Serbia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JU.png"
    },
    {
        "Code": "HM",
        "Name": "Air Seychelles",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HM.png"
    },
    {
        "Code": "PF",
        "Name": "AIR SIAL",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PF.png"
    },
    {
        "Code": "4D",
        "Name": "Air Sinai",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4D.png"
    },
    {
        "Code": "0S",
        "Name": "Air Stork",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0S.png"
    },
    {
        "Code": "YI",
        "Name": "Air Sunshine",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YI.png"
    },
    {
        "Code": "VT",
        "Name": "Air Tahiti",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VT.png"
    },
    {
        "Code": "TN",
        "Name": "Air Tahiti Nui",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TN.png"
    },
    {
        "Code": "TC",
        "Name": "Air Tanzania",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TC.png"
    },
    {
        "Code": "8T",
        "Name": "Air Tindi",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8T.png"
    },
    {
        "Code": "TS",
        "Name": "Air Transat",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TS.png"
    },
    {
        "Code": "8C",
        "Name": "Air Transport International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8C.png"
    },
    {
        "Code": "U7",
        "Name": "Air Uganda",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U7.png"
    },
    {
        "Code": "3N",
        "Name": "Air Urga",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3N.png"
    },
    {
        "Code": "NF",
        "Name": "Air Vanuatu",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NF.png"
    },
    {
        "Code": "UM",
        "Name": "Air Zimbabwe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UM.png"
    },
    {
        "Code": "9T",
        "Name": "AirACT",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9T.png"
    },
    {
        "Code": "AK",
        "Name": "AirAsia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AK.png"
    },
    {
        "Code": "D7",
        "Name": "AirAsia X",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D7.png"
    },
    {
        "Code": "Z2",
        "Name": "AirAsia Zest",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z2.png"
    },
    {
        "Code": "PA",
        "Name": "AirBlue",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PA.png"
    },
    {
        "Code": "4Y",
        "Name": "Airbus Transport International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4Y.png"
    },
    {
        "Code": "SB",
        "Name": "Aircalin",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SB.png"
    },
    {
        "Code": "ED",
        "Name": "AirExplore",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ED.png"
    },
    {
        "Code": "QP",
        "Name": "Airkenya",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QP.png"
    },
    {
        "Code": "P2",
        "Name": "Airkenya",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P2.png"
    },
    {
        "Code": "CG",
        "Name": "Airlines PNG",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CG.png"
    },
    {
        "Code": "4Z",
        "Name": "Airlink",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4Z.png"
    },
    {
        "Code": "TL",
        "Name": "Airnorth",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TL.png"
    },
    {
        "Code": "9G",
        "Name": "Airport Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9G.png"
    },
    {
        "Code": "T6",
        "Name": "AirSWIFT",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T6.png"
    },
    {
        "Code": "9L",
        "Name": "AirTanker",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9L.png"
    },
    {
        "Code": "FL",
        "Name": "Airtran Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FL.png"
    },
    {
        "Code": "VF",
        "Name": "Ajet Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VF.png"
    },
    {
        "Code": "Q9",
        "Name": "Akasa Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q9.png"
    },
    {
        "Code": "QP",
        "Name": "Akasa Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QP.png"
    },
    {
        "Code": "6N",
        "Name": "Al-Naser Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6N.png"
    },
    {
        "Code": "AS",
        "Name": "Alaska Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AS.png"
    },
    {
        "Code": "AP",
        "Name": "AlbaStar",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AP.png"
    },
    {
        "Code": "2B",
        "Name": "Albawings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2B.png"
    },
    {
        "Code": "DQ",
        "Name": "Alexandria Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DQ.png"
    },
    {
        "Code": "D4",
        "Name": "Alidaunia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D4.png"
    },
    {
        "Code": "AZ",
        "Name": "Alitalia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AZ.png"
    },
    {
        "Code": "CT",
        "Name": "Alitalia CityLiner",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CT.png"
    },
    {
        "Code": "NH",
        "Name": "All Nippon Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NH.png"
    },
    {
        "Code": "G4",
        "Name": "Allegiant Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G4.png"
    },
    {
        "Code": "9I",
        "Name": "Alliance Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9I.png"
    },
    {
        "Code": "QQ",
        "Name": "Alliance Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QQ.png"
    },
    {
        "Code": "C4",
        "Name": "ALMA de Mexico",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/C4.png"
    },
    {
        "Code": "UJ",
        "Name": "AlMasria Universal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UJ.png"
    },
    {
        "Code": "KH",
        "Name": "Aloha Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KH.png"
    },
    {
        "Code": "C9",
        "Name": "Alphaland Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/C9.png"
    },
    {
        "Code": "5A",
        "Name": "Alpine Air Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5A.png"
    },
    {
        "Code": "6R",
        "Name": "Alrosa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6R.png"
    },
    {
        "Code": "MZ",
        "Name": "Amakusa Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MZ.png"
    },
    {
        "Code": "HP",
        "Name": "Amapola Flyg",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HP.png"
    },
    {
        "Code": "Z8",
        "Name": "Amaszonas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z8.png"
    },
    {
        "Code": "0A",
        "Name": "Amber Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0A.png"
    },
    {
        "Code": "AA",
        "Name": "American Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AA.png"
    },
    {
        "Code": "A8",
        "Name": "Ameriflight",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A8.png"
    },
    {
        "Code": "M6",
        "Name": "Amerijet International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M6.png"
    },
    {
        "Code": "7Z",
        "Name": "Ameristar Jet Charter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7Z.png"
    },
    {
        "Code": "DM",
        "Name": "Anda Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DM.png"
    },
    {
        "Code": "OY",
        "Name": "Andes Lineas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OY.png"
    },
    {
        "Code": "2G",
        "Name": "Angara Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2G.png"
    },
    {
        "Code": "GP",
        "Name": "APG Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GP.png"
    },
    {
        "Code": "FG",
        "Name": "Ariana Afghan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FG.png"
    },
    {
        "Code": "W3",
        "Name": "Arik Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W3.png"
    },
    {
        "Code": "OR",
        "Name": "Arkefly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OR.png"
    },
    {
        "Code": "IZ",
        "Name": "Arkia Israeli Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IZ.png"
    },
    {
        "Code": "6A",
        "Name": "Armenia Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6A.png"
    },
    {
        "Code": "RM",
        "Name": "Armenia Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RM.png"
    },
    {
        "Code": "AG",
        "Name": "Aruba Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AG.png"
    },
    {
        "Code": "R7",
        "Name": "Aserca Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R7.png"
    },
    {
        "Code": "3G",
        "Name": "AsiaCargo Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3G.png"
    },
    {
        "Code": "OZ",
        "Name": "Asiana Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OZ.png"
    },
    {
        "Code": "KP",
        "Name": "ASKY",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KP.png"
    },
    {
        "Code": "3V",
        "Name": "ASL Airlines Belgium",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3V.png"
    },
    {
        "Code": "5O",
        "Name": "ASL Airlines France",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5O.png"
    },
    {
        "Code": "A2",
        "Name": "Astra Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A2.png"
    },
    {
        "Code": "I3",
        "Name": "ATA Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I3.png"
    },
    {
        "Code": "RC",
        "Name": "Atlantic Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RC.png"
    },
    {
        "Code": "TD",
        "Name": "Atlantis European Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TD.png"
    },
    {
        "Code": "5Y",
        "Name": "Atlas Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5Y.png"
    },
    {
        "Code": "KK",
        "Name": "AtlasGlobal",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KK.png"
    },
    {
        "Code": "V8",
        "Name": "Atran",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V8.png"
    },
    {
        "Code": "IQ",
        "Name": "Augsburg Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IQ.png"
    },
    {
        "Code": "UI",
        "Name": "Auric Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UI.png"
    },
    {
        "Code": "GR",
        "Name": "Aurigny Air Services",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GR.png"
    },
    {
        "Code": "HZ",
        "Name": "Aurora",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HZ.png"
    },
    {
        "Code": "AU",
        "Name": "Austral",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AU.png"
    },
    {
        "Code": "OS",
        "Name": "Austrian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OS.png"
    },
    {
        "Code": "YK",
        "Name": "Avia Traffic Company",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YK.png"
    },
    {
        "Code": "ZR",
        "Name": "Aviacon Zitotrans",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZR.png"
    },
    {
        "Code": "AV",
        "Name": "Avianca",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AV.png"
    },
    {
        "Code": "QT",
        "Name": "Avianca Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QT.png"
    },
    {
        "Code": "GU",
        "Name": "Aviateca",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GU.png"
    },
    {
        "Code": "X9",
        "Name": "Avion Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/X9.png"
    },
    {
        "Code": "9V",
        "Name": "Avior Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9V.png"
    },
    {
        "Code": "J2",
        "Name": "Azerbaijan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J2.png"
    },
    {
        "Code": "A4",
        "Name": "Azimuth",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A4.png"
    },
    {
        "Code": "S4",
        "Name": "Azores Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S4.png"
    },
    {
        "Code": "AJ",
        "Name": "Aztec Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AJ.png"
    },
    {
        "Code": "AD",
        "Name": "Azul Brazilian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AD.png"
    },
    {
        "Code": "ZF",
        "Name": "Azur Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZF.png"
    },
    {
        "Code": "QU",
        "Name": "Azur Air Ukraine",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QU.png"
    },
    {
        "Code": "CJ",
        "Name": "BA CityFlyer",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CJ.png"
    },
    {
        "Code": "J4",
        "Name": "Badr Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J4.png"
    },
    {
        "Code": "UP",
        "Name": "Bahamasair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UP.png"
    },
    {
        "Code": "BN",
        "Name": "Bahrain Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BN.png"
    },
    {
        "Code": "QH",
        "Name": "Bamboo Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QH.png"
    },
    {
        "Code": "PG",
        "Name": "Bangkok Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PG.png"
    },
    {
        "Code": "5B",
        "Name": "Bassaka Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5B.png"
    },
    {
        "Code": "ID",
        "Name": "Batik Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ID.png"
    },
    {
        "Code": "OD",
        "Name": "Batik Air Malaysia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OD.png"
    },
    {
        "Code": "JV",
        "Name": "Bearskin Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JV.png"
    },
    {
        "Code": "Z9",
        "Name": "Bek Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z9.png"
    },
    {
        "Code": "4T",
        "Name": "Belair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4T.png"
    },
    {
        "Code": "B2",
        "Name": "Belavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B2.png"
    },
    {
        "Code": "LZ",
        "Name": "Belle Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LZ.png"
    },
    {
        "Code": "CH",
        "Name": "Bemidji Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CH.png"
    },
    {
        "Code": "8E",
        "Name": "Bering Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8E.png"
    },
    {
        "Code": "J8",
        "Name": "Berjaya Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J8.png"
    },
    {
        "Code": "8H",
        "Name": "BH Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8H.png"
    },
    {
        "Code": "B3",
        "Name": "Bhutan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B3.png"
    },
    {
        "Code": "BG",
        "Name": "Biman Bangladesh Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BG.png"
    },
    {
        "Code": "3B",
        "Name": "Binter Cabo Verde",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3B.png"
    },
    {
        "Code": "NT",
        "Name": "Binter Canarias",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NT.png"
    },
    {
        "Code": "0B",
        "Name": "Blue Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0B.png"
    },
    {
        "Code": "BZ",
        "Name": "Blue Dart Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BZ.png"
    },
    {
        "Code": "SI",
        "Name": "Blue Islands",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SI.png"
    },
    {
        "Code": "BV",
        "Name": "Blue Panorama Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BV.png"
    },
    {
        "Code": "BO",
        "Name": "Bluebird Nordic",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BO.png"
    },
    {
        "Code": "BD",
        "Name": "bmi british midland",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BD.png"
    },
    {
        "Code": "BM",
        "Name": "BMI Regional",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BM.png"
    },
    {
        "Code": "OB",
        "Name": "Boliviana de Aviacion",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OB.png"
    },
    {
        "Code": "4B",
        "Name": "Boutique Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4B.png"
    },
    {
        "Code": "TF",
        "Name": "BRA",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TF.png"
    },
    {
        "Code": "DC",
        "Name": "Braathens Regional",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DC.png"
    },
    {
        "Code": "FQ",
        "Name": "Brindabella Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FQ.png"
    },
    {
        "Code": "E6",
        "Name": "Bringer Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E6.png"
    },
    {
        "Code": "L9",
        "Name": "Bristow US",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L9.png"
    },
    {
        "Code": "BA",
        "Name": "British Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BA.png"
    },
    {
        "Code": "SN",
        "Name": "Brussels Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SN.png"
    },
    {
        "Code": "RP",
        "Name": "Budapest Aircraft Service",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RP.png"
    },
    {
        "Code": "U4",
        "Name": "Buddha Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U4.png"
    },
    {
        "Code": "LB",
        "Name": "Bul Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LB.png"
    },
    {
        "Code": "FB",
        "Name": "Bulgaria Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FB.png"
    },
    {
        "Code": "1T",
        "Name": "Bulgarian Air Charter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/1T.png"
    },
    {
        "Code": "UZ",
        "Name": "Buraq Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UZ.png"
    },
    {
        "Code": "XV",
        "Name": "BVI Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XV.png"
    },
    {
        "Code": "5C",
        "Name": "CAL Cargo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5C.png"
    },
    {
        "Code": "A7",
        "Name": "Calafia Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A7.png"
    },
    {
        "Code": "MO",
        "Name": "Calm Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MO.png"
    },
    {
        "Code": "QC",
        "Name": "Camair-Co",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QC.png"
    },
    {
        "Code": "KR",
        "Name": "Cambodia Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KR.png"
    },
    {
        "Code": "K6",
        "Name": "Cambodia Angkor Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K6.png"
    },
    {
        "Code": "5T",
        "Name": "Canadian North",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5T.png"
    },
    {
        "Code": "PM",
        "Name": "CanaryFly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PM.png"
    },
    {
        "Code": "9K",
        "Name": "Cape Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9K.png"
    },
    {
        "Code": "JD",
        "Name": "Capital Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JD.png"
    },
    {
        "Code": "8F",
        "Name": "Cardig Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8F.png"
    },
    {
        "Code": "W8",
        "Name": "Cargojet Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W8.png"
    },
    {
        "Code": "P3",
        "Name": "CargoLogicAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P3.png"
    },
    {
        "Code": "CV",
        "Name": "Cargolux",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CV.png"
    },
    {
        "Code": "BW",
        "Name": "Caribbean Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BW.png"
    },
    {
        "Code": "V3",
        "Name": "Carpatair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V3.png"
    },
    {
        "Code": "IV",
        "Name": "Caspian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IV.png"
    },
    {
        "Code": "KA",
        "Name": "Cathay Dragon",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KA.png"
    },
    {
        "Code": "CX",
        "Name": "Cathay Pacific",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CX.png"
    },
    {
        "Code": "KX",
        "Name": "Cayman Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KX.png"
    },
    {
        "Code": "5J",
        "Name": "Cebu Pacific Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5J.png"
    },
    {
        "Code": "C2",
        "Name": "Ceiba Intercontinental",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/C2.png"
    },
    {
        "Code": "5Z",
        "Name": "CemAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5Z.png"
    },
    {
        "Code": "9M",
        "Name": "Central Mountain Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9M.png"
    },
    {
        "Code": "GM",
        "Name": "Chair Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GM.png"
    },
    {
        "Code": "CE",
        "Name": "Chalair Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CE.png"
    },
    {
        "Code": "6Q",
        "Name": "Cham Wings Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6Q.png"
    },
    {
        "Code": "EU",
        "Name": "Chengdu Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EU.png"
    },
    {
        "Code": "CI",
        "Name": "China Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CI.png"
    },
    {
        "Code": "CK",
        "Name": "China Cargo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CK.png"
    },
    {
        "Code": "MU",
        "Name": "China Eastern Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MU.png"
    },
    {
        "Code": "G5",
        "Name": "China Express Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G5.png"
    },
    {
        "Code": "CF",
        "Name": "China Postal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CF.png"
    },
    {
        "Code": "CZ",
        "Name": "China Southern Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CZ.png"
    },
    {
        "Code": "KN",
        "Name": "China United Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KN.png"
    },
    {
        "Code": "PN",
        "Name": "China West Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PN.png"
    },
    {
        "Code": "OQ",
        "Name": "Chongqing Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OQ.png"
    },
    {
        "Code": "QA",
        "Name": "Cimber",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QA.png"
    },
    {
        "Code": "QG",
        "Name": "Citilink",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QG.png"
    },
    {
        "Code": "WX",
        "Name": "City Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WX.png"
    },
    {
        "Code": "CQ",
        "Name": "Coastal Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CQ.png"
    },
    {
        "Code": "GY",
        "Name": "Colorful GuiZhou Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GY.png"
    },
    {
        "Code": "OH",
        "Name": "Comair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OH.png"
    },
    {
        "Code": "MN",
        "Name": "Comair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MN.png"
    },
    {
        "Code": "CS",
        "Name": "Comlux Aruba",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CS.png"
    },
    {
        "Code": "O5",
        "Name": "Comores Aviation International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O5.png"
    },
    {
        "Code": "CP",
        "Name": "Compass Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CP.png"
    },
    {
        "Code": "DE",
        "Name": "Condor Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DE.png"
    },
    {
        "Code": "CO",
        "Name": "Continental",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CO.png"
    },
    {
        "Code": "LF",
        "Name": "Contour Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LF.png"
    },
    {
        "Code": "V0",
        "Name": "Conviasa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V0.png"
    },
    {
        "Code": "CM",
        "Name": "Copa Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CM.png"
    },
    {
        "Code": "P5",
        "Name": "Copa Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P5.png"
    },
    {
        "Code": "XC",
        "Name": "Corendon Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XC.png"
    },
    {
        "Code": "CD",
        "Name": "Corendon Dutch Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CD.png"
    },
    {
        "Code": "SS",
        "Name": "Corsair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SS.png"
    },
    {
        "Code": "DQ",
        "Name": "Costal Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DQ.png"
    },
    {
        "Code": "Z7",
        "Name": "Cristalux",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z7.png"
    },
    {
        "Code": "OU",
        "Name": "Croatia Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OU.png"
    },
    {
        "Code": "C8",
        "Name": "Cronos Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "CU",
        "Name": "Cubana",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CU.png"
    },
    {
        "Code": "CY",
        "Name": "Cyprus Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CY.png"
    },
    {
        "Code": "OK",
        "Name": "Czech Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OK.png"
    },
    {
        "Code": "D3",
        "Name": "Daallo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D3.png"
    },
    {
        "Code": "N2",
        "Name": "Dagestan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N2.png"
    },
    {
        "Code": "9J",
        "Name": "Dana Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9J.png"
    },
    {
        "Code": "DX",
        "Name": "Danish Air Transport",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DX.png"
    },
    {
        "Code": "0D",
        "Name": "Darwin Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0D.png"
    },
    {
        "Code": "DF",
        "Name": "Deer Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DF.png"
    },
    {
        "Code": "DL",
        "Name": "Delta Air Lines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DL.png"
    },
    {
        "Code": "DI",
        "Name": "DETA Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DI.png"
    },
    {
        "Code": "2A",
        "Name": "Deutsche Bahn",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2A.png"
    },
    {
        "Code": "D0",
        "Name": "DHL",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D0.png"
    },
    {
        "Code": "3R",
        "Name": "Divi Divi Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3R.png"
    },
    {
        "Code": "Z6",
        "Name": "Dnieproavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z6.png"
    },
    {
        "Code": "7D",
        "Name": "Donbassaero",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7D.png"
    },
    {
        "Code": "DZ",
        "Name": "Donghai Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DZ.png"
    },
    {
        "Code": "DO",
        "Name": "Dornier Aviation Nigeria Aiep",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DO.png"
    },
    {
        "Code": "R6",
        "Name": "DOT LT",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R6.png"
    },
    {
        "Code": "KB",
        "Name": "Drukair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KB.png"
    },
    {
        "Code": "EA",
        "Name": "East Horizon Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EA.png"
    },
    {
        "Code": "ZE",
        "Name": "Eastar Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZE.png"
    },
    {
        "Code": "T3",
        "Name": "Eastern Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T3.png"
    },
    {
        "Code": "VE",
        "Name": "EasyFly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VE.png"
    },
    {
        "Code": "U2",
        "Name": "easyJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U2.png"
    },
    {
        "Code": "8J",
        "Name": "EcoJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8J.png"
    },
    {
        "Code": "WK",
        "Name": "Edelweiss Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WK.png"
    },
    {
        "Code": "MS",
        "Name": "EgyptAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MS.png"
    },
    {
        "Code": "LY",
        "Name": "El Al",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LY.png"
    },
    {
        "Code": "LY*",
        "Name": "EL AL Israel Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "7Q",
        "Name": "Elite Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7Q.png"
    },
    {
        "Code": "EL",
        "Name": "Ellinair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EL.png"
    },
    {
        "Code": "EK",
        "Name": "Emirates",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "9E",
        "Name": "Endeavor Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9E.png"
    },
    {
        "Code": "E4",
        "Name": "Enter Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E4.png"
    },
    {
        "Code": "LC",
        "Name": "Equatorial Congo Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LC.png"
    },
    {
        "Code": "B8",
        "Name": "Eritrean Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B8.png"
    },
    {
        "Code": "EG",
        "Name": "Ernest",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EG.png"
    },
    {
        "Code": "E7",
        "Name": "Estafeta Carga Aerea",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E7.png"
    },
    {
        "Code": "ES",
        "Name": "Estelar",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ES.png"
    },
    {
        "Code": "OV*",
        "Name": "Estonian Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "ET",
        "Name": "Ethiopian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ET.png"
    },
    {
        "Code": "EY",
        "Name": "Etihad Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EY.png"
    },
    {
        "Code": "F7",
        "Name": "Etihad Regional",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F7.png"
    },
    {
        "Code": "Q4",
        "Name": "Euro Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q4.png"
    },
    {
        "Code": "YU",
        "Name": "EuroAtlantic Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YU.png"
    },
    {
        "Code": "4L",
        "Name": "Euroline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4L.png"
    },
    {
        "Code": "K2",
        "Name": "EuroLOT",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K2.png"
    },
    {
        "Code": "9F",
        "Name": "Eurostar",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9F.png"
    },
    {
        "Code": "EW",
        "Name": "Eurowings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EW.png"
    },
    {
        "Code": "BR",
        "Name": "EVA Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BR.png"
    },
    {
        "Code": "5V",
        "Name": "Everts Air Alaska",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5V.png"
    },
    {
        "Code": "ZD",
        "Name": "EWA Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZD.png"
    },
    {
        "Code": "8K",
        "Name": "Exploits Valley Air Services",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8K.png"
    },
    {
        "Code": "XN",
        "Name": "Express Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XN.png"
    },
    {
        "Code": "7A",
        "Name": "Express Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7A.png"
    },
    {
        "Code": "EV",
        "Name": "ExpressJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EV.png"
    },
    {
        "Code": "MG",
        "Name": "Eznis Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MG.png"
    },
    {
        "Code": "FE",
        "Name": "Far Eastern Air Transport",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FE.png"
    },
    {
        "Code": "FX",
        "Name": "FedEx",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FX.png"
    },
    {
        "Code": "FJ",
        "Name": "Fiji Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FJ.png"
    },
    {
        "Code": "AY",
        "Name": "Finnair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AY.png"
    },
    {
        "Code": "FC",
        "Name": "Finncomm Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FC.png"
    },
    {
        "Code": "FY",
        "Name": "Firefly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FY.png"
    },
    {
        "Code": "7F",
        "Name": "First Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7F.png"
    },
    {
        "Code": "8D",
        "Name": "FitsAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8D.png"
    },
    {
        "Code": "F8",
        "Name": "Flair Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F8.png"
    },
    {
        "Code": "W2",
        "Name": "Flexflight",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W2.png"
    },
    {
        "Code": "ZC",
        "Name": "Fly Africa Zimbabwe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZC.png"
    },
    {
        "Code": "8W",
        "Name": "Fly AllWays",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8W.png"
    },
    {
        "Code": "IF",
        "Name": "Fly Baghdad",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IF.png"
    },
    {
        "Code": "B4",
        "Name": "Fly Beond",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B4.png"
    },
    {
        "Code": "9Y",
        "Name": "Fly Georgia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9Y.png"
    },
    {
        "Code": "OJ",
        "Name": "Fly Jamaica",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OJ.png"
    },
    {
        "Code": "9P",
        "Name": "Fly Jinnah",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9P.png"
    },
    {
        "Code": "F0",
        "Name": "Fly Jordan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F0.png"
    },
    {
        "Code": "5F",
        "Name": "Fly One",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5F.png"
    },
    {
        "Code": "B5",
        "Name": "Fly SAX",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B5.png"
    },
    {
        "Code": "5H",
        "Name": "Fly540",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5H.png"
    },
    {
        "Code": "F3",
        "Name": "Flyadeal",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F3.png"
    },
    {
        "Code": "FS",
        "Name": "FlyArystan Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FS.png"
    },
    {
        "Code": "BE",
        "Name": "Flybe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BE.png"
    },
    {
        "Code": "FO",
        "Name": "Flybondi",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FO.png"
    },
    {
        "Code": "6W",
        "Name": "FlyBosnia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6W.png"
    },
    {
        "Code": "BU",
        "Name": "flyCAA",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BU.png"
    },
    {
        "Code": "FZ",
        "Name": "FlyDubai",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FZ.png"
    },
    {
        "Code": "FT",
        "Name": "FlyEgypt",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FT.png"
    },
    {
        "Code": "VP",
        "Name": "FlyMe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VP.png"
    },
    {
        "Code": "XY",
        "Name": "Flynas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XY.png"
    },
    {
        "Code": "FP",
        "Name": "FlyPelican",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FP.png"
    },
    {
        "Code": "FH",
        "Name": "Freebird Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FH.png"
    },
    {
        "Code": "BF",
        "Name": "French Bee",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BF.png"
    },
    {
        "Code": "F9",
        "Name": "Frontier Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F9.png"
    },
    {
        "Code": "JH",
        "Name": "Fuji Dream Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JH.png"
    },
    {
        "Code": "FU",
        "Name": "Fuzhou Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FU.png"
    },
    {
        "Code": "GA",
        "Name": "Garuda Indonesia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GA.png"
    },
    {
        "Code": "4G",
        "Name": "Gazpromavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4G.png"
    },
    {
        "Code": "9D",
        "Name": "Genghis Khan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9D.png"
    },
    {
        "Code": "A9",
        "Name": "Georgian Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A9.png"
    },
    {
        "Code": "ST",
        "Name": "Germania",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ST.png"
    },
    {
        "Code": "4U",
        "Name": "germanwings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4U.png"
    },
    {
        "Code": "GW",
        "Name": "GetJet Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GW.png"
    },
    {
        "Code": "G0",
        "Name": "Ghana International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G0.png"
    },
    {
        "Code": "GE",
        "Name": "Global Aviation Operations",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GE.png"
    },
    {
        "Code": "GH",
        "Name": "Globus",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GH.png"
    },
    {
        "Code": "Z5",
        "Name": "GMG Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z5.png"
    },
    {
        "Code": "6G",
        "Name": "Go2Sky",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6G.png"
    },
    {
        "Code": "G8",
        "Name": "GoFirst",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G8.png"
    },
    {
        "Code": "G3",
        "Name": "GOL Linhas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G3.png"
    },
    {
        "Code": "Y5",
        "Name": "Golden Myanmar Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y5.png"
    },
    {
        "Code": "G6",
        "Name": "Gowair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/G6.png"
    },
    {
        "Code": "YR",
        "Name": "Grand Canyon Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YR.png"
    },
    {
        "Code": "CN",
        "Name": "Grand China Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CN.png"
    },
    {
        "Code": "GV",
        "Name": "Grant Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GV.png"
    },
    {
        "Code": "DW",
        "Name": "Great Dane Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DW.png"
    },
    {
        "Code": "ZK",
        "Name": "Great Lakes Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZK.png"
    },
    {
        "Code": "Q9",
        "Name": "Green Africa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q9.png"
    },
    {
        "Code": "ZG",
        "Name": "Grozny Avia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZG.png"
    },
    {
        "Code": "GC",
        "Name": "Grumeti Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GC.png"
    },
    {
        "Code": "GF",
        "Name": "Gulf Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GF.png"
    },
    {
        "Code": "GX",
        "Name": "GX Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GX.png"
    },
    {
        "Code": "HR",
        "Name": "Hahn Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HR.png"
    },
    {
        "Code": "H1",
        "Name": "Hahn Air Systems",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H1.png"
    },
    {
        "Code": "HU",
        "Name": "Hainan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HU.png"
    },
    {
        "Code": "HK",
        "Name": "Hamburg Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HK.png"
    },
    {
        "Code": "HA",
        "Name": "Hawaiian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HA.png"
    },
    {
        "Code": "BH",
        "Name": "Hawkair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BH.png"
    },
    {
        "Code": "NS",
        "Name": "Hebei Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NS.png"
    },
    {
        "Code": "YO",
        "Name": "Heli Air Monaco",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YO.png"
    },
    {
        "Code": "HS",
        "Name": "Heli Securite",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HS.png"
    },
    {
        "Code": "JB",
        "Name": "Helijet International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JB.png"
    },
    {
        "Code": "2L",
        "Name": "Helvetic Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2L.png"
    },
    {
        "Code": "H3",
        "Name": "Hermes Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H3.png"
    },
    {
        "Code": "H8",
        "Name": "HESA Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H8.png"
    },
    {
        "Code": "5K",
        "Name": "Hi Fly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5K.png"
    },
    {
        "Code": "H9",
        "Name": "Himalaya Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H9.png"
    },
    {
        "Code": "OI",
        "Name": "Hinterland Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OI.png"
    },
    {
        "Code": "H4",
        "Name": "HISKY EUROPE SRL",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H4.png"
    },
    {
        "Code": "5Q",
        "Name": "Holiday Europe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5Q.png"
    },
    {
        "Code": "RH",
        "Name": "Hong Kong Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RH.png"
    },
    {
        "Code": "HX",
        "Name": "Hong Kong Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HX.png"
    },
    {
        "Code": "UO",
        "Name": "Hong Kong Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UO.png"
    },
    {
        "Code": "A5",
        "Name": "HOP",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A5.png"
    },
    {
        "Code": "YS",
        "Name": "HOP Regional",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YS.png"
    },
    {
        "Code": "QX",
        "Name": "Horizon Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QX.png"
    },
    {
        "Code": "MR",
        "Name": "Hunnu Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MR.png"
    },
    {
        "Code": "0Q",
        "Name": "Hydro-Quebec",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0Q.png"
    },
    {
        "Code": "I4",
        "Name": "I-Fly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I4.png"
    },
    {
        "Code": "II",
        "Name": "IBC Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/II.png"
    },
    {
        "Code": "IB",
        "Name": "Iberia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IB.png"
    },
    {
        "Code": "I2",
        "Name": "Iberia Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I2.png"
    },
    {
        "Code": "E9",
        "Name": "Iberojet Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E9.png"
    },
    {
        "Code": "IP",
        "Name": "Iberworld Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IP.png"
    },
    {
        "Code": "FW",
        "Name": "Ibex Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FW.png"
    },
    {
        "Code": "QI",
        "Name": "Ibom Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QI.png"
    },
    {
        "Code": "FI",
        "Name": "Icelandair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FI.png"
    },
    {
        "Code": "UV",
        "Name": "INAER",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UV.png"
    },
    {
        "Code": "IC",
        "Name": "Indian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IC.png"
    },
    {
        "Code": "6E",
        "Name": "IndiGo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6E.png"
    },
    {
        "Code": "I7",
        "Name": "Indonesia Air Transport",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I7.png"
    },
    {
        "Code": "QZ",
        "Name": "Indonesia AirAsia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QZ.png"
    },
    {
        "Code": "XT",
        "Name": "Indonesia AirAsia X",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XT.png"
    },
    {
        "Code": "7I",
        "Name": "Insel Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7I.png"
    },
    {
        "Code": "6K",
        "Name": "Inter Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6K.png"
    },
    {
        "Code": "D6",
        "Name": "Interair South Africa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D6.png"
    },
    {
        "Code": "JY",
        "Name": "InterCaribbean Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JY.png"
    },
    {
        "Code": "4O",
        "Name": "Interjet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4O.png"
    },
    {
        "Code": "K8",
        "Name": "InterJet West",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K8.png"
    },
    {
        "Code": "3L",
        "Name": "InterSky",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3L.png"
    },
    {
        "Code": "IO",
        "Name": "IrAero",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IO.png"
    },
    {
        "Code": "IR",
        "Name": "Iran Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IR.png"
    },
    {
        "Code": "B9",
        "Name": "Iran Airtour",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B9.png"
    },
    {
        "Code": "EP",
        "Name": "Iran Aseman Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EP.png"
    },
    {
        "Code": "IA",
        "Name": "Iraqi Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IA.png"
    },
    {
        "Code": "IH",
        "Name": "Irtysh Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IH.png"
    },
    {
        "Code": "WP",
        "Name": "Island Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WP.png"
    },
    {
        "Code": "6H",
        "Name": "Israir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6H.png"
    },
    {
        "Code": "I8",
        "Name": "Izhavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/I8.png"
    },
    {
        "Code": "JC",
        "Name": "JAL Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JC.png"
    },
    {
        "Code": "JO",
        "Name": "JALways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JO.png"
    },
    {
        "Code": "J0",
        "Name": "Jam Airlink Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J0.png"
    },
    {
        "Code": "JM",
        "Name": "Jambojet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JM.png"
    },
    {
        "Code": "3X",
        "Name": "Japan Air Commuter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3X.png"
    },
    {
        "Code": "JL",
        "Name": "Japan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JL.png"
    },
    {
        "Code": "NU",
        "Name": "Japan Transocean Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NU.png"
    },
    {
        "Code": "J9",
        "Name": "Jazeera",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J9.png"
    },
    {
        "Code": "QD",
        "Name": "JC Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QD.png"
    },
    {
        "Code": "7C",
        "Name": "Jeju Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7C.png"
    },
    {
        "Code": "O2",
        "Name": "Jet Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O2.png"
    },
    {
        "Code": "9W",
        "Name": "Jet Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9W.png"
    },
    {
        "Code": "JF",
        "Name": "Jet Asia Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JF.png"
    },
    {
        "Code": "S2",
        "Name": "Jet Konnect",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S2.png"
    },
    {
        "Code": "LS",
        "Name": "Jet2",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LS.png"
    },
    {
        "Code": "TB",
        "Name": "Jetairfly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TB.png"
    },
    {
        "Code": "B6",
        "Name": "JetBlue Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B6.png"
    },
    {
        "Code": "0J",
        "Name": "Jetclub",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0J.png"
    },
    {
        "Code": "10",
        "Name": "Jetlink Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/10.png"
    },
    {
        "Code": "JA",
        "Name": "JetSMART",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JA.png"
    },
    {
        "Code": "JQ",
        "Name": "Jetstar Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JQ.png"
    },
    {
        "Code": "3K",
        "Name": "Jetstar Asia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3K.png"
    },
    {
        "Code": "GK",
        "Name": "Jetstar Japan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GK.png"
    },
    {
        "Code": "BL",
        "Name": "Jetstar Pacific",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BL.png"
    },
    {
        "Code": "WU",
        "Name": "Jetways Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WU.png"
    },
    {
        "Code": "RY",
        "Name": "Jiangxi Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RY.png"
    },
    {
        "Code": "LJ",
        "Name": "Jin Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LJ.png"
    },
    {
        "Code": "R5",
        "Name": "Jordan Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R5.png"
    },
    {
        "Code": "JR",
        "Name": "JoyAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JR.png"
    },
    {
        "Code": "D9",
        "Name": "JSC Donavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D9.png"
    },
    {
        "Code": "XE",
        "Name": "JSX",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XE.png"
    },
    {
        "Code": "HO",
        "Name": "Juneyao Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HO.png"
    },
    {
        "Code": "K4",
        "Name": "Kalitta Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K4.png"
    },
    {
        "Code": "K9",
        "Name": "Kalitta Charters",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K9.png"
    },
    {
        "Code": "RQ",
        "Name": "Kam Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RQ.png"
    },
    {
        "Code": "U5",
        "Name": "Karinou Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U5.png"
    },
    {
        "Code": "3Y",
        "Name": "Kartika Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3Y.png"
    },
    {
        "Code": "NV",
        "Name": "Karun Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NV.png"
    },
    {
        "Code": "FK",
        "Name": "Kelowna Flightcraft Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FK.png"
    },
    {
        "Code": "M5",
        "Name": "Kenmore Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M5.png"
    },
    {
        "Code": "4K",
        "Name": "Kenn Borek Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4K.png"
    },
    {
        "Code": "KQ",
        "Name": "Kenya Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KQ.png"
    },
    {
        "Code": "KG",
        "Name": "Key Lime Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KG.png"
    },
    {
        "Code": "KW",
        "Name": "Kharkiv Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KW.png"
    },
    {
        "Code": "Y9",
        "Name": "Kish Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y9.png"
    },
    {
        "Code": "KL",
        "Name": "KLM",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KL.png"
    },
    {
        "Code": "WA",
        "Name": "KLM Cityhopper",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WA.png"
    },
    {
        "Code": "KV",
        "Name": "KMV Avia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KV.png"
    },
    {
        "Code": "7K",
        "Name": "Kolavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7K.png"
    },
    {
        "Code": "KO",
        "Name": "Komiaviatrans",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KO.png"
    },
    {
        "Code": "KE",
        "Name": "Korean Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KE.png"
    },
    {
        "Code": "KY",
        "Name": "Kunming Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KY.png"
    },
    {
        "Code": "KU",
        "Name": "Kuwait Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KU.png"
    },
    {
        "Code": "A0",
        "Name": "L'Avion",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/A0.png"
    },
    {
        "Code": "B0",
        "Name": "La Compagnie",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B0.png"
    },
    {
        "Code": "LR",
        "Name": "LACSA",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LR.png"
    },
    {
        "Code": "TM",
        "Name": "LAM Mozambique Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TM.png"
    },
    {
        "Code": "LQ",
        "Name": "Lanmei Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LQ.png"
    },
    {
        "Code": "QV",
        "Name": "Lao Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QV.png"
    },
    {
        "Code": "LK",
        "Name": "Lao Skyway",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LK.png"
    },
    {
        "Code": "QL",
        "Name": "Laser Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QL.png"
    },
    {
        "Code": "4M",
        "Name": "LATAM Argentina",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4M.png"
    },
    {
        "Code": "JJ",
        "Name": "LATAM Brasil",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JJ.png"
    },
    {
        "Code": "M3",
        "Name": "LATAM Cargo Brasil",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M3.png"
    },
    {
        "Code": "UC",
        "Name": "LATAM Cargo Chile",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UC.png"
    },
    {
        "Code": "L7",
        "Name": "LATAM Cargo Colombia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L7.png"
    },
    {
        "Code": "LA",
        "Name": "LATAM Chile",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LA.png"
    },
    {
        "Code": "4C",
        "Name": "LATAM Colombia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4C.png"
    },
    {
        "Code": "XL",
        "Name": "LATAM Ecuador",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XL.png"
    },
    {
        "Code": "LP",
        "Name": "LATAM Peru",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LP.png"
    },
    {
        "Code": "NG",
        "Name": "Lauda Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NG.png"
    },
    {
        "Code": "OE",
        "Name": "Laudamotion",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OE.png"
    },
    {
        "Code": "IB",
        "Name": "LEVEL",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IB.png"
    },
    {
        "Code": "LI",
        "Name": "LIAT",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LI.png"
    },
    {
        "Code": "LN",
        "Name": "Libyan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LN.png"
    },
    {
        "Code": "YL",
        "Name": "Libyan Wings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YL.png"
    },
    {
        "Code": "L5",
        "Name": "Linea Aerea Cuencana",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L5.png"
    },
    {
        "Code": "JT",
        "Name": "Lion Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JT.png"
    },
    {
        "Code": "LM",
        "Name": "Loganair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LM.png"
    },
    {
        "Code": "GI",
        "Name": "Longhao Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GI.png"
    },
    {
        "Code": "LT",
        "Name": "LongJiang Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LT.png"
    },
    {
        "Code": "GJ",
        "Name": "Loong Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GJ.png"
    },
    {
        "Code": "LO",
        "Name": "LOT Polish Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LO.png"
    },
    {
        "Code": "8L",
        "Name": "Lucky Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8L.png"
    },
    {
        "Code": "HE",
        "Name": "Luftfahrtgesellschaft Walter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HE.png"
    },
    {
        "Code": "LH",
        "Name": "Lufthansa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LH.png"
    },
    {
        "Code": "CL",
        "Name": "Lufthansa CityLine",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CL.png"
    },
    {
        "Code": "LW",
        "Name": "Lumiwings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LW.png"
    },
    {
        "Code": "LG",
        "Name": "Luxair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LG.png"
    },
    {
        "Code": "L2",
        "Name": "Lynden Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L2.png"
    },
    {
        "Code": "W5",
        "Name": "Mahan Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W5.png"
    },
    {
        "Code": "3W",
        "Name": "Malawian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3W.png"
    },
    {
        "Code": "MH",
        "Name": "Malaysia Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MH.png"
    },
    {
        "Code": "Q2",
        "Name": "Maldivian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q2.png"
    },
    {
        "Code": "DB",
        "Name": "Maleth-Aero",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DB.png"
    },
    {
        "Code": "MA",
        "Name": "Malev",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MA.png"
    },
    {
        "Code": "AE",
        "Name": "Mandarin Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AE.png"
    },
    {
        "Code": "JE",
        "Name": "Mango",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JE.png"
    },
    {
        "Code": "7Y",
        "Name": "Mann Yadanarpon Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7Y.png"
    },
    {
        "Code": "NR",
        "Name": "Manta Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NR.png"
    },
    {
        "Code": "NM",
        "Name": "Manx2",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NM.png"
    },
    {
        "Code": "7M",
        "Name": "Map Linhas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7M.png"
    },
    {
        "Code": "MP",
        "Name": "Martinair Holland",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MP.png"
    },
    {
        "Code": "M7",
        "Name": "MasAir Cargo Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M7.png"
    },
    {
        "Code": "7B",
        "Name": "Maswings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7B.png"
    },
    {
        "Code": "MY",
        "Name": "MASwings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MY.png"
    },
    {
        "Code": "YD",
        "Name": "Mauritania Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YD.png"
    },
    {
        "Code": "L6",
        "Name": "Mauritanian Airlines Int",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/L6.png"
    },
    {
        "Code": "VM",
        "Name": "Max Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VM.png"
    },
    {
        "Code": "2M",
        "Name": "Maya Island Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2M.png"
    },
    {
        "Code": "5G",
        "Name": "MAYAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5G.png"
    },
    {
        "Code": "ME",
        "Name": "MEA",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ME.png"
    },
    {
        "Code": "VL",
        "Name": "Med-View Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VL.png"
    },
    {
        "Code": "LV",
        "Name": "Mega Maldives",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LV.png"
    },
    {
        "Code": "JI",
        "Name": "Meraj Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JI.png"
    },
    {
        "Code": "YV",
        "Name": "Mesa Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YV.png"
    },
    {
        "Code": "MX",
        "Name": "Mexicana",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MX.png"
    },
    {
        "Code": "M2",
        "Name": "MHS Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M2.png"
    },
    {
        "Code": "LL",
        "Name": "Miami Air International",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LL.png"
    },
    {
        "Code": "OM",
        "Name": "MIAT Mongolian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OM.png"
    },
    {
        "Code": "8G",
        "Name": "Mid Africa Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8G.png"
    },
    {
        "Code": "IM",
        "Name": "Mint Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IM.png"
    },
    {
        "Code": "MB",
        "Name": "MNG Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MB.png"
    },
    {
        "Code": "MW",
        "Name": "Mokulele Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MW.png"
    },
    {
        "Code": "QM",
        "Name": "Monacair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QM.png"
    },
    {
        "Code": "YM",
        "Name": "Montenegro Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YM.png"
    },
    {
        "Code": "5M",
        "Name": "Montserrat Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5M.png"
    },
    {
        "Code": "M9",
        "Name": "Motor Sich Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M9.png"
    },
    {
        "Code": "6V",
        "Name": "MRK Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6V.png"
    },
    {
        "Code": "2Y",
        "Name": "My Indo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2Y.png"
    },
    {
        "Code": "8M",
        "Name": "Myanmar Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8M.png"
    },
    {
        "Code": "UB",
        "Name": "Myanmar National Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UB.png"
    },
    {
        "Code": "MJ",
        "Name": "MyWay Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MJ.png"
    },
    {
        "Code": "IN",
        "Name": "Nam Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IN.png"
    },
    {
        "Code": "N8",
        "Name": "National Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N8.png"
    },
    {
        "Code": "9O",
        "Name": "National Airways Cameroon",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9O.png"
    },
    {
        "Code": "ON",
        "Name": "Nauru Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ON.png"
    },
    {
        "Code": "ZN",
        "Name": "Naysa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZN.png"
    },
    {
        "Code": "NO",
        "Name": "Neos",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NO.png"
    },
    {
        "Code": "NE",
        "Name": "Nesma Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NE.png"
    },
    {
        "Code": "NA",
        "Name": "Nesma Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NA.png"
    },
    {
        "Code": "1I",
        "Name": "NetJets",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/1I.png"
    },
    {
        "Code": "EJ",
        "Name": "New England Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EJ.png"
    },
    {
        "Code": "E3",
        "Name": "NewGen Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/E3.png"
    },
    {
        "Code": "2N",
        "Name": "Nextjet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2N.png"
    },
    {
        "Code": "N7",
        "Name": "NHT Linhas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N7.png"
    },
    {
        "Code": "JX",
        "Name": "Nice Helicopteres",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JX.png"
    },
    {
        "Code": "HG",
        "Name": "Niki",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HG.png"
    },
    {
        "Code": "NP",
        "Name": "Nile Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NP.png"
    },
    {
        "Code": "KZ",
        "Name": "Nippon Cargo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KZ.png"
    },
    {
        "Code": "DD",
        "Name": "Nok Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DD.png"
    },
    {
        "Code": "XW",
        "Name": "NokScoot",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XW.png"
    },
    {
        "Code": "N5",
        "Name": "Nolinor Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N5.png"
    },
    {
        "Code": "Y7",
        "Name": "NordStar",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y7.png"
    },
    {
        "Code": "N4",
        "Name": "Nordwind Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N4.png"
    },
    {
        "Code": "NA*",
        "Name": "North American Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "HW",
        "Name": "North-Wright Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HW.png"
    },
    {
        "Code": "NC",
        "Name": "Northern Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NC.png"
    },
    {
        "Code": "NW",
        "Name": "Northwest Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NW.png"
    },
    {
        "Code": "J3",
        "Name": "Northwestern Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/J3.png"
    },
    {
        "Code": "DY",
        "Name": "Norwegian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DY.png"
    },
    {
        "Code": "DU",
        "Name": "Norwegian Long Haul AS",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DU.png"
    },
    {
        "Code": "BJ",
        "Name": "Nouvelair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BJ.png"
    },
    {
        "Code": "O9",
        "Name": "Nova Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O9.png"
    },
    {
        "Code": "N9",
        "Name": "Novair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N9.png"
    },
    {
        "Code": "VQ",
        "Name": "Novoair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VQ.png"
    },
    {
        "Code": "O6",
        "Name": "Ocean Air Linhas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O6.png"
    },
    {
        "Code": "BK",
        "Name": "Okay Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BK.png"
    },
    {
        "Code": "OA",
        "Name": "Olympic Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OA.png"
    },
    {
        "Code": "OP",
        "Name": "Olympic Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OP.png"
    },
    {
        "Code": "WY",
        "Name": "Oman Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WY.png"
    },
    {
        "Code": "8Q",
        "Name": "Onur Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8Q.png"
    },
    {
        "Code": "EC",
        "Name": "OpenSkies",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EC.png"
    },
    {
        "Code": "O4",
        "Name": "Orange2fly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O4.png"
    },
    {
        "Code": "6O",
        "Name": "Orbest",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6O.png"
    },
    {
        "Code": "R2",
        "Name": "Orenair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R2.png"
    },
    {
        "Code": "O7",
        "Name": "Orenburzhye",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O7.png"
    },
    {
        "Code": "OX",
        "Name": "Orient Thai Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OX.png"
    },
    {
        "Code": "OF",
        "Name": "Overland Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OF.png"
    },
    {
        "Code": "8P",
        "Name": "Pacific Coastal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "PK",
        "Name": "Pakistan International Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PK.png"
    },
    {
        "Code": "PB",
        "Name": "PAL Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PB.png"
    },
    {
        "Code": "8Y",
        "Name": "Pan Pacific Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8Y.png"
    },
    {
        "Code": "8A",
        "Name": "Panama Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8A.png"
    },
    {
        "Code": "GP*",
        "Name": "Pantanal Linhas AΘreas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "ZP",
        "Name": "Paranair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZP.png"
    },
    {
        "Code": "P6",
        "Name": "Pascan Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P6.png"
    },
    {
        "Code": "2Z",
        "Name": "Passaredo Linhas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2Z.png"
    },
    {
        "Code": "MM",
        "Name": "Peach Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MM.png"
    },
    {
        "Code": "EO",
        "Name": "Pegas Fly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EO.png"
    },
    {
        "Code": "PC",
        "Name": "Pegasus Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PC.png"
    },
    {
        "Code": "KS",
        "Name": "Penair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KS.png"
    },
    {
        "Code": "PE",
        "Name": "People's",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PE.png"
    },
    {
        "Code": "YP",
        "Name": "Perimeter Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YP.png"
    },
    {
        "Code": "P9",
        "Name": "Peruvian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P9.png"
    },
    {
        "Code": "PR",
        "Name": "Philippine Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PR.png"
    },
    {
        "Code": "3I",
        "Name": "Pison Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3I.png"
    },
    {
        "Code": "PU",
        "Name": "Plus Ultra",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PU.png"
    },
    {
        "Code": "DP",
        "Name": "Pobeda",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DP.png"
    },
    {
        "Code": "PO",
        "Name": "Polar Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PO.png"
    },
    {
        "Code": "PI",
        "Name": "Polar Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PI.png"
    },
    {
        "Code": "OL",
        "Name": "Polynesian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OL.png"
    },
    {
        "Code": "PD",
        "Name": "Porter Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PD.png"
    },
    {
        "Code": "M4",
        "Name": "Poste Air Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M4.png"
    },
    {
        "Code": "PW",
        "Name": "Precision Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PW.png"
    },
    {
        "Code": "XX",
        "Name": "Private Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XX.png"
    },
    {
        "Code": "YZ",
        "Name": "Privateways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YZ.png"
    },
    {
        "Code": "P0",
        "Name": "Proflight Air Services",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P0.png"
    },
    {
        "Code": "QF",
        "Name": "Qantas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QF.png"
    },
    {
        "Code": "QR",
        "Name": "Qatar Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QR.png"
    },
    {
        "Code": "QB",
        "Name": "Qeshm Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QB.png"
    },
    {
        "Code": "QW",
        "Name": "Qingdao Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QW.png"
    },
    {
        "Code": "QO",
        "Name": "Quikjet Cargo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QO.png"
    },
    {
        "Code": "R4",
        "Name": "Rano Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R4.png"
    },
    {
        "Code": "7H",
        "Name": "Ravn Alaska",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7H.png"
    },
    {
        "Code": "TH",
        "Name": "Raya Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TH.png"
    },
    {
        "Code": "WZ",
        "Name": "Red Wings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WZ.png"
    },
    {
        "Code": "RX",
        "Name": "Regent Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RX.png"
    },
    {
        "Code": "8N",
        "Name": "Regional Air Services",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8N.png"
    },
    {
        "Code": "FN",
        "Name": "Regional Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FN.png"
    },
    {
        "Code": "ZL",
        "Name": "Regional Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZL.png"
    },
    {
        "Code": "EE",
        "Name": "Regional Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EE.png"
    },
    {
        "Code": "YX",
        "Name": "Republic Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YX.png"
    },
    {
        "Code": "T4",
        "Name": "Rhoades Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T4.png"
    },
    {
        "Code": "FV",
        "Name": "Rossiya Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FV.png"
    },
    {
        "Code": "RG",
        "Name": "Rotana Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RG.png"
    },
    {
        "Code": "AT",
        "Name": "Royal Air Maroc",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AT.png"
    },
    {
        "Code": "BI",
        "Name": "Royal Brunei Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BI.png"
    },
    {
        "Code": "RL",
        "Name": "Royal Flight",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RL.png"
    },
    {
        "Code": "RJ",
        "Name": "Royal Jordanian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RJ.png"
    },
    {
        "Code": "RA",
        "Name": "Royal Nepal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RA.png"
    },
    {
        "Code": "RW",
        "Name": "Royal wings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RW.png"
    },
    {
        "Code": "DR",
        "Name": "Ruili Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DR.png"
    },
    {
        "Code": "7R",
        "Name": "Rusline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7R.png"
    },
    {
        "Code": "5R",
        "Name": "Rutaca Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5R.png"
    },
    {
        "Code": "WB",
        "Name": "RwandAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WB.png"
    },
    {
        "Code": "7S",
        "Name": "Ryan Air (USA)",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7S.png"
    },
    {
        "Code": "FR",
        "Name": "Ryanair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FR.png"
    },
    {
        "Code": "FA",
        "Name": "Safair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FA.png"
    },
    {
        "Code": "F2",
        "Name": "Safarilink Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/F2.png"
    },
    {
        "Code": "4Q",
        "Name": "Safi Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4Q.png"
    },
    {
        "Code": "OV",
        "Name": "SalamAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OV.png"
    },
    {
        "Code": "RZ",
        "Name": "Sansa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RZ.png"
    },
    {
        "Code": "S3",
        "Name": "Santa Barbara Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S3.png"
    },
    {
        "Code": "SK",
        "Name": "SAS Scandinavian",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SK.png"
    },
    {
        "Code": "SP",
        "Name": "SATA Air Acores",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SP.png"
    },
    {
        "Code": "9R",
        "Name": "Satena",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9R.png"
    },
    {
        "Code": "SV",
        "Name": "Saudi Arabian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SV.png"
    },
    {
        "Code": "6S",
        "Name": "Saudi Gulf Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6S.png"
    },
    {
        "Code": "DV",
        "Name": "SCAT Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DV.png"
    },
    {
        "Code": "TR",
        "Name": "Scoot",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TR.png"
    },
    {
        "Code": "CB",
        "Name": "ScotAirways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/CB.png"
    },
    {
        "Code": "BB",
        "Name": "Seaborne Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BB.png"
    },
    {
        "Code": "K5",
        "Name": "SeaPort/Wings Of Alaska",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/K5.png"
    },
    {
        "Code": "DN",
        "Name": "Senegal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DN.png"
    },
    {
        "Code": "HC",
        "Name": "Senegal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HC.png"
    },
    {
        "Code": "IS",
        "Name": "Sepehran Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IS.png"
    },
    {
        "Code": "ER",
        "Name": "Serene Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ER.png"
    },
    {
        "Code": "D2",
        "Name": "Severstal Aircompany",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/D2.png"
    },
    {
        "Code": "O3",
        "Name": "SF Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O3.png"
    },
    {
        "Code": "NL",
        "Name": "Shaheen Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NL.png"
    },
    {
        "Code": "SC",
        "Name": "Shandong Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SC.png"
    },
    {
        "Code": "FM",
        "Name": "Shanghai Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FM.png"
    },
    {
        "Code": "ZH",
        "Name": "Shenzhen Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZH.png"
    },
    {
        "Code": "N9",
        "Name": "Shree Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/N9.png"
    },
    {
        "Code": "O8",
        "Name": "Siam Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/O8.png"
    },
    {
        "Code": "5E",
        "Name": "Siam General Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5E.png"
    },
    {
        "Code": "S7",
        "Name": "Siberia Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S7.png"
    },
    {
        "Code": "3U",
        "Name": "Sichuan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3U.png"
    },
    {
        "Code": "7L",
        "Name": "Silk Way West Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7L.png"
    },
    {
        "Code": "MI",
        "Name": "SilkAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MI.png"
    },
    {
        "Code": "3M",
        "Name": "Silver Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3M.png"
    },
    {
        "Code": "SQ",
        "Name": "Singapore Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SQ.png"
    },
    {
        "Code": "H2",
        "Name": "Sky Airline",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H2.png"
    },
    {
        "Code": "ZA",
        "Name": "Sky Angkor Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZA.png"
    },
    {
        "Code": "Q7",
        "Name": "Sky Bahamas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q7.png"
    },
    {
        "Code": "GQ",
        "Name": "Sky Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GQ.png"
    },
    {
        "Code": "U3",
        "Name": "Sky Gates Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U3.png"
    },
    {
        "Code": "GG",
        "Name": "Sky Lease Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GG.png"
    },
    {
        "Code": "TE",
        "Name": "Sky Taxi",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TE.png"
    },
    {
        "Code": "SX",
        "Name": "Sky Work Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SX.png"
    },
    {
        "Code": "M8",
        "Name": "SkyJet Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/M8.png"
    },
    {
        "Code": "BC",
        "Name": "Skymark Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BC.png"
    },
    {
        "Code": "QN",
        "Name": "Skytrans",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QN.png"
    },
    {
        "Code": "PQ",
        "Name": "SkyUp Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PQ.png"
    },
    {
        "Code": "OW",
        "Name": "Skyward Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OW.png"
    },
    {
        "Code": "JZ",
        "Name": "Skyways AB",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JZ.png"
    },
    {
        "Code": "OO",
        "Name": "SkyWest Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OO.png"
    },
    {
        "Code": "S0",
        "Name": "Slok Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S0.png"
    },
    {
        "Code": "S5",
        "Name": "Small Planet Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S5.png"
    },
    {
        "Code": "5N",
        "Name": "Smartavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5N.png"
    },
    {
        "Code": "6Y",
        "Name": "SmartLynx Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6Y.png"
    },
    {
        "Code": "QS",
        "Name": "Smartwings",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/QS.png"
    },
    {
        "Code": "2C",
        "Name": "SNCF Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2C.png"
    },
    {
        "Code": "8R",
        "Name": "Sol Lineas Aereas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8R.png"
    },
    {
        "Code": "6J",
        "Name": "Solaseed Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/6J.png"
    },
    {
        "Code": "IE",
        "Name": "Solomon Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IE.png"
    },
    {
        "Code": "SZ*",
        "Name": "Somon Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "SZ",
        "Name": "Somon Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SZ.png"
    },
    {
        "Code": "S8",
        "Name": "Sounds Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S8.png"
    },
    {
        "Code": "SA",
        "Name": "South African Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SA.png"
    },
    {
        "Code": "XZ",
        "Name": "South African Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XZ.png"
    },
    {
        "Code": "DG",
        "Name": "South East Asian Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DG.png"
    },
    {
        "Code": "9S",
        "Name": "Southern Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9S.png"
    },
    {
        "Code": "4P",
        "Name": "Southern Star Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4P.png"
    },
    {
        "Code": "WN",
        "Name": "Southwest Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WN.png"
    },
    {
        "Code": "5W",
        "Name": "Speed Alliance",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5W.png"
    },
    {
        "Code": "SG",
        "Name": "SpiceJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SG.png"
    },
    {
        "Code": "NK",
        "Name": "Spirit Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NK.png"
    },
    {
        "Code": "9C",
        "Name": "Spring Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9C.png"
    },
    {
        "Code": "IJ",
        "Name": "Spring Airlines Japan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IJ.png"
    },
    {
        "Code": "P8",
        "Name": "Sprint Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/P8.png"
    },
    {
        "Code": "UL",
        "Name": "SriLankan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UL.png"
    },
    {
        "Code": "SJ",
        "Name": "Sriwijaya Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SJ.png"
    },
    {
        "Code": "PV",
        "Name": "St Barth Commuter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PV.png"
    },
    {
        "Code": "DJ",
        "Name": "Star Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DJ.png"
    },
    {
        "Code": "OG",
        "Name": "Star Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/OG.png"
    },
    {
        "Code": "S5",
        "Name": "Star Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/S5.png"
    },
    {
        "Code": "4R",
        "Name": "Star East Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4R.png"
    },
    {
        "Code": "2I",
        "Name": "Star Peru",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2I.png"
    },
    {
        "Code": "7G",
        "Name": "Starflyer",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7G.png"
    },
    {
        "Code": "Q4",
        "Name": "Starlink Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q4.png"
    },
    {
        "Code": "NB",
        "Name": "Sterling",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NB.png"
    },
    {
        "Code": "RE",
        "Name": "Stobart Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RE.png"
    },
    {
        "Code": "SD",
        "Name": "Sudan Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SD.png"
    },
    {
        "Code": "9X",
        "Name": "Sun Air of Scandinavia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9X.png"
    },
    {
        "Code": "SY",
        "Name": "Sun Country Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SY.png"
    },
    {
        "Code": "2U",
        "Name": "Sun d'Or",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2U.png"
    },
    {
        "Code": "EZ",
        "Name": "Sun-Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EZ.png"
    },
    {
        "Code": "SR",
        "Name": "Sundair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SR.png"
    },
    {
        "Code": "XQ",
        "Name": "SunExpress",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XQ.png"
    },
    {
        "Code": "XG",
        "Name": "SunExpress",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XG.png"
    },
    {
        "Code": "WG",
        "Name": "Sunwing Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WG.png"
    },
    {
        "Code": "Y8",
        "Name": "Suparna Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y8.png"
    },
    {
        "Code": "PY",
        "Name": "Surinam Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PY.png"
    },
    {
        "Code": "WQ",
        "Name": "Swift Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WQ.png"
    },
    {
        "Code": "WT",
        "Name": "Swiftair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WT.png"
    },
    {
        "Code": "LX",
        "Name": "Swiss",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/LX.png"
    },
    {
        "Code": "WO",
        "Name": "Swoop",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WO.png"
    },
    {
        "Code": "7E",
        "Name": "Sylt Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7E.png"
    },
    {
        "Code": "Y3",
        "Name": "Syphax Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y3.png"
    },
    {
        "Code": "RB",
        "Name": "Syrian Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RB.png"
    },
    {
        "Code": "TW",
        "Name": "T'way Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TW.png"
    },
    {
        "Code": "DT",
        "Name": "TAAG Angola Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/DT.png"
    },
    {
        "Code": "HH",
        "Name": "Taban Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HH.png"
    },
    {
        "Code": "TA",
        "Name": "Taca Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TA.png"
    },
    {
        "Code": "VR",
        "Name": "TACV Cape Verde Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VR.png"
    },
    {
        "Code": "TI",
        "Name": "Tailwind Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TI.png"
    },
    {
        "Code": "7J",
        "Name": "Tajik Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7J.png"
    },
    {
        "Code": "PZ",
        "Name": "TAM Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PZ.png"
    },
    {
        "Code": "EQ",
        "Name": "TAME",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EQ.png"
    },
    {
        "Code": "Z3",
        "Name": "Tanana Air Service",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Z3.png"
    },
    {
        "Code": "NI",
        "Name": "TAP Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NI.png"
    },
    {
        "Code": "TP",
        "Name": "TAP Portugal",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TP.png"
    },
    {
        "Code": "YQ",
        "Name": "TAR Aerolineas",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YQ.png"
    },
    {
        "Code": "3T",
        "Name": "Tarco Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3T.png"
    },
    {
        "Code": "RO",
        "Name": "Tarom",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RO.png"
    },
    {
        "Code": "H7",
        "Name": "Taron-Avia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/H7.png"
    },
    {
        "Code": "SF",
        "Name": "Tassili Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SF.png"
    },
    {
        "Code": "U9",
        "Name": "Tatarstan Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U9.png"
    },
    {
        "Code": "X5",
        "Name": "Ten Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/X5.png"
    },
    {
        "Code": "FD",
        "Name": "Thai AirAsia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/FD.png"
    },
    {
        "Code": "XJ",
        "Name": "Thai AirAsia X",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XJ.png"
    },
    {
        "Code": "TG",
        "Name": "Thai Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TG.png"
    },
    {
        "Code": "SL",
        "Name": "Thai Lion Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SL.png"
    },
    {
        "Code": "WE",
        "Name": "Thai Smile",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WE.png"
    },
    {
        "Code": "VZ",
        "Name": "Thai Vietjet Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VZ.png"
    },
    {
        "Code": "MT",
        "Name": "Thomas Cook Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MT.png"
    },
    {
        "Code": "GS",
        "Name": "Tianjin Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GS.png"
    },
    {
        "Code": "3P",
        "Name": "Tiara Air Aruba",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/3P.png"
    },
    {
        "Code": "TV",
        "Name": "Tibet Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TV.png"
    },
    {
        "Code": "TT",
        "Name": "Tigerair Australia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TT.png"
    },
    {
        "Code": "TR*",
        "Name": "Tigerair Singapore",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EK.png"
    },
    {
        "Code": "IT",
        "Name": "Tigerair Taiwan",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IT.png"
    },
    {
        "Code": "ZT",
        "Name": "Titan Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZT.png"
    },
    {
        "Code": "C3",
        "Name": "Trade Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/C3.png"
    },
    {
        "Code": "TJ",
        "Name": "Tradewind Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TJ.png"
    },
    {
        "Code": "Q8",
        "Name": "Trans Air Congo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q8.png"
    },
    {
        "Code": "AX",
        "Name": "Trans States Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AX.png"
    },
    {
        "Code": "UN",
        "Name": "Transaero Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UN.png"
    },
    {
        "Code": "HV",
        "Name": "Transavia Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HV.png"
    },
    {
        "Code": "8B",
        "Name": "TransNusa",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8B.png"
    },
    {
        "Code": "IL",
        "Name": "Trigana Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IL.png"
    },
    {
        "Code": "9N",
        "Name": "Tropic Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/9N.png"
    },
    {
        "Code": "2T",
        "Name": "Trujet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2T.png"
    },
    {
        "Code": "TZ",
        "Name": "Tsaradia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TZ.png"
    },
    {
        "Code": "X3",
        "Name": "TUIfly",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/X3.png"
    },
    {
        "Code": "TU",
        "Name": "Tunisair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TU.png"
    },
    {
        "Code": "UG",
        "Name": "Tunisair Express",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UG.png"
    },
    {
        "Code": "TK",
        "Name": "Turkish Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/TK.png"
    },
    {
        "Code": "T5",
        "Name": "Turkmenistan Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T5.png"
    },
    {
        "Code": "T9",
        "Name": "Turpial Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T9.png"
    },
    {
        "Code": "U8",
        "Name": "Tus Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U8.png"
    },
    {
        "Code": "T7",
        "Name": "Twin Jet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/T7.png"
    },
    {
        "Code": "VO",
        "Name": "Tyrolean Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VO.png"
    },
    {
        "Code": "UR",
        "Name": "Uganda Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UR.png"
    },
    {
        "Code": "PS",
        "Name": "Ukraine Int. Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/PS.png"
    },
    {
        "Code": "W4",
        "Name": "Ulendo Airlink",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W4.png"
    },
    {
        "Code": "GO",
        "Name": "ULS Airlines Cargo",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/GO.png"
    },
    {
        "Code": "UE",
        "Name": "Ultimate Air Shuttle",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UE.png"
    },
    {
        "Code": "UF",
        "Name": "UM Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UF.png"
    },
    {
        "Code": "B7",
        "Name": "Uni Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/B7.png"
    },
    {
        "Code": "UW",
        "Name": "Uni-Top Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UW.png"
    },
    {
        "Code": "UA",
        "Name": "United Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UA.png"
    },
    {
        "Code": "5X",
        "Name": "UPS Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/5X.png"
    },
    {
        "Code": "UD",
        "Name": "UR Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UD.png"
    },
    {
        "Code": "U6",
        "Name": "Ural Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/U6.png"
    },
    {
        "Code": "UQ",
        "Name": "Urumqi Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UQ.png"
    },
    {
        "Code": "US",
        "Name": "US Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/US.png"
    },
    {
        "Code": "UH",
        "Name": "US Helicopter",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UH.png"
    },
    {
        "Code": "BS",
        "Name": "US-Bangla Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/BS.png"
    },
    {
        "Code": "UT",
        "Name": "UTair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UT.png"
    },
    {
        "Code": "RT",
        "Name": "UVT Aero",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/RT.png"
    },
    {
        "Code": "HY",
        "Name": "Uzbekistan Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/HY.png"
    },
    {
        "Code": "VF",
        "Name": "Valuair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VF.png"
    },
    {
        "Code": "VK",
        "Name": "ValueJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VK.png"
    },
    {
        "Code": "V9",
        "Name": "Van Air Europe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V9.png"
    },
    {
        "Code": "JW",
        "Name": "Vanilla Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/JW.png"
    },
    {
        "Code": "0V",
        "Name": "Vasco",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/0V.png"
    },
    {
        "Code": "VC",
        "Name": "ViaAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VC.png"
    },
    {
        "Code": "V4",
        "Name": "Vieques Air Link",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V4.png"
    },
    {
        "Code": "VJ",
        "Name": "VietJet Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VJ.png"
    },
    {
        "Code": "VN",
        "Name": "Vietnam Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VN.png"
    },
    {
        "Code": "NN",
        "Name": "VIM Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/NN.png"
    },
    {
        "Code": "VX",
        "Name": "Virgin America",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VX.png"
    },
    {
        "Code": "VS",
        "Name": "Virgin Atlantic",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VS.png"
    },
    {
        "Code": "VA",
        "Name": "Virgin Australia",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VA.png"
    },
    {
        "Code": "XR",
        "Name": "Virgin Australia Regional Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XR.png"
    },
    {
        "Code": "V2",
        "Name": "Vision Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V2.png"
    },
    {
        "Code": "UK",
        "Name": "Vistara",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/UK.png"
    },
    {
        "Code": "VH",
        "Name": "Viva Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VH.png"
    },
    {
        "Code": "VB",
        "Name": "VivaAerobus",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VB.png"
    },
    {
        "Code": "XF",
        "Name": "Vladivostok Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XF.png"
    },
    {
        "Code": "VG",
        "Name": "VLM Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VG.png"
    },
    {
        "Code": "Y4",
        "Name": "Volaris",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y4.png"
    },
    {
        "Code": "VI",
        "Name": "Volga-Dnepr Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VI.png"
    },
    {
        "Code": "V7",
        "Name": "Volotea",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/V7.png"
    },
    {
        "Code": "VY",
        "Name": "Vueling Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/VY.png"
    },
    {
        "Code": "EB",
        "Name": "Wamos Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/EB.png"
    },
    {
        "Code": "4W",
        "Name": "Warbelows Air Ventures",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/4W.png"
    },
    {
        "Code": "WH",
        "Name": "WDL Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WH.png"
    },
    {
        "Code": "2W",
        "Name": "Welcome Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/2W.png"
    },
    {
        "Code": "8O",
        "Name": "West Coast Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8O.png"
    },
    {
        "Code": "WV",
        "Name": "Westair Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WV.png"
    },
    {
        "Code": "KD",
        "Name": "Western Global Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/KD.png"
    },
    {
        "Code": "WS",
        "Name": "WestJet",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WS.png"
    },
    {
        "Code": "WR",
        "Name": "WestJet Encore",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WR.png"
    },
    {
        "Code": "WI",
        "Name": "White",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WI.png"
    },
    {
        "Code": "WF",
        "Name": "Wideroe",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WF.png"
    },
    {
        "Code": "WC",
        "Name": "Wildcat Touring",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WC.png"
    },
    {
        "Code": "WM",
        "Name": "Winair",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WM.png"
    },
    {
        "Code": "7W",
        "Name": "Windrose Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/7W.png"
    },
    {
        "Code": "IW",
        "Name": "Wings Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IW.png"
    },
    {
        "Code": "W7",
        "Name": "Wings of Lebanon",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W7.png"
    },
    {
        "Code": "W6",
        "Name": "Wizz Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/W6.png"
    },
    {
        "Code": "WL",
        "Name": "World Atlantic Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WL.png"
    },
    {
        "Code": "WW",
        "Name": "WOW air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/WW.png"
    },
    {
        "Code": "8V",
        "Name": "Wright Air Service",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/8V.png"
    },
    {
        "Code": "MF",
        "Name": "Xiamen Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/MF.png"
    },
    {
        "Code": "SE",
        "Name": "XL Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/SE.png"
    },
    {
        "Code": "XP",
        "Name": "Xtra Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XP.png"
    },
    {
        "Code": "R3",
        "Name": "Yakutia Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/R3.png"
    },
    {
        "Code": "YC",
        "Name": "Yamal Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YC.png"
    },
    {
        "Code": "YE",
        "Name": "YanAir",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YE.png"
    },
    {
        "Code": "Y0",
        "Name": "Yellow Air Taxi",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Y0.png"
    },
    {
        "Code": "IY",
        "Name": "Yemenia Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/IY.png"
    },
    {
        "Code": "YT",
        "Name": "Yeti Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YT.png"
    },
    {
        "Code": "YG",
        "Name": "YTO Cargo Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/YG.png"
    },
    {
        "Code": "ZO",
        "Name": "Zagros Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZO.png"
    },
    {
        "Code": "ZJ",
        "Name": "Zambezi Airlines",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/ZJ.png"
    },
    {
        "Code": "Q3",
        "Name": "Zambian Airways",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/Q3.png"
    },
    {
        "Code": "XM",
        "Name": "Zimex Aviation",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/XM.png"
    },
    {
        "Code": "AQ",
        "Name": "9 Air",
        "Icon": "https://mbiz-air-line-logo.s3.ap-south-1.amazonaws.com/small/AQ.png"
    }
]
export const airportData = [
    {
        "Code": "DVX",
        "Name": "Delaware Airpark",
        "CityName": "Dover",
        "CountryName": "United States",
        "__typename": "AirportResponse"
    },
    {
        "Code": "ESC",
        "Name": "Delta County",
        "CityName": "Escanaba",
        "CountryName": "United States",
        "__typename": "AirportResponse"
    },
    {
        "Code": "DEL",
        "Name": "Delhi Indira Gandhi International",
        "CityName": "Delhi",
        "CountryName": "India",
        "__typename": "AirportResponse"
    },
    {
        "Code": "STB",
        "Name": "Las Delicias Airport",
        "CityName": "Santa Barbara",
        "CountryName": "Venezuela",
        "__typename": "AirportResponse"
    },
    {
        "Code": "DDN",
        "Name": "Delta Downs Airport",
        "CityName": "Delta Downs",
        "CountryName": "Australia",
        "__typename": "AirportResponse"
    },
    {
        "Code": "AJA",
        "Name": "Campo Dell Oro Airport",
        "CityName": "Ajaccio",
        "CountryName": "France",
        "__typename": "AirportResponse"
    },
    {
        "Code": "XZZ",
        "Name": "Zaragoza-Delicias Railway Station",
        "CityName": "Zaragoza",
        "CountryName": "Spain",
        "__typename": "AirportResponse"
    },
    {
        "Code": "PMV",
        "Name": "Delcaribe Gen S Marino Airport",
        "CityName": "Porlamar",
        "CountryName": "Venezuela",
        "__typename": "AirportResponse"
    },
    {
        "Code": "ZSE",
        "Name": "St Pierre Dela Reunion Airport",
        "CityName": "St Pierre Dela Reunion",
        "CountryName": "Reunion",
        "__typename": "AirportResponse"
    },
    {
        "Code": "BJX",
        "Name": "Del Bajio Airport",
        "CityName": "Leon",
        "CountryName": "Mexico",
        "__typename": "AirportResponse"
    },
    {
        "Code": "DRT",
        "Name": "International Del Rio",
        "CityName": "Del Rio",
        "CountryName": "United States",
        "__typename": "AirportResponse"
    },
    {
        "Code": "NTR",
        "Name": "Aeropuerto Del Norte",
        "CityName": "Monterrey",
        "CountryName": "Mexico",
        "__typename": "AirportResponse"
    },
    {
        "Code": "BOC",
        "Name": "Bocas Del Toro Airport",
        "CityName": "Bocas Del Toro",
        "CountryName": "Panama",
        "__typename": "AirportResponse"
    },
    {
        "Code": "CME",
        "Name": "Ciudad Del Carmen Airport",
        "CityName": "Ciudad Del Carmen",
        "CountryName": "Mexico",
        "__typename": "AirportResponse"
    },
    {
        "Code": "KIC",
        "Name": "Mesa Del Rey Airport",
        "CityName": "King City",
        "CountryName": "United States",
        "__typename": "AirportResponse"
    },
    {
        "Code": "KNA",
        "Name": "Vina Del Mar Airport",
        "CityName": "Vina Del Mar",
        "CountryName": "Chile",
        "__typename": "AirportResponse"
    },
    {
        "Code": "MDQ",
        "Name": "Mar Del Plata Airport",
        "CityName": "Mar Del Plata",
        "CountryName": "Argentina",
        "__typename": "AirportResponse"
    },
    {
        "Code": "PCM",
        "Name": "Playa Del Carmen Airport",
        "CityName": "Riviera Maya / Playa del Carmen",
        "CountryName": "Mexico",
        "__typename": "AirportResponse"
    },
    {
        "Code": "CYO",
        "Name": "Cayo Largo Del Sur Airport",
        "CityName": "Cayo Largo Del Sur",
        "CountryName": "Cuba",
        "__typename": "AirportResponse"
    },
    {
        "Code": "RER",
        "Name": "Base Aerea Del Sur Airport",
        "CityName": "Retalhuleu",
        "CountryName": "Guatemala",
        "__typename": "AirportResponse"
    },
    {
        "Code": "AGT",
        "Name": "Alejo Garcia Airport",
        "CityName": "Ciudad Del Este",
        "CountryName": "Paraguay",
        "__typename": "AirportResponse"
    },
    {
        "Code": "PDP",
        "Name": "Cap Curbelo Airport",
        "CityName": "Punta Del Este",
        "CountryName": "Uruguay",
        "__typename": "AirportResponse"
    },
    {
        "Code": "SDE",
        "Name": "Santiago Des Estero Airport",
        "CityName": "Santiago Del Estero",
        "CountryName": "Argentina",
        "__typename": "AirportResponse"
    }
]

const payload = {
    "Name": "",
    "UserSegmentId": "68388a16d3a785c8681ccfbd",
    "InPolicy": true,
    "PolicyRevalidation": {
        "SearchResultPage": true,
        "ApprovalPage": false,
        "PaymentPage": false,
        "ReviewPage": false
    },
    "HideOutOfPolicy": false,
    "BookAbilityForOutOfPolicy": "DENY",
    "Constraints": [
        {
            "PolicyConstraintId": "682b6f6b78dd02dc382e1785",
            "PolicyConstraintName": "Airlines",
            "Rules": [
                {
                    "RuleDisplayOrder": 0,
                    "RuleDisplayName": "",
                    "RuleOperator": "NOT_APPLICABLE",
                    "RuleOptions": [
                        {
                            "MatchType": "EXACTLY_MATCHES",
                            "MatchValue": "GB"
                        },
                        {
                            "MatchType": "EXACTLY_MATCHES",
                            "MatchValue": "9B"
                        },
                        {
                            "MatchType": "EXACTLY_MATCHES",
                            "MatchValue": "A3"
                        },
                        {
                            "MatchType": "EXACTLY_MATCHES",
                            "MatchValue": "VW"
                        }
                    ],
                    "RuleId": "686e04d8780332d77d7ab088"
                }
            ]
        }
    ],
    "OrgEntityId": "*",
    "IsDefault": false,
    "Products": [
        "*"
    ]
}

export const test = {
    "ConstraintId": "6807f49ad20d161ce5dc82da",
    "ConstraintName": "Flight Fare",
    "BucketName": "Flights",
    "ConstraintRules": [
        {
            "RuleDisplayName": "Minimum Fare",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "6807e3d9d20d161ce5dc82d3",
                "RuleName": "Fare",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "greater than",
                            "Hint": "greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "less than",
                            "Hint": "less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "equals to",
                            "Hint": "equals to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "greater than or equals to",
                            "Hint": "greater than or equals to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "less than or equals to",
                            "Hint": "less than or equals to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "CURRENCY",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                    ],
                    "Message": "Invalid number format",
                    "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "Maximum Fare",
            "RuleDisplayOrder": 1,
            "Required": true,
            "Rule": {
                "RuleId": "6807e3d9d20d161ce5dc82d3",
                "RuleName": "Fare",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "greater than",
                            "Hint": "greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "less than",
                            "Hint": "less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "equals to",
                            "Hint": "equals to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "greater than or equals to",
                            "Hint": "greater than or equals to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "less than or equals to",
                            "Hint": "less than or equals to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "CURRENCY",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                    ],
                    "Message": "Invalid number format",
                    "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "Cheapest Options",
            "RuleDisplayOrder": 2,
            "Required": true,
            "Rule": {
                "RuleId": "6807ea4dd20d161ce5dc82d5",
                "RuleName": "CheapestOptions",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Books Any",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "RADIO",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "BOOKS_ANY",
                            "DisplayName": "Books Any",
                            "Hint": "No flexibility preference",
                            "ValidationKey": "BOOKS_ANY",
                            "ValuePlaceholder": "Select if any option works",
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_CHEAPEST_ANY",
                            "DisplayName": "Books Cheapest Any",
                            "Hint": "Only the cheapest option allowed",
                            "ValidationKey": "BOOK_CHEAPEST_ONLY",
                            "ValuePlaceholder": "Select for cheapest only",
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "DisplayName": "Books Flexible above the Cheapest",
                            "Hint": "Flexible options above the cheapest",
                            "ValidationKey": "BOOKS_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "ValuePlaceholder": "Select for flexibility above cheapest",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "Select Flexibility Options",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "6807f04ad20d161ce5dc82d8",
                                        "RuleName": "FlexibilityOptions",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "exactly matches e.g. Percentage above the Cheapest",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "",
                                            "ElementType": "CHECKBOX",
                                            "SelectionMode": "MULTIPLE",
                                            "InputValues": [
                                                {
                                                    "Name": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Percentage above the Cheapest",
                                                    "Hint": "e.g. 10.5",
                                                    "ValidationKey": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter percentage above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e496a780332d77d7ab093",
                                                                "RuleName": "PercentageAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 20",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "PERCENTAGE",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(100(\\.0{1,2})?|([1-9]\\d?)(\\.\\d{1,2})?|0?\\.\\d*[1-9]\\d?)$"
                                                                    ],
                                                                    "Message": "Enter a valid percentage (whole or decimal)",
                                                                    "Comment": "Please Enter valid percentage"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                },
                                                {
                                                    "Name": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Amount above the Cheapest",
                                                    "Hint": "e.g. 2000",
                                                    "ValidationKey": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter amount above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e4c8f780332d77d7ab094",
                                                                "RuleName": "AmountAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 2000",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "CURRENCY",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                                                    ],
                                                                    "Message": "Enter a valid amount (whole or decimal)",
                                                                    "Comment": "Please Enter valid amount"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                }
                                            ]
                                        },
                                        "CommonValidation": {
                                            "RuleType": "CONTAINS",
                                            "RuleValues": [
                                                "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                "AMOUNT_ABOVE_THE_CHEAPEST"
                                            ],
                                            "Message": "Invalid option selected",
                                            "Comment": "Value must be one of the predefined options"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }

                            ],
                            "Selected": false
                        },
                        {
                            "Name": "BOOKS_MINIMUM_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "DisplayName": "Books Minimum Flexible above the Cheapest",
                            "Hint": "Minimum flexibility beyond the cheapest",
                            "ValidationKey": "BOOKS_MINIMUM_FLEXIBLE_ABOVE_THE_CHEAPEST",
                            "ValuePlaceholder": "Select for minimum flexibility",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "Select Flexibility Options",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "6807f04ad20d161ce5dc82d8",
                                        "RuleName": "FlexibilityOptions",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "exactly matches e.g. Percentage above the Cheapest",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "",
                                            "ElementType": "CHECKBOX",
                                            "SelectionMode": "MULTIPLE",
                                            "InputValues": [
                                                {
                                                    "Name": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Percentage above the Cheapest",
                                                    "Hint": "e.g. 10.5",
                                                    "ValidationKey": "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter percentage above cheapest",
                                                    "SubRules": [{
                                                        "RuleDisplayName": "",
                                                        "RuleDisplayOrder": 1,
                                                        "Required": true,
                                                        "Rule": {
                                                            "RuleId": "686e496a780332d77d7ab093",
                                                            "RuleName": "PercentageAboveCheapestValue",
                                                            "MatchType": {
                                                                "Label": "",
                                                                "Visibility": "HIDDEN",
                                                                "ElementType": "SELECT",
                                                                "SelectionMode": "SINGLE",
                                                                "InputValues": [
                                                                    {
                                                                        "Name": "EXACTLY_MATCHES",
                                                                        "DisplayName": "exactly matches",
                                                                        "Hint": "exactly matches e.g. 20",
                                                                        "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                        "ValuePlaceholder": "Enter the Value",
                                                                        "Selected": true
                                                                    }
                                                                ]
                                                            },
                                                            "ValueType": {
                                                                "Label": "",
                                                                "ElementType": "PERCENTAGE",
                                                                "SelectionMode": "SINGLE",
                                                                "InputValues": []
                                                            },
                                                            "CommonValidation": {
                                                                "RuleType": "REGEX",
                                                                "RuleValues": [
                                                                    "^(100(\\.0{1,2})?|([1-9]\\d?)(\\.\\d{1,2})?|0?\\.\\d*[1-9]\\d?)$"
                                                                ],
                                                                "Message": "Enter a valid percentage (whole or decimal)",
                                                                "Comment": "Please Enter valid percentage"
                                                            },
                                                            "Validations": [],
                                                            "Tracking": {
                                                                "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                "CreatedIp": "192.0.1.96",
                                                                "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                "ModifiedIp": "192.0.1.96"
                                                            }
                                                        }
                                                    }
                                                    ],
                                                    "Selected": false
                                                },
                                                {
                                                    "Name": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "DisplayName": "Amount above the Cheapest",
                                                    "Hint": "e.g. 2000",
                                                    "ValidationKey": "AMOUNT_ABOVE_THE_CHEAPEST",
                                                    "ValuePlaceholder": "Enter amount above cheapest",
                                                    "SubRules": [
                                                        {
                                                            "RuleDisplayName": "Select Flexibility Options",
                                                            "RuleDisplayOrder": 1,
                                                            "Required": true,
                                                            "Rule": {
                                                                "RuleId": "686e4c8f780332d77d7ab094",
                                                                "RuleName": "AmountAboveCheapestValue",
                                                                "MatchType": {
                                                                    "Label": "",
                                                                    "Visibility": "HIDDEN",
                                                                    "ElementType": "SELECT",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": [
                                                                        {
                                                                            "Name": "EXACTLY_MATCHES",
                                                                            "DisplayName": "exactly matches",
                                                                            "Hint": "exactly matches e.g. 2000",
                                                                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                                            "ValuePlaceholder": "Enter the Value",
                                                                            "Selected": true
                                                                        }
                                                                    ]
                                                                },
                                                                "ValueType": {
                                                                    "Label": "",
                                                                    "ElementType": "CURRENCY",
                                                                    "SelectionMode": "SINGLE",
                                                                    "InputValues": []
                                                                },
                                                                "CommonValidation": {
                                                                    "RuleType": "REGEX",
                                                                    "RuleValues": [
                                                                        "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                                                    ],
                                                                    "Message": "Enter a valid amount (whole or decimal)",
                                                                    "Comment": "Please Enter valid amount"
                                                                },
                                                                "Validations": [],
                                                                "Tracking": {
                                                                    "CreatedBy": "67615bd9cd58ac147c2710be",
                                                                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                                                                    "CreatedIp": "192.0.1.96",
                                                                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                                                                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                                                    "ModifiedIp": "192.0.1.96"
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "Selected": false
                                                }
                                            ]
                                        },
                                        "CommonValidation": {
                                            "RuleType": "CONTAINS",
                                            "RuleValues": [
                                                "PERCENTAGE_ABOVE_THE_CHEAPEST",
                                                "AMOUNT_ABOVE_THE_CHEAPEST"
                                            ],
                                            "Message": "Invalid option selected",
                                            "Comment": "Value must be one of the predefined options"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }
                            ],
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "Conditions": [
                            {
                                "RuleType": "EXACTLY_MATCHES",
                                "RuleValues": [
                                    "6807e08bd20d161ce5dc82cf"
                                ],
                                "Message": "Please provide flexibility details above the cheapest option.",
                                "Comment": "Ensure that flexibility details are provided when selecting an option above the cheapest"
                            }
                        ]
                    },
                    {
                        "Conditions": [
                            {
                                "RuleType": "EXACTLY_MATCHES",
                                "RuleValues": [
                                    "6807f04ad20d161ce5dc82d7"
                                ],
                                "Message": "Please provide minimum flexibility details above the cheapest option.",
                                "Comment": "Ensure that minimum flexibility details are provided when selecting an option above the cheapest"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "RuleDisplayName": "Start Date",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "6807456c75f7d22ea4e3fe94",
                "RuleName": "Date",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. 25/12/26",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. 25/12/26",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. 25",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. 25",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. 25",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. 25",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. 26",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. 26",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^25/.*",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "DATE",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "CHAR_LIMIT",
                    "RuleValues": [
                        "200"
                    ],
                    "Message": "Limit Exceeded",
                    "Comment": "Max 200 characters allowed"
                },
                "Validations": [
                    {
                        "InputValidationKey": "EXACTLY_MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must not match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must contain a valid number"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_CONTAIN_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must not contain a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "BEGINS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must not start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "ENDS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_END_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must not end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    ""
                                ],
                                "Message": "Must be a valid regular expression",
                                "Comment": "Allows any input (user-defined regex expected)"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "End Date",
            "RuleDisplayOrder": 1,
            "Required": true,
            "Rule": {
                "RuleId": "6807456c75f7d22ea4e3fe94",
                "RuleName": "Date",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. 25/12/26",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. 25/12/26",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. 25",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. 25",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. 25",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. 25",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. 26",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. 26",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^25/.*",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "DATE",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "CHAR_LIMIT",
                    "RuleValues": [
                        "200"
                    ],
                    "Message": "Limit Exceeded",
                    "Comment": "Max 200 characters allowed"
                },
                "Validations": [
                    {
                        "InputValidationKey": "EXACTLY_MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{2}$"
                                ],
                                "Message": "Invalid Date Format",
                                "Comment": "Must not match date exactly in dd/mm/yy format"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must contain a valid number"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_CONTAIN_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[1-9][0-9])$"
                                ],
                                "Message": "Invalid Date Fragment",
                                "Comment": "Input must not contain a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "BEGINS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^(0[1-9]|[12][0-9]|3[01])$"
                                ],
                                "Message": "Invalid Date Start",
                                "Comment": "Must not start with a valid day (01–31)"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "ENDS_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "DOES_NOT_END_WITH_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    "^[0-9]{2}$"
                                ],
                                "Message": "Invalid Date End",
                                "Comment": "Must not end with a valid dd/mm/yy date"
                            }
                        ]
                    },
                    {
                        "InputValidationKey": "MATCHES_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "REGEX",
                                "RuleValues": [
                                    ""
                                ],
                                "Message": "Must be a valid regular expression",
                                "Comment": "Allows any input (user-defined regex expected)"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "686e149f780332d77d7ab08d",
                "RuleName": "FlightAncillariesBaggage",
                "MatchType": {
                    "Label": "",
                    "Visibility": "HIDDEN",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Allowed",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "",
                            "Selected": true
                        }
                    ]
                },
                "ValueType": {
                    "Label": "",
                    "ElementType": "RADIO",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "ALLOWED",
                            "DisplayName": "Allowed",
                            "Hint": "Action or option is permitted without restrictions.",
                            "ValidationKey": "ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "SubRules": [
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "686e1c52780332d77d7ab08e",
                                        "RuleName": "WeightLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 20",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to Weight",
                                            "ElementType": "WEIGHT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^[1-9]\\d{0,4}(\\.\\d{1,5})?$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                },
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "686e1c60780332d77d7ab08f",
                                        "RuleName": "PiecesLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 20",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to pieces",
                                            "ElementType": "WEIGHT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^[1-9]\\d{0,4}$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 20)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                },
                                {
                                    "RuleDisplayName": "",
                                    "RuleDisplayOrder": 1,
                                    "Required": true,
                                    "Rule": {
                                        "RuleId": "682d94ed4ca012f140853d59",
                                        "RuleName": "AmountLimit",
                                        "MatchType": {
                                            "Label": "",
                                            "Visibility": "HIDDEN",
                                            "ElementType": "SELECT",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": [
                                                {
                                                    "Name": "EXACTLY_MATCHES",
                                                    "DisplayName": "exactly matches",
                                                    "Hint": "e.g. 200",
                                                    "ValidationKey": "EXACTLY_MATCHES_REGEX",
                                                    "ValuePlaceholder": "Enter the Value",
                                                    "Selected": true
                                                }
                                            ]
                                        },
                                        "ValueType": {
                                            "Label": "Up to amount",
                                            "ElementType": "CURRENCY",
                                            "SelectionMode": "SINGLE",
                                            "InputValues": []
                                        },
                                        "CommonValidation": {
                                            "RuleType": "REGEX",
                                            "RuleValues": [
                                                "^(0\\.\\d{1,9}|[1-9]\\d{0,9}(\\.\\d{1,9})?)$"
                                            ],
                                            "Message": "Invalid number format",
                                            "Comment": "Must be a valid integer or decimal (e.g., 2000.0)"
                                        },
                                        "Validations": [],
                                        "Tracking": {
                                            "CreatedBy": "67615bd9cd58ac147c2710be",
                                            "CreatedAt": "2025-04-03T10:54:12.783Z",
                                            "CreatedIp": "192.0.1.96",
                                            "ModifiedBy": "67615bd9cd58ac147c2710be",
                                            "ModifiedAt": "2025-04-03T10:54:12.783Z",
                                            "ModifiedIp": "192.0.1.96"
                                        }
                                    }
                                }

                            ],
                            "Selected": true
                        },
                        {
                            "Name": "NOT_ALLOWED",
                            "DisplayName": "Not Allowed",
                            "Hint": "Action or option is restricted or disallowed.",
                            "ValidationKey": "NOT_ALLOWED_VALIDATE",
                            "ValuePlaceholder": "",
                            "Selected": false
                        }
                    ]
                },
                "Validations": [
                    {
                        "InputValidationKey": "CONTAINS_REGEX",
                        "Conditions": [
                            {
                                "RuleType": "CONTAINS",
                                "RuleValues": [
                                    "ALLOWED",
                                    "NOT_ALLOWED"
                                ],
                                "Message": "Select any option",
                                "Comment": "Select any option"
                            }
                        ]
                    }
                ],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "683051b80643734aad3cb098",
                "RuleName": "AllowedNumber",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "GREATER_THAN",
                            "DisplayName": "Greater Than",
                            "Hint": "Greater than a specified value",
                            "ValidationKey": "GREATER_THAN",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": true
                        },
                        {
                            "Name": "LESS_THAN",
                            "DisplayName": "Less Than",
                            "Hint": "Less than a specified value",
                            "ValidationKey": "LESS_THAN",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "EQUALS_TO",
                            "DisplayName": "Equal To",
                            "Hint": "Equal to a specified value",
                            "ValidationKey": "EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "GREATER_THAN_OR_EQUALS_TO",
                            "DisplayName": "Greater Than or Equal To",
                            "Hint": "Greater than or equal to a specified value",
                            "ValidationKey": "GREATER_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        },
                        {
                            "Name": "LESS_THAN_OR_EQUALS_TO",
                            "DisplayName": "Less Than or Equal To",
                            "Hint": "Less than or equal to a specified value",
                            "ValidationKey": "LESS_THAN_OR_EQUALS_TO",
                            "ValuePlaceholder": "Enter the value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "TEXT",
                    "SelectionMode": "SINGLE",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "REGEX",
                    "RuleValues": [
                        "^[1-9]\\d{0,2}$"
                    ],
                    "Message": "Enter a valid positive integer (e.g., 20)",
                    "Comment": "Must be a valid positive integer with no leading zero"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "686e04d8780332d77d7ab088",
                "RuleName": "Airlines",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Emirates",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. Emirates",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Airline for Emirates",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. Air for Emirates",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. Em for Emirates",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. Ab for Emirates",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. es for Emirates",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. rt for Emirates",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^Emi.*tes$ for Emirates",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "AUTOCOMPLETE",
                    "SelectionMode": "MULTIPLE",
                    "Url": "/api/v1/flight/meta/airlines",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "VALID_OPTION_FROM_API",
                    "RuleValues": [
                        "/api/v1/flight/meta/airlines"
                    ],
                    "Message": "Select a valid airline from the dropdown",
                    "Comment": "Value should match one of the airlines fetched via the API"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        },
        {
            "RuleDisplayName": "",
            "RuleDisplayOrder": 0,
            "Required": true,
            "Rule": {
                "RuleId": "68621e2aa2abf12a911ac564",
                "RuleName": "Airports",
                "MatchType": {
                    "Label": "Match Type",
                    "Visibility": "VISIBLE",
                    "ElementType": "SELECT",
                    "SelectionMode": "SINGLE",
                    "InputValues": [
                        {
                            "Name": "EXACTLY_MATCHES",
                            "DisplayName": "exactly matches",
                            "Hint": "exactly matches e.g. Dubai International Airport",
                            "ValidationKey": "EXACTLY_MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": true
                        },
                        {
                            "Name": "DOES_NOT_EXACTLY_MATCH",
                            "DisplayName": "does not exactly match",
                            "Hint": "does not exactly match e.g. Dubai International Airport",
                            "ValidationKey": "DOES_NOT_EXACTLY_MATCH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "CONTAINS",
                            "DisplayName": "contains",
                            "Hint": "contains e.g. Airport for Dubai International Airport",
                            "ValidationKey": "CONTAINS_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_CONTAIN",
                            "DisplayName": "does not contain",
                            "Hint": "does not contain e.g. Pun for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_CONTAIN_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "BEGINS_WITH",
                            "DisplayName": "begins with",
                            "Hint": "begins with e.g. Dubai for Dubai International Airport",
                            "ValidationKey": "BEGINS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_BEGIN_WITH",
                            "DisplayName": "does not begin with",
                            "Hint": "does not begin with e.g. Punia for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_BEGIN_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "ENDS_WITH",
                            "DisplayName": "ends with",
                            "Hint": "ends with e.g. Airport for Dubai International Airport",
                            "ValidationKey": "ENDS_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "DOES_NOT_END_WITH",
                            "DisplayName": "does not end with",
                            "Hint": "does not end with e.g. Aircraft for Dubai International Airport",
                            "ValidationKey": "DOES_NOT_END_WITH_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        },
                        {
                            "Name": "MATCHES_REGEX",
                            "DisplayName": "matches regex",
                            "Hint": "matches regex e.g. ^D.*Airport$ for Dubai International Airport",
                            "ValidationKey": "MATCHES_REGEX",
                            "ValuePlaceholder": "Enter the Value",
                            "Selected": false
                        }
                    ]
                },
                "ValueType": {
                    "Label": "Value",
                    "ElementType": "AUTOCOMPLETE",
                    "SelectionMode": "MULTIPLE",
                    "Url": "/api/v1/meta/grapghql/search",
                    "InputValues": []
                },
                "CommonValidation": {
                    "RuleType": "VALID_OPTION_FROM_API",
                    "RuleValues": [
                        "/api/v1/meta/grapghql/search"
                    ],
                    "Message": "Select a valid airports from the dropdown",
                    "Comment": "Value should match one of the airports fetched via the API"
                },
                "Validations": [],
                "Tracking": {
                    "CreatedBy": "67615bd9cd58ac147c2710be",
                    "CreatedAt": "2025-04-03T10:54:12.783Z",
                    "CreatedIp": "192.0.1.96",
                    "ModifiedBy": "67615bd9cd58ac147c2710be",
                    "ModifiedAt": "2025-04-03T10:54:12.783Z",
                    "ModifiedIp": "192.0.1.96"
                }
            }
        }
    ]
}

export const bucket = [
    {
        "Name": "Booking",
        "PolicyConstraints": [
            {
                "Id": "680743ca75f7d22ea4e3fe90",
                "Name": "Booking Date (DDMMYY)",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "680b56fb9b84da052961926e",
                "Name": "Booking Days (List of days of the week)",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682b620d78dd02dc382e177d",
                "Name": "Booking Time (HH:MM)",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "683058e90643734aad3cb09c",
                "Name": "Number of Bookings per month",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "6830593f0643734aad3cb09d",
                "Name": "Number of Bookings per year",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "683060dc0643734aad3cb0a8",
                "Name": "Number of Bookings within a Date Range",
                "Bucket": "Booking",
                "__typename": "PolicyConstraintDto"
            }
        ],
        "__typename": "BucketPolicyGroupDto"
    },
    {
        "Name": "Flights",
        "PolicyConstraints": [
            {
                "Id": "682b6f6b78dd02dc382e1785",
                "Name": "Airlines",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "6881ce61fd249eb6152eab56",
                "Name": "Ancillaries",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68622a54a2abf12a911ac576",
                "Name": "Arrival Airport",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "680f5e8108d885e700b46502",
                "Name": "Arrival Date (DDMMYY)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682b619778dd02dc382e177a",
                "Name": "Arrival Days (List of days of the week)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682b622c78dd02dc382e177e",
                "Name": "Arrival Time (HH:MM)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68079fcad20d161ce5dc82c1",
                "Name": "Cabin class",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68622a81a2abf12a911ac577",
                "Name": "Departure Airport",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "680b57f69b84da0529619272",
                "Name": "Departure Date (DDMMYY)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682b61ad78dd02dc382e177b",
                "Name": "Departure Days (List of days of the week)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682ad7f3f51a85923f91d48e",
                "Name": "Departure Time (HH:MM)",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "687dec8df09869cb79e7d5c9",
                "Name": "Flight Duration",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "6807f49ad20d161ce5dc82da",
                "Name": "Flight Fare",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "686e5aba780332d77d7ab095",
                "Name": "Flight Trip Type",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "6862168fa2abf12a911ac55a",
                "Name": "Layover Duration per Stop",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682f2e110643734aad3cb04c",
                "Name": "Minimum Baggage",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "686215c4a2abf12a911ac555",
                "Name": "Number of Flight Bookings in a month",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "6862160fa2abf12a911ac557",
                "Name": "Number of Flight Bookings in a specific Date Range",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "686215e8a2abf12a911ac556",
                "Name": "Number of Flight Bookings in a year",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68621654a2abf12a911ac558",
                "Name": "Number of Layover Stops",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68305a900643734aad3cb0a0",
                "Name": "Number of Travellers in a booking",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "687deb32f09869cb79e7d5c8",
                "Name": "Total Layover Duration",
                "Bucket": "Flights",
                "__typename": "PolicyConstraintDto"
            }
        ],
        "__typename": "BucketPolicyGroupDto"
    },
    {
        "Name": "Travel",
        "PolicyConstraints": [
            {
                "Id": "682b612878dd02dc382e1779",
                "Name": "Travel Date Range (DDMMYY)",
                "Bucket": "Travel",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "682b61c378dd02dc382e177c",
                "Name": "Travel Days (List of days of the week)",
                "Bucket": "Travel",
                "__typename": "PolicyConstraintDto"
            }
        ],
        "__typename": "BucketPolicyGroupDto"
    },
    {
        "Name": "Trip",
        "PolicyConstraints": [
            {
                "Id": "68305bc20643734aad3cb0a6",
                "Name": "Trip Cost Range",
                "Bucket": "Trip",
                "__typename": "PolicyConstraintDto"
            },
            {
                "Id": "68305a360643734aad3cb09e",
                "Name": "Trip Duration (Number of Days)",
                "Bucket": "Trip",
                "__typename": "PolicyConstraintDto"
            }
        ],
        "__typename": "BucketPolicyGroupDto"
    }
];