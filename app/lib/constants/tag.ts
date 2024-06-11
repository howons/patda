import { TagId } from "@lib/types/property";

export const TAG_NAMES: { [key in TagId]: string } = {
  abuse: "안전결제 악용",
  cancel: "일방적 거래 파기",
  attempt: "사기 시도",
  noShow: "노쇼/잠수",
  lier: "거짓 정보",
  nego: "과한 네고 요청",
  noManner: "비매너",
  others: "기타",
};

export const TAG_DESC: { [key in TagId]: string } = {
  abuse:
    "택배로 물품을 수령한 뒤 구매확정하지 않고 유예기간 내내 사용하다가 고의로 구석에 흠집을 내거나 비합리적인 트집을 잡아 안전결제를 취소하고 물품을 반송하는 경우",
  cancel: "양해 없이 일방적으로 거래를 파기한 경우",
  attempt:
    "사기를 시도하려다 발각된 경우, 또는 사기의 낌새가 강하게 느껴진 경우",
  noShow: "거래 약속을 잡은 후 연락이 끊겨 거래가 성사되지 않은 경우",
  lier: "판매자라면 당연히 알았을 법한 물품 상태나 스펙을 오표기하여 거래에 지장을 유발한 경우",
  nego: "과한 수준으로 가격을 깎아달라고 요청하는 경우. 직거래 중 네고 요청을 거부하자 거래를 파기한 경우.",
  noManner: "비매너스러운 언행을 한 경우",
  others: "기타 거래에 지장을 유발한 경우",
};
