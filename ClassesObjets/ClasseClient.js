import requeteHTTPS from '../requete';
import Variables from '../Variables.js';

class ClasseClient
    {
        constructor() {
            this.Identifiant,
            this.Designation,
            this.Telephone,
            this.Etat,
            this.Adresse,
            this.Dette,
            this.TotalVente,
            this.TotalVersement,
            this.TypeClient
          }
          
        async getClients()
        {
            listeClients=[]
            
            try
            {    
                const parametres=
                {
                    Appel : 1,
                    IdUser : Variables['utilisateur'].Identifiant,
                    Utilisateur: Variables['utilisateur'].NomUtilisateur,
                }
                
                liste=await requeteHTTPS(Variables['urlClients'], parametres)
                if(liste !== null && liste['etat'] === "ok" && liste['ListeClients'] !== null )
                {
                    listeJClients=liste['ListeClients']
                    listeJClients.forEach((element, index, array) => 
                    {
                        //listeClients.push(element.Designation);
                        _Cli=this.getJClient(element)
                        listeClients.push(_Cli);
                    });
                }
            }
            catch (error)
            {
            }

            return listeClients
        }

        getJClient(element)
        {
            _Cli= null;
            try
            {
                _Cli=
                {
                    Identifiant: parseInt(element.Id),
                    Designation: element.Designation,
                    value: element.Designation,
                    Telephone: element.Telephone,
                    Etat: parseInt(element.Etat),
                    Adresse: element.Adresse,
                    Dette: parseFloat(element.Dette),
                //    Dette: element.Dette,
                    TotalVente: parseFloat(element.TotalVente),
                  //  TotalVente: element.TotalVente,
                    TotalVersement: parseFloat(element.TotalVersement),
                    //TotalVersement: element.TotalVersement,
                    TypeClient: element.TypeClient,
                }
                /*
                _Cli.Identifiant= parseInt(element.Id);
                _Cli.Designation= element.Designation;
                _Cli.Telephone= element.Telephone;
                _Cli.Etat= parseInt(element.Etat);
                _Cli.Adresse= element.Adresse;
                //_Cli.Dette= parseFloat(element.Dette);
                _Cli.Dette= element.Dette;
                //_Cli.TotalVente= parseFloat(element.TotalVente);
                _Cli.TotalVente= element.TotalVente;
                //_Cli.TotalVersement= parseFloat(element.TotalVersement);
                _Cli.TotalVersement= element.TotalVersement;
                _Cli.TypeClient= element.TypeClient;
                */
              } 
              catch (exceptionVar) 
              {
              }
            return _Cli;

        }
    }

export default ClasseClient