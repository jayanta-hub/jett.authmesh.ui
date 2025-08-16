import CircleIcon from '@mui/icons-material/Circle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import BillingIcon from '../../assets/images/BillingIcon.svg';
import CarbonGateway from '../../assets/images/carbon_gateway-api.svg';
import EosIconMonitoring from '../../assets/images/eos-icons_monitoring.svg';
import IconParkOutline from '../../assets/images/icon_park_outline_permissions.svg';
interface Widget1 {
    value: string;
    message: string;
    iconColor: string;
}
interface pieData { value: number; color: any }
interface Widget2 {
    value: string,
    chartData: pieData[],
    title: string,
}
/*************  ✨ Codeium Command ⭐  *************/
/**
 * This component renders a widget section which displays 3 widgets. Each widget contains a number and a message.
 * The style of the widget changes based on the value of the isRole variable. If the value is "developer", the widget has a
 * different design. The second widget is only rendered if the isRole is not "developer"
 */
/******  6f08c339-a27a-4d67-bec8-c8b756ca4c49  *******/
const WidgetSection: React.FC = () => {
    const theme = useTheme();
    const widget1: Widget1[] = [{
        value: "3",
        message: "Active APIs",
        iconColor: theme.palette.customColors?.blue[14] 
    },
    {
        value: "20",
        message: "Need Immediate Attention",
        iconColor: theme.palette.customColors?.darkGreen[10]
    },
    {
        value: "99%",
        message: "Average Up time",
        iconColor: theme.palette.customColors?.lightBlue[0]
    }]
    const widget2: Widget2[] = [
        { value: "546", chartData: [{ value: 90, color: theme.palette.customColors?.deepOrange[10] }, { value: 30, color: theme.palette.customColors?.lightWhite[0] }], title: "Properties for Rent" },
        { value: "5732", chartData: [{ value: 60.72, color: theme.palette.customColors?.green[11] }, { value: 28.28, color: theme.palette.customColors?.lightWhite[0] }], title: "Total Customer" },
        { value: "90", chartData: [{ value: 80, color: theme.palette.customColors?.pink[2] }, { value: 20, color: theme.palette.customColors?.lightWhite[0] }], title: "Total Agents" }
    ]
    //future refrence
    // const isRole: string = "developer";
    //    const isRole:string="tmc";
    const isRole: string = "Traveller";
    return (<div className='mt-[1rem]'>
        {/* developer options */}
        {isRole == "developer" && (<>
            <Typography fontSize="16px" fontFamily="Poppins" fontWeight="600" sx={{ marginLeft: "13rem", marginBottom: "1rem" }}>Developer Options</Typography>
            <Box className="flex flex-row gap-3  mb-3" sx={{ marginLeft: "13rem", justifyContent: "flex-start" }}>
                <Box className="flex flex-row  items-center w-[150px] h-[60px] justify-center" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                    <Box
                        component="img"
                        src={IconParkOutline}
                        sx={{
                            width: "15px",
                            height: "15px",
                            objectFit: "contain",
                        }}
                    />
                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                        sx={{
                            paddingLeft: "10px",
                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                        }}
                    >Documentation</Typography>


                </Box> <Box className="flex flex-row  items-center w-[150px] h-[60px] justify-center" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                    <Box
                        component="img"
                        src={BillingIcon}
                        sx={{
                            width: "15px",
                            height: "15px",
                            objectFit: "contain",

                        }}
                    />
                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                        sx={{
                            paddingLeft: "10px",
                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                        }}
                    >Billing</Typography>


                </Box>
                <Box className="flex flex-row  items-center w-[150px] h-[60px] justify-center" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                    <Box
                        component="img"
                        src={CarbonGateway}
                        sx={{
                            width: "15px",
                            height: "15px",
                            objectFit: "contain",
                        }}
                    />
                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                        sx={{
                            paddingLeft: "10px",
                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                        }}
                    >APIs</Typography>


                </Box>
                <Box className="flex flex-row  items-center w-[150px] h-[60px] justify-center" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                    <Box
                        component="img"
                        src={EosIconMonitoring}
                        sx={{
                            width: "15px",
                            height: "15px",
                            objectFit: "contain",
                        }}
                    />
                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                        sx={{
                            paddingLeft: "10px",
                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                        }}
                    >Monitoring</Typography>


                </Box>
            </Box></>
        )}
        {isRole != "Traveller" && (
            <Box  sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"}} >
            <Box className="flex flex-row gap-3   overflow-x-auto whitespace-nowrap  xs:w-[50%]  px-2 md:p-0 mx-auto w-[67%] max-w-[1200px] "
                sx={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "14px" }}
            >
                {widget1.map((widget, index) => (
                    <Box
                        className="flex-shrink-0"
                        key={index}
                        sx={{
                            width: { md: '260px', xs: '225px' },
                            height: isRole == "developer" ? "80px" : "",
                            borderRadius: isRole == 'developer' ? "6px" : "8px",
                            marginBottom: isRole == 'developer' ? "2rem" : "",
                            boxShadow: isRole == 'developer' ? `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}` : '',
                            border: isRole == 'tmc' ? `1px solid ${theme.palette.customColors?.white[14]}` : '',
                            backgroundColor: isRole == 'tmc' ? theme.palette.customColors?.blue[12] : theme.palette.customColors?.white[0],

                        }}
                    >
                        <Box className="flex flex-col h-full  " sx={{
                            mb: "1rem", pl: "2rem",
                            width: { md: '260px', xs: '225px' },
                        }}>
                            {isRole == 'tmc' &&
                                <div className="flex-[0.5] flex justify-end items-end mr-3 mt-3 h-10">
                                    <MoreHorizIcon sx={{ color: theme.palette.customColors?.grey[11], marginBottom: "-13px !important" }} />
                                </div>
                            }
                            {isRole == "tmc" && (
                                <div className="flex-grow flex-row w-full ">
                                    <div className="flex flex-row">
                                        <div className="flex flex-[1] justify-start ">
                                            <CircleIcon
                                                sx={{
                                                    color: widget?.iconColor,
                                                    width: 55,
                                                    height: 55,
                                                }}
                                            />
                                        </div>
                                        <Box className="flex-[3] flex flex-col" sx={{ wordWrap: { xs: "break-word", sm: "" }, whiteSpace: { xs: "normal", sm: "" }, }}>
                                            <Typography
                                                fontSize="20px"
                                                fontFamily="Poppins"
                                                fontWeight="700"
                                                className="pl-2"
                                                color={theme.palette.customColors?.blue[10]}
                                            >
                                                {widget?.value}
                                            </Typography>
                                            <Typography
                                                fontSize="12px"
                                                fontFamily="Poppins"
                                                fontWeight="400"
                                                className="pl-2 pt-1"
                                                color={theme.palette.customColors?.lightGray[16]}
                                            >
                                                {widget?.message}
                                            </Typography>
                                        </Box>
                                    </div>
                                </div>
                            )}
                            {isRole == "developer" && (
                                <div className="flex-row flex w-full ">
                                    <div className="flex-[3] flex flex-row justify-center">
                                        <Typography
                                            fontSize="20px"
                                            fontFamily="Poppins"
                                            fontWeight="700"
                                            className="pl-2"
                                            color={theme.palette.customColors?.blue[10]}
                                        >
                                            {widget?.value}
                                        </Typography>
                                        <Typography
                                            fontSize="12px"
                                            fontFamily="Poppins"
                                            fontWeight="400"
                                            className="pl-2 pt-2"
                                            color={theme.palette.customColors?.lightGray[16]}
                                        >
                                            {widget?.message}
                                        </Typography>
                                    </div>
                                </div>
                            )}

                        </Box>
                    </Box>
                ))}
            </Box>
            {isRole == "tmc" &&
                (<Box className="flex flex-col sm:flex-row gap-3 mb-10   px-8 mx-auto w-[67%] max-w-[1200px]" sx={{ alignItems: "center", paddingLeft: { md: "14px" } }}>
                    {widget2.map((widget, index) => (
                        <Box key={index} className=" flex flex-row h-[85px] rounded-[8px] justify-between px-5" sx={{
                            border: `1px solid ${theme.palette.customColors?.grey[10]}`, backgroundColor: theme.palette.customColors?.white[17],
                            width: { md: '260px', xs: '225px' },
                        }}>

                            <Box className=" flex flex-col " style={{ marginTop: "1rem" }}>

                                <Typography
                                    fontSize="12px"
                                    fontFamily="Poppins"
                                    fontWeight="400"
                                    className=""
                                    color={theme.palette.customColors?.lightGray[17]}
                                >{widget?.title}
                                </Typography>
                                <Typography
                                    fontSize="20px"
                                    fontFamily="Poppins"
                                    fontWeight="700"
                                    color={theme.palette.customColors?.black[0]}
                                >{widget?.value}
                                </Typography>
                            </Box>
                            <Box className="flex items-center justify-center ">
                                <Box
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "100%",
                                        background: `conic-gradient(${widget?.chartData[0]?.color} ${widget?.chartData[0]?.value}%, ${theme?.palette?.customColors?.lightWhite[16]} ${widget?.chartData[0]?.value}% 100%)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                >

                                    <Box
                                        sx={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "100%",
                                            backgroundColor: "white",

                                        }}
                                    ></Box>
                                </Box>
                            </Box>


                        </Box>
                    ))}
                </Box>)}

        </Box>)}

        {isRole == "Traveller" &&
            <Box sx={{
                backgroundColor: theme?.palette?.customColors?.blue[12],
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                width: {
                    xs: '100%',
                    sm: '67%',
                },
                maxWidth: '1200px',
                padding: 2,
                mx: 'auto',
                mb: 3,
                height: '150px',
            }} >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '100%',
                    gap: 2,
                }}>
                    <Box sx={{
                        backgroundColor: theme?.palette?.customColors?.white[0], display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: 1,
                        height: '100%',
                        width: '100%',
                        borderRadius: 1.5,
                        minWidth:"260px"
                    }}>
                        <Typography sx={{ color: theme?.palette?.customColors?.blue[10], fontWeight: 600, fontSize: "30px", }}>3</Typography>
                        <Typography sx={{ color: theme?.palette?.customColors?.black[1], fontWeight: 500, fontSize: "14px", lineHeight: "100%" }}>Pending Approvals</Typography>
                    </Box>

                    <Box sx={{
                        backgroundColor: theme?.palette?.customColors?.white[0], display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: 1,
                        minWidth:'260px',
                        height: '100%',
                        width: '100%',
                        borderRadius: '6px',
                    }}>
                        <Typography sx={{ color: theme?.palette?.customColors?.black[1], fontWeight: 500, fontSize: "14px", lineHeight: "100%" }}>View Upcoming Trip(s)</Typography>
                    </Box>


                    <Box sx={{
                        backgroundColor: theme?.palette?.customColors?.white[0], display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: 1,
                        height: '100%',
                        width: '100%',
                        borderRadius: 1.5,
                        paddingTop:3,
                         minWidth:"260px"
                    }}>
                        <Typography sx={{ color: theme?.palette?.customColors?.black[1], fontWeight: 500, fontSize: "14px", lineHeight: "100%" }}>Upgrade to Business class for your</Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Typography sx={{ color: theme?.palette?.customColors?.blue[10], backgroundColor: theme?.palette?.customColors?.blue[12], fontWeight: 600, fontSize: "14px", padding: "5px", borderRadius: "10px", marginRight: "3px", lineHeight: "100%" }} >DXB-BOM</Typography>
                            <Typography sx={{ color: theme?.palette?.customColors?.black[1], fontWeight: 500, fontSize: "14px", lineHeight: "100%" }}>trip</Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>
        }
    </div >)
}
export default WidgetSection;