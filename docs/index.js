const divPrin = document.querySelector('.cont-pokemon');
const divCont = document.createElement('div');
const nombre = document.querySelector('#input-text');

const botonReset =document.querySelector('#reset');
const botonBuscar = document.querySelector('#search');
const botonInfo =document.querySelector('#info-poke');


const crearHtml = ({id,name,sprites}) =>{

    infoId(id);
    
    const html =`
    
    <img class="img-thumbnail" src="${sprites.front_default}"/>
    <p class='id-img'>ID:${id}</p>
    <p class='nom-img'>Nombre:${name}</p>
    `;

    divCont.classList.add('pokemon');
    divCont.innerHTML=html;
    divPrin.append(divCont);



}


const infoHtml =(data)=>{

    const html =`
    <p>Nombre:${data.name}</p>
    <p>Tipo:${data.genera[5].genus}</p>
    <p>${data.flavor_text_entries[69].flavor_text}</p>
    `;

    divCont.classList.add('pokemon');
    divCont.innerHTML=html;
    divPrin.append(divCont)

    
};


const buscarPokemon=( )=>{

    
    botonBuscar.addEventListener('click',async ()=>{
    if(nombre.value){
    crearHtml(await getPokemon(nombre.value));

    botonBuscar.disabled =true;
    botonReset.disabled=false;
    botonInfo.disabled=false;
    nombre.disabled= true;    
    }else{
        alert('Ingrese el nombre del pokemon');
    }

    });

    botonReset.addEventListener('click',()=>{

        resetPokedex();
        nombre.value='';
                
    });


    
    const resetPokedex =()=>{

        const divPoke = document.querySelector('.pokemon');
        divPrin.removeChild(divPoke);
 
        botonBuscar.disabled =false;
        botonReset.disabled=true;
        botonInfo.disabled=true;
        nombre.disabled= false;
    };

}

const infoId=(id)=>{

    botonInfo.addEventListener('click',async()=>{

        infoHtml( await pokeInfo(id));
       
        botonInfo.disabled=true;
     
    });
}

buscarPokemon();
botonReset.disabled=true;
botonInfo.disabled=true;

//****HTTP-PRIVAIDER ****/

const getPokemon = async( name )=>{

    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  
    try{
        if(answer.ok){

            const {id,name,sprites} = await answer.json();
        
            return {id, name,sprites};
            
        }else {throw 'No se encontro lo solicitado';}
    
    }catch(err){
        
        throw err;
    }

    
}




const pokeInfo = async( id )=>{

    const answerInfo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)

    try{

if(answerInfo.ok){

    const data = await answerInfo.json();

    return data;

}
else{

    throw 'No se encontro informacion';
}
}
catch(err){

    throw err;
}

}
