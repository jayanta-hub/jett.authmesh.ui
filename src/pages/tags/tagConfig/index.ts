
import { GridColDef } from '@mui/x-data-grid';
import getCheckboxConfig from './checkBoxConfig';
import getDateConfig from './dateConfig';
import getFreeTextConfig from './freeTextConfig';
import getListGridConfig from './listConfig';
import getLocationConfig from './locationConfig';
import getUserIdConfig from './userIdConfig';

type ConfigType = 'ListSingleSelect' | 'ListMultiSelect' | 'Date' | 'User_ID' | 'CheckBox'|'FreeText';

type ConfigData = Record<string, any>;

type GridConfigFunction = (configData: ConfigData) => GridColDef[];

const configMap: Record<ConfigType, GridConfigFunction> = {
  ListSingleSelect: getListGridConfig,
  ListMultiSelect: getListGridConfig,
    Date: getDateConfig,
    User_ID: getUserIdConfig,
    CheckBox: getCheckboxConfig,
    FreeText:getFreeTextConfig,
    Location:getLocationConfig,
    ListWithAdd:getListGridConfig
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Given a type and some config data, returns the appropriate grid config
 * or an empty array if the type is not recognized.
 *
 * @param {ConfigType} type the type of grid config to retrieve
 * @param {ConfigData} [configData={}] extra data to pass to the config
 * @return {GridColDef[]} the grid config or an empty array
 */
/*******  432d42ab-f3a4-4076-b8b3-3c66dd16223d  *******/export default function getGridConfigByType(
  type: ConfigType,
  configData: ConfigData = {}
): GridColDef[] {

  return configMap[type] ? configMap[type](configData) : [];
}
