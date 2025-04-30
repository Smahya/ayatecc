import dayjs from "dayjs";

export const formatDate = (date: string, format: string = "DD MMM YYYY") => {
  return dayjs(date).format(format);
};
