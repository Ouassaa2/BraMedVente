import requeteHTTPS from '../requete.js';
import Variables from '../Variables.js';

class ClasseProduitStock
    {
        constructor() {
            this.Id,
            this.IdListe,
            this.IdProduit,
            this.DesignationProduit,
            this.value,
            this.IdFamille,
            this.DesignationFamille,
            this.IdStock,
            this.DesignationStock,
            this.IdSource,
            this.NombreJoursAlerte,
            this.Quantite,
            this.PrixAchat,
            this.PrixVente,
            this.TotalAchat,
            this.TotalVente,
            this.DatePeremption
          }
          
        async getProduitsStock()
        {
            listeProduitsStock=[]
            
            try
            {    
                const parametres=
                {
                    Appel : 1,
                    IdUser : Variables['utilisateur'].Identifiant,
                    Utilisateur: Variables['utilisateur'].NomUtilisateur,
                    Condition: " 1=1 "
                }
                liste=await requeteHTTPS(Variables['urlProduitsStock'], parametres)

                if(liste !== null && liste['etat'] === "ok" && liste['ListeStockProduits'] !== null )
                {
                    listeJProduitsS=liste['ListeStockProduits']
                    listeJProduitsS.forEach((element, index, array) => 
                    {
                        _CPS=this.getJProduitStock(element)
                        listeProduitsStock.push(_CPS);
                    });
                }
            }
            catch (error)
            {
            }

            return listeProduitsStock
        }

        DupliquerObjet()
        {
            _CPrSt= new ClasseProduitStock();
            try
            {
                _CPrSt.Id= parseInt(this.Id);
                _CPrSt.IdProduit= parseInt(this.IdProduit);
                _CPrSt.IdFamille= parseInt(this.IdFamille);
                _CPrSt.IdStock= parseInt(this.IdStock);
                _CPrSt.DesignationProduit= this.DesignationProduit;
                _CPrSt.value= this.DesignationProduit;
                _CPrSt.DesignationFamille= this.DesignationFamille;
                _CPrSt.DesignationStock= this.DesignationStock;
                _CPrSt.NombreJoursAlerte= parseInt(this.NombreJoursAlerteExpiration);

                _CPrSt.Quantite= parseFloat(this.Quantite);
                _CPrSt.PrixAchat= parseFloat(this.PrixAchat);
                _CPrSt.DatePeremption =this.DatePeremption
              } 
              catch (exceptionVar) 
              {
                console.log("exceptionVar  "+exceptionVar)
              }
            return _CPrSt;
        }

        getJProduitStock(element)
        {
            _CPrSt= new ClasseProduitStock();
            try
            {
                _CPrSt.Id= parseInt(element.Id);
                _CPrSt.IdProduit= parseInt(element.IdProduit);
                _CPrSt.IdFamille= parseInt(element.IdFamille);
                _CPrSt.IdStock= parseInt(element.IdStock);
                _CPrSt.DesignationProduit= element.DesignationProduit;
                _CPrSt.value= element.DesignationProduit;
                _CPrSt.DesignationFamille= element.DesignationFamille;
                _CPrSt.DesignationStock= element.DesignationStock;
                _CPrSt.NombreJoursAlerte= parseInt(element.NombreJoursAlerteExpiration);

                _CPrSt.Quantite= parseFloat(element.Quantite);
                _CPrSt.PrixAchat= parseFloat(element.PrixAchat);
                _CPrSt.DatePeremption =element.DatePeremption
              } 
              catch (exceptionVar) 
              {
              }
            return _CPrSt;
        }
    }

export default ClasseProduitStock