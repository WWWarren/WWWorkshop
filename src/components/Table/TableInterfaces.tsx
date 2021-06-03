export interface Config {
  id: string,
  key: string,
  type: string,
  label: string,
  parentID: string,
  dataType?: string,
  prefix?: string,
  suffix?: string,
  center?: string,
  width?: number,
  decimalPlaces?: number,
  childElements?: Config[]
}