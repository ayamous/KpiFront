export interface IKPIData {
    id: number,
    label: null,
    date: string,
    value: number,
    type: string,
    status: string,
    kpi: {
        id: number,
        name: string,
        reference: string,
        description: string,
        dirId: string,
        perdiodicity: string,
        productionPeriod: string,
        status: string,
        reminder: string,
        inductor: string,
        kpiGroup: string,
        entite: IEntite,
        category: ICategorie,
        isEstimable: string,
        isInductor: string,
        source: string,
        estimationMethod: string,
        estimationPeriod: string,
        estimationPeriodValue: string,
        systemSources: [],
        documents: [],
        monthlyKpiValues: [],
        totalKpiValues: string,
        creationDate: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        estimable: string
    }
}
  
  interface ICategorie {
    id: number;
    label: string;
    description: string;
  }
  
  interface IEntite {
    id: number;
    label: string;
    description: string;
  }