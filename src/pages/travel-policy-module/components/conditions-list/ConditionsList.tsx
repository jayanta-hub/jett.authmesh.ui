import { Close } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import EditIconBlue from '../../../../assets/images/EditIconBlue.png';
import { theme } from '../../../../theme';
import { capitalizeFirstLetter, removeBracketedText } from '../../../../utility/helper';
import { ConditionsListProps } from '../../../../utility/types/travel-policy/TravelPolicy';

const ConditionsList: React.FC<ConditionsListProps> = ({ title, index, details, onEdit, onClose, travelPolicyType, editData }) => {
    const formatMatchType = (matchType: string) => {
        if (typeof matchType !== 'string') return '';
        return matchType
            .replace('_REGEX', '')
            .split('_')
            .map((word) => word.charAt(0).toLowerCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const formatValues = (values: any) => {
        if (typeof values === 'string') {
            return values.charAt(0).toUpperCase() + values.slice(1).toLowerCase().split("_").join(" ");
        } else if (Array.isArray(values) && values.every(item => typeof item === 'string')) {
            return values.map((word: string) => {
                const camelCase = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                return camelCase.split("_").join("");
            }).join(', ')
        }
        return '';
    }

    return (
        <Paper
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
                px: { xs: 0, md: 2 },
                borderRadius: 'borderRadius',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative',
                marginTop: '20px',
                width: '100%',
            }}
            elevation={0}
        >
            <Typography
                variant="subtitle1"
                fontWeight="500"
                fontStyle="italic"
                sx={{
                    marginBottom: "4px", fontFamily: "poppins",
                    fontWeight: "500", fontSize: "12px"
                }}
            >
                {removeBracketedText(title)}
            </Typography>
            {details?.Rules.map((rule) => {
                const days = ["ALL", "WEEKDAYS", "WEEKENDS"]
                return (
                    <Box>
                        <Typography
                            key={rule.RuleDisplayOrder}
                            variant="body2"
                            sx={{ color: theme.palette.customColors.grey[8], marginBottom: 0.5, fontSize: "10px" }}
                        >
                            {rule.RuleDisplayName} {formatMatchType(rule.RuleOptions[0].MatchType)} {rule.RuleOptions?.filter((option) => !days.includes(option.MatchValue)).map((option, index) => `${index === 0 ? '' : ', '}${capitalizeFirstLetter(formatValues(option.MatchValue))}`)}
                        </Typography>
                    </Box>
                )
            })}
            {((travelPolicyType != "view" && editData?.IsDefault === false) || (travelPolicyType === 'create')) && (
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0.5,
                        display: 'flex',
                        gap: 0.5,
                        fontFamily: "poppins",
                        fontWeight: "500",
                        fontSize: "14px"
                    }}
                >
                    <Box
                        component="img"
                        src={EditIconBlue}
                        onClick={() => onEdit(details?.PolicyConstraintId)}
                        sx={{
                            height: "13px",
                            width: "13px",
                            objectFit: "contain",
                            cursor: "pointer",
                            color: theme.palette.customColors.grey[8],
                            marginTop: 0.7,
                            '&:hover': {
                                color: theme.palette.customColors.black[1],
                            },
                        }}
                    />
                    <IconButton
                        aria-label="Close"
                        onClick={() => {
                            onClose(index);
                        }}
                        size="small"
                        sx={{
                            color: 'grey',
                            padding: 0.5,
                            cursor: "pointer",
                            '&:hover': {
                                color: theme.palette.customColors.black[1],
                            },
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
            )
            }
        </Paper>
    );
};

export default ConditionsList;
