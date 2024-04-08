import React, { useState } from "react";
import './index.css'
import { TabuCell } from "./components/tabu-cell";

export default function App() {
    const jogoInicial=[['','',''],['','',''],['','','']];
    const [jogo,setJogo] = useState([['','',''],['','',''],['','','']]);
    const [simboloAtual,setSimboloAtual] = useState('X');
    const [jogando,setJogando] = useState(true);

    const tabuleiro=(j)=>{
        return(
            <div className="flex flex-col text-3xl font-display">
                <div className="flex flex-row">
                    <TabuCell datapos='00' eventClick={(e)=>jogar(e)}>
                        {j[0][0]}
                    </TabuCell>

                    <TabuCell datapos='01' eventClick={(e)=>jogar(e)}>
                        {j[0][1]}
                    </TabuCell>
                    <TabuCell datapos='02' eventClick={(e)=>jogar(e)}>
                        {j[0][2]}
                    </TabuCell>
                </div>
                <div className="flex flex-row">
                    <TabuCell datapos='10' eventClick={(e)=>jogar(e)}>
                        {j[1][0]}
                    </TabuCell>
                    <TabuCell datapos='11' eventClick={(e)=>jogar(e)}>
                        {j[1][1]}
                    </TabuCell>
                    <TabuCell datapos='12' eventClick={(e)=>jogar(e)}>
                        {j[1][2]}
                    </TabuCell>
                </div>
                <div className="flex flex-row">
                    <TabuCell datapos='20' eventClick={(e)=>jogar(e)}>
                        {j[2][0]}
                    </TabuCell>
                    <TabuCell datapos='21' eventClick={(e)=>jogar(e)}>
                        {j[2][1]}
                    </TabuCell>
                    <TabuCell datapos='22' eventClick={(e)=>jogar(e)}>
                        {j[2][2]}
                    </TabuCell>
                </div>
            </div>
        )
    }

    const BtnJogarNovamente=()=>{
        if(!jogando){
            return (
                <button onClick={()=>reiniciar()} className="bg-slate-50 px-4 py-1 rounded-lg font-medium">Jogar novamente</button>
            )
        }
    }

    const verificaVitoria=()=>{
        //linhas
        let pontos=0;
        let vitoria=false;
        for(let l=0; l<3; l++){
            pontos = 0;
            for(let c=0; c<3; c++){
                if(jogo[l][c]==simboloAtual){
                    pontos++;
                }
            }
            if(pontos >=3){
                vitoria=true;
            }
        }

        //Colunas
        for(let c=0; c<3; c++){
            pontos=0;
            for(let l=0; l<3; l++){
                if(jogo[l][c]==simboloAtual){
                    pontos++;
                }
            }
            if(pontos >=3){
                vitoria=true;
            }
        }

        //diagonais
        pontos=0;
        for(let d=0;d<3;d++){
            if(jogo[d][d]==simboloAtual){
                pontos++;
            }
        }
        if(pontos >=3){
            vitoria=true;
        }
        pontos=0;
        let l=0;
        for(let c=2;c>=0;c--){
            if(jogo[l][c]==simboloAtual){
                pontos++;
            }
            l++;
        }
        if(pontos >=3){
            vitoria=true;
        }
        return vitoria;
    }

    const trocaJogador=()=>{
        simboloAtual=='X'?setSimboloAtual('O'):setSimboloAtual('X');
    }

    const retPos=(e)=>{
        const p=e.target.getAttribute('datapos');
        const pos=[parseInt(p.substring(0,1)),parseInt(p.substring(1,2))]
        return pos;
    }

    const verificaEspacoVazio=(e)=>{
        if(jogo[retPos(e)[0]][retPos(e)[1]] == ''){
            return true
        }else{
            return false;
        }
    }

    const verificaEmpate=()=>{
        let pontos = 0;
        let empate = false;
        for(let l=0; l<3; l++){
            
            for(let c=0; c<3; c++){
                if(jogo[l][c] != ''){
                    pontos++;
                }
            }
        }

        if(pontos >= 9){
            empate=true;
        }

        return empate;
    }



    const jogar=(e)=>{
        if(jogando){
            if(verificaEspacoVazio(e)){
                jogo[retPos(e)[0]][retPos(e)[1]]=simboloAtual;
                trocaJogador();
                if(verificaVitoria()){
                    trocaJogador();
                    alert('Jogador '+ simboloAtual + ' venceu!');
                    setJogando(false);
                }
            }else{
                alert('Este espaço não está disponível, escolha outro!')
            }

            if(verificaEmpate()){
                alert('Empate!');
                setJogando(false);
            }
        }
    }

    const reiniciar=()=>{
        setJogando(true)
        setJogo(jogoInicial)
        setSimboloAtual('X')
    }

  return (
    <> 
        
        <div className="flex items-center flex-col w-full h-svh bg-gradient-to-b from-cyan-300 to-fuchsia-500">
            <h2 className="text-4xl m-4 font-bold">Jogo da velha</h2>
            <div className="flex justify-center items-center w-full flex-col gap-10">
                <div>
                    <p className="text-2xl font--bold">Quem joga: {simboloAtual}</p>
                </div>
                {tabuleiro(jogo)}
                <div>
                {BtnJogarNovamente()}
                </div>
            </div>
            
        </div>

    </>
  );
}


