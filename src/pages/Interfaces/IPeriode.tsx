        export interface Line {
            version: string;
            from: string;
            to: string;
            status: string;
        }
    
        export interface IPeriode {
            lines: Line[];
            yearRef1: string;
            yearRef2: string;
        }
    
  