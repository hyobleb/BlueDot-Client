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

export const bankDropDownOptions = [
  { value: "04", label: "KB국민은행" },
  { value: "23", label: "SC제일은행" },
  { value: "39", label: "경남은행" },
  { value: "34", label: "광주은행" },
  { value: "03", label: "기업은행" },
  { value: "11", label: "농협" },
  { value: "31", label: "대구은행" },
  { value: "32", label: "부산은행" },
  { value: "02", label: "산업은행" },
  { value: "45", label: "새마을금고" },
  { value: "07", label: "수협" },
  { value: "88", label: "신한은행" },
  { value: "48", label: "신협" },
  { value: "05", label: "외환은행" },
  { value: "20", label: "우리은행" },
  { value: "71", label: "우체국" },
  { value: "37", label: "전북은행" },
  { value: "16", label: "축협" },
  { value: "81", label: "하나은행(서울은행)" },
  { value: "53", label: "한국씨티은행(한미은행)" }
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
