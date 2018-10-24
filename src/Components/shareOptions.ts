export enum roomTypeOptions {
  FOCUS = "FOCUS",
  OPEN = "OPEN",
  SINGLE = "SINGLE"
}

export enum membershipOptions {
  CABINET = "CABINET",
  MEMBERSHIP = "MEMBERSHIP"
}

export const roomTypeDropDownOptions = [
  { value: "OPEN", label: "오픈" },
  { value: "FOCUS", label: "포커스" },
  { value: "SINGLE", label: "싱글" }
];

export const productTypeDropDownOptions = [
  { value: "MEMBERSHIP", label: "멤버쉽" },
  { value: "CABINET", label: "사물함" }
];
export enum cabinetLockMode {
  CREATE = "CREATE",
  MODIFY = "MODIFY"
}

export enum CreatePaymentMethodOption {
  CARD = "CARD",
  TRANS = "TRANS",
  VBANK = "VBANK",
  PHONE = "PHONE",
  CASH = "CASH"
}
