export interface WellListModel {
  WellPriority: string;
  id: number;
  WellName: string;
  time_stamp: string;
  GLISetPoint: number;
  Qliq: number;
  QOil: number;
  WC: number;
  Qg: number;
  Qw: number;
  Compressor_Uptime: number;
  Production_Uptime: number;
  DeviceUpTime: number;
  LastCycleStatus: string;
  Current_GLI_Setpoint: number;
  Cycle_Status: number;
  ModeofApproval: string;
  Auto_Manual: string;
  NoOfAlerts: string;
  well_status: string;
}

// {
//   "Id": 3,
//   "WellName": "Apache 22 FED 11",
//   "WellPriority": "Medium",
//   "GLISetPoint": 12,
//   "QOil": 3,
//   "QLiq": 2,
//   "Qg": 2,
//   "Qw": 3,
//   "Wc": 20.1,
//   "CompressorUpTime": 50.3,
//   "ProductionUpTime": 40.3,
//   "DeviceUpTime": 55,
//   "LastCycleStatus": "waiting for approval",
//   "TimeStamp": "2023-03-09T11:30:20.335Z",
//   "CurrentGLISetpoint": 20,
//   "CurrentCycleStatus": "override",
//   "ApprovalMode": "Auto",
//   "ApprovalStatus": "Override",
//   "UserId": "U001",
//   "NoOfAlerts": 3
// }
