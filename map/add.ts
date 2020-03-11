import { IGateInfo } from "./interface";
export function add(inoutData: IGateInfo[]) {
  // 集計のロジックはここに集中させる

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

const InOut = {
  IN: "1",
  OUT: "2"
};

const isEnteredToday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() === today.getDate() && data.inOutFlag === InOut.IN
  );
};
const isExitToday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() === today.getDate() && data.inOutFlag === InOut.OUT
  );
};
const isEnteredYesterday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() === today.getDate() - 1 &&
    data.inOutFlag === InOut.IN
  );
};
const isExitYesterday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return (
    data.gateDate.getDate() === today.getDate() - 1 &&
    data.inOutFlag === InOut.OUT
  );
};
