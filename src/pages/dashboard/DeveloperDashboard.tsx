import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Typography, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import BillingIcon from '../../assets/images/BillingIcon.svg';
import CarbonGateway from '../../assets/images/carbon_gateway-api.svg';
import EosIconMonitoring from '../../assets/images/eos-icons_monitoring.svg';
import IconParkDocument from '../../assets/images/icon-park-document.svg';
import IconParkOutline from '../../assets/images/icon_park_outline_permissions.svg';
import RIAdmin from '../../assets/images/ri_admin-line.svg';
import WidgetSection from '../widget-module/WidgetSection';

const DeveloperDashboard: React.FC = () => {
    const theme = useTheme();
    return (<>
        <Box
            className="mt-[6rem] flex flex-col  mx-auto" sx={{ width: { lg: '65%', md: '95%', maxWidth: 1280 } }}

        >
            <Typography className=" pl-2" fontSize="20px" fontWeight="600" fontFamily="Poppins" color={theme.palette.customColors?.black[1]} sx={{ justifyContent: "flex-start" }}> Hi, User</Typography>
            <Box className="flex flex-row mb-2" sx={{ border: `1px solid ${theme.palette.customColors?.lightWhite[1]}` }}>

                <Box sx={{ flex: 1 }} className="flex flex-col gap-3 m-2">
                    <Typography className=" pl-2" fontSize="15px" fontWeight="600" fontFamily="Poppins" color={theme.palette.customColors?.black[1]} sx={{ justifyContent: "flex-start" }}> Quick Access</Typography>
                    <div className="flex flex-row gap-3">
                        <Box className="w-[50%] h-[90px] mb-2   rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex-[1] flex flex-row w-full items-center gap-[1]">
                                    <Box
                                        component="img"
                                        src={BillingIcon}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            margin: "1rem 0rem 0.5rem 1rem"
                                        }}
                                    />
                                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                                        sx={{
                                            paddingLeft: "10px",
                                            paddingTop: "10px",
                                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            display: "inline-block",
                                        }}
                                    >Billing</Typography>

                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-row w-full items-start gap-[1] ml-4" >
                                    <Typography sx={{ flex: 2 }} fontSize="8px" fontWeight="500" fontFamily="Poppins" color={theme.palette.customColors?.black[1]}

                                    >Estimated Charges for 1 - 28 2025</Typography>
                                    <Typography sx={{ flex: 2, marginLeft: "1rem" }} fontSize="12px" fontWeight="600" fontFamily="Poppins" color={theme.palette.customColors?.blue[10]}

                                    >AED 300</Typography>
                                </div>



                            </div>
                        </Box>
                        <Box className="w-[50%] h-[90px] mb-2   rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex-[1] flex flex-row w-full items-center gap-[1]">
                                    <Box
                                        component="img"
                                        src={IconParkOutline}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            margin: "1rem 0rem 0.5rem 1rem"
                                        }}
                                    />
                                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                                        sx={{
                                            paddingLeft: "10px",
                                            paddingTop: "10px",
                                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            display: "inline-block",
                                        }}
                                    >Documentation</Typography>

                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-col w-full items-start ml-4 ">
                                    <Typography sx={{ flex: 2 }} fontSize="8px" fontWeight="500" fontFamily="Poppins" color={theme.palette.customColors?.black[1]}

                                    >Learn About Flight APIs</Typography>
                                    <Typography sx={{ flex: 2 }} fontSize="8px" fontWeight="500" fontFamily="Poppins" color={theme.palette.customColors?.black[1]}

                                    >Learn About Visa APIs</Typography>

                                </div>



                            </div>
                        </Box>

                    </div>


                    <div className="flex flex-row gap-3">
                        <Box className="w-[50%] h-[90px]    rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex flex-[1]">
                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-row w-full items-center gap-[1]  mx-auto my-auto mt-[15px]  ">
                                    <Box
                                        component="img"
                                        src={CarbonGateway}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            margin: "0rem 0rem 0rem 1rem"
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
                                    >Enabled APIs & Services</Typography>

                                </div>




                            </div>
                        </Box>
                        <Box className="w-[50%] h-[90px]    rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex flex-[1]">
                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-row w-full items-center gap-[1]  mx-auto my-auto mt-[15px]  ">
                                    <Box
                                        component="img"
                                        src={RIAdmin}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            margin: "0rem 0rem 0rem 1rem"
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
                                    >IAM & ADMIN</Typography>

                                </div>




                            </div>
                        </Box></div>
                    <div className="flex flex-row gap-3">
                        <Box className="w-[50%] h-[90px] mb-2   rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex-[1] flex flex-row w-full items-center gap-[1]">
                                    <Box
                                        component="img"
                                        src={EosIconMonitoring}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            margin: "1rem 0rem 0.5rem 1rem"
                                        }}
                                    />
                                    <Typography fontSize="12px" fontWeight="600" fontFamily="Poppins"
                                        sx={{
                                            paddingLeft: "10px",
                                            paddingTop: "10px",
                                            background: `linear-gradient(to right, ${theme.palette.customColors?.black[1]} 0%, ${theme.palette.customColors?.blue[10]} 100%)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            display: "inline-block",
                                        }}
                                    >Monitoring</Typography>

                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-col w-full items-start ml-4 ">
                                    <Typography sx={{ flex: 2 }} fontSize="8px" fontWeight="500" fontFamily="Poppins" color={theme.palette.customColors?.black[1]}

                                    >Setup Alerts</Typography>


                                </div>



                            </div>
                        </Box>
                        <Box className="w-[50%] h-[90px]    rounded-[8px]" sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}`, backgroundColor: theme.palette.customColors?.white[17] }}>
                            <div className=" flex flex-col">
                                <div className="flex flex-[1]">
                                    <Box className="flex ml-auto mr-2">
                                        <MoreHorizIcon sx={{ color: theme.palette.customColors?.black[1] }} />
                                    </Box>
                                </div>
                                <div className="flex-grow flex flex-row w-full items-center gap-[1]  mx-auto my-auto mt-[15px]  ">
                                    <Box
                                        component="img"
                                        src={IconParkDocument}
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            marginLeft: "1rem"
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
                                    >Marketplace</Typography>

                                </div>




                            </div>
                        </Box></div>










                </Box>
                <Box sx={{ flex: 1 }} className="flex flex-col h-full  mb-2">
                    <Typography className=" pl-2" fontSize="15px" fontWeight="600" fontFamily="Poppins" color={theme.palette.customColors?.black[1]}>API Usage</Typography>
                    <Box
                        className="w-full h-full mt-5 flex justify-between items-center"
                        sx={{ boxShadow: `2px 4px 14px 0px ${theme.palette.customColors?.black[5]}` }}
                    >
                        <LineChart
                            series={[

                                {
                                    curve: 'linear', data: [0, 10, 160, 170, 250, 100, 180], color: theme.palette.customColors?.green[12],
                                    showMark: true,

                                },
                                { curve: 'linear', data: [0, 90, 210, 100, 180, 120, 220], color: theme.palette.customColors?.lightBlue[1], },   // Second graph: Blue
                            ]}
                            width={400}
                            height={300}
                            sx={{
                                '.MuiLineElement-root': {
                                    strokeWidth: 1,
                                    markWidth: 1  // ✅ Reduce graph stroke width
                                },

                            }}
                            xAxis={[
                                {
                                    scaleType: 'point',
                                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                    sx: {
                                        '.MuiChartsAxis-line': {
                                            stroke: theme.palette.customColors?.lightGray[16], strokeWidth: "0px",

                                        }, '.MuiChartsAxis-tick': {
                                            stroke: "none"
                                        },
                                        '.MuiChartsGrid-line': { stroke: theme.palette.customColors?.lightGray[16] }, 'MuiChartsAxis-tick': { stroke: 'red' },
                                        '.MuiChartsAxis-tickLabel': { fill: theme.palette.customColors?.lightGray[16] },
                                    },

                                },
                            ]}
                            yAxis={[
                                {
                                    min: 0,
                                    max: 500,
                                    sx: {
                                        '.MuiChartsAxis-line': { stroke: theme.palette.customColors?.lightGray[16], strokeWidth: "0px" }, '.MuiChartsAxis-tick': {
                                            stroke: "none"
                                        },
                                        '.MuiChartsAxis-tickLabel': { fill: theme.palette.customColors?.lightGray[16] },
                                    },
                                },
                            ]}
                            grid={{
                                vertical: true,
                                horizontal: true,
                            }}
                        />
                    </Box>

                </Box>
            </Box>

        </Box>
        <WidgetSection />


    </>)
}
export default DeveloperDashboard

