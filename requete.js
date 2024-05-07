import Variables from './Variables.js';
import React, { useState, useEffect } from 'react';

async function requeteHTTPS(_url, parametres)
{   
    try
    {
        console.log(Variables['url']+_url);
        let result= await fetch(Variables['url']+_url,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parametres)
            }
        );
        
        let resu=await result.json();
        console.log(resu);
        return resu;
        //return new Promise(resu);
    }
    catch (err){}
}

export default requeteHTTPS