import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFetchAirlineMutation, useFetchCabinClassMutation, useFetchMetaDataQuery } from '../../../../../store/musafirFlightLookupApi';
import { useCreatePricingPolicyMutation, useEditPricingPolicyMutation, useFetchSupplierDataQuery, useGetPricingPolicyByIdMutation } from '../../../../../store/musafirPricingPolicyApi';
import { theme } from '../../../../../theme';
import { customEnqueueSnackbar } from "../../../../../utility/helper";
import { OptionType } from '../../../../../utility/types/multi-select-dropdown/MultiSelectDropdown';
import { CodeNamePair, ErrorType, KeyValuePair, onConflictProps, TouchedType } from '../../../../../utility/types/pricing-policy/PricingPolicy';
import ClassFareSection from './class-fare-section/ClassFareSection';
import JourneySectorSection from './journey-sector-section/JourneySectorSection';
import MarkupPricingSection from './markup-pricing-section/MarkupPricingSection';
import SupplierAirlinesSection from './supplier-airlines-section/SupplierAirlinesSection';

interface CreatePricingPolicyProps {
    onClose: () => void;
    onCancel: () => void;
    onPolicyCreated?: () => void;
    step: number;
    setStep: (step: number) => void;
    isEditMode?: boolean;
    selectedPolicyId?: string;
    isBulkEdit?: boolean;
    onConflict?: (props: onConflictProps) => void;
    bulkEditPolicyIds: string[];
    setPolicyCreated?: (value: boolean) => void;
}

const CreatePricingPolicy: React.FC<CreatePricingPolicyProps> = ({ onClose, onCancel, onPolicyCreated, step, setStep, isEditMode, selectedPolicyId, isBulkEdit, onConflict, bulkEditPolicyIds, setPolicyCreated }) => {
    const { t } = useTranslation();
    const [fetchAirline, { data: allAirlinesData }] = useFetchAirlineMutation();
    const originalAllAirlines = allAirlinesData?.Response || [];
    const allAirlines = originalAllAirlines.map((airline: CodeNamePair) => ({
        id: airline.Code,
        name: airline.Name,
    }));
    const [fetchCabinClass, { data: cabinClassData }] = useFetchCabinClassMutation();
    const originalAllClasses = cabinClassData?.Response || [];
    const allClasses = originalAllClasses.map((cabinClass) => ({
        id: cabinClass.Code,
        name: cabinClass.DisplayName,
    }));
    const { data: metaData } = useFetchMetaDataQuery(undefined);
    const originalJourneyTypes = metaData?.Response?.JourneyTypes || [];
    const originalSectors = metaData?.Response?.Sectors || [];
    const allJourneyTypes = originalJourneyTypes.map((journeyType: KeyValuePair) => ({
        id: journeyType.Key,
        name: journeyType.Value,
    }));
    const allSections = originalSectors.map((sector: KeyValuePair) => ({
        id: sector.Key,
        name: sector.Value,
    }));
    const { data: allSuppliersData } = useFetchSupplierDataQuery(undefined);
    const originalAllSuppliers = allSuppliersData?.Response || [];
    const allSuppliers = originalAllSuppliers.map((supplier) => ({
        id: supplier.Code,
        name: supplier.Name,
    }));
    const [selectedJourneyTypes, setSelectedJourneyTypes] = useState<OptionType[]>([]);
    const [selectedSections, setSelectedSections] = useState<OptionType[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<OptionType[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<OptionType[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<OptionType[]>([]);
    const [fareType, setFareType] = useState('');
    const [markupType, setMarkupType] = useState<'fixed' | 'percentage'>('fixed');
    const [percentageValue, setPercentageValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const [maxLimitValue, setMaxLimitValue] = useState('');
    const [applicableOn, setApplicableOn] = useState('base');
    const [taxes, setTaxes] = useState('including');
    const [refundable, setRefundable] = useState('no');
    const [policyName, setPolicyName] = useState('');
    const [createPricingPolicy, { isLoading: isCreating }] = useCreatePricingPolicyMutation();
    const [getPricingPolicyById, { data: policyData, isLoading: isLoadingPolicy }] = useGetPricingPolicyByIdMutation();
    const [editPricingPolicy, { isLoading: isEditing }] = useEditPricingPolicyMutation();
    const [errors, setErrors] = useState<ErrorType>({});
    const [touched, setTouched] = useState<TouchedType>({});
    useEffect(() => {
        if (isEditMode && selectedPolicyId) {
            getPricingPolicyById({
                Context: {
                    UserAgent: "Mozilla/5.0",
                    TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                    TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
                    IpAddress: "192.168.1.1",
                    CountryCode: "US"
                },
                Request: { PricingPolicyId: selectedPolicyId }
            });
        }
    }, [isEditMode, selectedPolicyId, getPricingPolicyById]);

    useEffect(() => {
        if (policyData?.Response && isEditMode) {
            const policy = policyData.Response;
            setPolicyName(policy.PricingPolicyName || '');
            if (policy.Components?.JourneyTypes) {
                const journeyTypes = policy.Components.JourneyTypes.map((jt: KeyValuePair) => ({
                    id: jt.Key,
                    name: jt.Value
                }));
                setSelectedJourneyTypes(journeyTypes);
            }
            if (policy.Components?.Sectors) {
                const sectors = policy.Components.Sectors.map((sector: KeyValuePair) => ({
                    id: sector.Key,
                    name: sector.Value
                }));
                setSelectedSections(sectors);
            }
            if (policy.Components?.Suppliers) {
                const suppliers = policy.Components.Suppliers.map((supplier: KeyValuePair) => ({
                    id: supplier.Key,
                    name: supplier.Value
                }));
                setSelectedSuppliers(suppliers);
            }
            if (policy.Components?.Airlines) {
                const airlines = policy.Components.Airlines.map((airline: KeyValuePair) => ({
                    id: airline.Key,
                    name: airline.Value
                }));
                setSelectedAirlines(airlines);
            }
            if (policy.Components?.Classes) {
                const classes = policy.Components.Classes.map((cls: CodeNamePair) => ({
                    id: cls.Code,
                    name: cls.Name
                }));
                setSelectedClasses(classes);
            }
            setFareType(policy.Components?.FareTypes || '');
            if (policy.MarkupSetting) {
                const markup = policy.MarkupSetting;
                setMarkupType(markup.MarkupType === 'PERCENTAGE' ? 'percentage' : 'fixed');
                setMaxLimitValue(markup.MarkupMaxLimit?.toString() || '');
                if (markup.MarkupType === 'PERCENTAGE') {
                    setPercentageValue(markup.MarkupValue?.toString() || '');
                } else {
                    setAmountValue(markup.MarkupValue?.toString() || '');
                }
                let applicableValue = '';
                if (markup.ApplicableOn === 'BASE_FARE_PLUS_SURCHARGES_PLUS_TAXES') {
                    applicableValue = 'base-surcharges-taxes';
                } else if (markup.ApplicableOn === 'BASE_FARE_PLUS_SURCHARGES') {
                    applicableValue = 'base-surcharges';
                } else {
                    applicableValue = 'base';
                }
                setApplicableOn(applicableValue);
                setTaxes(markup.Taxes === 'INCLUDE' ? 'including' : 'excluding');
                setRefundable(markup.RefundOnCancellation === 'ALLOWED' ? 'yes' : 'no');
            }
        }
    }, [policyData, isEditMode]);
    useEffect(() => {
        fetchAirline({
            patch: {
                Context: {
                    UserAgent: "string",
                    TrackingId: "string",
                    TransactionId: "string",
                    IpAddress: "string",
                    CountryCode: "string",
                },
                Request: {
                    SearchText: "",
                    Language: "en",
                }
            },
            endpoint: "flight/meta/airlines"
        })

        fetchCabinClass({
            Context: {
                UserAgent: "string",
                TrackingId: "string",
                TransactionId: "string",
                IpAddress: "string",
                CountryCode: "string",
            },
            Request: {
                Language: "en",
            },
        });
    }, []);
    const step4Validation = Yup.object({
        markupType: Yup.string().required('Markup Type is required'),
        percentageValue: Yup.string().when('markupType', {
            is: 'percentage',
            then: (schema) => schema
                .required('Percentage is required')
                .matches(/^-?\d*(\.\d*)?$/, 'Percentage should be number')
                .test('min-0', 'Percentage should be between 1 and 100', value => {
                    if (!value) return true;
                    const num = parseFloat(value);
                    return isNaN(num) || num >= 1;
                })
                .test('max-100', 'Percentage should be between 1 and 100', value => {
                    if (!value) return true;
                    const num = parseFloat(value);
                    return isNaN(num) || num <= 100;
                }),
            otherwise: (schema) => schema,
        }),
        maxLimitValue: Yup.string().when('markupType', {
            is: 'percentage',
            then: (schema) => schema.notRequired().matches(/^-?\d*(\.\d*)?$/, 'Amount should be number')
                .test('min-0', 'Amount should above zero', value => {
                    if (!value) return true;
                    const num = parseFloat(value);
                    return isNaN(num) || num >= 1;
                }),
            otherwise: (schema) => schema,
        }),
        amountValue: Yup.string().when('markupType', {
            is: 'fixed',
            then: (schema) => schema.required('Amount is required')
                .matches(/^-?\d*(\.\d*)?$/, 'Amount should be number')
                .test('min-0', 'Amount should above zero', value => {
                    if (!value) return true;
                    const num = parseFloat(value);
                    return isNaN(num) || num >= 1;
                }),
            otherwise: (schema) => schema,
        }),
        applicableOn: Yup.string().when('markupType', {
            is: 'percentage',
            then: (schema) => schema.required('Applicable On is required'),
            otherwise: (schema) => schema,
        }),
        taxes: Yup.string().required('Taxes is required'),
        refundable: Yup.string().required('Refundable is required'),
    });
    const validateStep4 = async (values) => {
        try {
            await step4Validation.validate(values, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            if (err.inner) {
                const newErrors = {};
                err.inner.forEach((validationError) => {
                    newErrors[validationError.path] = validationError.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };
    const handlePolicyNameBlur = async () => {
        setTouched((prev) => ({ ...prev, policyName: true }));
        const values = { policyName };
        try {
            await step1Validation.validateAt('policyName', values);
            setErrors((prev) => ({ ...prev, policyName: undefined }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, policyName: err.message }));
        }
    };
    const handleFieldBlur = async (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const values = {
            markupType,
            percentageValue,
            amountValue,
            applicableOn,
            taxes,
            refundable,
            maxLimitValue
        };
        try {
            await step4Validation.validateAt(field, values);
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, [field]: err.message }));
        }
    };
    const step3Validation = Yup.object({
        fareType: Yup.string()
            .matches(/^([A-Z](, ?[A-Z])*)?$/i, 'Fare Type must be single letters (e.g., Y, Z or Y,Z or A,B,C)')
            .nullable(),
    });
    const validateStep3 = async (values) => {
        try {
            await step3Validation.validate(values, { abortEarly: false });
            setErrors((prev) => ({ ...prev, fareType: undefined }));
            return true;
        } catch (err) {
            if (err.inner) {
                const newErrors = {};
                err.inner.forEach((validationError) => {
                    newErrors[validationError.path] = validationError.message;
                });
                setErrors((prev) => ({ ...prev, ...newErrors }));
            }
            return false;
        }
    };
    const step1Validation = Yup.object({
        policyName: Yup.string()
            .notRequired()
            .test(
                'min-if-filled',
                'Minimum 3 characters required',
                value => !value || value.trim().length >= 3
            ),
    });
    const validateStep1 = async (values) => {
        try {
            await step1Validation.validate(values, { abortEarly: false });
            setErrors((prev) => ({ ...prev, fareType: undefined }));
            return true;
        } catch (err) {
            if (err.inner) {
                const newErrors = {};
                err.inner.forEach((validationError) => {
                    newErrors[validationError.path] = validationError.message;
                });
                setErrors((prev) => ({ ...prev, ...newErrors }));
            }
            return false;
        }
    };

    const handleFareTypeBlur = async () => {
        setTouched((prev) => ({ ...prev, fareType: true }));
        const values = { fareType };
        try {
            await step3Validation.validateAt('fareType', values);
            setErrors((prev) => ({ ...prev, fareType: undefined }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, fareType: err.message }));
        }
    };
    const handleCreatePolicy = async () => {
        setPolicyCreated(true);
        const pricingPolicyIds = isEditMode
            ? [selectedPolicyId]
            : isBulkEdit
                ? bulkEditPolicyIds
                : [];
        let applicableOnValue = 'BASE_FARE_PLUS_SURCHARGES_PLUS_TAXES';
        if (applicableOn === 'base') {
            applicableOnValue = 'BASE_FARE';
        } else if (applicableOn === 'base-surcharges') {
            applicableOnValue = 'BASE_FARE_PLUS_SURCHARGES';
        }
        const payload = {
            OrgId: '',
            OrgEntityId: '',
            PricingPolicyId: pricingPolicyIds,
            PricingPolicyName: policyName,
            Components: {
                JourneyTypes: selectedJourneyTypes.map(j => j.id),
                Sectors: selectedSections.map(s => s.id),
                Suppliers: selectedSuppliers.map(s => s.id),
                Airlines: selectedAirlines.map(a => a.id),
                Classes: selectedClasses.map(c => c.id),
                FareTypes: fareType
            },
            MarkupSetting: {
                MarkupType: markupType === 'percentage' ? 'PERCENTAGE' : 'FIXED AMOUNT',
                MarkupValue: markupType === 'percentage' ? Number(percentageValue) : Number(amountValue),
                MarkupMaxLimit: markupType === 'percentage' ? Number(maxLimitValue) : undefined,
                Taxes: taxes === 'including' ? 'INCLUDE' : 'EXCLUDE',
                ApplicableOn: markupType === 'percentage' ? applicableOnValue : '',
                RefundOnCancellation: refundable === 'yes' ? 'ALLOWED' : 'NOT_ALLOWED'
            }
        };
        const context = {
            UserAgent: "Mozilla5.0",
            TrackingId: "41f716e3-fc85-4d36-bf53-64bbd752f520",
            TransactionId: "41f716e3-fc85-4d36-bf53-64bbd752f520",
            CountryCode: "IN",
            IpAddress: "127.0.0.1"
        };
        let result;
        if (isEditMode || isBulkEdit) {
            result = await editPricingPolicy({
                Context: context,
                Request: payload,
            });
        } else {
            result = await createPricingPolicy({
                Context: context,
                Request: payload,
            });
        }
        if (!result?.error) {
            customEnqueueSnackbar(result?.data?.Context.Message ? result?.data?.Context.Message : t("success"));
            if (onPolicyCreated) onPolicyCreated();
            onClose();
        }
        else if (result?.error?.data?.Context?.StatusCode === 1122) {
            if (onConflict) {
                onConflict({
                    message: result.error.data.Context.Message,
                    existingPolicy: result.error.data.Response,
                    editingPolicy: payload
                });
            }
            return;
        }
        else {
            customEnqueueSnackbar(result?.error?.data?.Context.Message ? result?.error?.data?.Context.Message : t("something_went_wrong"), 'error');
        }
        setPolicyCreated(false);
    };

    const handleContinue = async () => {
        const isValid = await validateStep1({ policyName });
        if (!isValid) {
            setTouched((prev) => ({ ...prev, policyName: true }));
            return;
        }
        if (step === 3) {
            const isValid = await validateStep3({ fareType });
            if (!isValid) {
                setTouched((prev) => ({ ...prev, fareType: true }));
                return;
            }
        }
        if (step === 4) {
            const values = {
                markupType,
                percentageValue,
                amountValue,
                applicableOn,
                taxes,
                refundable,
                maxLimitValue
            };
            const isValid = await validateStep4(values);
            if (isValid) {
                await handleCreatePolicy();
            } else {
                setTouched({
                    markupType: true,
                    percentageValue: true,
                    amountValue: true,
                    applicableOn: true,
                    taxes: true,
                    refundable: true,
                    maxLimitValue: true
                });
            }
        } else {
            setStep(Math.min(4, step + 1));
        }
    };

    let buttonText = '';
    if (step < 4) {
        buttonText = 'Continue';
    } else if (isCreating || isEditing) {
        buttonText = 'Saving...';
    } else {
        buttonText = 'Save';
    }

    const renderStepSection = () => {
        switch (step) {
            case 1:
                return (
                    <JourneySectorSection
                        selectedJourneyTypes={selectedJourneyTypes}
                        allJourneyTypes={allJourneyTypes}
                        setSelectedJourneyTypes={setSelectedJourneyTypes}
                        allSections={allSections}
                        selectedSections={selectedSections}
                        setSelectedSections={setSelectedSections}
                    />
                );
            case 2:
                return (
                    <SupplierAirlinesSection
                        selectedSuppliers={selectedSuppliers}
                        allSuppliers={allSuppliers}
                        setSelectedSuppliers={setSelectedSuppliers}
                        selectedAirlines={selectedAirlines}
                        allAirlines={allAirlines}
                        setSelectedAirlines={setSelectedAirlines}
                    />
                );
            case 3:
                return (
                    <ClassFareSection
                        selectedClasses={selectedClasses}
                        allClasses={allClasses}
                        setSelectedClasses={setSelectedClasses}
                        fareType={fareType}
                        setFareType={setFareType}
                        fareTypeError={errors.fareType}
                        fareTypeTouched={!!touched.fareType}
                        onFareTypeBlur={handleFareTypeBlur}
                    />
                );
            default:
                return (
                    <MarkupPricingSection
                        markupType={markupType}
                        setMarkupType={setMarkupType}
                        percentageValue={percentageValue}
                        setPercentageValue={setPercentageValue}
                        amountValue={amountValue}
                        setAmountValue={setAmountValue}
                        maxLimitValue={maxLimitValue}
                        setMaxLimitValue={setMaxLimitValue}
                        applicableOn={applicableOn}
                        setApplicableOn={setApplicableOn}
                        taxes={taxes}
                        setTaxes={setTaxes}
                        refundable={refundable}
                        setRefundable={setRefundable}
                        errors={errors}
                        touched={touched}
                        onFieldBlur={handleFieldBlur}
                    />
                );
        }
    };


    return (
        <Box sx={{
            maxWidth: '100%',
            margin: 'auto',
            p: 3,
            pt: { xs: 0.5, sm: 3 },
            borderRadius: 2,
            backgroundColor: 'white'
        }}>
            {isEditMode && isLoadingPolicy ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            variant="standard"
                            placeholder="Pricing Policy Name"
                            value={step === 4 && isBulkEdit ? "(Multiple Files)" : policyName}
                            onChange={e => setPolicyName(e.target.value)}
                            onBlur={handlePolicyNameBlur}
                            sx={{
                                mb: 3,
                                '& input': {
                                    caretColor: theme?.palette?.customColors?.blue?.[10],
                                    color: theme?.palette?.customColors?.black?.[1]
                                },
                                '& .MuiInput-root': {
                                    '&:before': {
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                                    },
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
                                    },
                                    '&:after': {
                                        borderBottom: `2px solid ${theme?.palette?.customColors?.blue?.[18]}`,
                                    },
                                },
                                '& .MuiInput-input': {
                                    fontSize: '22px',
                                    fontWeight: 600,
                                    padding: '6px 0',
                                    color: theme?.palette?.customColors?.black?.[1],
                                    opatcity: '1 !important',
                                    '&::placeholder': {
                                        opacity: '1 !important',
                                        fontSize: '22px',
                                        fontWeight: '600',
                                        paddingLeft: { xs: '4px !important', sm: '11px !important' },
                                        color: theme?.palette?.customColors?.grey?.[10],
                                    },
                                }
                            }}
                            slotProps={{
                                input: {
                                    disableUnderline: true,
                                    readOnly: step === 4 && isBulkEdit,
                                }
                            }}
                        />
                        {touched.policyName && errors.policyName && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>{errors.policyName}</Typography>
                        )}</Box>
                    <Divider sx={{ width: '100%', mx: 'auto', borderColor: theme?.palette?.customColors?.lightBlue?.[5], mt: '-1rem', mb: '2rem' }} />
                    {renderStepSection()}
                </>
            )}
            <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop="2.8rem">
                <Button
                    variant="outlined"
                    sx={{
                        width: '110px',
                        height: '40px',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '16px',
                        borderColor: theme?.palette?.customColors?.blue?.[10],
                        color: theme?.palette?.customColors?.blue?.[10]
                    }}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        width: '110px',
                        height: '40px',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '16px',
                        backgroundColor: theme?.palette?.customColors?.blue?.[22],
                        '&:hover': { backgroundColor: theme?.palette?.customColors?.blue?.[21] }
                    }}
                    onClick={handleContinue}
                    disabled={isCreating || isEditing}
                >
                    {buttonText}
                </Button>
            </Stack>
        </Box>
    );
}

export default CreatePricingPolicy;