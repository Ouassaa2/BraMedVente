import requeteHTTPS from '../requete';
import Variables from '../Variables.js';

class ClasseUtilisateur 
    {
        constructor() {
            this.Identifiant,
            this.NomUtilisateur,
            this.MotPasse,
            this.Etat,
            this.GestionUtilisateurs,
            this.VoirPrixAchat,
            this.VoirDettesClient,
            this.VoirDettesFournisseur,
            this.VoirTableauBord,
            this.VoirClient,
            this.VoirFournisseur,
            this.VoirProduits,
            this.VoirStocks,
            this.VoirVersements,
            this.VoirDepenses
          }
        
          
        async getUtilisateur(nomUtilisateur, motPasse)
        {
            condition = " NomUtilisateur='"+nomUtilisateur+"' AND MotPasse='"+motPasse+"'  ";
            const parametres=
            {
                Appel : 2,
                IdUser : 0,
                Condition : condition
            }
            console.log(parametres);
            utilisateur=await requeteHTTPS(Variables['urlUtilisateurs'], parametres)
            if(utilisateur['etat'] !== null && utilisateur['etat'] === "ok")
            {
                if(utilisateur['Utilisateur']!=null && utilisateur['Utilisateur']!=="")
                {
                    user=utilisateur['Utilisateur']
                    this.Identifiant=parseInt(user['Id'])
                    this.NomUtilisateur=user['NomUtilisateur'],
                    this.MotPasse=user['MotPasse'],
                    this.Etat=parseInt(user['Etat']),
                    this.GestionUtilisateurs=parseInt(user['GestionUtilisateurs']),
                    this.VoirPrixAchat=parseInt(user['VoirPrixAchat']),
                    this.VoirDettesClient=parseInt(user['VoirDettesClient']),
                    this.VoirDettesFournisseur=parseInt(user['VoirDettesFournisseur']),
                    this.VoirTableauBord=parseInt(user['VoirTableauBord']),
                    this.VoirClient=parseInt(user['VoirClients']),
                    this.VoirFournisseur=parseInt(user['VoirFournisseurs']),
                    this.VoirProduits=parseInt(user['VoirProduits']),
                    this.VoirStocks=parseInt(user['VoirStocks']),
                    this.VoirVersements=parseInt(user['VoirVersement']),
                    this.VoirDepenses=parseInt(user['VoirDepensesId'])
                }

            }
            return this
            //console.warn(utilisateur);
        }
    }

export default ClasseUtilisateur