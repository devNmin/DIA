import { createContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';

const UserContext = createContext();

export default UserContext;
export const UserProvider = ({children}) => {    
    let [ipV4, setIpV4] = useState(null)
    let [portinput, setPort] = useState(null)
    let [currentTeam, setCurrentTeam] = useState([])
    let [formation, setFormation] = useState('0000')
    const [goalkeeper, setGoalkeeper] = useState(new Array(parseInt(formation[0])).fill(0))
    const [fixo, setFixo] = useState(new Array(parseInt(formation[1])).fill(0))
    const [ala, setAla] = useState(new Array(parseInt(formation[2])).fill(0))   
    const [pivot, setPivot] = useState(new Array(parseInt(formation[3])).fill(0))  
    const totalTeam = [...pivot, ...ala, ...fixo, ...goalkeeper, ...currentTeam]
    const [ourColor, setOurColor] = useState('#18A0FB')
    const [theirColor, setTheirColor] = useState('#D93636')
    const [firstCoord, setFirstCoord] = useState([])
    const [ourTeamCoord, setOurTeamCoord] = useState([])
    // const testheight = document.bod.clientHeight 
    // const testwidth = document.querySelector('#leftux').clientWidth



        

    let contextData = {
        // user: user,
        setIpV4 : setIpV4,
        ipV4 : ipV4,
        setPort : setPort,
        portinput : portinput,
        setCurrentTeam : setCurrentTeam,
        currentTeam : currentTeam,
        formation : formation,
        setFormation : setFormation,
        goalkeeper : goalkeeper, 
        setGoalkeeper : setGoalkeeper,
        fixo :fixo, 
        setFixo : setFixo,
        ala : ala, 
        setAla : setAla,
        pivot : pivot, 
        setPivot : setPivot,   
        totalTeam : totalTeam,     
        ourColor : ourColor,
        setOurColor : setOurColor,
        theirColor : theirColor,
        setTheirColor : setTheirColor,
        setFirstCoord : setFirstCoord,
        firstCoord : firstCoord,
        ourTeamCoord : ourTeamCoord,
        setOurTeamCoord : setOurTeamCoord,
        // testheight : testheight,
      };
    return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
}

  let contextData = {
    // user: user,
    setIpV4: setIpV4,
    ipV4: ipV4,
    setPort: setPort,
    portinput: portinput,
    setCurrentTeam: setCurrentTeam,
    currentTeam: currentTeam,
    formation: formation,
    setFormation: setFormation,
    goalkeeper: goalkeeper,
    setGoalkeeper: setGoalkeeper,
    fixo: fixo,
    setFixo: setFixo,
    ala: ala,
    setAla: setAla,
    pivot: pivot,
    setPivot: setPivot,
    totalTeam: totalTeam,
    ourColor: ourColor,
    setOurColor: setOurColor,
    theirColor: theirColor,
    setTheirColor: setTheirColor,
    setFirstCoord: setFirstCoord,
    firstCoord: firstCoord,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
