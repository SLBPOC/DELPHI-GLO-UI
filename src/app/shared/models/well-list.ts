export interface WellListModel {
    id:number;
    status: string;
    well_name: string;
    time_stamp: string;
    GLI_SetPoint: number;
    Oliq: number;
    QOil: number;
    WC: number;
    Compressor_Uptime: number;
    Production_Uptime: number;
    Current_GLI_Setpoint: number;
    Cycle_Status: number;
    Auto_Manual: string;
    well_status: string;
}