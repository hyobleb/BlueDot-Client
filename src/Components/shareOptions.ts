export enum modifyOptions {
  DATETIME_MODIFIED = "DATETIME_MODIFIED",
  EXTENDED = "EXTENDED"
}

export enum roomTypeOptions {
  FOCUS = "FOCUS",
  OPEN = "OPEN",
  SINGLE = "SINGLE",
  MIDDLE = "MIDDLE",
  FREE = "FREE"
}

export enum targetOptions {
  CABINET = "CABINET",
  MEMBERSHIP = "MEMBERSHIP"
}

export enum membershipOptions {
  CABINET = "CABINET",
  MEMBERSHIP = "MEMBERSHIP"
}

export const roomTypeDropDownOptions = [
  { value: "OPEN", label: "오픈" },
  { value: "FOCUS", label: "포커스" },
  { value: "SINGLE", label: "싱글" },
  { value: "MIDDLE", label: "미들" },
  { value: "FREE", label: "프리" }
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
  CASH = "CASH",
  FIELD_CARD = "FIELD_CARD"
}

export const searchTypeOptions = [
  { value: "NAME", label: "이름" },
  { value: "PHONE", label: "전화번호" },
  { value: "USERID", label: "아이디" }
];

export const genderTypeOptions = [
  { value: "MALE", label: "남자" },
  { value: "FEMALE", label: "여자" }
];

export enum CustomerRequestSignUpGender {
  FEMALE = "FEMALE",
  MALE = "MALE"
}
