export interface WellGeneralInfoModel {
    wellPriority: string;
    id: number;
    wellName: string;
    time_stamp: string;
    gLISetPoint: number;
    qliq: number;
    qOil: number;
    wC: number;
    qG: number;
    qW: number;
    compressorUptime: number;
    productionUptime: number;
    deviceUpTime: number;
    lastCycleStatus: string;
    currentGLISetpoint: number;
    currentCycleStatus: number;
    modeofApproval: string;
    autoManual: string;
    noOfAlerts: string;
    wellstatus: string;
  }