import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  styled,
  Switch,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTagCountApiMutation } from "../../../../store/musafirAprrovalWorkFlow";
import { theme } from "../../../../theme";
import AWFCheckedIcon from '../../../../assets/icons/AWFCheckedIcon.svg';
import AWFUncheckedIcon from '../../../../assets/icons/AWFUncheckedIcon.svg';
import showAlertDialog from "../../../../utility/widgets/AlertDialog";
import { InfoOutlined } from "@mui/icons-material";

const CustomSwitch = styled(({ ...props }) => <Switch {...props}
  icon={
    <img
      src={AWFUncheckedIcon}
      alt="unchecked"
      style={{ width: 47.11, height: 16.28 }}
    />
  }
  checkedIcon={
    <img
      src={AWFCheckedIcon}
      alt="checked"
      style={{ width: 47.11, height: 16.28 }}
    />
  }
/>)(
  ({ theme }) => ({
    padding: 0,
    width: '29px',
    height: '20px',
    overflow: "inherit",
    '& .MuiSwitch-input': {
      left: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      zIndex: 2,
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: '10px',
      height: '10px',
      color: 'transparent',
    },
    '& .MuiSwitch-switchBase': {
      padding: 0,
      transitionDuration: '300ms',
      transform: 'none !important',
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: theme?.palette?.customColors?.blue[10],
        border: `6px solid ${theme?.palette?.customColors?.white[0]}`,
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme?.palette?.customColors?.white[23],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: theme?.palette?.customColors?.grey[16],
        opacity: 0.7,
        border: 'none'
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: '12.28px',
      backgroundColor: 'transparent !important',
    },
  }));

interface TagValue {
  Id: string;
  Name: string;
}

interface Tag {
  id: string;
  name: string;
  category: string;
  values?: TagValue[];
}

interface FilterDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedPredefinedTag?: Tag | null;
  unselectedTags: Tag[];
  onApplyFilters: (filters: {
    selectedFilters: Record<string, Record<string, boolean>>;
    inclusion: { anyone: boolean; everyone: boolean };
  }) => void;
  initialFilters?: Record<string, Record<string, boolean>>;
  initialInclusion: { anyone: boolean; everyone: boolean };
}

export default function FilterDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedPredefinedTag,
  unselectedTags,
  onApplyFilters,
  initialFilters = {},
  initialInclusion = { anyone: true, everyone: false },
}: FilterDrawerProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [inclusion, setInclusion] = useState(initialInclusion);
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, Record<string, boolean>>>(initialFilters);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});
  const [userCount, setUserCount] = useState<number>(0);
  const [fetchTagCount] = useTagCountApiMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isDrawerOpen) {
      setSelectedFilters(initialFilters);
      setInclusion(initialInclusion);
      setCollapsedTags({});
      setIsAllSelected(false);
    }
  }, [isDrawerOpen, selectedPredefinedTag?.id]);

  useEffect(() => {
    const allTags = [...unselectedTags];
    if (selectedPredefinedTag) {
      allTags.unshift(selectedPredefinedTag);
    }

    const allTagsWithValues = allTags.filter(
      (tag) => tag.values && tag.values.length > 0 && !collapsedTags[tag.id]
    );
    const allSelected =
      allTagsWithValues.length > 0 &&
      allTagsWithValues.every((tag) => isTagFullySelected(tag));

    setIsAllSelected(allSelected);
  }, [selectedFilters, unselectedTags, selectedPredefinedTag, collapsedTags]);

  const handleInclusionChange = (field: "anyone" | "everyone") => {
    setInclusion({
      anyone: field === "anyone",
      everyone: field === "everyone",
    });
  };

  const handleFilterToggle = (tagId: string, valueId: string) => {
    setSelectedFilters((prev) => {
      const currentTagFilters = prev[tagId] || {};
      const newValue = !currentTagFilters[valueId];

      const updatedTagFilters = {
        ...currentTagFilters,
        [valueId]: newValue,
      };

      if (!newValue) {
        delete updatedTagFilters[valueId];
        if (Object.keys(updatedTagFilters).length === 0) {
          const newState = { ...prev };
          delete newState[tagId];
          return newState;
        }
      }

      return {
        ...prev,
        [tagId]: updatedTagFilters,
      };
    });
  };

  const handleToggleCollapse = (tagId: string) => {
    setCollapsedTags((prev) => ({
      ...prev,
      [tagId]: !prev[tagId]
    }));

    setSelectedFilters((prev) => {
      if (!collapsedTags[tagId]) {
        const newFilters = { ...prev };
        delete newFilters[tagId];
        return newFilters;
      }
      return prev;
    });
  };


  const handleSelectAll = () => {
    const newSelectAllState = !isAllSelected;
    setIsAllSelected(newSelectAllState);

    if (newSelectAllState) {
      const allFilters: Record<string, Record<string, boolean>> = {};

      const allTags = [...unselectedTags];
      if (selectedPredefinedTag) {
        allTags.unshift(selectedPredefinedTag);
      }

      allTags.forEach((tag) => {
        if (tag.values && tag.values.length > 0 && !collapsedTags[tag.id]) {
          allFilters[tag.id] = tag.values.reduce((acc, val) => {
            acc[val.Id] = true;
            return acc;
          }, {} as Record<string, boolean>);
        }
      });

      setSelectedFilters(allFilters);
    } else {
      setSelectedFilters({});
    }
  };

  const handleResetAll = () => {
    setSelectedFilters({});
    setInclusion(initialInclusion);
    setIsAllSelected(false);
    setCollapsedTags({});
  };

  const handleApply = () => {
    if (Object.keys(selectedFilters).length === 0) {
      setIsDrawerOpen(false);
      return;
    }
    const cleanedFilters = Object.entries(selectedFilters).reduce(
      (acc, [tagId, filters]) => {
        if (collapsedTags[tagId]) return acc;

        const activeFilters = Object.entries(filters).filter(
          ([_, isActive]) => isActive
        );
        if (activeFilters.length > 0) {
          acc[tagId] = Object.fromEntries(activeFilters);
        }
        return acc;
      },
      {} as Record<string, Record<string, boolean>>
    );

    onApplyFilters({
      selectedFilters: cleanedFilters,
      inclusion,
    });
    setIsDrawerOpen(false);
  };

  const isTagFullySelected = (tag: Tag) => {
    if (!tag.values || tag.values.length === 0 || collapsedTags[tag.id]) return false;
    const tagFilters = selectedFilters[tag.id] || {};
    return tag.values.every((v) => tagFilters[v.Id]);
  };

  const fetchUserCount = async () => {
    try {
      const getBaseTagId = (tagId: string) => tagId.split('_')[0];
      const tagsFromFilters = Object.entries(selectedFilters)
        .filter(([tagId]) => {
          return (!selectedPredefinedTag || tagId !== selectedPredefinedTag.id) && tagId !== 'inclusion';
        })
        .map(([tagId, filters]) => {
          const activeValues = Object.entries(filters)
            .filter(([_, isActive]) => isActive)
            .map(([valueId]) => valueId);

          return {
            TagId: getBaseTagId(tagId),
            ValueIds: activeValues
          };
        })
        .filter(tag => tag.ValueIds.length > 0);

      const tagsFromPredefined = selectedPredefinedTag
        ? {
          TagId: getBaseTagId(selectedPredefinedTag.id),
          ValueIds: selectedPredefinedTag.values?.map(v => v.Id) || []
        }
        : null;

      const allTags = tagsFromPredefined
        ? [...tagsFromFilters, tagsFromPredefined]
        : [...tagsFromFilters];

      if (selectedPredefinedTag || tagsFromFilters.length > 0) {
        const response = await fetchTagCount({
          Context: {
            UserAgent: "Mozilla/5.0",
            TrackingId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
            TransactionId: "ac38544e-5f95-4c79-bb84-c284e7e3d6a7",
            CountryCode: "IN",
            IpAddress: "127.0.0.1"
          },
          Request: {
            Tags: allTags
          }
        });

        if ('data' in response) {
          setUserCount(response.data.Response.ProfilesCount || 0);
        }
      } else {
        setUserCount(0);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
      setUserCount(0);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, [selectedFilters, selectedPredefinedTag]);

  useEffect(() => {
    if (isDrawerOpen) {
      fetchUserCount();
    }
  }, [isDrawerOpen]);

  const handleCancel = async () => {
    const userConfirmed = await showAlertDialog(
      'Alert',
      'Are you sure you want to cancel? All unsaved changes will be discarded.'
    );
    if (!userConfirmed) {
      return;
    }
    setIsDrawerOpen(false)
  }

  const isTagCollapsed = (tagId: string) => collapsedTags[tagId];
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      sx={{
        zIndex: 10006,
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "100%", md: "800px" },
          maxWidth: "800px",
          mx: "auto",
          boxSizing: "border-box",
        },
      }}
      ModalProps={{
        disableEscapeKeyDown: true,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "15px 32px 10px 32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <IconButton sx={{ padding: 0 }} onClick={() => handleCancel()} aria-label="Close drawer">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          mt="13px"
        >
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            {t('apply_filters')}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2.5, border: "1px solid #E3E8EF" }} />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 1,
            "& .MuiButton-root": {
              borderRadius: "6px",
              textTransform: "none",
              fontWeight: 500,
              px: 2,
              py: 1,
              border: "1px solid #E0E0E0",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            },
            "& .MuiButton-contained": {
              backgroundColor: "#E3F2FD",
              border: `1px solid ${theme?.palette?.customColors?.blue[18]}`,
              "&:hover": {
                backgroundColor: "#E3F2FD",
              },
            },
          }}
        >
          <Button
            sx={{
              height: isMobile ? "29px" : "38px", width: isMobile ? "84px" : "95px",
              boxShadow: "none",
              backgroundColor: inclusion.anyone ? "#CBE5FF" : "transparent",
              border: inclusion.anyone ? "0.5px solid #0087FA" : "0.5px solid rgba(0, 0, 0, 0.23)",
              color: inclusion.anyone ? theme?.palette?.customColors?.black[1] : "#535353 !important",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: inclusion.anyone ? "#CBE5FF" : "transparent",
                border: inclusion.anyone ? "0.5px solid #0087FA" : "0.5px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            variant={inclusion.anyone ? "contained" : "outlined"}
            onClick={() => handleInclusionChange("anyone")}
          >
            {t('anyone')}
          </Button>
          <Button
            sx={{
              height: isMobile ? "29px" : "38px", width: isMobile ? "84px" : "95px",
              boxShadow: "none",
              color: inclusion.everyone ? theme?.palette?.customColors?.black[1] : "#535353 !important",
              "&:hover": {
                boxShadow: "none"
              }
            }}
            variant={inclusion.everyone ? "contained" : "outlined"}
            onClick={() => handleInclusionChange("everyone")}
          >
            {t('everyone')}
          </Button>
        </Box>
        {selectedPredefinedTag && (
          <Box key={selectedPredefinedTag.id}>
            <ListSubheader
              sx={{
                backgroundColor: "#FFFBEF",
                px: 1,
                py: 0.5,
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                margin: "10px 0px 20px 0px",
                gap: 1
              }}
            >
              <InfoOutlined sx={{ fontSize: "14px" }} />
              <Typography sx={{ fontSize: "10px", fontWeight: 500, color: theme?.palette?.customColors?.black[1] }}>
                {inclusion.anyone ? t('anyone') : t('everyone')} {t('from')} {selectedPredefinedTag.name}  {t('conditions_set_below')}
              </Typography>
            </ListSubheader>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    sx={{
                      color: theme?.palette?.customColors?.lightGray?.[21],
                      "&.Mui-checked": {
                        color: theme?.palette?.customColors?.blue?.[18],
                      },
                      "&.MuiCheckbox-root": {
                        padding: "0px 3px 5px 0",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "12px", color: theme?.palette?.customColors?.grey[8], marginBottom: "5px" }}>
                    {t('select_all')}
                  </Typography>
                }
                sx={{
                  m: 0,
                  "& .MuiTypography-root": {
                    fontSize: "12px",
                  },
                }}
              />
              <Typography
                onClick={handleResetAll}
                sx={{
                  fontSize: "12px",
                  color: "#FF0000",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {t('reset_all')}
              </Typography>
            </Box>
            <Divider sx={{ my: 1, border: "1px solid #E3E8EF" }} />
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            mb: 2,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a8a8a8",
            },
          }}
        >
          <List>
            {unselectedTags.map((tag) => (
              <Box key={tag.id}>
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    px: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: '14px' }} fontWeight={500}>
                    {tag.name}
                  </Typography>
                  {tag.values && tag.values.length > 0 && (
                    <CustomSwitch
                      size="small"
                      checked={!isTagCollapsed(tag.id)}
                      onChange={() => handleToggleCollapse(tag.id)}
                    />
                  )}
                </Box>

                {!isTagCollapsed(tag.id) && tag.values && tag.values.map((value) => (
                  <ListItem key={value?.Id} dense sx={{ px: 0 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!selectedFilters?.[tag?.id]?.[value?.Id]}
                          onChange={() => handleFilterToggle(tag.id, value.Id)}
                          sx={{
                            color: theme?.palette?.customColors?.lightGray?.[21],
                            "&.Mui-checked": {
                              color: theme?.palette?.customColors?.blue?.[18],
                            },
                            "&.MuiCheckbox-root": {
                              padding: "0px 3px 5px 0",
                            },
                          }}
                        />
                      }
                      label={value?.Name}
                      sx={{
                        m: 0,
                        "& .MuiTypography-root": {
                          fontSize: "12px",
                          color: selectedFilters?.[tag?.id]?.[value?.Id] ? theme?.palette?.customColors?.black[1] : "#676767",
                          marginBottom: "5px"
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </Box>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: theme?.palette?.customColors?.black[1], fontSize: '18px' }}>
              {userCount} {t('users')}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 400, color: theme?.palette?.customColors?.black[1], fontSize: '12px' }}>
              {t('matches_selected_criteria')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              width: "120px",
              backgroundColor: "#0083FF",
              textTransform: "none",
              fontWeight: 500,
              py: 1,
              px: 3,
              borderRadius: "6px",
              "&:disabled": {
                backgroundColor: "action.disabledBackground",
                color: "text.disabled",
              },
            }}
          >
            {t('select')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}