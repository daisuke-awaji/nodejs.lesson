export interface IGateInfo {
  inOutFlag: string;
  firstCompanyId: string;
  firstCompanyName: string;
  workerId: string;
  companyId: string;
  timeChange: string;
  gateTime: Date;
  gateDate: Date;
  constructionContentsName: string;
}

export interface ISummary {
  [firstCompanyId: string]: IFirstCompaniesSummary;
}
export interface IFirstCompaniesSummary {
  companies: ICompanySummary;
}
export interface ICompanySummary {
  [companyId: string]: IWorkerSummary;
}
export interface IWorkerSummary {
  workers: IWorkerGateInfo;
}
export interface IWorkerGateInfo {
  [workerId: string]: IGateInfo[];
}

export interface IClassifiedCompanyWorkers {
  firstCompanies: {
    [firstCompanyId: string]: {
      companies: {
        [companyId: string]: {
          workers: {
            [workerId: string]: IGateInfo[];
          };
        };
      };
    };
  };
}
