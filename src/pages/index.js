import React from "react"
import Container from "../components/container"

let mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener('mousemove', (event) => {
   mouse.x = event.x
   mouse.y = event.y
    
    // console.log(mouse)
})

export default () => <div>

        <Container mouse={mouse} />


</div>
