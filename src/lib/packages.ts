export type Pkg = {
  id: string;
  amountGhs: number;
  data: string;
  validity: string;
};

export const PACKAGES: Pkg[] = [
  { id: "mini", amountGhs: 5, data: "500 MB", validity: "3 days" },
  { id: "starter", amountGhs: 10, data: "1 GB", validity: "7 days" },
  { id: "standard", amountGhs: 25, data: "3 GB", validity: "30 days" },
  { id: "max", amountGhs: 50, data: "8 GB", validity: "30 days" },
  { id: "pro", amountGhs: 100, data: "20 GB", validity: "30 days" },
  { id: "mega", amountGhs: 150, data: "40 GB", validity: "60 days" },
];

export function findPackageByAmount(amountGhs: number): Pkg | undefined {
  return PACKAGES.find((p) => p.amountGhs === amountGhs);
}
