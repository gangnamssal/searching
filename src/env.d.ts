declare interface IApiData {
  sickCd: string;
  sickNm: string;
}

declare interface IData {
  data: IApiData[];
  expired: number;
}
