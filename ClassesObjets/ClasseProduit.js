import requeteHTTPS from '../requete.js';
import Variables from '../Variables.js';

class ClasseProduit
    {
        constructor() {
            this.Identifiant,
            this.Designation,
            this.value,
            this.IdFamille,
            this.DesignationFamille,
            this.Etagere,
            this.Etat,
            this.DesignationEtat,
            this.NombreJoursAlerte,
            this.Expire,
            this.DesignationExpire,
            this.QuantiteAlerte,
            this.PrixAchat,
            this.PrixVenteDetail,
            this.PrixVenteGros
          }
          
        async getProduits()
        {
            listeProduits=[]
            
            try
            {    
                const parametres=
                {
                    Appel : 1,
                    IdUser : Variables['utilisateur'].Identifiant,
                    Utilisateur: Variables['utilisateur'].NomUtilisateur,
                }
                
                liste=await requeteHTTPS(Variables['urlProduits'], parametres)
            
                if(liste !== null && liste['etat'] === "ok" && liste['ListeProduits'] !== null )
                {
                    listeJProduits=liste['ListeProduits']
                    listeJProduits.forEach((element, index, array) => 
                    {
                        _CPS=this.getJProduit(element)
                        listeProduits.push(_CPS);
                    });
                }
            }
            catch (error)
            {
            }

            return listeProduits
        }

        getJProduit(element)
        {
            _CPrSt= new ClasseProduit();
            try
            {
                _CPrSt.Identifiant= parseInt(element.IdProduit);
                _CPrSt.IdFamille= parseInt(element.IdFamille);
                _CPrSt.Designation= element.DesignationProduit;
                _CPrSt.value= element.DesignationProduit;
                _CPrSt.Designation= element.IdStock;
                _CPrSt.DesignationFamille= element.DesignationFamille;
                _CPrSt.PrixAchat= parseFloat(element.PrixAchat);
                _CPrSt.PrixVenteDetail= parseFloat(element.PrixVenteDetail);
                _CPrSt.PrixVenteGros= parseFloat(element.PrixVenteGros);
                _CPrSt.Etat= parseInt(element.Etat);
                _CPrSt.Etagere= element.Etagere;
                _CPrSt.QuantiteAlerte= parseFloat(element.QuantiteAlerte);
                _CPrSt.Expire= parseInt(element.Expire);
                _CPrSt.Expire= parseInt(element.NombreJoursAlerteExpiration);		
                _CPrSt.NombreJoursAlerte= parseInt(element.NombreJoursAlerteExpiration);
              } 
              catch (exceptionVar) 
              {
              }
            return _CPrSt;
        }
    }

export default ClasseProduit