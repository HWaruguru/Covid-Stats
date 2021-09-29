
export class Post {
    country: string;
    tests: number;
    cases: number;
    recovered: number;
    deaths: number;
    datePosted: string;
    id: number;
   
    
    constructor(id: number, country: string, tests: number, cases: number, recovered: number, deaths: number, datePosted: string) {
        this.id = id;
        this.country = country;
        this.tests = tests;
        this.cases = cases;
        this.recovered = recovered;
        this.deaths = deaths;
        this.datePosted = datePosted;
    }
    public popular: boolean = false;
}
