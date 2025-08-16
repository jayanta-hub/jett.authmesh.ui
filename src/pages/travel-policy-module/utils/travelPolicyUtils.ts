import * as Yup from 'yup';

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const CommonSchema = {
    travelPolicyName: Yup.string()
        .nullable()
        .min(3, 'Travel Policy Name must be at least 3 characters long')
        .max(100, 'The Travel Policy name must not exceed 100 characters')
        .matches(
            /^(?!.* {2})[^\s](?:.*[^\s])?$/,
            'The Travel Policy Name must not have leading or trailing spaces, and should not contain multiple consecutive spaces.'
        ),
    selectedUserSegment:
        Yup.object().shape({
            Name: Yup.string(),
            Id: Yup.string(),
        })
            .required('Profiles are required')
            .test('not-empty', 'Profile is required', (value) => value !== null && Object.keys(value).length > 0),
    setOutOfPolicy: Yup.boolean().oneOf(
        [true, false],
        'Out of Policy Conditions must be enabled'
    ),
    policyConstants: Yup.array()
        .required('At least one policy constant is required')
        .min(1, 'At least one policy constant must be selected'),
    revalidationStages: Yup.object()
        .required('Revalidation stages are required')
        .test('not-empty', 'At least one revalidation stage must be selected', (value) =>
            value && Object.values(value).some((v) => v === true)
        ),
    bookingAbility: Yup.string(),
    selectedApprovalWorkflow: Yup.object()
        .nullable()
        .when('bookingAbility', {
            is: (val: string) => val === 'ALLOW',
            then: (schema) => schema.required('Approval workflow is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
}
export const validationSchema = [
    // Step 1: Applicability
    Yup.object({
        travelPolicyName: CommonSchema.travelPolicyName,
        selectedUserSegment:CommonSchema.selectedUserSegment,
    }),
    // Step 2: Policy Constraints
    Yup.object({
        travelPolicyName: CommonSchema.travelPolicyName,
        setOutOfPolicy: CommonSchema.setOutOfPolicy,
        policyConstants: CommonSchema.policyConstants,
    }),
    // Step 3: Policy Revalidation
    Yup.object({
        travelPolicyName: CommonSchema.travelPolicyName,
        revalidationStages: CommonSchema.revalidationStages,
        bookingAbility: CommonSchema.bookingAbility,
        selectedApprovalWorkflow: CommonSchema.selectedApprovalWorkflow,

    }),
    //edit validation : keep it in last index
    Yup.object({
        travelPolicyName: CommonSchema.travelPolicyName,
        setOutOfPolicy: CommonSchema.setOutOfPolicy,
        selectedUserSegment:CommonSchema.selectedUserSegment,
        policyConstants: CommonSchema.policyConstants,
        revalidationStages: CommonSchema.revalidationStages,
        bookingAbility: CommonSchema.bookingAbility,
        selectedApprovalWorkflow: CommonSchema.selectedApprovalWorkflow,

    }),
];
