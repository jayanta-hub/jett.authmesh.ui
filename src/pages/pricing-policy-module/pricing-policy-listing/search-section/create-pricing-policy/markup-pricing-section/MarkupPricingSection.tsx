import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery
} from "@mui/material";
import React from 'react';
import StyledRadio from '../../../../../../components/core-module/styled-radio/StyledRadio';
import StyledTextField from '../../../../../../components/core-module/styled-textfield/StyledTextField';
import { theme } from '../../../../../../theme';
import { useCurrencyDetails } from '../../../../../../utility/hooks/useCurrencyDetails';
import { ErrorType, TouchedType } from "../../../../../../utility/types/pricing-policy/PricingPolicy";
import * as styles from "./MarkupPricingSection.module.css";

interface MarkupPricingSectionProps {
  markupType: 'fixed' | 'percentage';
  setMarkupType: (val: 'fixed' | 'percentage') => void;
  percentageValue: string;
  setPercentageValue: (val: string) => void;
  amountValue: string;
  setAmountValue: (val: string) => void;
  maxLimitValue: string;
  setMaxLimitValue: (val: string) => void;
  applicableOn: string;
  setApplicableOn: (val: string) => void;
  taxes: string;
  setTaxes: (val: string) => void;
  refundable: string;
  setRefundable: (val: string) => void;
  errors?: ErrorType;
  touched?: TouchedType;
  onFieldBlur?: (field: string) => void;
}

const MarkupPricingSection: React.FC<MarkupPricingSectionProps> = ({
  markupType,
  setMarkupType,
  percentageValue,
  setPercentageValue,
  amountValue,
  setAmountValue,
  maxLimitValue,
  setMaxLimitValue,
  applicableOn,
  setApplicableOn,
  taxes,
  setTaxes,
  refundable,
  setRefundable,
  errors = {},
  touched = {},
  onFieldBlur = () => { },
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currency = useCurrencyDetails();
  const gridTemplateColumns = isMobile ? '1fr' : '1fr 1fr';
  return (
    <Box sx={{ mb: { xs: 0, sm: 4 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns,
          gap: isMobile ? 0 : 2,
        }}
      >
        <Box sx={{ pt: { xs: "0px", sm: "16px", md: "16px" }, mb: isMobile ? 2 : 0 }}>
          <Typography variant="h5" gutterBottom className={(styles as unknown as { sectionTitle: string }).sectionTitle} sx={{ mb: isMobile ? 0.75 : 2 }}>
            Set Pricing*
          </Typography>
        </Box>
        <Box sx={{ display: isMobile ? 'none' : 'block' }}></Box>
        {[
          {
            left: (
              <>
                <Typography variant="body1" gutterBottom className={(styles as unknown as { sectionSubTitle: string }).sectionSubTitle} sx={{ mb: 0.75 }}>
                  Markup Type*
                </Typography>
                <Typography className={(styles as unknown as { sectionSubTitle_description: string }).sectionSubTitle_description} variant="body2" sx={{ color: 'text.secondary', mb: isMobile ? 0.75 : 2 }}>
                  Configures the price markup for this Pricing Policy
                </Typography>
              </>
            ),
            right: (
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: isMobile ? '100%' : 'auto', mt: isMobile ? 1 : 0 }}>
                <Box sx={{
                  maxWidth: '200px',
                  width: '100%',
                  border: `1px solid ${theme?.palette?.customColors?.lightBlue[7]}`,
                  borderRadius: '6px',
                }}>
                  <ToggleButtonGroup
                    value={markupType}
                    exclusive
                    onChange={(_, val) => {
                      if (val) {
                        setMarkupType(val);
                      }
                    }}
                    fullWidth
                    sx={{
                      '& .MuiToggleButton-root': {
                        fontSize: '10px',
                        fontWeight: 400,
                        textTransform: 'none',
                        border: 'none',
                        borderRadius: 0,
                        padding: '4px 12px',
                        height: '36px',
                        color: theme?.palette?.customColors?.grey?.[6],
                        width: isMobile ? '50%' : undefined,
                      },
                      '& .Mui-selected': {
                        backgroundColor: `${theme?.palette?.customColors?.lightWhite?.[11]} !important`,
                        borderRadius: '6px',
                        margin: '2px',
                        height: '32px',
                      },
                    }}
                    onBlur={() => onFieldBlur('markupType')}
                  >
                    <ToggleButton value="fixed">Fixed Amount</ToggleButton>
                    <ToggleButton value="percentage">Percentage</ToggleButton>
                  </ToggleButtonGroup>
                  {touched.markupType && errors.markupType && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>{errors.markupType}</Typography>
                  )}
                </Box>
              </Box>
            )
          },
          {
            left: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className={(styles as unknown as { labelText: string }).labelText} variant="body1" sx={{ mb: isMobile ? 0 : 2, ml: isMobile ? undefined : '20px' }}>Value*</Typography>
              </Box>
            ),
            right: (
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                {markupType === 'fixed' ? (
                  <Box sx={{ minWidth: isMobile ? '100%' : '124px', maxWidth: isMobile ? '100%' : '124px', width: '100%' }}>
                    <Typography className={(styles as unknown as { inputLabelText: string }).inputLabelText} sx={{ mb: 0.75 }}>
                      Amount
                    </Typography>
                    <StyledTextField
                      value={amountValue}
                      onChange={e => setAmountValue(e.target.value)}
                      onBlur={() => onFieldBlur('amountValue')}
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="start">{currency?.Symbol}</InputAdornment>,

                        },
                        formHelperText: {
                          sx: {
                            whiteSpace: 'nowrap',
                          },
                        }
                      }}
                      fullWidth={isMobile}
                      error={Boolean(touched.amountValue && errors.amountValue)}
                      helperText={touched.amountValue && errors.amountValue}
                    />
                  </Box>
                ) : (
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                    <Box sx={{ minWidth: isMobile ? 'max-content' : '340px', maxWidth: '340px', display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}>
                      <Box sx={{ width: isMobile ? '100%' : '124px', display: 'flex', flexDirection: 'column' }}>
                        <Typography className={(styles as unknown as { inputLabelText: string }).inputLabelText} sx={{ mb: 0.75 }}>
                          Percentage
                        </Typography>
                        <StyledTextField
                          value={percentageValue}
                          onChange={e => {
                            const value = e.target.value;
                            if (
                              value === '' ||
                              /^\d*(\.\d{0,2})?$/.test(value)
                            ) {
                              setPercentageValue(value);
                            }
                          }}
                          onBlur={() => onFieldBlur('percentageValue')}
                          slotProps={{
                            input: {
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            },
                          }}
                          fullWidth={isMobile}
                          error={Boolean(touched.percentageValue && errors.percentageValue)}
                          helperText={<span style={{ whiteSpace: 'nowrap' }}>
                            {touched.percentageValue && errors.percentageValue}
                          </span>}
                        />
                      </Box>
                      <Box sx={{ width: isMobile ? '100%' : '124px', display: 'flex', flexDirection: 'column' }}>
                        <Typography className={(styles as unknown as { inputLabelText: string }).inputLabelText} sx={{ mb: 0.75 }}>
                          Amount (Up to)
                        </Typography>
                        <StyledTextField
                          value={maxLimitValue}
                          onChange={e => setMaxLimitValue(e.target.value)}
                          onBlur={() => onFieldBlur('maxLimitValue')}
                          slotProps={{
                            input: {
                              endAdornment: <InputAdornment position="end">{currency?.Symbol}</InputAdornment>,
                            },
                            formHelperText: {
                              sx: {
                                whiteSpace: 'nowrap',
                              },
                            }
                          }}
                          fullWidth={isMobile}
                          error={Boolean(touched.maxLimitValue && errors.maxLimitValue)}
                          helperText={touched.maxLimitValue && errors.maxLimitValue}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )
          },
          ...(markupType === 'percentage' ? [{
            left: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className={(styles as unknown as { labelText: string }).labelText} variant="body1" sx={{ mt: isMobile ? undefined : '28px', mb: isMobile ? 0 : 2, ml: isMobile ? undefined : '20px' }}>Applicable on*</Typography>
              </Box>
            ),
            right: (
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                <Box sx={{ mt: isMobile ? undefined : '28px', minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '340px', width: '100%' }}>
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3, mt: '4px' }}>
                    <RadioGroup
                      value={applicableOn}
                      onChange={e => setApplicableOn(e.target.value)}
                      onBlur={() => onFieldBlur('applicableOn')}
                    >
                      <FormControlLabel
                        value="base"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        control={<StyledRadio />}
                        label="Base Fare"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                          mb: 0.5
                        }}
                      />
                      <FormControlLabel
                        value="base-surcharges"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        control={<StyledRadio />}
                        label="Base Fare+Surcharges"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                          mb: 0.5
                        }}
                      />
                      <FormControlLabel
                        value="base-surcharges-taxes"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        control={<StyledRadio />}
                        label="Base Fare+Surcharges+Taxes"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  {touched.applicableOn && errors.applicableOn && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>{errors.applicableOn}</Typography>
                  )}
                </Box>
              </Box>
            )
          }] : []),
          {
            left: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className={(styles as unknown as { labelText: string }).labelText} variant="body1" sx={{ mt: isMobile ? undefined : '28px', mb: isMobile ? 0 : 2, ml: isMobile ? undefined : '20px' }}>Taxes*</Typography>
              </Box>
            ),
            right: (
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '340px', width: '100%' }}>
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3, mt: isMobile ? undefined : '28px', }}>
                    <RadioGroup
                      value={taxes}
                      onChange={e => setTaxes(e.target.value)}
                      onBlur={() => onFieldBlur('taxes')}
                    >
                      <FormControlLabel
                        value="including"
                        control={<StyledRadio />}
                        label="Including"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                          mb: 0.5
                        }}
                      />
                      <FormControlLabel
                        value="excluding"
                        control={<StyledRadio />}
                        label="Excluding"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  {touched.taxes && errors.taxes && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>{errors.taxes}</Typography>
                  )}
                </Box>
              </Box>
            )
          },
          {
            left: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className={(styles as unknown as { labelText: string }).labelText} variant="body1" sx={{ mb: isMobile ? 0 : 2, ml: isMobile ? undefined : '20px' }}>Refundable on Cancellation*</Typography>
              </Box>
            ),
            right: (
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                <Box sx={{ minWidth: isMobile ? '100%' : '260px', maxWidth: isMobile ? '100%' : '340px', width: '100%' }}>
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={refundable}
                      onChange={e => setRefundable(e.target.value)}
                      onBlur={() => onFieldBlur('refundable')}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<StyledRadio />}
                        label="Yes"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                          mb: 0.5
                        }}
                      />
                      <FormControlLabel
                        value="no"
                        control={<StyledRadio />}
                        label="No"
                        labelPlacement={isMobile ? "end" : "start"}
                        className={(styles as unknown as { radioLabelText: string }).radioLabelText}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '10px',
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  {touched.refundable && errors.refundable && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>{errors.refundable}</Typography>
                  )}
                </Box>
              </Box>
            )
          }
        ].map((section, index) => (
          <React.Fragment key={'content' + index}>
            <Box sx={{ mb: isMobile ? 1.5 : 0 }}>{section.left}</Box>
            <Box sx={{ mb: isMobile ? 3 : 0 }}>{section.right}</Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default MarkupPricingSection;