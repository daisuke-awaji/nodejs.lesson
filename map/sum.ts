import { add } from "./add";
import { ICompanyClassified, IWorkerGateInfo, IClassified } from "./interface";

function summaryOneLevelBelow(groupByObject: object) {
  const sum = {
    yesterday: { in: 0, out: 0 },
    today: { in: 0, out: 0 }
  };
  groupByObject["detail"].forEach(o => {
    Object.keys(o).forEach(key => {
      sum.yesterday.in += o[key].summary.yesterday.in;
      sum.yesterday.out += o[key].summary.yesterday.out;
      sum.today.in += o[key].summary.today.in;
      sum.today.out += o[key].summary.today.out;
    });
  });
  return sum;
}

const sumByCompany = (workers: IWorkerGateInfo, companyId: string) => {
  const obj = { [companyId]: { detail: [], summary: {} } };
  Object.keys(workers).forEach(workerId => {
    const inoutData = workers[workerId];
    const summary = { [workerId]: { summary: add(inoutData) } };
    obj[companyId].detail.push(summary);
  });
  obj[companyId].summary = summaryOneLevelBelow(obj[companyId]);
  return obj;
};

const sumByFirstCompany = (
  companies: ICompanyClassified,
  firstCompanyId: string
) => {
  const obj = { [firstCompanyId]: { detail: [], summary: {} } };
  Object.keys(companies).forEach(companyId => {
    const workers = companies[companyId].workers;
    const summary = sumByCompany(workers, companyId);
    obj[firstCompanyId].detail.push(summary);
  });
  obj[firstCompanyId].summary = summaryOneLevelBelow(obj[firstCompanyId]);
  return obj;
};

export function total(firstCompanies: IClassified) {
  const result = { detail: [], summary: {} };
  Object.keys(firstCompanies).forEach(firstCompanyId => {
    const companies = firstCompanies[firstCompanyId].companies;
    const summary = sumByFirstCompany(companies, firstCompanyId);
    result.detail.push(summary);
  });
  result.summary = summaryOneLevelBelow(result);
  return result;
}
