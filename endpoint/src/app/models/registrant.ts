export class Registrant {

    constructor(public userId: string, 
                public password: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public homeCity: string,
                public favoriteCity: string,
                public points: number) { }   
}