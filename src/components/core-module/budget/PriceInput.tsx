import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../theme';

export const priceConversion = (price: number, currency: string) => {
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};

const PriceInput: React.FC<PriceInputProps> = ({
    header,
    name,
    value,
    onChange,
    currency,
    disabled
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleChange(e);
            e.preventDefault();
        }
    };
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('');

    // Local editing mode flag
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            if (value === 0 || value === '0' || value === '' || value === null) {
                setInputValue('');
            } else if (!isNaN(Number(value))) {
                setInputValue(priceConversion(Number(value), currency));
            }
        }
    }, [value, isEditing, currency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/,/g, '');
        if (/^\d*\.?\d{0,2}$/.test(raw) || raw === '') {
            setInputValue(raw);
            onChange(raw);
        }
    };

    const handleFocus = () => {
        setIsEditing(true);
        // Remove formatting to allow editing
        const raw = inputValue.replace(/,/g, '');
        setInputValue(raw);
    };

    const handleBlur = () => {
        setIsEditing(false);
        const parsed = parseFloat(inputValue.replace(/,/g, ''));
        if (!isNaN(parsed)) {
            const formatted = priceConversion(parsed, currency);
            setInputValue(formatted);
            onChange(parsed.toFixed(2));
        } else {
            setInputValue('');
            onChange('');
        }
    };

    return (
        <Box className="flex flex-col">
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: '10px',
                    color: theme.palette.customColors.lightWhite[7],
                }}
            >
                {t(header)}
            </Typography>
            <FormControl
                sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '5px' }}
                variant="outlined"
            >
                <OutlinedInput
                    onKeyDown={handleKeyDown}
                    name={name}
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    value={inputValue === '0' ? '' : inputValue}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                        <InputAdornment
                            position="end"
                            sx={{ fontSize: '13px', color: '#5F6368' }}
                        >
                            {currency}
                        </InputAdornment>
                    }
                    disabled={disabled}
                    sx={{
                        height: '36px',
                        width: { md: '160px', xs: '100%' },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.customColors.lightBlue[7],
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.customColors.blue[10],
                        },
                        '& input::placeholder': {
                            color: 'your-color',
                            opacity: 1,
                        },
                        '& input': {
                            fontSize: '12px',
                            fontWeight: 400,
                        },
                    }}

                />
            </FormControl>
        </Box>
    );
};

export default PriceInput;
