export interface WellGliDetails {
    Id: number;
    WellName: string;
    WellPriority: string;
    GLISetPoint: number;
    QOil: number;
    QLiq: number;
    Qg: number;
    Qw: number;
    Wc: number;
    CompressorUpTime: number;
    ProductionUpTime: number;
    DeviceUpTime: number;
    LastCycleStatus: string;
    TimeStamp: Date;
    CurrentGLISetpoint: number;
    CurrentCycleStatus: string;
    ApprovalMode: string;
    ApprovalStatus: string;
    UserId: string;
    NoOfAlerts: number;
}