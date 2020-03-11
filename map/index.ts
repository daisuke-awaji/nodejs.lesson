import data from "./data";
import { classifyCompanyWorkers } from "./classify";
import { total } from "./sum";
import { ISummary } from "./interface";

const main = () => {
  //   const hrstart = process.hrtime();

  const classifiedData = classifyCompanyWorkers(data);
  const summary = total(classifiedData.firstCompanies) as ISummary;

  const firstCompanies = [];
  summary.detail.forEach(firstCompany => {
    Object.keys(firstCompany).forEach(firstCompanyId => {
      const { today, yesterday } = firstCompany[firstCompanyId].summary;
      firstCompanies.push({
        firstCompanyId: firstCompanyId,
        firstCompanyName: "TODO",
        firstComConstContentsId: "TODO",
        firstComConstContentsName: "TODO",
        totalWorker: 999,
        totalWorkerDetail: {
          todayTotalEntrance: today.in + today.out,
          todayEnterd: today.in,
          todayExit: today.out,
          yesterdayTotalEntrance: yesterday.in + yesterday.out,
          yesterdayEnterd: yesterday.in,
          yesterdayExit: yesterday.out
        }
      });
    });
  });

  const { today, yesterday } = summary.summary;
  const result = {
    projectId: "1234567890", // TODO
    projectName: "プロジェクトXX", // TODO
    date: "20200110", // TODO
    dateChangeTime: "00:00:00", // TODO
    totalWorker: 62, // TODO
    totalWorkerDetail: {
      todayTotalEntrance: today.in + today.out,
      todayEnterd: today.in,
      todayExit: today.out,
      yesterdayTotalEntrance: yesterday.in + yesterday.out,
      yesterdayEnterd: yesterday.in,
      yesterdayExit: yesterday.out
    },
    firstCompanies: firstCompanies
  };
  console.log(result);
  //   const hrend = process.hrtime(hrstart);
  //   console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
  return true;
};

export default main;
