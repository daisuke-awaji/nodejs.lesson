import { IGateInfo } from "./interface";
export function add(inoutData: IGateInfo[]) {
  return {
    yesterday: {
      in: count(inoutData, { day: "YESTERDAY", inout: "IN" }),
      out: count(inoutData, { day: "YESTERDAY", inout: "OUT" })
    },
    today: {
      in: count(inoutData, { day: "TODAY", inout: "IN" }),
      out: count(inoutData, { day: "TODAY", inout: "OUT" })
    }
  };
}

type INOUT = "IN" | "OUT";
type TODAY_OR_YESTERDAY = "TODAY" | "YESTERDAY";

const count = (
  inoutData: IGateInfo[],
  option: { day: TODAY_OR_YESTERDAY; inout: INOUT }
): any => {
  const { day, inout } = option;
  let fil;
  if (day === "TODAY" && inout === "IN") fil = isToday && isEntered;
  if (day === "TODAY" && inout === "OUT") fil = isToday && isExited;
  if (day === "YESTERDAY" && inout === "IN") fil = isYesterday && isEntered;
  if (day === "YESTERDAY" && inout === "OUT") fil = isYesterday && isExited;
  return inoutData.filter(data => {
    return fil(data);
  }).length;
};

const isToday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return data.gateDate.getDate() === today.getDate();
};

const isYesterday = (data: IGateInfo) => {
  const today = new Date("2020/11/12");
  return data.gateDate.getDate() - 1 === today.getDate();
};

const isEntered = (data: IGateInfo) => {
  return data.inOutFlag === "1";
};
const isExited = (data: IGateInfo) => {
  return data.inOutFlag === "2";
};
