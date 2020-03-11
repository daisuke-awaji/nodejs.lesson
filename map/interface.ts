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

export interface IClassified {
  [firstCompanyId: string]: IFirstCompaniesClassified;
}
export interface IFirstCompaniesClassified {
  companies: ICompanyClassified;
}
export interface ICompanyClassified {
  [companyId: string]: IWorkerClassified;
}
export interface IWorkerClassified {
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

export interface ISummary {
  detail: [
    {
      [firstCompanyId: string]: {
        detail: {
          [companyId: string]: {
            detail: {
              [workerId: string]: {
                summary: ISummaryOne;
              };
            };
            summary: ISummaryOne;
          };
        };
        summary: ISummaryOne;
      };
    }
  ];
  summary: ISummaryOne;
}

interface ISummaryOne {
  yesterday: {
    in: number;
    out: number;
  };
  today: {
    in: number;
    out: number;
  };
}
