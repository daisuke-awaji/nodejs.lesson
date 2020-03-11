import { IGateInfo } from "./interface";
export function add(inoutData: IGateInfo[]) {
  return {
    yesterday: {
      in: inoutData.filter(data => {
        return isEnteredYesterday(data);
      }).length,
      out: inoutData.filter(data => {
        return isExitYesterday(data);
      }).length
    },
    today: {
      in: inoutData.filter(data => {
        return isEnteredToday(data);
      }).length,
      out: inoutData.filter(data => {
        return isExitToday(data);
      }).length
    }
  };
}

const isEnteredToday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return data.gateDate.getDate() === today.getDate() && data.inOutFlag === "1";
};
const isExitToday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return data.gateDate.getDate() === today.getDate() && data.inOutFlag === "2";
};
const isEnteredYesterday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() - 1 === today.getDate() && data.inOutFlag === "1"
  );
};
const isExitYesterday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() - 1 === today.getDate() && data.inOutFlag === "2"
  );
};
