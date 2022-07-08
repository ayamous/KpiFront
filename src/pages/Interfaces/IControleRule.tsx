export interface IControleRule {
    id: number,
    referenceValue: string,
    calculationMethod: string,
    valueType: string,
    maxValue: string,
    minValue: string,
    kpiBase:{
      id: number;
      name: string;
      status:string;
    },
    kpiControl:{
      id: number;
      name: string;
    }
}