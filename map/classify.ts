import { IGateInfo, IClassifiedCompanyWorkers } from "./interface";

const toFirstCompanyMap = (workers: IGateInfo[]) => {
  const firstCompanyMap = { firstCompanies: {} };
  workers.map(worker => {
    const firstCompanyId = worker["firstCompanyId"];
    if (typeof firstCompanyMap.firstCompanies[firstCompanyId] == "undefined") {
      firstCompanyMap.firstCompanies[firstCompanyId] = [];
    }
    firstCompanyMap.firstCompanies[firstCompanyId].push(worker);
  });
  return firstCompanyMap;
};
const toCompanyMap = (workers: IGateInfo[]) => {
  const companyMap = { companies: {} };
  workers.map(worker => {
    const companyId = worker["companyId"];
    if (typeof companyMap.companies[companyId] == "undefined") {
      companyMap.companies[companyId] = [];
    }
    companyMap.companies[companyId].push(worker);
  });
  return companyMap;
};
const toWorkerMap = (workers: IGateInfo[]) => {
  const workerMap = { workers: {} };
  workers.map(worker => {
    const workerId = worker["workerId"];
    if (typeof workerMap.workers[workerId] == "undefined") {
      workerMap.workers[workerId] = [];
    }
    workerMap.workers[workerId].push(worker);
  });
  return workerMap;
};

export function classifyCompanyWorkers(
  data: IGateInfo[]
): IClassifiedCompanyWorkers {
  const firstCompanyIdMap = toFirstCompanyMap(data);
  Object.keys(firstCompanyIdMap.firstCompanies).forEach(firstCompanyId => {
    const workers = firstCompanyIdMap.firstCompanies[firstCompanyId];
    const companyMap = toCompanyMap(workers);
    Object.keys(companyMap.companies).forEach(companyId => {
      const workers = companyMap.companies[companyId];
      const workerMap = toWorkerMap(workers);
      companyMap.companies[companyId] = workerMap;
    });
    firstCompanyIdMap.firstCompanies[firstCompanyId] = companyMap;
  });
  return firstCompanyIdMap as IClassifiedCompanyWorkers;
}
