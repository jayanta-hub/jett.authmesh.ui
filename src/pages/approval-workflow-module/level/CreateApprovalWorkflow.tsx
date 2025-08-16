import { IndeterminateCheckBox, InfoOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Collapse,
  Drawer,
  Grow,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Select,
  styled,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AddIconLevel from "../../../assets/icons/AddIconLevel.svg";
import DeleteActive from "../../../assets/icons/DeleteActive.svg";
import DeleteIcon from "../../../assets/icons/DeleteIcon.svg";
import EditIcon from "../../../assets/icons/EditIcon.svg";
import BlueSwitch from "../../../components/core-module/blue-switch/BlueSwitch";
import LoadingScreen from "../../../components/core-module/loading-screen/LoadingScreen";
import {
  useCreateApprovalWorkflowMutation,
  useEditWorkflowListByIdMutation,
} from "../../../store/musafirAprrovalWorkFlow";
import { useGetAutoCompleteTripSearchQuery } from "../../../store/slice/ApprovalAutoCompletegqlSlice";
import { theme } from "../../../theme";
import { getInitials } from "../../../utility/helper";
import { CreateApprovalWorkflowProps, GroupedOptions, Level, Sequence, Tag } from "../../../utility/types/create-approval-workflow/CreateApprovalWorkflow";
import './CreateApprovalWorkflow.css';
import { ConfirmationModal } from "./confirmation-modal/ConfirmationModal";
import FilterDrawer from "./filter-drawer/FilterDrawer";
import showAlertDialog from '../../../utility/widgets/AlertDialog';
import AWFCheckedIcon from '../../../assets/icons/AWFCheckedIcon.svg';
import AWFUncheckedIcon from '../../../assets/icons/AWFUncheckedIcon.svg';
import AWFDisabledCheckedIcon from '../../../assets/icons/AWFDisabledCheckedIcon.svg'
import AWFDisabledUncheckedIcon from '../../../assets/icons/AWFDisabledUncheckedIcon.svg'

const CreateApprovalWorkflow: React.FC<CreateApprovalWorkflowProps> = ({
  setIsLevelDrawerOpen,
  setIsCreated,
  isLevelDrawerOpen,
  isEditMode,
  setIsEditMode,
  refresh = false,
  setApprovalWorkflowCreated = () => { },
  setRefresh = () => { }
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const { workflowListById } = useSelector(
    (state: any) => state.approvalWorkFlowSlice
  );
  const [unselectedTags, setUnselectedTags] = useState<Tag[]>([]);
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [draggedOverrideLevel, setDraggedOverrideLevel] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [originalLevels, setOriginalLevels] = useState<Level[]>([]);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [draggedSequenceId, setDraggedSequenceId] = useState<number | null>(null);
  const [hoveredDragHandleId, setHoveredDragHandleId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: apiData } = useGetAutoCompleteTripSearchQuery(
    { searchKey: searchKey },
    { skip: searchKey.length < 3 }
  );
  const [createWorkflow, { isLoading }] = useCreateApprovalWorkflowMutation();
  const [editWorkflowById, { isLoading: editLoading }] = useEditWorkflowListByIdMutation();
  const textFieldRef = useRef<HTMLDivElement>(null);
  const isRTL = localStorage.getItem("isRtl") === "true";
  const [drawerRight, setDrawerRight] = useState('calc((100vw - 1280px) / 2)');
  const [fullApiTags, setFullApiTags] = useState<Tag[]>([]);
  const [selectOpen, setSelectOpen] = React.useState<{ [key: string]: boolean }>({});
  const [currentFilterTag, setCurrentFilterTag] = useState<{
    levelId: number;
    sequenceId: number;
    tag: Tag | null;
  } | null>(null);
  const { data: initialTagsData } = useGetAutoCompleteTripSearchQuery(
    { searchKey: "" },
    { skip: false }
  );
  const [dragDestination, setDragDestination] = useState<{ levelId: number; seqIndex: number } | null>(null);
  useEffect(() => {
    function updateDrawerRight() {
      const zoom = window.outerWidth / window.innerWidth;
      if (zoom > 1.05) {
        setDrawerRight('0px');
      } else {
        setDrawerRight(isTab ? '0px' : 'calc((100vw - 1280px) / 2)');
      }
    }
    updateDrawerRight();
    window.addEventListener('resize', updateDrawerRight);
    return () => window.removeEventListener('resize', updateDrawerRight);
  }, []);

  useEffect(() => {
    if (initialTagsData) {
      const allPredefinedTags =
        initialTagsData?.AutoCompleteApproversSearch?.Response?.PredefinedTags || [];

      const initialUnselectedTags = allPredefinedTags
        ?.filter((tag: { Id: string; Values: any[] }) => tag.Values && tag.Values.length > 0)
        ?.map((tag: { Id: any; Name: any; Values: any }) => ({
          id: tag.Id,
          type: "predefined",
          name: tag.Name,
          category: "Predefined Tag",
          values: tag.Values,
        }));

      setFullApiTags(initialUnselectedTags);
      setUnselectedTags(initialUnselectedTags);
    }
  }, [initialTagsData]);

  const StyledSwitch = styled(Switch)(({ theme }) => ({
    padding: 0,
    width: '29px',
    height: '20px',
    overflow: "inherit",
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

  const CustomSwitch = ({ checked, disabled, ...props }) => {
    const uncheckedIcon = disabled ? AWFDisabledUncheckedIcon : AWFUncheckedIcon;
    const checkedIcon = disabled ? AWFDisabledCheckedIcon : AWFCheckedIcon;

    return (
      <StyledSwitch
        checked={checked}
        disabled={disabled}
        icon={<img src={uncheckedIcon} alt="unchecked" style={{ width: 47.11, height: 20.28 }} />}
        checkedIcon={<img src={checkedIcon} alt="checked" style={{ width: 47.11, height: 20.28 }} />}
        {...props}
      />
    );
  };

  const resetForm = () => {
    setValue("");
    setLevels([
      {
        id: 1,
        expanded: true,
        overrideProduct: false,
        sequences: [
          {
            id: 1,
            text: "",
            searchTerm: "",
            approvalRequired: true,
            costCenter: {
              admin: false,
              value1: false,
              value2: false,
            },
            gender: {
              male: false,
              female: false,
              another: false,
            },
            level: {
              level1: false,
              level2: false,
              level3: false,
            },
            designation: {
              manager: false,
              director: false,
              vp: false,
            },
            inclusion: {
              anyone: true,
              everyone: false,
            },
          },
        ],
        minApprovalsRequired: 1,
      },
    ]);
    setCustomCodeEnabled(false);
  };

  const handleCancel = async () => {
    const userConfirmed = await showAlertDialog(
      'Alert',
      'Are you sure you want to cancel? All unsaved changes will be discarded.'
    );
    if (!userConfirmed) {
      return;
    }
    setIsLevelDrawerOpen(false);
    resetForm();
    setIsEditMode(false);
  }

  useEffect(() => {
    if (isEditMode && workflowListById) {
      initializeEditMode(workflowListById);
    } else {
      initializeCreateMode();
    }
  }, [workflowListById, isEditMode]);

  const initializeEditMode = (workflowData: any) => {
    setValue(workflowData?.Response?.Name);

    const transformedLevels = workflowData?.Response?.Levels?.map(
      (
        level: { Sequences: any[]; IsOverridesPrevious: any; CountOfApprovals: any },
        index: number
      ) => {
        const sequences = level?.Sequences?.map((seq: any, seqIndex: number) =>
          transformSequence(seq, seqIndex)
        );

        return {
          id: index + 1,
          expanded: true,
          sequences,
          overrideProduct: level.IsOverridesPrevious,
          minApprovalsRequired: level.CountOfApprovals,
        };
      }
    );

    setLevels(transformedLevels);
  };

  const transformSequence = (seq: any, seqIndex: number) => {
    const userTags: Tag[] =
      seq.Profile?.map((profile: { ProfileId: any; ProfileName: any }) => ({
        id: profile.ProfileId,
        type: "user",
        name: profile.ProfileName,
        category: "User",
        avatar: "https://via.placeholder.com/40",
      })) || [];

    const otherTags: Tag[] =
      seq.Tags?.flatMap((tag: any) => transformTag(tag)) || [];

    return {
      id: seqIndex + 1,
      text: "",
      searchTerm: "",
      approvalRequired: seq.IsApprovalRequired,
      userInputRequired: seq.IsUserInputRequired,
      selectedTags: [...userTags, ...otherTags],
      appliedFilters: !!seq.Filters,
      filterData: seq.Filters,
      costCenter: seq.Filters?.costCenter || {
        admin: false,
        value1: false,
        value2: false,
      },
      gender: seq.Filters?.gender || {
        male: false,
        female: false,
        another: false,
      },
      level: seq.Filters?.level || {
        level1: false,
        level2: false,
        level3: false,
      },
      designation: seq.Filters?.designation || {
        manager: false,
        director: false,
        vp: false,
      },
      inclusion: seq.Filters?.inclusion || {
        anyone: true,
        everyone: false,
      },
    };
  };

  const transformTag = (tag: any): Tag[] => {
    const isCustomTag = tag?.Category === "CUSTOM";

    if (isCustomTag) {
      return [
        {
          id: tag.TagId,
          type: "custom",
          name: tag.TagName,
          category: "Custom Tags",
          values:
            tag.AssociatedValues?.map((value: any) => ({
              Id: value.AssociatedValueId,
              Name: value.AssociatedValueName,
            })) || [],
        },
      ];
    }

    if (!tag.AssociatedValues || tag.AssociatedValues.length === 0) {
      return [
        {
          id: tag.TagId,
          type: "predefined",
          name: tag.TagName || "",
          category: "Predefined Tag",
          values: [],
        },
      ];
    }

    return tag.AssociatedValues.map((value: any) => ({
      id: `${tag.TagId}_${value.AssociatedValueId}`,
      type: "predefined-value",
      name: `${tag.TagName || "Tag"}(${value.AssociatedValueName || value.AssociatedValueId})`,
      category:
        tag?.Category?.charAt(0)?.toUpperCase() +
        tag?.Category?.slice(1)?.toLowerCase() || "",
      valueId: value.AssociatedValueId,
      parentTagId: tag.TagId,
      originalValue: value,
    }));
  };

  const initializeCreateMode = () => {
    setLevels([
      {
        id: 1,
        expanded: true,
        overrideProduct: false,
        sequences: [
          {
            id: 1,
            text: "",
            searchTerm: "",
            approvalRequired: true,
            costCenter: {
              admin: false,
              value1: false,
              value2: false,
            },
            gender: {
              male: false,
              female: false,
              another: false,
            },
            level: {
              level1: false,
              level2: false,
              level3: false,
            },
            designation: {
              manager: false,
              director: false,
              vp: false,
            },
            inclusion: {
              anyone: true,
              everyone: false,
            },
          },
        ],
        minApprovalsRequired: 1,
      },
    ]);
  };

  const transformApiDataToTags = (): Tag[] => {
    if (!apiData?.AutoCompleteApproversSearch?.Response) return [];

    const response = apiData.AutoCompleteApproversSearch.Response;
    const tags: Tag[] = [];

    response?.Profiles?.forEach((profile: any) => {
      tags.push({
        id: profile.Id,
        type: "user",
        name: `${profile.FirstName} ${profile.LastName}`.trim(),
        category: "User",
        avatar: "https://via.placeholder.com/40",
      });
    });
    response?.PredefinedTags?.forEach((tag: any) => {
      if (tag.Values && tag.Values.length > 0) {
        tag.Values.forEach((value: any) => {
          tags.push({
            id: `${tag.Id}_${value.Id}`,
            type: "predefined-value",
            name: `${tag.Name}(${value.Name})`,
            category: "Predefined Tag",
            valueId: value.Id,
            parentTagId: tag.Id,
            originalValue: value,
            values: [value]
          });
        });
      } else {
        tags.push({
          id: tag.Id,
          type: "predefined",
          name: tag.Name,
          category: "Predefined Tag",
          values: []
        });
      }
    });
    response?.CustomTags?.forEach((tag: any) => {
      tags.push({
        id: tag.Id,
        type: "custom",
        name: tag.Name,
        category: "Custom Tags",
        values: tag.Values || [],
        originalValue: tag.Values || []
      });
    });

    return tags;
  };

  const [customCodeEnabled, setCustomCodeEnabled] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([
    {
      id: 1,
      expanded: false,
      overrideProduct: false,
      sequences: [
        {
          id: 1,
          text: "",
          searchTerm: "",
          approvalRequired: true,
          costCenter: {
            admin: false,
            value1: false,
            value2: false,
          },
          gender: {
            male: false,
            female: false,
            another: false,
          },
          level: {
            level1: false,
            level2: false,
            level3: false,
          },
          designation: {
            manager: false,
            director: false,
            vp: false,
          },
          inclusion: {
            anyone: true,
            everyone: false,
          },
        },
      ],
      minApprovalsRequired: 1,
    },
  ]);

  const [value, setValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<GroupedOptions[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [selectedPredefinedTag, setSelectedPredefinedTag] =
    useState<Tag | null | undefined>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentSequenceInfo, setCurrentSequenceInfo] = useState<{
    levelId: number;
    sequenceId: number;
  } | null>(null);
  const [expanded, setExpanded] = useState<string[]>(() => {
    return filteredOptions.length > 0
      ? filteredOptions?.map((option, index) => `${index}-${option.category}`)
      : [];
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textFieldRef.current && !textFieldRef.current.contains(event.target as Node)) {
        setEditTitle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filteredOptions.length > 0) {
      setExpanded(filteredOptions?.map((option, index) => `${index}-${option.category}`));
    } else {
      setExpanded([]);
    }
  }, [filteredOptions]);

  const handleAccordionChange = (index: number, category: string) => {
    const id = `${index}-${category}`;
    setExpanded((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded?.filter((item) => item !== id)
        : [...prevExpanded, id]
    );
  };

  const buildContext = () => ({
    UserAgent: "Mozilla/5.0",
    TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
    TransactionId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
    IpAddress: "192.168.1.1",
    CountryCode: "IN",
  });

  const getProfilesFromTags = (tags: any[]) =>
    tags.filter((tag) => tag.type === "user").map((tag) => tag.id);

  const getTagsFromTags = (tags: any[]) =>
    tags
      .filter((tag) => tag.type !== "user")
      .map((tag) => {
        if (tag.type === "custom") {
          const tagId = tag.parentTagId || tag.id.split("_")[0] || tag.id;
          const associatedValues = tag.values?.length
            ? tag.values.map((v: any) => v.Id)
            : tag.originalValue
              ? [tag.originalValue.AssociatedValueId]
              : [];
          return { TagId: tagId, AssociatedValues: associatedValues };
        }

        if (tag.type === "predefined-value" || tag.type === "custom-value") {
          return {
            TagId: tag.parentTagId || tag.id.split("_")[0],
            AssociatedValues: [tag.valueId],
          };
        }

        return { TagId: tag.id, AssociatedValues: [] };
      });

  const determineApprovalScope = (filterData: any) => {
    if (filterData?.inclusion?.anyone) return "Anyone";
    return "Everyone";
  };

  const mapSequenceToApi = (sequence: any, index: number) => {
    const sequenceData: any = {
      SequenceNumber: index,
      IsApprovalRequired: Boolean(sequence.approvalRequired),
      IsUserInputRequired: Boolean(sequence.userInputRequired),
      ApprovalScope: determineApprovalScope(sequence.filterData),
    };

    if (sequence.selectedTags) {
      const profiles = getProfilesFromTags(sequence.selectedTags);
      const tags = getTagsFromTags(sequence.selectedTags);
      if (profiles.length > 0) sequenceData.Profiles = profiles;
      if (tags.length > 0) sequenceData.Tags = tags;
    }

    if (sequence.appliedFilters && sequence.filterData) {
      sequenceData.Filters = sequence.filterData;
    }

    return sequenceData;
  };

  const mapLevelToApi = (level: any, index: number) => {
    const sequencesApiFormat = level.sequences?.map(mapSequenceToApi) || [];

    return {
      LevelNumber: index,
      Sequences: sequencesApiFormat,
      CountOfApprovals: level.minApprovalsRequired ?? sequencesApiFormat.length,
      IsOverridesPrevious: Boolean(level.overrideProduct),
    };
  };

  const transformToApiRequest = (): any => {
    const context = buildContext();
    const levelsApiFormat = levels?.map(mapLevelToApi);

    const request: any = {
      Name: value,
      Levels: levelsApiFormat,
    };

    if (isEditMode && workflowListById?.Response?.WorkflowId) {
      request.WorkflowId = workflowListById?.Response?.WorkflowId;
    }

    return { Context: context, Request: request };
  };

  const removeTagFromSequence = (
    sequence: Sequence,
    tagId: string,
    isOnlyLevelAndSequence: boolean
  ): Sequence | null => {
    const updatedTags = sequence.selectedTags?.filter(tag => tag.id !== tagId);
    const hasPredefinedTags = updatedTags?.some(
      (tag) => tag.type === "predefined" || tag.type === "predefined-value"
    );

    if (!updatedTags || updatedTags.length === 0) {
      if (isOnlyLevelAndSequence) {
        return {
          ...sequence,
          selectedTags: [],
          appliedFilters: false,
          filterData: undefined,
        };
      }
      return null;
    }

    return {
      ...sequence,
      selectedTags: updatedTags,
      appliedFilters: hasPredefinedTags ? sequence.appliedFilters : false,
      filterData: hasPredefinedTags ? sequence.filterData : undefined,
    };
  };

  const updateLevelAfterTagRemoval = (
    level: Level,
    sequenceId: number,
    tagId: string,
    isOnlyLevel: boolean
  ): Level | null => {
    const isOnlyOneSequence = level.sequences?.length === 1;
    const isOnlyLevelAndSequence = isOnlyLevel && isOnlyOneSequence;

    const updatedSequences = level.sequences
      ?.map(seq =>
        seq.id === sequenceId
          ? removeTagFromSequence(seq, tagId, isOnlyLevelAndSequence)
          : seq
      )
      .filter((seq): seq is Sequence => seq !== null);

    if (!updatedSequences.length) {
      return isOnlyLevel ? { ...level, sequences: [] } : null;
    }

    return { ...level, sequences: updatedSequences };
  };

  const renumberLevels = (levels: Level[]): Level[] => {
    return levels.map((level, index) => ({
      ...level,
      id: index + 1,
    }));
  };

  const handleRemoveTag = (
    levelId: number,
    sequenceId: number,
    tagId: string
  ) => {
    setLevels((prev) => {
      const isOnlyOneLevel = prev.length === 1;

      const updatedLevels = prev
        ?.map(level =>
          level.id === levelId
            ? updateLevelAfterTagRemoval(level, sequenceId, tagId, isOnlyOneLevel)
            : level
        )
        .filter((level): level is Level => level !== null);

      return renumberLevels(updatedLevels);
    });
  };

  const handleSave = async () => {
    try {
      const requestBody = transformToApiRequest();
      type CreateResponse = { Context: { StatusCode: number; Message: string } };
      type EditResponse = { StatusCode: number; Message: string };
      const response = isEditMode
        ? await editWorkflowById(requestBody).unwrap() as EditResponse
        : await createWorkflow(requestBody).unwrap() as CreateResponse;
      if (
        (isEditMode && typeof response === "object" && "StatusCode" in response && response.StatusCode === 1002) ||
        (!isEditMode && typeof response === "object" && "Context" in response && response.Context.StatusCode === 1001)
      ) {
        enqueueSnackbar(
          isEditMode
            ? (response as EditResponse).Message
            : (response as CreateResponse).Context.Message,
          {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
        setIsLevelDrawerOpen(false);
        resetForm();
        setIsEditMode(false);
        setIsCreated(true);
        setApprovalWorkflowCreated(response?.Response?.WorkflowId)
        setRefresh(!refresh);
      } else {
        enqueueSnackbar(
          !isEditMode
            ? (response as CreateResponse)?.Context?.Message
            : (response as EditResponse)?.Message || "Error",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        error?.data?.Message ? error?.data?.Message : t("something_went_wrong"),
        {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        }
      );
    }
  };

  const updateSequenceSearchTerm = (
    levels: Level[],
    levelId: number,
    sequenceId: number,
    searchTerm: string
  ): Level[] => {
    return levels?.map((level) =>
      level.id === levelId
        ? {
          ...level,
          sequences: level.sequences?.map((seq) =>
            seq.id === sequenceId ? { ...seq, searchTerm } : seq
          ),
        }
        : level
    );
  };

  const getFilteredUnselectedTags = (currentTags: Tag[], allTags: Tag[]): Tag[] => {
    return allTags?.filter(tag =>
      !currentTags.some(selectedTag =>
        selectedTag.id === tag.id ||
        (selectedTag.parentTagId && selectedTag.parentTagId === tag.id)
      )
    );
  };

  const getGroupedFilteredOptions = (tags: Tag[], value: string): GroupedOptions[] => {
    return tags
      ?.filter((opt) => opt.name.toLowerCase().includes(value))
      .reduce((acc: GroupedOptions[], opt) => {
        const group = acc.find((g) => g.category === opt.category);
        if (group) {
          group.items.push(opt);
        } else {
          acc.push({ category: opt.category, items: [opt] });
        }
        return acc;
      }, []);
  };

  const handleSearch = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    levelId: number,
    sequenceId: number
  ) => {
    const value = e.target.value.toLowerCase();
    const currentLevel = levels.find((level) => level.id === levelId);
    const currentSequence = currentLevel?.sequences.find((seq) => seq.id === sequenceId);
    const currentSelectedTags = currentSequence?.selectedTags || [];
    setLevels((prev) => updateSequenceSearchTerm(prev, levelId, sequenceId, value));
    const filteredUnselectedTags = getFilteredUnselectedTags(currentSelectedTags, fullApiTags || []);
    setUnselectedTags(filteredUnselectedTags);
    if (value.length >= 3) {
      setSearchKey(value);
    } else {
      const tags = transformApiDataToTags();
      const filteredTags = currentSelectedTags.some((tag) => tag.type === "user")
        ? tags?.filter((tag) => tag.type === "user")
        : tags;
      const groupedOptions = getGroupedFilteredOptions(filteredTags, value);
      setFilteredOptions(groupedOptions);
      setAnchorEl(e.currentTarget as HTMLInputElement);
    }
  };

  const updateSearchTerm = (level: Level, levelId: number, sequenceId: number): Level => {
    if (level.id !== levelId) return level;

    const updatedSequences = level.sequences?.map((seq) =>
      seq.id === sequenceId ? { ...seq, searchTerm: '' } : seq
    );

    return {
      ...level,
      sequences: updatedSequences,
    };
  };

  const resetSearch = async (levelId: number, sequenceId: number) => {
    setLevels((prev) => prev?.map((level) => updateSearchTerm(level, levelId, sequenceId)));
  };

  useEffect(() => {
    if (apiData && searchKey.length >= 3) {
      const currentSequence = levels
        .find(
          (level) =>
            level.id ===
            parseInt(
              anchorEl?.parentElement?.parentElement?.parentElement?.id.split(
                "-"
              )[1] || "0"
            )
        )
        ?.sequences.find(
          (seq) =>
            seq.id ===
            parseInt(
              anchorEl?.parentElement?.parentElement?.parentElement?.id.split(
                "-"
              )[2] || "0"
            )
        );

      const hasUserSelected = currentSequence?.selectedTags?.some(
        (tag) => tag.type === "user"
      );

      const tags = transformApiDataToTags();
      const filteredTags = hasUserSelected
        ? tags?.filter((tag) => tag.type === "user")
        : tags;

      const groupedOptions = filteredTags
        ?.filter((opt) => opt.name.toLowerCase().includes(searchKey))
        .reduce((acc: GroupedOptions[], opt) => {
          const group = acc.find((g) => g.category === opt.category);
          if (group) {
            group.items.push(opt);
          } else {
            acc.push({ category: opt.category, items: [opt] });
          }
          return acc;
        }, []);
      setFilteredOptions(groupedOptions);
    }
  }, [apiData, searchKey, anchorEl, levels]);

  const addLevel = (insertAfterIndex: number) => {
    setLevels((prevLevels) => {
      const newLevels = [...prevLevels];
      const newLevel = {
        id: Date.now(),
        expanded: true,
        sequences: [{
          id: Date.now(),
          text: "",
          searchTerm: "",
          approvalRequired: true,
          userInputRequired: false,
          selectedTags: [],
          appliedFilters: false,
          filterData: undefined,
        }],
        minApprovalsRequired: 1,
        overrideProduct: false,
      };
      newLevels?.splice(insertAfterIndex + 1, 0, newLevel);
      return newLevels?.map((level, index) => ({
        ...level,
        id: index + 1,
      }));
    });
  };

  const validateMinApprovals = (level: Level, newValue: number): Level => {
    if (!level?.sequences?.length) return level;
    const approvalRequiredCount = level.sequences.filter(seq => seq.approvalRequired).length;
    const minRequired = Math.max(1, approvalRequiredCount);
    const maxAllowed = level.sequences.length;
    const validatedValue = Math.min(maxAllowed, Math.max(minRequired, newValue));
    return {
      ...level,
      minApprovalsRequired: validatedValue,
    };
  };
  const handleMinApprovalsChange = (levelId: number, newValue: number) => {
    setLevels((prevLevels: Level[]) =>
      prevLevels?.map((level) =>
        level.id === levelId ? validateMinApprovals(level, newValue) : level
      )
    );
  };

  const removeLevel = (id: number) => {
    setLevels(prevLevels =>
      prevLevels
        ?.filter(level => level.id !== id)
        ?.map((level, index) => ({
          ...level,
          id: index + 1
        }))
    );
  };

  const toggleExpand = (id: number) => {
    setLevels((prev) =>
      prev?.map((level) =>
        level.id === id ? { ...level, expanded: !level.expanded } : level
      )
    );
  };

  const onDragStart = (start: DragStart) => {
    if (start.type === 'SEQUENCE') {
      const parts = start.draggableId.split('-');
      if (parts.length === 3 && parts[0] === 'seq') {
        setDraggedSequenceId(Number(parts[2]));
      }
    } else {
      setDraggedSequenceId(null);
    }
    setIsDragging(true);
    const draggedLevel = levels.find(level => level.id.toString() === start.draggableId);
    setDraggedOverrideLevel(draggedLevel?.overrideProduct || false);
    setOriginalLevels([...levels]);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    setDraggedSequenceId(null);
    setHoveredDragHandleId(null)
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }
    const destinationLevel = levels[result.destination.index];
    const isSwappingWithOverride = destinationLevel?.overrideProduct;
    if ((draggedOverrideLevel || isSwappingWithOverride) && result?.type === "LEVEL") {
      const clonedLevels = structuredClone(levels);
      setOriginalLevels(clonedLevels);
      setLevels(() => getUpdatedLevels(clonedLevels, result));
      setShowConfirmModal(true);
      return;
    }
    if (result?.type === "SEQUENCE") {
      processDrop(result)
      return;
    }
    swapLevels(result.source.index, result.destination.index);
  };
  const swapLevels = (sourceIndex: number, targetIndex: number) => {
    setLevels(prevLevels => {
      const newLevels = [...prevLevels];
      const sourceLevel = { ...newLevels[sourceIndex] };
      const targetLevel = { ...newLevels[targetIndex] };
      if (targetIndex < sourceIndex && targetIndex === 0 && sourceLevel?.overrideProduct) {
        sourceLevel.overrideProduct = false;
      }
      if (targetIndex >= sourceIndex && targetLevel?.overrideProduct) {
        sourceLevel.overrideProduct = false;
      }
      newLevels[sourceIndex] = { ...targetLevel, id: sourceIndex + 1 };
      newLevels[targetIndex] = { ...sourceLevel, id: targetIndex + 1 };
      return newLevels;
    });
  };
  const handleConfirmation = (confirmed: boolean) => {
    if (!confirmed) {
      setLevels(originalLevels);
    }
    else {
      setLevels((prevLevels) => {
        return prevLevels?.map((level, index) => ({
          ...level,
          id: index + 1,
        }));
      })
    }
    setShowConfirmModal(false);
  };
  const getUpdatedLevels = (prevLevels: Level[], result: DropResult): Level[] => {
    const newLevels = structuredClone(prevLevels);
    const sourceIndex = result?.source?.index;
    const destIndex = result?.destination?.index;
    if (sourceIndex == null || destIndex == null) return newLevels;
    const movedLevel = newLevels[sourceIndex];
    const otherLevel = newLevels[destIndex];
    const movedLevelState = movedLevel?.overrideProduct;
    const otherLevelState = otherLevel?.overrideProduct;
    if (movedLevel && otherLevel) {
      const isMovedLevelMultiSequenced = movedLevel.sequences?.length > 1;
      const isOtherLevelMultiSequenced = otherLevel.sequences?.length > 1;

      if (sourceIndex === 0) {
        otherLevel.overrideProduct = false;
      }

      if (destIndex === 0) {
        movedLevel.overrideProduct = false;
      }

      if (sourceIndex !== 0 && destIndex !== 0) {
        if (isMovedLevelMultiSequenced && destIndex < sourceIndex && otherLevel?.overrideProduct) {
          otherLevel.overrideProduct = false;
        }

        if (isOtherLevelMultiSequenced && destIndex > sourceIndex && movedLevel?.overrideProduct) {
          movedLevel.overrideProduct = false;
        }

        if (!isMovedLevelMultiSequenced && !isOtherLevelMultiSequenced) {
          if (destIndex < sourceIndex) {
            if ((movedLevelState && otherLevelState) || (!movedLevelState && otherLevelState)) {
              otherLevel.overrideProduct = false;
            }
          }

          if (destIndex > sourceIndex) {
            if ((movedLevelState && !otherLevelState) || (movedLevelState && otherLevelState)) {
              movedLevel.overrideProduct = false;
            }
          }
        }
      }
      const sourceLevel = { ...newLevels[sourceIndex] };
      const targetLevel = { ...newLevels[destIndex] };
      newLevels[sourceIndex] = { ...targetLevel };
      newLevels[destIndex] = { ...sourceLevel };
    }
    return newLevels;
  };


  const processDrop = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceLevelId = parseInt(source.droppableId);
    const destLevelId = parseInt(destination.droppableId);
    if (sourceLevelId === destLevelId) {
      setLevels((prev) =>
        prev?.map((level) => {
          if (level.id === sourceLevelId) {
            const newSequences = [...level.sequences];
            const temp = newSequences[source.index];
            newSequences[source.index] = newSequences[destination.index];
            newSequences[destination.index] = temp;
            return { ...level, sequences: newSequences };
          }
          return level;
        })
      );
    }
  };

  const addSequence = (levelId: number, insertAfterIndex: number) => {
    setLevels((prevLevels) =>
      prevLevels?.map((level) => {
        if (level.id !== levelId || level.overrideProduct) return level;
        const newSequence = {
          id: Date.now(),
          text: "",
          searchTerm: "",
          approvalRequired: true,
          userInputRequired: false,
          selectedTags: [],
          appliedFilters: false,
          filterData: undefined,
        };
        const newSequences = [...level.sequences];
        newSequences?.splice(insertAfterIndex + 1, 0, newSequence);
        const approvalRequiredCount = newSequences?.filter(
          (seq) => seq.approvalRequired
        ).length;
        const minRequired = Math.max(1, approvalRequiredCount);
        const defaultMinApprovals =
          level?.sequences?.length === 1
            ? newSequences.length
            : Math.max(level.minApprovalsRequired ?? minRequired, minRequired);
        return {
          ...level,
          sequences: newSequences,
          minApprovalsRequired: Math.min(
            defaultMinApprovals,
            newSequences.length
          ),
        };
      })
    );
  };
  const removeSequence = (levelId: number, sequenceId: number) => {
    setLevels((prevLevels) =>
      prevLevels
        ?.map((level) => {
          if (level.id !== levelId) return level;
          if (level.overrideProduct && level?.sequences?.length === 1) {
            return level;
          }
          const newSequences = level?.sequences?.filter(
            (seq) => seq.id !== sequenceId
          );
          if (newSequences.length === 0) {
            return null;
          }
          if (newSequences.length === 0 && !level.overrideProduct) {
            return null;
          }
          const approvalRequiredCount = newSequences?.filter(
            (seq) => seq.approvalRequired
          ).length;
          const minRequired = Math.max(1, approvalRequiredCount);
          const currentMinApprovals = level.minApprovalsRequired ?? minRequired;
          const newMinApprovals = Math.min(
            Math.max(currentMinApprovals, minRequired),
            newSequences.length
          );
          return {
            ...level,
            sequences: newSequences,
            minApprovalsRequired: newMinApprovals,
          };
        })
        ?.filter((level): level is NonNullable<typeof level> => level !== null)
        ?.map((level, index) => ({
          ...level,
          id: index + 1
        }))
    );
  };

  const renderApprovalDropdown = (level: Level) => {
    const mandatoryCount = level?.sequences?.filter(seq => seq.approvalRequired).length;
    const optionalCount = level?.sequences?.length - mandatoryCount;
    if (level?.sequences?.length <= 1 || optionalCount < 2) return null;
    const minRequired = mandatoryCount;
    const maxPossible = level?.sequences?.length - 1;
    const actualMax = Math.min(maxPossible, Math.max(minRequired, maxPossible));
    const currentValue = level.minApprovalsRequired !== undefined
      ? Math.min(Math.max(level.minApprovalsRequired, minRequired), actualMax)
      : actualMax;

    // const tooltipTitle = `${mandatoryCount} mandatory sequence${mandatoryCount > 1 ? 's' : ''}` +
    //   (optionalCount > 0
    //     ? ` and ${(currentValue - mandatoryCount)} optional sequence${currentValue - mandatoryCount > 1 ? 's' : ''}`
    //     : '');

    let optionalText = '';
    const optionalSequenceCount = currentValue - mandatoryCount;

    if (optionalCount > 0) {
      optionalText = ` and ${optionalSequenceCount} optional sequence${optionalSequenceCount > 1 ? 's' : ''}`;
    }

    const tooltipTitle = `${mandatoryCount} mandatory sequence${mandatoryCount > 1 ? 's' : ''}${optionalText}`;


    const handleSelectOpen = (levelId: string) => {
      setSelectOpen(prev => ({ ...prev, [levelId]: true }));
    };

    const handleSelectClose = (levelId: string) => {
      setSelectOpen(prev => ({ ...prev, [levelId]: false }));
    };


    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: { xs: "5px 10px", md: "5px 3rem 5px 10px" },
          height: "32px",
          borderRadius: "16px",
          marginBottom: "16px",
          float: "right",
        }}
      >
        <Tooltip
          title="Combination of Mandatory and optional approval sequences
                 Minimum: Number of Mandatory Approvals
                    Maximum: (Number of Mandatory + Optional Approvals) - 1"
          placement="top"
          arrow={false}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [50, 0],
                  },
                },
              ],
            },
            tooltip: {
              sx: {
                backgroundColor: theme?.palette?.customColors?.pink?.[3],
                color: theme?.palette?.customColors?.brightGray?.[6],
                fontSize: "10px",
                fontWeight: 400,
                display: selectOpen[level.id] ? "none" : "block",
                maxWidth: "350px",
              },
            },
          }}
        >
          <div>
            <Select
              value={currentValue}
              onChange={(e) =>
                handleMinApprovalsChange(level.id, Number(e.target.value))
              }
              size="small"
              IconComponent={KeyboardArrowDownIcon}
              onOpen={() => handleSelectOpen(level.id)}
              onClose={() => handleSelectClose(level.id)}
              open={!!selectOpen[level.id]}
              sx={{
                height: "26px",
                minWidth: 49,
                border: "1px solid #E5E5E5",
                borderRadius: "4px",
                "& .MuiSelect-select": {
                  padding: "4px 8px",
                  fontSize: "16px",
                  fontWeight: 600,
                  minHeight: "0em !important"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: theme?.palette?.customColors?.blue?.[10],
                  fontSize: "20px",
                },
              }}
              MenuProps={{
                disablePortal: true,
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    "& .MuiMenuItem-root": {
                      minHeight: "32px",
                      justifyContent: "center",
                    },
                  },
                },
              }}
            >
              {Array.from({ length: actualMax - minRequired + 1 }, (_, i) => (
                <MenuItem
                  key={i}
                  value={minRequired + i}
                  sx={
                    currentValue === minRequired + i
                      ? {
                        backgroundColor: `${theme?.palette?.customColors?.blue?.[11]} !important`,
                        borderRadius: "4px",
                        margin: "0px 2px",
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: theme?.palette?.customColors?.blue?.[23]
                        },
                      }
                      : {}
                  }
                >
                  {minRequired + i}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Tooltip>
        <Typography
          sx={{
            fontSize: { xs: "8px", md: "12px" },
            marginLeft: "8px",
            fontWeight: 500,
          }}
        >
          of the below are required to move to next level
          <Tooltip
            title={tooltipTitle}
            placement="top"
            arrow={false}
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: theme?.palette?.customColors?.pink?.[3],
                  color: theme?.palette?.customColors?.brightGray?.[6],
                  fontSize: "12px",
                  fontWeight: 400,
                },
              },
            }}
          >
            <InfoOutlined
              sx={{
                fontSize: "16px",
                color: theme?.palette?.customColors?.grey?.[8],
                marginLeft: "4px",
                cursor: "pointer"
              }}
            />
          </Tooltip>
        </Typography>
      </Box>
    );
  };

  const updateUserTagSequence = (seq, option) => {
    const currentTags = seq.selectedTags || [];
    const hasNonUserTags = currentTags.some(tag => tag.type !== "user");
    const isDuplicate = currentTags.some(tag => tag.id === option.id);

    if (!hasNonUserTags && !isDuplicate) {
      return {
        ...seq,
        searchTerm: "",
        selectedTags: [...currentTags, option],
        userInputRequired: false,
        selectedPredefinedTag: option,
      };
    }

    return seq;
  };

  const updateCustomTagSequence = (seq, option, setUnselectedTags, unselectedTags) => {
    const currentTags = seq.selectedTags || [];
    const hasUsers = currentTags.some(tag => tag.type === "user");
    const hasOtherTags = currentTags.some(tag => tag.type === "predefined" || tag.type === "predefined-value");

    if (!hasUsers && !hasOtherTags) {
      setUnselectedTags(unselectedTags?.filter(tag => tag.id !== option.id));

      return {
        ...seq,
        searchTerm: "",
        selectedTags: [{ ...option, values: option.values || [] }],
        userInputRequired: true,
      };
    }

    return seq;
  };

  const updatePredefinedTagSequence = (seq, option, setUnselectedTags, unselectedTags) => {
    const currentTags = seq.selectedTags || [];
    const hasUsers = currentTags.some(tag => tag.type === "user");
    const hasCustomTags = currentTags.some(tag => tag.type === "custom");

    if (!hasUsers && !hasCustomTags) {
      setUnselectedTags(unselectedTags?.filter(tag => tag.id !== (option.parentTagId || option.id)));

      return {
        ...seq,
        searchTerm: "",
        selectedTags: [option],
        userInputRequired: false,
      };
    }

    return seq;
  };

  const handleSelectOption = (option: Tag, levelId: number, sequenceId: number) => {
    setCurrentSequenceInfo({ levelId, sequenceId });

    setLevels(prev =>
      prev?.map(level => {
        if (level.id !== levelId) return level;

        const updatedSequences = level.sequences?.map(seq => {
          if (seq.id !== sequenceId) return seq;

          switch (option.type) {
            case "user":
              return updateUserTagSequence(seq, option);

            case "custom":
              return updateCustomTagSequence(seq, option, setUnselectedTags, unselectedTags);

            case "predefined":
            case "predefined-value":
              return updatePredefinedTagSequence(seq, option, setUnselectedTags, unselectedTags);

            default:
              return seq;
          }
        });

        return { ...level, sequences: updatedSequences };
      })
    );

    setAnchorEl(null);

    if (option.type === "predefined" || option.type === "predefined-value") {
      setSelectedPredefinedTag(option);
      setCurrentFilterTag({ levelId, sequenceId, tag: option });
      setIsDrawerOpen(true);
    }
  };


  const handleEditFilters = (levelId: number, sequenceId: number) => {
    const currentLevel = levels.find(l => l.id === levelId);
    const currentSequence = currentLevel?.sequences.find(s => s.id === sequenceId);
    if (currentSequence?.selectedTags?.[0]) {
      const currentTag = currentSequence.selectedTags[0];
      setCurrentFilterTag({
        levelId,
        sequenceId,
        tag: currentTag
      });
      const selectedPredefinedTags = currentSequence.selectedTags
        ?.filter(tag => tag.type === 'predefined' || tag.type === 'predefined-value')
        ?.map(tag => tag.type === 'predefined-value' ? tag.parentTagId : tag.id);
      const filteredTags = fullApiTags?.filter(tag => {
        const isTagSelected = selectedPredefinedTags.includes(tag.id);
        return !isTagSelected;
      });
      setUnselectedTags(filteredTags);
      setIsDrawerOpen(true);
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={part + i} style={{ backgroundColor: theme?.palette?.customColors?.blue[11] }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const renderDraggableLevel = (level, index, isMobile) => (
    <Draggable
      key={level.id}
      draggableId={level.id.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            {isMobile && !snapshot.isDragging && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: 1,
                  width: "100%",
                  gap: "8px",
                }}
              >
                <Tooltip
                  title={t("add_level")}
                  placement="bottom"
                  arrow={false}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    },
                    tooltip: {
                      sx: {
                        backgroundColor: theme?.palette?.customColors?.pink?.[3],
                        color: theme?.palette?.customColors?.brightGray?.[6],
                        fontSize: "10px",
                        fontWeight: 400,
                      },
                    },
                  }}
                >
                  <Button
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      color: theme?.palette?.customColors?.blue?.[10],
                      fontSize: "14px",
                      fontWeight: 400,
                      minWidth: "auto",
                      padding: "6px 8px 6px 0px",
                      "&:hover": {
                        color: "#006fce",
                      },
                    }}
                    endIcon={
                      <Box
                        component="span"
                        sx={{ display: "inline-flex" }}
                      >
                        <img src={AddIconLevel} alt="add" /><Typography sx={{ fontSize: "12px", fontWeight: 400, color: theme?.palette?.customColors?.blue?.[10], pl: 1, py: 1 }}>{t('level')}</Typography>
                      </Box>
                    }
                    onClick={() => addLevel(index)}
                  >
                  </Button>
                </Tooltip>
                <Box sx={{ color: "#ccc", fontSize: "14px" }}>
                  |
                </Box>
                <Button
                  sx={{
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    color:
                      levels.length > 1
                        ? theme?.palette?.customColors?.blue?.[10]
                        : "#BDBDBD",
                    fontSize: "14px",
                    fontWeight: 400,
                    minWidth: "auto",
                    padding: "6px 0px 6px 8px",
                  }}
                  disabled={levels.length === 1}
                  startIcon={
                    <Box
                      component="span"
                      sx={{ display: "inline-flex" }}
                    >
                      <img
                        src={
                          levels.length > 1
                            ? DeleteActive
                            : DeleteIcon
                        }
                        alt="delete"
                        style={{
                          width: "16px",
                          height: "16px",

                        }}
                      /><Tooltip
                        title={
                          levels.length === 1
                            ? t("disabled")
                            : t("delete_level")
                        }
                        placement="bottom"
                        arrow={false}
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -10],
                                },
                              },
                            ],
                          },
                          tooltip: {
                            sx: {
                              backgroundColor: theme?.palette?.customColors?.pink?.[3],
                              color: theme?.palette?.customColors?.brightGray?.[6],
                              fontSize: "10px",
                              fontWeight: 400,
                            },
                          },
                        }}
                      ><Typography sx={{ fontSize: "12px", fontWeight: 400, color: levels.length > 1 ? theme?.palette?.customColors?.blue?.[10] : theme?.palette?.customColors?.grey?.[26], pl: 0.5, pr: 0.5, }}>{t('delete')}</Typography></Tooltip>
                    </Box>
                  }
                  onClick={() => removeLevel(level.id)}
                >
                </Button>
              </Box>
            )}
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              sx={{
                marginBottom: 2,
                cursor: "default",
                flexGrow: 1,
                minWidth: 0,
                borderRadius: "10px",
                border: "1px solid #E3E8EF",
                boxShadow: (!isDragging && hoveredDragHandleId === `level-${level.id}`) ? `0px 2px 25px 0px ${theme?.palette?.customColors?.black[5]}` : undefined,
              }}
              elevation={0}
            >
              <Box
                onClick={() => toggleExpand(level.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: snapshot.isDragging
                    ? "#e0f2ff"
                    : "#DCEDFF",
                  height: "58px",
                  padding: {
                    xs: "16px 12px 16px 20px",
                    md: "16px 25px 16px 30px",
                  },
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {(!snapshot.isDragging && levels.length > 1) && (
                    <Tooltip
                      title="Move Level"
                      placement="top-start"
                      arrow={false}
                      disableInteractive
                      slotProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: theme?.palette?.customColors?.pink?.[3],
                            color: theme?.palette?.customColors?.brightGray?.[6],
                            fontSize: "10px",
                            fontWeight: 400,
                          },
                        },
                      }}
                    >
                      <Box
                        {...provided.dragHandleProps}
                        sx={{
                          position: "absolute",
                          left: -20,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: theme?.palette?.customColors?.grey?.[27],
                          cursor: "grab !important",
                          opacity: 0,
                          "&:hover": {
                            opacity: 1,
                          },
                          "&:active": {
                            cursor: "grabbing",
                          },
                        }}
                        onMouseEnter={() => setHoveredDragHandleId(`level-${level.id}`)}
                        onMouseLeave={() => setHoveredDragHandleId(null)}
                      >
                        <DragIndicatorIcon />
                      </Box>
                    </Tooltip>
                  )}
                  <Typography
                    sx={{
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#FFFFFF",
                        padding: "5px 12px",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        [isRTL ? 'marginLeft' : 'marginRight']: '8px',
                        fontSize: "14px",
                        fontWeight: 400
                      }}
                    >
                      {level.id}
                    </span>
                    {t("level")}
                  </Typography>
                  {index > 0 && (
                    <Tooltip
                      title={(() => {
                        const selectedTags = level?.sequences?.[0]?.selectedTags;
                        const isMultipleTags = selectedTags?.length > 1;
                        const isNoTags = !selectedTags || selectedTags.length === 0;
                        const isFirstTagNotUser = selectedTags?.[0]?.type !== "user";

                        if (level.id === 1) return t("level1_cannot_override_when_moved");
                        if (isMultipleTags || isNoTags || isFirstTagNotUser) return t("disabled");
                        return t("overrides_description");
                      })()}
                      placement="top"
                      arrow={false}
                      disableInteractive
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, -10],
                              },
                            },
                          ],
                        },
                        tooltip: {
                          sx: {
                            backgroundColor: theme?.palette?.customColors?.pink?.[3],
                            color: theme?.palette?.customColors?.brightGray?.[6],
                            fontSize: "10px",
                            fontWeight: 400,
                            maxWidth: '220px'
                          },
                        },
                      }}
                    >
                      <Box
                        onClick={e => e.stopPropagation()}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "16px",
                          backgroundColor: "#FFFFFF",
                          padding: "10px 10px",
                          height: "31px",
                          boxSizing: "border-box",
                          borderRadius: "16px",
                        }}
                      >
                        <CustomSwitch
                          checked={level.overrideProduct || false}
                          onChange={() => {
                            setLevels((prev) =>
                              prev?.map((l) =>
                                l.id === level.id
                                  ? {
                                    ...l,
                                    overrideProduct: !l.overrideProduct,
                                    expanded: level.expanded,
                                  }
                                  : l
                              )
                            );
                          }}
                          disabled={
                            level.id === 1 ||
                            level?.sequences?.length > 1 ||
                            (level?.sequences?.[0]?.selectedTags &&
                              level?.sequences?.[0]?.selectedTags.length > 1) ||
                            !level?.sequences?.[0]?.selectedTags ||
                            level?.sequences?.[0]?.selectedTags.length === 0 ||
                            (level?.sequences?.[0]?.selectedTags?.[0]?.type !== "user")
                          }
                        />
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            marginLeft: "8px",
                            fontSize: isMobile ? "10px" : "14px",
                            fontWeight: 400,
                            color:
                              level.id === 1 ||
                                level?.sequences?.length > 1 ||
                                (level?.sequences?.[0]?.selectedTags &&
                                  level?.sequences?.[0]?.selectedTags.length > 1) ||
                                !level?.sequences?.[0]?.selectedTags ||
                                level?.sequences?.[0]?.selectedTags.length === 0 ||
                                level?.sequences?.[0]?.selectedTags?.[0]?.type !== "user"
                                ? theme?.palette?.customColors?.grey?.[8]
                                : "inherit",
                          }}
                        >
                          {t("overrides_previous")}
                        </Typography>
                      </Box>
                    </Tooltip>
                  )}
                  <IconButton
                    sx={{ marginLeft: "auto" }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform: level.expanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "0.3s",
                        width: "30px",
                        height: "30px",
                        color: level.expanded ? "#6A6A6A" : theme?.palette?.customColors?.blue?.[10],
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={level.expanded}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <Droppable
                    droppableId={level.id.toString()}
                    type="SEQUENCE"
                    direction="vertical"
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          width: "100%",
                          display: { xs: "flex", md: "unset" },
                          flexDirection: "column",
                        }}
                      >
                        {renderApprovalDropdown(level)}
                        {level?.sequences?.map(
                          (sequence, seqIndex) => {
                            const userTags =
                              sequence.selectedTags?.filter(
                                (tag) => tag.type === "user"
                              ) || [];
                            const nonUserTags =
                              sequence.selectedTags?.filter(
                                (tag) => tag.type !== "user"
                              ) || [];
                            const hasNonUserTags =
                              nonUserTags.length > 0;
                            return (
                              <Box
                                key={sequence.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Draggable
                                  key={sequence.id}
                                  draggableId={`seq-${level.id}-${sequence.id}`}
                                  index={seqIndex}
                                >
                                  {(provided, snapshot) => (
                                    <Box
                                      sx={{ display: "flex", width: "100%" }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                    >
                                      <Box sx={{
                                        position: "relative",
                                        flexGrow: 1,
                                        px: { xs: 1, md: 4 },
                                        py: { xs: 1, md: 3 },
                                        backgroundColor: (() => {
                                          if (
                                            dragDestination &&
                                            dragDestination.levelId === level.id &&
                                            dragDestination.seqIndex === seqIndex &&
                                            !snapshot.isDragging
                                          ) {
                                            return '#0087FA1A';
                                          }
                                          if (snapshot.isDragging) {
                                            return '#FFFBEF';
                                          }
                                          return 'white';
                                        })(),
                                        borderRadius: 2,
                                        display: "block",
                                        border:
                                          snapshot.isDragging ? "1px solid #FFD44D" : "1px solid #ddd",
                                        mb: 2,
                                        boxShadow: (!isDragging && !draggedSequenceId && hoveredDragHandleId === `seq-${level.id}-${sequence.id}`) ? `0px 2px 25px 0px ${theme?.palette?.customColors?.black[5]}` : "none",
                                        cursor: "default",
                                      }}>
                                        <Box
                                          sx={{
                                            flexGrow: 1,
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent:
                                              "space-between",
                                            flexWrap: "wrap",
                                            gap: isMobile ? "12px" : "20px",
                                          }}
                                        >
                                          {(!snapshot?.isDragging && level?.sequences?.length !== 1) && (
                                            <Tooltip
                                              title={t('move_sequence', 'Move Sequence')}
                                              placement="bottom"
                                              arrow={false}
                                              disableInteractive
                                              slotProps={{
                                                tooltip: {
                                                  sx: {
                                                    backgroundColor: theme?.palette?.customColors?.pink?.[3],
                                                    color: theme?.palette?.customColors?.brightGray?.[6],
                                                    fontSize: "10px",
                                                    fontWeight: 400,
                                                    maxWidth: '69px',
                                                    textAlign: 'center'
                                                  },
                                                },
                                                popper: {
                                                  modifiers: [
                                                    {
                                                      name: 'offset',
                                                      options: {
                                                        offset: [-30, 0],
                                                      },
                                                    },
                                                  ],
                                                },
                                              }}
                                            >
                                              <Box
                                                {...provided.dragHandleProps}
                                                sx={{
                                                  position: "absolute",
                                                  left: { xs: 1, md: 6 },
                                                  top: "50%",
                                                  transform: "translateY(-50%)",
                                                  color: theme?.palette?.customColors?.grey?.[27],
                                                  cursor: "grab !important",
                                                  opacity: 0,
                                                  "&:hover": {
                                                    opacity: 1,
                                                  },
                                                  "&:active": {
                                                    cursor: "grabbing",
                                                  },
                                                }}
                                                onMouseEnter={() => setHoveredDragHandleId(`seq-${level.id}-${sequence.id}`)}
                                                onMouseLeave={() => setHoveredDragHandleId(null)}
                                                onMouseDown={() => setHoveredDragHandleId(`seq-${level.id}-${sequence.id}`)}
                                                onMouseUp={() => setHoveredDragHandleId(null)}
                                              >
                                                <DragIndicatorIcon />
                                              </Box>
                                            </Tooltip>
                                          )}
                                          <Box
                                            sx={{
                                              flex: 1,
                                              position:
                                                "relative",
                                            }}
                                          >
                                            {nonUserTags.length >
                                              0 && (
                                                <Box>
                                                  <Typography
                                                    sx={{
                                                      fontSize:
                                                        "10px",
                                                      color:
                                                        "#5A6872",
                                                      fontWeight: 400,
                                                    }}
                                                  >
                                                    {
                                                      nonUserTags[0]
                                                        .category
                                                    }
                                                  </Typography>
                                                  <InputBase
                                                    fullWidth
                                                    value={
                                                      nonUserTags[0]
                                                        .name
                                                    }
                                                    disabled
                                                    endAdornment={
                                                      <IconButton
                                                        onClick={() =>
                                                          handleRemoveTag(
                                                            level.id,
                                                            sequence.id,
                                                            nonUserTags[0]
                                                              .id
                                                          )
                                                        }
                                                      >
                                                        <CloseIcon sx={{ fontSize: "10px" }} />
                                                      </IconButton>
                                                    }
                                                    sx={{
                                                      borderBottom:
                                                        `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}`,
                                                      fontSize:
                                                        "12px",
                                                      color: "#000",
                                                      paddingY: 0,
                                                      maxWidth:
                                                        "150px",
                                                      mb: 1,
                                                      "& .MuiInputBase-input":
                                                      {
                                                        color:
                                                          "#000",
                                                        WebkitTextFillColor:
                                                          "#000",
                                                      },
                                                      "&.Mui-focused": {
                                                        borderBottom: `1px solid ${theme?.palette?.customColors?.blue?.[10]}`,
                                                      },
                                                    }}
                                                  />
                                                </Box>
                                              )}
                                            {
                                              !hasNonUserTags && (
                                                <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                                                  {userTags?.map((tag, index) => (
                                                    <Chip
                                                      key={index + level.id}
                                                      size="small"
                                                      avatar={
                                                        <Avatar sx={{ width: "16px", height: "16px" }}>
                                                          {getInitials(tag.name)}
                                                        </Avatar>
                                                      }
                                                      label={tag.name}
                                                      onDelete={() => handleRemoveTag(level.id, sequence.id, tag.id)}
                                                      deleteIcon={
                                                        <CloseIcon
                                                          sx={{
                                                            color: "#6A6A6A !important",
                                                            fontSize: "10px !important",
                                                            "&:hover": { color: theme?.palette?.customColors?.black[1] },
                                                          }}
                                                        />
                                                      }
                                                      sx={{
                                                        backgroundColor: "#F5F5F6",
                                                        color: theme?.palette?.customColors?.black[1],
                                                        fontSize: "10px",
                                                        fontWeight: 400,
                                                        height: "28px",
                                                        maxWidth: isMobile ? "90px" : "120px",
                                                      }}
                                                    />
                                                  ))}
                                                  {!level?.overrideProduct && (
                                                    <Tooltip
                                                      title={
                                                        hasNonUserTags
                                                          ? "Only one predefined/custom tag allowed per sequence"
                                                          : ""
                                                      }
                                                    >
                                                      <Box>
                                                        <Typography
                                                          sx={{
                                                            fontSize: "10px",
                                                            color: "#5A6872",
                                                            fontWeight: 400,
                                                            maxWidth: "182px",
                                                            mt: 0.5,
                                                          }}
                                                        >
                                                          {userTags.length > 0 ? t("user") : t("input_autocomplete_title")}
                                                        </Typography>
                                                        <InputBase
                                                          inputRef={inputRef}
                                                          placeholder={
                                                            t("add_here")
                                                          }
                                                          fullWidth={false}
                                                          value={sequence.searchTerm ?? ""}
                                                          onChange={(e) => handleSearch(e, level.id, sequence.id)}
                                                          onBlur={(e) => {
                                                            resetSearch(level.id, sequence.id);
                                                            setSearchKey("");
                                                          }}
                                                          disabled={hasNonUserTags}
                                                          sx={{
                                                            borderBottom:
                                                              `1px solid ${theme?.palette?.customColors?.lightBlue?.[5]}`,
                                                            caretColor: theme?.palette?.customColors?.blue?.[10],
                                                            fontSize: "12px",
                                                            maxWidth: "150px",
                                                            color: "#000",
                                                            p: "4px 0 0",
                                                            "&::placeholder": {
                                                              color: "#BDBDBD",
                                                              opacity: 1,
                                                            },
                                                            "&:disabled": {
                                                              borderBottom: "2px solid #BDBDBD",
                                                              cursor: "not-allowed",
                                                            },
                                                            "&.Mui-focused": {
                                                              borderBottom: `1px solid ${theme?.palette?.customColors?.blue?.[10]}`, // Re-apply if MUI removes it
                                                            },
                                                          }}
                                                        />
                                                      </Box>
                                                    </Tooltip>
                                                  )}
                                                </Box>

                                              )
                                            }
                                            {sequence?.searchTerm && sequence?.searchTerm?.length >= 3 &&
                                              filteredOptions.length >
                                              0 && (
                                                <Popper
                                                  open={Boolean(anchorEl)}
                                                  anchorEl={anchorEl}
                                                  transition
                                                  placement="bottom-start"
                                                  sx={{ zIndex: theme.zIndex.drawer + 2 }}
                                                >
                                                  {({
                                                    TransitionProps,
                                                  }) => (
                                                    <Grow {...TransitionProps} >
                                                      <Paper sx={{ mt: 1, width: "100%", maxHeight: 300, overflow: "auto" }} >
                                                        <List dense >
                                                          {filteredOptions?.map(
                                                            (group) => {
                                                              const currentSequence = levels.find((l) => l.id === level.id)?.sequences.find((s) => s.id === sequence.id);
                                                              const hasUserSelected =
                                                                currentSequence?.selectedTags?.some((tag) => tag.type === "user");
                                                              if (hasUserSelected && group.category !== "User") return null;
                                                              return (group.items.length > 0 && (
                                                                <Popper
                                                                  key={currentSequence?.id}
                                                                  open={Boolean(anchorEl)}
                                                                  anchorEl={anchorEl}
                                                                  transition
                                                                  placement="bottom-start"
                                                                  sx={{
                                                                    zIndex: theme.zIndex.drawer + 2,
                                                                    '& .MuiPaper-root': {
                                                                      borderRadius: "14px",
                                                                    }
                                                                  }}
                                                                >
                                                                  {({
                                                                    TransitionProps,
                                                                  }) => (
                                                                    <Grow
                                                                      {...TransitionProps}
                                                                    >
                                                                      <Paper
                                                                        sx={{
                                                                          mt: 1,
                                                                          width: "100%",
                                                                          maxHeight: 300,
                                                                          overflow: "auto",
                                                                          cursor: "pointer",
                                                                          "&::-webkit-scrollbar": { width: "5px" },
                                                                          "&::-webkit-scrollbar-track":
                                                                          {
                                                                            marginTop: "10px",
                                                                            marginBottom: "10px",
                                                                            background: "transparent",
                                                                            borderRadius: "none"
                                                                          },
                                                                          "&::-webkit-scrollbar-thumb":
                                                                          {
                                                                            background: "#C1C1C1",
                                                                            borderRadius: "2.5px",
                                                                            marginTop: "50px"
                                                                          },
                                                                          "&::-webkit-scrollbar-thumb:hover":
                                                                          {
                                                                            background: "transparent",
                                                                          },
                                                                        }}
                                                                      >
                                                                        <List
                                                                          sx={{ paddingY: 0, }}
                                                                          dense
                                                                        >
                                                                          {filteredOptions?.map((group, index) => {
                                                                            const currentSequence = levels.find((l) => l.id === level.id)?.sequences.find((s) => s.id === sequence.id);
                                                                            const hasUserSelected = currentSequence?.selectedTags?.some((tag) => tag.type === "user");
                                                                            if (hasUserSelected && group.category !== "User") return null;
                                                                            return (group.items.length > 0 && (
                                                                              <>
                                                                                {
                                                                                  group.items?.filter(item => !userTags.some(tag => tag.id === item.id) && !level.sequences
                                                                                    .flatMap(seq => seq.selectedTags || [])
                                                                                    .some(tag => tag.id === item.id)
                                                                                  ).length > 0 &&
                                                                                  <Accordion
                                                                                    expanded={expanded.includes(`${index}-${group.category}`)}
                                                                                    key={`${index}-${group.category}`}
                                                                                    onChange={() => handleAccordionChange(index, group.category)}
                                                                                    sx={{
                                                                                      boxShadow: 'none',
                                                                                      '&:before': {
                                                                                        display: 'none',
                                                                                      },

                                                                                      borderBottom: '1px solid #e0e0e0',
                                                                                      borderRadius: '0 !important',
                                                                                      backgroundColor: "#F5F5F6",
                                                                                      '&.Mui-expanded': {
                                                                                        margin: 0,
                                                                                      },
                                                                                      position: 'relative',
                                                                                      '&:hover::before': {
                                                                                        content: '""',
                                                                                        position: 'absolute',
                                                                                        top: 0,
                                                                                        left: '5%',
                                                                                        width: '90%',
                                                                                        height: '100%',
                                                                                        backgroundColor: '#f5f5f5',
                                                                                        zIndex: 0,
                                                                                      },

                                                                                    }}
                                                                                  >
                                                                                    <AccordionSummary
                                                                                      aria-controls={`${group.category}-content`}
                                                                                      id={`${group.category}-header`}
                                                                                      sx={{
                                                                                        height: '40px !important',
                                                                                        minHeight: '40px !important',
                                                                                        minWidth: '280px',
                                                                                        '& .MuiAccordionSummary-content': {
                                                                                          margin: '0',
                                                                                          position: 'relative',
                                                                                          my: 'auto'
                                                                                        },
                                                                                        backgroundColor: '#F5F5F6',
                                                                                        '&:hover': {
                                                                                          backgroundColor: '#f5f5f5',
                                                                                        },
                                                                                      }}
                                                                                    >
                                                                                      {group.items?.filter(item => !userTags.some(tag => tag.id === item.id)) && (
                                                                                        <Typography
                                                                                          fontWeight="600"
                                                                                          sx={{
                                                                                            fontSize: '14px',
                                                                                            color: theme?.palette?.customColors?.black[1],
                                                                                            lineHeight: '40px'
                                                                                          }}
                                                                                        >
                                                                                          {group.category}
                                                                                        </Typography>
                                                                                      )}
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails
                                                                                      sx={{
                                                                                        padding: '5px 18px',
                                                                                        backgroundColor: '#FFFFFF',
                                                                                      }}
                                                                                    >
                                                                                      {group?.items?.filter(
                                                                                        item =>
                                                                                          !userTags.some(tag => tag.id === item.id) &&
                                                                                          !level.sequences
                                                                                            .flatMap(seq => seq.selectedTags || [])
                                                                                            .some(tag => tag.id === item.id)
                                                                                      )?.map((item, idx) => (
                                                                                        <ListItem
                                                                                          component="li"
                                                                                          key={`${item.id}-${idx}`}
                                                                                          onMouseDown={(e) => {
                                                                                            e.preventDefault();
                                                                                            handleSelectOption(item, level.id, sequence.id);
                                                                                            inputRef.current?.blur();
                                                                                          }}
                                                                                          //future refrence
                                                                                          // onClick={() => handleSelectOption(item, level.id, sequence.id)}
                                                                                          sx={{
                                                                                            minWidth: "240px",
                                                                                            cursor: "pointer",
                                                                                            borderRadius: '6px',
                                                                                            height: '40px',
                                                                                            py: '8px',
                                                                                            '&:hover': {
                                                                                              backgroundColor: '#DCEDFF',
                                                                                            },
                                                                                          }}
                                                                                        >
                                                                                          {item.type === 'user' ? (
                                                                                            <Avatar
                                                                                              sx={{
                                                                                                width: 24,
                                                                                                height: 24,
                                                                                                fontSize: '12px',
                                                                                                mr: 1,
                                                                                              }}
                                                                                            >
                                                                                              {getInitials(
                                                                                                item.name
                                                                                              )}
                                                                                            </Avatar>
                                                                                          ) : (
                                                                                            <SellOutlinedIcon
                                                                                              sx={{
                                                                                                fontSize: "14px",
                                                                                                color: theme?.palette?.customColors?.grey?.[8],
                                                                                                mr: 1,
                                                                                              }}
                                                                                            />
                                                                                          )}
                                                                                          <ListItemText
                                                                                            primary={highlightText(item.name, sequence.searchTerm)}
                                                                                            slotProps={{
                                                                                              primary: {
                                                                                                fontSize: '12px',
                                                                                                style: { color: theme?.palette?.customColors?.black[1], fontWeight: 500 }
                                                                                              }
                                                                                            }}
                                                                                          />
                                                                                        </ListItem>
                                                                                      ))}
                                                                                    </AccordionDetails>
                                                                                  </Accordion>}
                                                                              </>
                                                                            )
                                                                            );
                                                                          }
                                                                          )}
                                                                        </List>
                                                                      </Paper>
                                                                    </Grow>
                                                                  )}
                                                                </Popper>
                                                              )
                                                              );
                                                            }
                                                          )}
                                                        </List>
                                                      </Paper>
                                                    </Grow>
                                                  )}
                                                </Popper>
                                              )}
                                          </Box>
                                          {hasNonUserTags && (
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems:
                                                  "center",
                                                marginLeft: {
                                                  xs: 0,
                                                  md: "-32px",
                                                },
                                                backgroundColor:
                                                  "#FFFFFF",
                                                padding: {
                                                  xs: "5px 10px 5px 0",
                                                  md: "5px 10px",
                                                },
                                                height: "32px",
                                                borderRadius:
                                                  "16px",
                                              }}
                                            >
                                              <CustomSwitch
                                                checked={
                                                  nonUserTags[0]
                                                    .type ===
                                                    "custom" ||
                                                    nonUserTags[0]
                                                      .type ===
                                                    "custom-value"
                                                    ? true
                                                    : Boolean(
                                                      sequence.userInputRequired
                                                    )
                                                }
                                                onChange={() => {
                                                  setLevels(
                                                    (prev) =>
                                                      prev?.map(
                                                        (l) => {
                                                          if (
                                                            l.id !==
                                                            level.id
                                                          )
                                                            return l;
                                                          return {
                                                            ...l,
                                                            sequences:
                                                              l?.sequences?.map(
                                                                (
                                                                  seq
                                                                ) =>
                                                                  seq?.id ===
                                                                    sequence?.id
                                                                    ? {
                                                                      ...seq,
                                                                      userInputRequired:
                                                                        !seq.userInputRequired,
                                                                    }
                                                                    : seq
                                                              ),
                                                          };
                                                        }
                                                      )
                                                  );
                                                }}
                                                disabled={
                                                  nonUserTags[0]
                                                    .type ===
                                                  "custom" ||
                                                  nonUserTags[0]
                                                    .type ===
                                                  "custom-value"
                                                }
                                                size="small"
                                                color="primary"
                                              />
                                              <Typography
                                                sx={{
                                                  fontSize:
                                                    "12px",
                                                  fontWeight: 400,
                                                  marginLeft: "5px",
                                                  marginRight:
                                                    "8px",
                                                  color: theme?.palette?.customColors?.black[1],
                                                }}
                                              >
                                                {t(
                                                  "user_input_required"
                                                )}
                                              </Typography>
                                            </Box>
                                          )}

                                          {isMobile &&
                                            sequence.appliedFilters && (Object.keys(sequence.filterData || {}).some(
                                              (key) => key !== "inclusion" && Object.keys(sequence.filterData[key] || {}).length > 0
                                            )) && (
                                              <Box
                                                sx={{
                                                  mt: 1,
                                                  p: 1,
                                                  backgroundColor: "#F2F2F2",
                                                  borderRadius: 1,
                                                  display: "flex",
                                                  alignItems: "flex-start"
                                                }}
                                              >
                                                <Typography
                                                  sx={{
                                                    fontSize: "10px", color: theme?.palette?.customColors?.black[1]
                                                  }}
                                                  component="div"
                                                >
                                                  {sequence
                                                    .filterData
                                                    .inclusion
                                                    ?.anyone
                                                    ? <Box
                                                      component="strong"
                                                      sx={{
                                                        fontSize: "10px",
                                                        fontWeight: 600,
                                                      }}>
                                                      {t("anyone")}</Box>
                                                    : <Box
                                                      component="strong"
                                                      sx={{
                                                        fontSize: "10px",
                                                        fontWeight: 600,
                                                      }}> {t(
                                                        "everyone"
                                                      )}</Box>
                                                  }{" "}
                                                  {t(
                                                    "belonging_criteria"
                                                  )}
                                                  &nbsp;
                                                  <Box
                                                    component="strong"
                                                    sx={{
                                                      fontSize: "10px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    {sequence.selectedTags?.[0]?.name ?? ''}
                                                  </Box>
                                                  {Object.entries(sequence.filterData)
                                                    ?.filter(([tagId, fieldValue]) =>
                                                      tagId !== "inclusion" &&
                                                      typeof fieldValue === "object" &&
                                                      fieldValue !== null
                                                    )
                                                    ?.map(([tagId, fieldValue]) => {
                                                      const matchingTag = unselectedTags.find(tag => tag.id === tagId);
                                                      const activeOptions = Object.entries(fieldValue as Record<string, boolean>)
                                                        ?.filter(([_, isActive]) => isActive)
                                                        ?.map(([valueId]) => {
                                                          const matchingValue: any = matchingTag?.values?.find(
                                                            (v: any) => v.Id === valueId
                                                          );
                                                          return matchingValue?.Name;
                                                        })
                                                        ?.filter(Boolean);
                                                      if (activeOptions.length === 0) return null;
                                                      return (
                                                        <span key={tagId}>
                                                          &nbsp;{t("and")} {matchingTag?.name.toLowerCase() || tagId.toLowerCase()}
                                                          {activeOptions?.map((option, index) => (
                                                            <span key={option}>
                                                              {index === 0 ? " " : ", "}
                                                              <Box component="strong" sx={{ fontSize: "10px", fontWeight: 600 }}>
                                                                {option}
                                                              </Box>
                                                            </span>
                                                          ))}
                                                        </span>
                                                      );
                                                    })
                                                  }&nbsp;
                                                  {t(
                                                    "considered_approval"
                                                  )}
                                                </Typography>
                                                <Tooltip
                                                  title="Edit Criteria"
                                                  placement="right"
                                                  arrow={false}
                                                  slotProps={{
                                                    tooltip: {
                                                      sx: {
                                                        backgroundColor: theme?.palette?.customColors?.pink?.[3],
                                                        color: theme?.palette?.customColors?.brightGray?.[6],
                                                        fontSize: "10px",
                                                        fontWeight: 400,
                                                      },
                                                    },
                                                    popper: {
                                                      modifiers: [
                                                        {
                                                          name: 'offset',
                                                          options: {
                                                            offset: [0, -10],
                                                          },
                                                        },
                                                      ],
                                                    },
                                                  }}
                                                >
                                                  <IconButton
                                                    size="small"
                                                    onClick={() => handleEditFilters(level.id, sequence.id)}
                                                  >
                                                    <img
                                                      src={EditIcon}
                                                      alt="edit"
                                                      style={{
                                                        width:
                                                          "16px",
                                                        height:
                                                          "16px",
                                                      }}
                                                    />
                                                  </IconButton></Tooltip>
                                              </Box>
                                            )}

                                          <Tooltip
                                            title={(() => {
                                              if (level.overrideProduct) return t("disabled");
                                              if (level.sequences.length === 1) return t("add_another_sequence_to_change");
                                              if (sequence.approvalRequired) return t("mandatory_approval");
                                              return t("optional_approval");
                                            })()}
                                            placement="top-start"
                                            arrow={false}
                                            disableInteractive
                                            slotProps={{
                                              tooltip: {
                                                sx: {
                                                  backgroundColor:
                                                    theme?.palette?.customColors?.pink?.[3],
                                                  color:
                                                    theme?.palette?.customColors?.brightGray?.[6],
                                                  fontSize:
                                                    "10px",
                                                  fontWeight: 400,
                                                },
                                              },
                                              popper: {
                                                modifiers: [
                                                  {
                                                    name: 'offset',
                                                    options: {
                                                      offset: [0, -14],
                                                    },
                                                  },
                                                ],
                                              },
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems:
                                                  "flex-start",
                                                paddingRight:
                                                  isMobile
                                                    ? "0px"
                                                    : "10px",
                                              }}
                                            >
                                              <Checkbox
                                                checked={
                                                  level.sequences
                                                    .length === 1
                                                    ? true
                                                    : Boolean(
                                                      sequence.approvalRequired
                                                    )
                                                }
                                                onChange={() => {
                                                  if (
                                                    level
                                                      .sequences
                                                      .length ===
                                                    1
                                                  )
                                                    return;
                                                  setLevels(
                                                    (prev) =>
                                                      prev?.map(
                                                        (l) => {
                                                          if (
                                                            l.id !==
                                                            level.id
                                                          )
                                                            return l;
                                                          const updatedSequences =
                                                            l.sequences?.map(
                                                              (
                                                                seq
                                                              ) =>
                                                                seq.id ===
                                                                  sequence.id
                                                                  ? {
                                                                    ...seq,
                                                                    approvalRequired:
                                                                      !seq.approvalRequired,
                                                                  }
                                                                  : seq
                                                            );
                                                          const hasApproval =
                                                            updatedSequences.some(
                                                              (
                                                                s
                                                              ) =>
                                                                s.approvalRequired
                                                            );
                                                          let finalSequences =
                                                            updatedSequences;
                                                          if (
                                                            !hasApproval
                                                          ) {
                                                            finalSequences =
                                                              updatedSequences?.map(
                                                                (
                                                                  seq,
                                                                  index
                                                                ) =>
                                                                  index ===
                                                                    0
                                                                    ? {
                                                                      ...seq,
                                                                      approvalRequired:
                                                                        true,
                                                                    }
                                                                    : seq
                                                              );
                                                          }
                                                          const approvalRequiredCount =
                                                            finalSequences?.filter(
                                                              (
                                                                s
                                                              ) =>
                                                                s.approvalRequired
                                                            ).length;
                                                          const minRequired =
                                                            Math.max(
                                                              1,
                                                              approvalRequiredCount
                                                            );
                                                          const currentMin =
                                                            l.minApprovalsRequired ??
                                                            minRequired;
                                                          const newMinApprovals =
                                                            Math.min(
                                                              Math.max(
                                                                currentMin,
                                                                minRequired
                                                              ),
                                                              finalSequences.length
                                                            );

                                                          return {
                                                            ...l,
                                                            sequences:
                                                              finalSequences,
                                                            minApprovalsRequired:
                                                              newMinApprovals,
                                                          };
                                                        }
                                                      )
                                                  );
                                                }}
                                                disabled={
                                                  Boolean(level.sequences
                                                    .length === 1 || sequence.approvalRequired &&
                                                    level?.sequences?.filter(seq => seq.approvalRequired).length === 1)
                                                }
                                                sx={{
                                                  padding: 0,
                                                  marginRight: "6px",
                                                  "&.Mui-checked":
                                                  {
                                                    color:
                                                      theme?.palette?.customColors?.blue?.[10],
                                                  },
                                                  "&.MuiCheckbox-root:not(.Mui-checked)":
                                                  {
                                                    color:
                                                      theme?.palette?.customColors?.blue?.[10],
                                                  },
                                                  "&.Mui-disabled": {
                                                    color: theme?.palette?.customColors?.grey?.[8],
                                                    "& .MuiSvgIcon-root": {
                                                      color: theme?.palette?.customColors?.grey?.[8],
                                                    },
                                                  },
                                                }}
                                                icon={
                                                  <IndeterminateCheckBox sx={{ fontSize: '18px' }} />
                                                }
                                                checkedIcon={
                                                  <CheckBoxIcon sx={{ fontSize: '18px' }} />
                                                }
                                              />
                                              <Box>
                                                <Typography
                                                  sx={{
                                                    fontWeight: 500,
                                                    color:
                                                      theme?.palette?.customColors?.grey?.[8],
                                                    fontSize:
                                                      "14px",
                                                  }}
                                                >
                                                  {t(
                                                    "approval_required"
                                                  )}
                                                </Typography>
                                                <Typography
                                                  variant="body2"
                                                  sx={{
                                                    marginTop: "4px",
                                                    color:
                                                      theme?.palette?.customColors?.grey?.[8],
                                                    maxWidth:
                                                      "195px",
                                                    fontSize:
                                                      "10px",
                                                    fontWeight: 400
                                                  }}
                                                >
                                                  {sequence.approvalRequired
                                                    ? t("approval_required_description")
                                                    : "Sends email intimation but approval is not necessary to move to next level"}
                                                </Typography>
                                              </Box>
                                            </Box>
                                          </Tooltip>
                                          <Tooltip
                                            disableInteractive
                                            title={
                                              level.overrideProduct && level.sequences
                                                .length === 1 || levels.length === 1 && level?.sequences?.length === 1
                                                ? t("disabled")
                                                : t(
                                                  "delete_sequence"
                                                )
                                            }
                                            placement="right"
                                            arrow={false}
                                            slotProps={{
                                              tooltip: {
                                                sx: {
                                                  backgroundColor:
                                                    theme?.palette?.customColors?.pink?.[3],
                                                  color:
                                                    theme?.palette?.customColors?.brightGray?.[6],
                                                  fontSize:
                                                    "10px",
                                                  fontWeight: 400,
                                                },
                                              },
                                              popper: {
                                                modifiers: [
                                                  {
                                                    name: 'offset',
                                                    options: {
                                                      offset: [0, -10],
                                                    },
                                                  },
                                                ],
                                              },

                                            }}
                                          >
                                            <Box
                                              sx={{
                                                position:
                                                  "absolute",
                                                top: { xs: "0px", md: "5px" },
                                                right: "10px",
                                                borderRadius: "50%",
                                                marginLeft: 2,
                                              }}
                                            >
                                              <IconButton
                                                sx={{ padding: '4px !important' }}
                                                disabled={
                                                  Boolean(level.overrideProduct && level?.sequences?.length === 1) ||
                                                  (levels.length === 1 && level?.sequences?.length === 1)
                                                }
                                                onClick={() =>
                                                  removeSequence(
                                                    level.id,
                                                    sequence.id
                                                  )
                                                }>
                                                <CloseIcon
                                                  sx={{
                                                    fontSize: isMobile ? 14 : 14,
                                                    color:
                                                      isMobile ? theme?.palette?.customColors?.lightGray?.[13] : theme?.palette?.customColors?.lightGray?.[11],
                                                  }}
                                                />
                                              </IconButton>
                                            </Box>
                                          </Tooltip>
                                        </Box>

                                        {!isMobile &&
                                          sequence.appliedFilters &&
                                          sequence.filterData && (Object.keys(sequence.filterData || {}).some(
                                            (key) => key !== "inclusion" && Object.keys(sequence.filterData[key] || {}).length > 0
                                          )) && (
                                            <Box
                                              sx={{
                                                mt: 1,
                                                p: 1.5,
                                                backgroundColor: "#F2F2F2",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                width: "61%",
                                                position: "relative",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  fontSize:
                                                    "10px",
                                                  color:
                                                    theme?.palette?.customColors?.black[1],
                                                  maxWidth: "95%"
                                                }}
                                                component="div"
                                              >
                                                {sequence
                                                  .filterData
                                                  .inclusion
                                                  ?.anyone
                                                  ? <Box
                                                    component="strong"
                                                    sx={{
                                                      fontWeight: 600,
                                                    }}
                                                  >{t("anyone")}</Box>
                                                  : <Box
                                                    component="strong"
                                                    sx={{
                                                      fontWeight: 600,
                                                    }}
                                                  >{t(
                                                    "everyone"
                                                  )}</Box>}
                                                {" "}
                                                {t(
                                                  "belonging_criteria"
                                                )}
                                                &nbsp;
                                                <Box
                                                  component="strong"
                                                  sx={{
                                                    fontWeight: 600,
                                                  }}
                                                >
                                                  {sequence.selectedTags && sequence.selectedTags[0] ? sequence.selectedTags[0].name : ''}
                                                </Box>
                                                {Object.entries(sequence.filterData)
                                                  ?.filter(([tagId, fieldValue]) =>
                                                    tagId !== "inclusion" &&
                                                    typeof fieldValue === "object" &&
                                                    fieldValue !== null
                                                  )
                                                  ?.map(([tagId, fieldValue]) => {
                                                    const matchingTag = unselectedTags.find(tag => tag.id === tagId);
                                                    const activeOptions = Object.entries(fieldValue as Record<string, boolean>)
                                                      ?.filter(([_, isActive]) => isActive)
                                                      ?.map(([valueId]) => {
                                                        const matchingValue: any = matchingTag?.values?.find(
                                                          (v: any) => v.Id === valueId
                                                        );
                                                        return matchingValue?.Name
                                                      })
                                                      ?.filter(Boolean);

                                                    if (activeOptions.length === 0) return null;

                                                    return (
                                                      <span key={tagId}>
                                                        &nbsp;{t("and")} {matchingTag?.name.toLowerCase() || tagId.toLowerCase()}
                                                        {activeOptions?.map((option, index) => (
                                                          <span key={option}>
                                                            {index === 0 ? " " : ", "}
                                                            <Box component="strong" sx={{ fontWeight: 600 }}>
                                                              {option}
                                                            </Box>
                                                          </span>
                                                        ))}
                                                      </span>
                                                    );
                                                  })
                                                }&nbsp;
                                                {t(
                                                  "considered_approval"
                                                )}
                                              </Typography>
                                              <Tooltip
                                                title="Edit Criteria"
                                                placement="right"
                                                arrow={false}
                                                slotProps={{
                                                  tooltip: {
                                                    sx: {
                                                      backgroundColor: theme?.palette?.customColors?.pink?.[3],
                                                      color: theme?.palette?.customColors?.brightGray?.[6],
                                                      fontSize: "10px",
                                                      fontWeight: 400,
                                                    },
                                                  },
                                                  popper: {
                                                    modifiers: [
                                                      {
                                                        name: 'offset',
                                                        options: {
                                                          offset: [0, -10],
                                                        },
                                                      },
                                                    ],
                                                  },
                                                }}
                                              >
                                                <IconButton
                                                  size="small"
                                                  onClick={() => handleEditFilters(level.id, sequence.id)}
                                                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                                                >
                                                  <img src={EditIcon} alt="edit" style={{ width: "16px", height: "16px" }} />
                                                </IconButton></Tooltip>
                                            </Box>

                                          )}
                                      </Box>
                                      <Box
                                        key={sequence.id}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Tooltip
                                          disableInteractive
                                          title={
                                            (level?.sequences?.length === 1 && level.overrideProduct)
                                              ? "Disabled, turn Overrides Previous toggle off to enable"
                                              : t('add_sequence')
                                          }
                                          placement="right"
                                          arrow={false}
                                          slotProps={{
                                            tooltip: {
                                              sx: {
                                                backgroundColor: theme?.palette?.customColors?.pink?.[3],
                                                color: theme?.palette?.customColors?.brightGray?.[6],
                                                fontSize: "10px",
                                                fontWeight: 400,
                                                maxWidth: "200px",
                                              },
                                            },
                                            popper: {
                                              modifiers: [
                                                {
                                                  name: 'offset',
                                                  options: {
                                                    offset: [-10, -10],
                                                  },
                                                },
                                              ],
                                            },
                                          }}
                                        >
                                          <span style={{ display: 'inline-block' }}>
                                            <Button
                                              disabled={level?.sequences?.length === 1 && level.overrideProduct}
                                              sx={{
                                                minWidth: 0,
                                                padding: 0,
                                                borderRadius: '50%',
                                                marginLeft: 2,
                                                marginBottom: 2,
                                                alignSelf: 'center',
                                              }}
                                              onClick={() => addSequence(level.id, seqIndex)}
                                            >
                                              <Box
                                                sx={{
                                                  width: 32,
                                                  height: 32,
                                                  border: level?.sequences?.length === 1 && level?.overrideProduct ? "2px solid #D7D7D7" : "none",
                                                  opacity: level?.sequences?.length === 1 && level?.overrideProduct ? "33%" : 1,
                                                  backgroundColor: level?.sequences?.length === 1 && level?.overrideProduct ? "#BCBCBC" : "#ffedb5",
                                                  color: theme?.palette?.customColors?.blue?.[10],
                                                  borderRadius: "50%",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  boxShadow: "none",
                                                  flexShrink: 0,
                                                }}
                                              >
                                                <AddIcon
                                                  sx={{
                                                    fontSize: 18,
                                                    fontWeight: 500,
                                                    color: level?.sequences?.length === 1 && level?.overrideProduct ? theme?.palette?.customColors?.white?.[0] : theme?.palette?.customColors?.blue?.[23],
                                                  }}
                                                />
                                              </Box>
                                            </Button>
                                          </span>
                                        </Tooltip>
                                      </Box>
                                    </Box>
                                  )}
                                </Draggable>



                              </Box>
                            );
                          }
                        )}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Box>
              </Collapse>
            </Card>
            {!isMobile && !snapshot.isDragging && (
              <Box
                sx={{
                  display: "flex",
                  marginLeft: 2,
                  position: "sticky",
                  top: 0,
                  alignSelf: "flex-start",
                  flexShrink: 0,
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t("add_level")}
                  placement="bottom"
                  arrow={false}
                  slotProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: theme?.palette?.customColors?.pink?.[3],
                        color: theme?.palette?.customColors?.brightGray?.[6],
                        fontSize: "10px",
                        fontWeight: 400,
                      },
                    },
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        color: theme?.palette?.customColors?.blue?.[10],
                        fontSize: "14px",
                        fontWeight: 400,
                        marginTop: "16px",
                        padding: 0,
                        minWidth: "auto",
                        "&:hover": {
                          color: "#006fce",
                        },
                        "&:active": {
                          color: "#0056a3",
                        },
                      }}
                      onClick={() => addLevel(index)}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: "4px",
                        }}
                      >
                        <img
                          src={AddIconLevel}
                          alt="add"
                          style={{
                            width: "14px",
                            height: "16px",
                            display: "block",
                          }}
                        /><Typography sx={{ fontSize: "14px", fontWeight: 400, color: theme?.palette?.customColors?.blue?.[10], pl: "4px", pr: 1, py: 1 }}>{t('level')}</Typography>
                      </Box>
                    </Button>
                  </Box>
                </Tooltip>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#ccc",
                    marginTop: "16px",
                    marginRight: 1
                  }}
                >
                  |
                </Typography>
                <Tooltip
                  title={
                    levels.length === 1
                      ? t("disabled")
                      : t("delete_level")
                  }
                  placement="bottom"
                  arrow={false}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    },
                    tooltip: {
                      sx: {
                        backgroundColor: theme?.palette?.customColors?.pink?.[3],
                        color: theme?.palette?.customColors?.brightGray?.[6],
                        fontSize: "10px",
                        fontWeight: 400,
                      },
                    },
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        color: theme?.palette?.customColors?.blue?.[10],
                        fontSize: "14px",
                        fontWeight: 400,
                        marginTop: "16px",
                        padding: 0,
                        minWidth: "auto",
                      }}
                      disabled={levels.length === 1}
                      onClick={() => removeLevel(level.id)}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          ml: "4px",
                        }}
                      >
                        <img
                          src={levels.length > 1 ? DeleteActive : DeleteIcon}
                          alt="delete"
                          style={{
                            width: "14px",
                            height: "16px",
                            display: "block",
                          }}
                        /><Typography sx={{ fontSize: "14px", fontWeight: 400, color: levels.length > 1 ? theme?.palette?.customColors?.blue?.[10] : theme?.palette?.customColors?.grey?.[26], pl: "4px", pr: 0.5, py: 1 }}>{t('delete')}</Typography>
                      </Box>
                    </Button>
                  </Box>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Draggable>
  );

  return (
    <Drawer
      anchor="right"
      open={isLevelDrawerOpen}
      onClose={() => handleCancel()}
      hideBackdrop={false}
      ModalProps={{
        keepMounted: true,
      }}
      slotProps={{
        paper: {
          sx: {
            height: '100vh',
            position: 'fixed',
            maxHeight: "1200px",
          },
        },
      }}
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <LoadingScreen isLoading={isLoading || editLoading} />
      <Box sx={{ width: isTab ? "100vw" : "80vw", maxWidth: "1020px", mx: "auto" }}>
        <Box
          sx={{ width: isMobile ? "90%" : "95%", margin: "auto", marginTop: 3, marginBottom: 3 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: "5px" }}>
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleCancel()}
              >
                <CloseIcon sx={{ color: theme?.palette?.customColors?.black?.[1] }} />
              </IconButton></Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: isMobile ? "98%" : "100%",
              }}
            >
              <div ref={textFieldRef}>

                <TextField
                  variant="standard"
                  placeholder={t("approval_process_name")}
                  value={value}
                  onFocus={() => setEditTitle(true)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                  }
                  slotProps={{
                    input: {
                      disableUnderline: !editTitle,
                      style: {
                        fontSize: isMobile ? "14px" : "22px",
                        color: theme?.palette?.customColors?.black[1],
                        fontWeight: 600,
                      },
                    },
                  }}
                  sx={{
                    width: isMobile ? "172px" : "360px",
                    backgroundColor: "transparent",
                    border: "none",
                    '& .MuiInput-input::placeholder': {
                      fontSize: '22px',
                      fontWeight: 600,
                      color: theme?.palette?.customColors?.grey?.[14],
                      opacity: 1,
                    },
                    '& .MuiInput-input': {
                      overflow: editTitle ? 'visible' : 'hidden',
                      textOverflow: editTitle ? 'clip' : 'ellipsis',
                      whiteSpace: editTitle ? 'normal' : 'nowrap',
                    },
                  }}
                />

              </div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BlueSwitch
                  checked={customCodeEnabled}
                  onChange={() => setCustomCodeEnabled(!customCodeEnabled)}
                  sx={{
                    transform: isMobile ? "scale(0.7)" : "scale(0.9)",
                    marginRight: "0px",
                  }}
                />
                <Tooltip
                  title="Lets you create your own Approval Workflow through Custom Code"
                  placement="top"
                  arrow={false}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [20, -10],
                          },
                        },
                      ],
                    },
                    tooltip: {
                      sx: {
                        width: "200px",
                        backgroundColor: theme?.palette?.customColors?.pink?.[3],
                        color: theme?.palette?.customColors?.brightGray?.[6],
                        fontSize: "10px",
                        fontWeight: 400,
                      },
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 400, fontSize: isMobile ? "10px" : "14px", marginLeft: "5px" }}>
                    {t("custom_code")}
                  </Typography></Tooltip>
              </Box>
            </Box></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: isMobile ? 2 : 4,
              width: "100%",
            }}
          >
            <DragDropContext
              onDragEnd={(result) => {
                setDragDestination(null);
                onDragEnd(result);
              }}
              onDragUpdate={(update) => {
                if (update.destination && update.type === 'SEQUENCE') {
                  setDragDestination({
                    levelId: parseInt(update.destination.droppableId),
                    seqIndex: update.destination.index,
                  });
                } else {
                  setDragDestination(null);
                }
              }}
              onDragStart={onDragStart}
            >
              <Droppable droppableId="levels-list" type="LEVEL" direction="vertical">
                {(provided) => (
                  <Box
                    sx={{ width: "100%" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {levels?.map((level, index) => (
                      renderDraggableLevel(level, index, isMobile)
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Box sx={{ float: "right", marginBottom: "10px", marginRight: isMobile ? "-4px" : "0px" }}>
              <Button
                variant="outlined"
                sx={{
                  width: isMobile ? 90 : 110,
                  height: isMobile ? 30 : 40,
                  marginRight: 2,
                  color: theme?.palette?.customColors?.blue?.[10],
                  borderColor: theme?.palette?.customColors?.blue?.[10],
                  textTransform: "none",
                  fontSize: isMobile ? "12px" : "16px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  "&:hover": {
                    color: "#006fce",
                    borderColor: "#006fce",
                    backgroundColor: "rgba(0, 135, 250, 0.04)",
                  },
                }}
                onClick={() => handleCancel()}
              >
                {t("cancel")}
              </Button>
              <Button
                sx={{
                  width: isMobile ? 90 : 110,
                  height: isMobile ? 30 : 40,
                  backgroundColor: theme?.palette?.customColors?.blue?.[10],
                  textTransform: "none",
                  fontSize: isMobile ? "12px" : "16px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#006fce",
                  },
                }}
                onClick={handleSave}
                variant="contained"
              >
                {t("save")}
              </Button>
            </Box>
          </Box>
          <FilterDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            selectedPredefinedTag={currentFilterTag?.tag || null}
            unselectedTags={unselectedTags}
            onApplyFilters={(filters) => {
              if (!currentFilterTag) return;

              setLevels((prevLevels) =>
                prevLevels?.map((level) => {
                  if (level.id !== currentFilterTag.levelId) return level;

                  return {
                    ...level,
                    sequences: level?.sequences?.map((seq) => {
                      if (seq.id !== currentFilterTag.sequenceId) return seq;
                      return {
                        ...seq,
                        appliedFilters: true,
                        filterData: {
                          ...filters.selectedFilters,
                          inclusion: filters.inclusion,
                        },
                      };
                    }),
                  };
                })
              );
              setIsDrawerOpen(false);
            }}
            initialFilters={
              (() => {
                const sequence = levels
                  .find((l) => l.id === currentFilterTag?.levelId)
                  ?.sequences.find((s) => s.id === currentFilterTag?.sequenceId);

                return sequence?.filterData || {};
              })()
            }
            initialInclusion={
              (() => {
                const sequence = levels
                  .find((l) => l.id === currentFilterTag?.levelId)
                  ?.sequences.find((s) => s.id === currentFilterTag?.sequenceId);

                return sequence?.inclusion || { anyone: true, everyone: false };
              })()
            }
          />
        </Box>
      </Box>
      <ConfirmationModal
        showConfirmModal={showConfirmModal}
        onClose={handleConfirmation}
      />
      {/* <ConfirmationModal showConfirmModal={showConfirmModal} setShowConfirmModal={setShowConfirmModal} pendingDrop={pendingDrop} processDrop={processDrop} draggedOverrideLevel={draggedOverrideLevel} /> */}
    </Drawer>

  );
};

export default CreateApprovalWorkflow;