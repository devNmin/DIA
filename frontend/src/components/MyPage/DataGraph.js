import { ResponsiveRadar } from "@nivo/radar";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";

const DataGraph = () => {
  // const [fiveGameInfo, setFiveGameInfo] = useState({});
  // const [oneGameInfo, setOneGameInfo] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGameInfo = async () => {
    await axios
      .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
        start: 0,
        end: 1,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
					setData([
						{
							"status": "체력",
							"최근 1경기": res.data.avgStamina,
							"최근 5경기": res.data.avgStamina,
						},
						{
							"status": "스피드",
							"최근 1경기": res.data.avgSpeed,
							"최근 5경기": res.data.avgStamina,
						},
						{
							"status": "피지컬",
							"최근 1경기": res.data.avgPhysical,
							"최근 5경기": res.data.avgStamina,
						},
						{
							"status": "이동거리",
							"최근 1경기": res.data.avgDistance,
							"최근 5경기": res.data.avgStamina,
						},
						{
							"status": "공격력",
							"최근 1경기": res.data.avgAttack,
							"최근 5경기": res.data.avgStamina,
						},
						{
							"status": "수비력",
							"최근 1경기": res.data.avgDefence,
							"최근 5경기": res.data.avgStamina,
						}
					])
        }
      });

	// 		await axios
    //   .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
    //     start: 0,
    //     end: 5,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log(res.data);
	// 				if (res.data.avgDistance !== data[4].value) {
	// 					return
	// 					setData([
	// 						{
	// 							"status": "체력",
	// 							"최근 1경기": res.data.avgStamina,
	// 							"최근 5경기": res.data.avgStamina,
	// 						},
	// 						{
	// 							"status": "스피드",
	// 							"최근 1경기": res.data.avgSpeed,
	// 							"최근 5경기": res.data.avgStamina,
	// 						},
	// 						{
	// 							"status": "피지컬",
	// 							"최근 1경기": res.data.avgPhysical,
	// 							"최근 5경기": res.data.avgStamina,
	// 						},
	// 						{
	// 							"status": "이동거리",
	// 							"최근 1경기": res.data.avgDistance,
	// 							"최근 5경기": res.data.avgStamina,
	// 						},
	// 						{
	// 							"status": "공격력",
	// 							"최근 1경기": res.data.avgAttack,
	// 							"최근 5경기": res.data.avgStamina,
	// 						},
	// 						{
	// 							"status": "수비력",
	// 							"최근 1경기": res.data.avgDefence,
	// 							"최근 5경기": res.data.avgStamina,
	// 						}
	// 					])
	// 				}
    //     }
    //   });
  };

	
  // 	  .then((res) => {
  // 		if (res.status === 200) {
  // 			console.log("1게임 불러오기 성공");
  // 			console.log(res);
  // 			let data = res.data;
  // 			let gameInfo = {};
  // 			gameInfo.attack = data.avgAttack;
  // 			gameInfo.defence = data.avgDefence;
  // 			gameInfo.distance = data.avgDistance;
  // 			gameInfo.physical = data.avgPhysical;
  // 			gameInfo.speed = data.avgSpeed;
  // 			gameInfo.stamina = data.avgStamina;
  // 			setOneGameInfo(gameInfo);
  // 			setIsLoading(false);
  // 		}
  // 	  })
  // 	  .then(async()=>{
  // 		await axios
  // 	  .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
  // 		start: 0,
  // 		end: 5,
  // 	  })
  // 	  .then((res) => {
  // 			if (res.status === 200) {
  // 				console.log("5게임 불러오기 성공");
  // 				console.log(res);
  // 				let data = res.data;
  // 				let gameInfo = {};
  // 				gameInfo.attack = data.avgAttack;
  // 				gameInfo.defence = data.avgDefence;
  // 				gameInfo.distance = data.avgDistance;
  // 				gameInfo.physical = data.avgPhysical;
  // 				gameInfo.speed = data.avgSpeed;
  // 				gameInfo.stamina = data.avgStamina;
  // 				setFiveGameInfo(gameInfo);
  // 			}
  // 		})
  // 		.catch((err) => {
  // 			console.log("tq")
  // 			alert(err.data);
  // 		});
  // 	  })
  // 	  .then(async ()=>{
  // 		console.log(oneGameInfo);
  // 		console.log(fiveGameInfo);
  // setData([
  	// {
  	// 	"status": "체력",
  	// 	"최근 1경기": oneGameInfo.stamina,
  	// 	"최근 5경기": fiveGameInfo.stamina,
  	// },
  	// {
  	// 	"status": "스피드",
  	// 	"최근 1경기": oneGameInfo.speed,
  	// 	"최근 5경기": fiveGameInfo.speed,
  	// },
  	// {
  	// 	"status": "피지컬",
  	// 	"최근 1경기": oneGameInfo.physical,
  	// 	"최근 5경기": fiveGameInfo.physical,
  	// },
  	// {
  	// 	"status": "이동거리",
  	// 	"최근 1경기": oneGameInfo.distance,
  	// 	"최근 5경기": fiveGameInfo.distance,
  	// },
  	// {
  	// 	"status": "공격력",
  	// 	"최근 1경기": oneGameInfo.attack,
  	// 	"최근 5경기": fiveGameInfo.attack,
  	// },
  	// {
  	// 	"status": "수비력",
  	// 	"최근 1경기": oneGameInfo.defence,
  	// 	"최근 5경기": fiveGameInfo.defence,
  	// }
  // ])
  // })
  // 	  .then(()=>{
  // 		console.log(data);
  // 	  })
  // 	  .catch((err) => {
  // 		console.log("tq")
  // 		alert(err.data);
  // 	  });
  //   };

  //   const getFinveInfo = async () => {
  // 	await axios
  // 	  .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
  // 		start: 0,
  // 		end: 5,
  // 	  })
  // 	  .then((res) => {
  // 		if (res.status === 200) {
  // 			console.log("5게임 불러오기 성공");
  // 			console.log(res);
  // 			let data = res.data;
  // 			let gameInfo = {};
  // 			gameInfo.attack = data.avgAttack;
  // 			gameInfo.defence = data.avgDefence;
  // 			gameInfo.distance = data.avgDistance;
  // 			gameInfo.physical = data.avgPhysical;
  // 			gameInfo.speed = data.avgSpeed;
  // 			gameInfo.stamina = data.avgStamina;
  // 			setFiveGameInfo(gameInfo);
  // 		}
  // 	  })
  // 	  .catch((err) => {
  // 		console.log("tq")
  // 		alert(err.data);
  // 	  });
  //   };

  useEffect(() => {
    getGameInfo();
  }, []);

  if (!data) {
    return <div>로딩중</div>;
  }
  return (
    // 챠트를 감싸는 div에 style을 지정해주지 않으면 출력이 되지 않는다.
    <div>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div
          style={{
            width: "90%",
            height: "70%",
            position: "absolute",
            top: "35%",
            transform: "translate(0%, 0%)",
          }}
        >
          {/* <MyCard /> */}
          <ResponsiveRadar
            data={data}
            keys={["최근 1경기", "최근 5경기"]}
            indexBy="status"
            valueFormat=">-.2f"
            margin={{ top: 180, bottom: 140, right: 70, left: 70 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "pastel1" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 25,
                itemTextColor: "#999",
                symbolSize: 15,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
            theme={{
              textColor: "#ffffff",
              fontSize: 15,
              axis: {
                domain: {
                  line: {
                    stroke: "#dddddd",
                    strokeWidth: 1,
                  },
                },
                legend: {
                  text: {
                    fontSize: 12,
                    fill: "#333333",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                  },
                  text: {
                    fontSize: 15,
                  },
                },
              },
              tooltip: {
                container: {
                  background: "#ffffff",
                  color: "#333333",
                  fontSize: 16,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DataGraph;
