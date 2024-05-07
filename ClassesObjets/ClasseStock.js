import requeteHTTPS from '../requete';
import Variables from '../Variables.js';

class ClasseStock
    {

        constructor() 
        {
            this.Identifiant,
            this.Designation,
            this.value,
            this.DesignationEtat,
            this.Etat
          }
          
        async getStocks()
        {
            listeStocks=[]
            try
            {    
                const parametres=
                {
                    Appel : 1,
                    IdUser : Variables['utilisateur'].Identifiant,
                    Utilisateur: Variables['utilisateur'].NomUtilisateur,
                }
                
                liste=await requeteHTTPS(Variables['urlStocks'], parametres)
                if(liste !== null && liste['etat'] === "ok" && liste['ListeStocks'] !== null )
                {
                    ListeJStocks=liste['ListeStocks']
                    ListeJStocks.forEach((element, index, array) => 
                    {
                        _Sto=this.getJStock(element)
                        listeStocks.push(_Sto);
                    });
                }
            }
            catch (error)
            {
            }

            return listeStocks
        }

        getJStock(element)
        {
            _Sto= new ClasseStock();
            try
            {
                _Sto.Identifiant= parseInt(element.Id);
                _Sto.Designation= element.Designation;
                _Sto.value= element.Designation;
                _Sto.Etat= parseInt(element.Etat);
                _Sto.DesignationEtat=(_Cli.Etat==1)?"Actif":"Innactif"
              } 
              catch (exceptionVar) 
              {
              }
            return _Sto;
        }
    }

export default ClasseStock