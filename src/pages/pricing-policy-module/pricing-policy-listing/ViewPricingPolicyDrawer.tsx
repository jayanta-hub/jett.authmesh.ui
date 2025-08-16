import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, CircularProgress, Divider, Drawer, Grid2, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomDrawer from '../../../components/core-module/custom-drawer/CustomDrawer';
import { theme } from '../../../theme';
import { useCurrencyDetails } from '../../../utility/hooks/useCurrencyDetails';
import { CurrencyType } from '../../../utility/types/homepage/homepageType';
import { Policy, FieldRowProps } from '../../../utility/types/policy-listing/PolicyListing';

interface ViewPricingPolicyDrawerProps {
  open: boolean;
  policy: Policy;
  loading?: boolean;
  onClose: () => void;
}

interface SelectionModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: string[];
}

const SelectionModal = ({ open, onClose, title, items }: SelectionModalProps) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      zIndex: (theme) => theme.zIndex.modal + 2,
      '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: "600px",
        mx: 'auto',
        zIndex: (theme) => theme.zIndex.modal + 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }
    }}
  >
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexShrink: 0,
      height: 128,
      position: 'relative',
      p: 2
    }}>
      <Typography variant="h6" sx={{
        fontSize: 18,
        fontWeight: 600
      }}>
        {title}
      </Typography>
      <IconButton onClick={onClose} size="small" sx={{
        position: 'absolute',
        top: 0,
        right: 18
      }}>
        <CloseIcon fontSize="small" sx={{ width: 16, height: 16 }} />
      </IconButton>
    </Box>
    <Divider sx={{ width: '94%', mx: 'auto' }} />
    <Box sx={{
      flex: 1,
      overflow: 'auto',
      p: 2,
    }}>
      <Box component="ul" sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        listStyle: 'none',
        p: 0,
        m: 0,
        alignItems: 'center'
      }}>
        {items.map((item) => (
          <Box
            key={item}
            component="li"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
              whiteSpace: 'nowrap'
            }}
          >
            <Box component="span" sx={{
              mr: 1,
              color: 'text.primary'
            }}>
              •
            </Box>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
    <Divider sx={{ width: '94%', mx: 'auto' }} />
    <Box sx={{
      p: 2,
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <Typography variant="body2" color="text.secondary">
        Number of {title?.toLowerCase()}: {items?.length}
      </Typography>
    </Box>
  </Drawer>
);

const ViewPricingPolicyDrawer: React.FC<ViewPricingPolicyDrawerProps> = ({ open, policy, loading, onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalItems, setModalItems] = useState<string[]>([]);
  const currency = useCurrencyDetails();
  const handleInfoClick = (title: string, items: string[]) => {
    setModalTitle(title);
    setModalItems(items);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CustomDrawer isOpen={open} anchor="right">
        <Box sx={{ width: { xs: '100vw', md: '82vw' }, maxWidth: 1000, margin: 'auto', marginTop: 5, px: 4, marginBottom: 5 }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton sx={{ color: theme?.palette?.customColors?.black?.[1] }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: 16, md: 22 } }}>
              {policy?.PricingPolicyName || policy?.policyName || 'Pricing Policy'} (ID: {policy?.PricingPolicyId || '-'})
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </Box>
          )}
          {policy && (
            <Box>
              <Grid2 container spacing={3} direction="column">
                <FieldRow label="Journey Type" desc="Sets the Journey Type(s) on which this Pricing Policy will be applicable"
                  value={formatSelections(policy.Components?.JourneyTypes)}
                  items={getSelectionItems(policy.Components?.JourneyTypes)}
                  onInfoClick={() => handleInfoClick('Journey Types', getSelectionItems(policy.Components?.JourneyTypes))}
                />
                <FieldRow label="Sector" desc="Sets the Sector(s) on which this Pricing Policy will be applicable"
                  value={formatSelections(policy.Components?.Sectors)}
                  items={getSelectionItems(policy.Components?.Sectors)}
                  onInfoClick={() => handleInfoClick('Sectors', getSelectionItems(policy.Components?.Sectors))}
                />
                <FieldRow label="Supplier" desc="Sets the Supplier(s) on which this Pricing Policy will be applicable"
                  value={formatSelections(policy.Components?.Suppliers, 'Value')}
                  items={getSelectionItems(policy.Components?.Suppliers, 'Value')}
                  onInfoClick={() => handleInfoClick('Suppliers', getSelectionItems(policy.Components?.Suppliers, 'Value'))}
                />
                <FieldRow label="Airline" desc="Sets the Airline(s) on which this Pricing Policy will be applicable"
                  value={formatSelections(policy.Components?.Airlines, 'Value')}
                  items={getSelectionItems(policy.Components?.Airlines, 'Value')}
                  onInfoClick={() => handleInfoClick('Airlines', getSelectionItems(policy.Components?.Airlines, 'Value'))}
                />
                <FieldRow label="Class" desc="Sets the Class(es) on which this Pricing Policy will be applicable"
                  value={formatSelections(policy.Components?.Classes, 'Name')}
                  items={getSelectionItems(policy.Components?.Classes, 'Name')}
                  onInfoClick={() => handleInfoClick('Classes', getSelectionItems(policy.Components?.Classes, 'Name'))}
                />
                <FieldRow label="Fare Type" desc="Sets the Fare Type(s) on which this Pricing Policy will be applicable"
                  value={policy.Components?.FareTypes || ''}
                  items={[policy.Components?.FareTypes || '']}
                  onInfoClick={() => handleInfoClick('Fare Types', [policy.Components?.FareTypes || ''])}
                />
              </Grid2>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '14px' }}>Markup Type</Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '12px', fontWeight: 400, color: theme?.palette?.customColors?.grey?.[8] }}>Configures the price markup for this Pricing Policy</Typography>
                </Box>
                <Box sx={{ margin: { xs: '8px 0px 15px 0px', sm: '0', md: "0" } }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: theme?.palette?.customColors?.black?.[1] }}>
                    {policy?.MarkupSetting?.MarkupType === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                  </Typography>
                </Box>
              </Box>
              <Grid2 container sx={{ ml: { xs: 0, sm: 4 } }} spacing={2} alignItems="flex-start">
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: theme?.palette?.customColors?.black?.[1], fontSize: '12px', fontWeight: 500, fontStyle: 'italic', mb: 0.5 }}>Value</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '12px' }}>{getMarkupValue(policy, currency)}</Typography>
                  </Box>
                </Grid2>
                {policy?.MarkupSetting?.MarkupType === 'PERCENTAGE' && (
                  <Grid2 size={{ xs: 12, sm: 12 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: theme?.palette?.customColors?.black?.[1], fontSize: '12px', fontWeight: 500, fontStyle: 'italic', mb: 0.5 }}>Applicable on</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '12px', whiteSpace: 'no-wrap' }}>{formatApplicableOn(policy.MarkupSetting?.ApplicableOn)}</Typography>
                    </Box>
                  </Grid2>
                )}
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: theme?.palette?.customColors?.black?.[1], fontSize: '12px', fontWeight: 500, fontStyle: 'italic', mb: 0.4 }}>Refundable on Cancellation</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '12px' }}>{formatRefundable(policy.MarkupSetting?.RefundOnCancellation)}</Typography>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          )}
        </Box>
      </CustomDrawer>
      <SelectionModal
        open={modalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        items={modalItems}
      />
    </>
  );
};

function FieldRow({ label, desc, value, items = [], onInfoClick }: FieldRowProps) {
  const hasMultipleItems = items.length > 1;
  let displayValue = 'All';
  if (label === 'Fare Type') {
    displayValue = value;
  } else if (hasMultipleItems) {
    displayValue = `${items.length} selections`;
  } else if (items.length > 0) {
    displayValue = value;
  }
  return (
    <Grid2>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', justifyContent: 'space-between', minHeight: 56 }}>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '12px', sm: '14px' } }}>{label}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, fontSize: { xs: '10px', sm: '12px' } }}>{desc}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120, justifyContent: { xs: 'flex-start', sm: 'flex-end' }, marginTop: "3px" }}>
          <Typography variant="body1" sx={{ fontWeight: 500, textAlign: 'right', fontSize: { xs: '10px', sm: '12px' } }}>
            {displayValue}
          </Typography>
          {hasMultipleItems && onInfoClick && (
            <IconButton
              onClick={onInfoClick}
              size="small"
              sx={{
                pl: 0.5,
                pr: 0,
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                },
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: { xs: 10, sm: 16 }, color: theme?.palette?.customColors?.blue?.[18] }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Grid2>
  );
}

function getSelectionItems(arr = [], key?: string): string[] {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (key) return arr.map((item) => item[key] || '').filter(Boolean);
  if (typeof arr[0] === 'object' && arr[0] !== null) {
    if ('Value' in arr[0]) return arr.map((item: { Value: string }) => item.Value).filter(Boolean);
    if ('Name' in arr[0]) return arr.map((item: { Name: string }) => item.Name).filter(Boolean);
    if ('Key' in arr[0]) return arr.map((item: { Key: string }) => item.Key).filter(Boolean);
    return arr.map((item) => JSON.stringify(item)).filter(Boolean);
  }
  return arr.filter(Boolean);
}

function formatSelections(arr = [], key?: string) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  if (key) return arr.map((item) => item[key] || '').join(', ');
  if (typeof arr[0] === 'object' && arr[0] !== null) {
    if ('Value' in arr[0]) return arr.map((item: { Value: string }) => item.Value).join(', ');
    if ('Name' in arr[0]) return arr.map((item: { Name: string }) => item.Name).join(', ');
    if ('Key' in arr[0]) return arr.map((item: { Key: string }) => item.Key).join(', ');
    return arr.map((item) => JSON.stringify(item)).join(', ');
  }
  return arr.join(', ');
}

function getMarkupValue(policy: Policy, currency: CurrencyType) {
  const m = policy?.MarkupSetting;
  if (!m) return '';
  if (m.MarkupType === 'PERCENTAGE') {
    return `${m.MarkupValue || ''}% upto ${m.MarkupMaxLimit || ''} ${currency?.IsoCode3}`;
  }
  if (m.MarkupType === 'FIXED AMOUNT') {
    return `${m.MarkupValue || ''} ${currency?.IsoCode3}`;
  }
  return '';
}

function formatRefundable(val?: string) {
  if (!val) return '';
  if (val === 'ALLOWED') return 'Yes';
  if (val === 'NOT_ALLOWED') return 'No';
  return val;
}

function formatApplicableOn(val?: string) {
  if (!val) return '';
  const mapping: Record<string, string> = {
    'BASE_FARE': 'Base Fare',
    'SURCHARGE': 'Surcharge',
    'TAX': 'Tax',
    'TAXES': 'Taxes',
    'BASE_FARE_PLUS_SURCHARGE': 'Base Fare + Surcharge',
    'BASE_FARE_PLUS_SURCHARGE_PLUS_TAX': 'Base Fare + Surcharge + Tax',
    'BASE_FARE_PLUS_SURCHARGE_PLUS_TAXES': 'Base Fare + Surcharge + Taxes',
  };
  if (mapping[val]) return mapping[val];
  const parts = val.split('_PLUS_').map(part => mapping[part] || part.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  return parts.join('\n');
}

export default ViewPricingPolicyDrawer; 