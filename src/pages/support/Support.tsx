import {  useTheme } from '@mui/material/styles';

const Support: React.FC = (): JSX.Element => {
const theme = useTheme();
    return (
        <div className="rounded-lg p-4 mt-5 w-[90%] mx-auto h-[50px] "style={{backgroundColor:theme.palette.customColors?.blue[11]}}>
            Support module will coming soon!
        </div>
            
    )
}
export default Support