import { props } from "react"

export function TabuCell(props){
    
    return(
        <>
            <div datapos={props.datapos} className="flex items-center justify-center flex-row border border-zinc-50 w-24 h-24" onClick={props.eventClick}>
                {props.children}
            </div>
        </>
    )
}