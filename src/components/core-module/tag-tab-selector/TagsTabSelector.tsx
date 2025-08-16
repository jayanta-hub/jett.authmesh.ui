import { Tabs, Tab } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { theme } from '../../../theme';

const TagsTabSelector: React.FC<tabSelectorType> = ({ setValue, value, tabs }) => {
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    };
    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ sx: { display: 'none' } }}
                sx={{
                    marginTop: "20px",
                    backgroundColor: theme.palette.customColors.white[20],
                    borderRadius: { xs: "0px", sm: "10px", md: "10px" },
                    minHeight: 'unset',
                    padding: "0px 0px 0px 20px",
                    '& .MuiTab-root': {
                        height: '50px',
                        minHeight: 'unset',
                        padding: '0 12px',
                        position: 'relative',
                    },
                    '& .Mui-selected::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '15%',
                        width: '70%',
                        height: '4px',
                        backgroundColor: theme.palette.customColors.yellow[10],

                    },
                    '& .MuiTabs-flexContainer': {
                        flexWrap: 'wrap',
                    },
                }}
            >
                {tabs?.map((tab, index) => (
                    <Tab
                        key={tab}
                        iconPosition="start"
                        label={t(tab)}
                        {...a11yProps(0)}
                        disableRipple
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'none',
                            minWidth: '10px',
                            color: theme.palette.customColors.grey[8],
                            marginRight: '10px',
                            fontSize: '14px',
                            fontWeight: '400',
                            height: "100%",
                            '&.Mui-selected': {
                                color: theme.palette.customColors.black[1],
                                fontWeight: 500
                            },
                        }}
                    />
                ))}
            </Tabs>
        </div>
    )
}

export default TagsTabSelector