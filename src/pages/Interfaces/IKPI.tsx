import { ICategorie } from "./ICategorie";
import { IEntite } from "./IEntite";
import { ISysSource } from "./ISysSource";

export interface IKPI {
  id: number,
  name: string,
  reference: string,
  description: string,
  perdiodicity: string,
  productionPeriod: string,
  status: string,
  reminder: string,
  estimationMethod: string,
  source:string,
  estimationPeriodValue:string,
  isEstimable?:boolean,
  isInductor?:boolean,
  estimationPeriod:string,
  inductor: string;
  kpiGroup: string;
  entite: IEntite;
  category: ICategorie;
  systemSource: ISysSource;
  documents:{
    contentType: string,
    dirId: string,
    extension: string,
    fsName: string,
    id: number,
    name: string,
    size: string,
    url: string
  },
    monthlyKpiValues: null,
    totalKpiValues: null,
    creationDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    estimable?: boolean,
}