import { Iuser } from "./Iuser";

export interface IAudit{
    id: number,
    label: null,
    date: string,
    value: number,
    type: string,
    status: string,
    name:string,
    reference:string,
    statusScope:string,
    entiteId:IEntite,
    categoryId:ICategorie,
    userId:Iuser,
    labelCategory:string,
    labelEntite:string,
    firstName:string,
    lastName:string,
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