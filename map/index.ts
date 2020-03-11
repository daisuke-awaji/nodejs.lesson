import data from "./data";
import { classifyCompanyWorkers } from "./classifyCompanyWorkers";
import { total } from "./sum";

const main = () => {
  //   const hrstart = process.hrtime();

  const classifiedData = classifyCompanyWorkers(data);
  const summary = total(classifiedData.firstCompanies);
  console.log(JSON.stringify(summary, null, " "));

  //   const hrend = process.hrtime(hrstart);
  //   console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
  return true;
};

export default main;
