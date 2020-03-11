import { add } from "./add";
import { ICompanySummary, IWorkerGateInfo, ISummary } from "./interface";

const sumByCompanyId = (workers: IWorkerGateInfo, companyId: string) => {
  const obj = {};
  Object.keys(workers).forEach(workerId => {
    const inoutData = workers[workerId];
    const summaryByWorkerId = { [workerId]: add(inoutData) };
    if (typeof obj[companyId] == "undefined") {
      obj[companyId] = [];
    }
    obj[companyId].push(summaryByWorkerId);
  });
  return obj;
};

const sumByFirstCompanyId = (
  companies: ICompanySummary,
  firstCompanyId: string
) => {
  const summaryByFirstCompanyId = {};
  Object.keys(companies).forEach(companyId => {
    const workers = companies[companyId].workers;
    const summaryByCompanyId = sumByCompanyId(workers, companyId);
    if (typeof summaryByFirstCompanyId[firstCompanyId] == "undefined") {
      summaryByFirstCompanyId[firstCompanyId] = [];
    }
    summaryByFirstCompanyId[firstCompanyId].push(summaryByCompanyId);
  });
  return summaryByFirstCompanyId;
};

export function total(firstCompanies: ISummary) {
  const summary = [];
  Object.keys(firstCompanies).forEach(firstCompanyId => {
    const companies = firstCompanies[firstCompanyId].companies;
    const summaryByFirstCompanyId = sumByFirstCompanyId(
      companies,
      firstCompanyId
    );
    summary.push(summaryByFirstCompanyId);
  });
  return summary;
}
