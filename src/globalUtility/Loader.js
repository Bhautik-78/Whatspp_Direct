import React from "react"

const Loader = ({top,left}) => {
  return(
    <div style={{ position: "fixed", top: top ? top : "0", left: left ? left : "0",right:"0",bottom:"0", height: "100%", width: "100%", backgroundColor: "#ffffff", opacity: 0.6, zIndex: 1000 }}>
      <div style={{ position: "absolute", textAlign: "center", top: "47%", left: "47%", zIndex: 1001 }}>
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1"/>
          <div className="sk-child sk-bounce2"/>
          <div className="sk-child sk-bounce3"/>
        </div>
      </div>
    </div>
  )
}


export default Loader
